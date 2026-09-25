# Product Admin Dashboard

An admin dashboard for managing products, built with **Next.js (App Router)**, **React**, **Tailwind CSS** and **Axios** on top of the [DummyJSON](https://dummyjson.com) API.

- **Live demo:** _add Vercel URL here_
- **Repository:** _add GitHub URL here_

**Demo login:** username `emilys`, password `emilyspass`

---

## Tech Stack

| Area | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router), React 19 |
| Styling | Tailwind CSS 4 |
| HTTP | Axios (single shared instance) |
| State | React hooks + URL search params (no React Query, SWR or UI libraries) |
| Linting | ESLint (`eslint-config-next`) |

---

## Getting Started

**Prerequisites:** Node.js 18.18 or newer, npm.

```bash
git clone <repository-url>
cd product-admin-dashboard
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and log in with the demo credentials.

### Other scripts

```bash
npm run build   # production build
npm run start   # run the production build
npm run lint    # lint the project
```

### Optional: simulate a slow API

To test race conditions, create a `.env.local` file:

```bash
NEXT_PUBLIC_API_DELAY=2000
```

Every product list request is then sent with `&delay=2000`. Restart the dev server after changing it.

---

## Features

### Authentication
- [x] Login with `POST /auth/login`, with clear error messages for wrong credentials
- [x] Client-side validation for empty fields
- [x] Login button cannot send duplicate requests on rapid clicks or Enter + click
- [x] All `/products` pages are protected. Logged-out users are redirected to `/login`
- [x] Logout button in the header
- [x] Logged-in users visiting `/login` are redirected to `/products`

### Product list
- [x] Shows image, title, category, price, rating and stock
- [x] Table layout on desktop, card layout on mobile
- [x] Server-side pagination using `limit` and `skip`
- [x] Page numbers with ellipsis, Previous/Next buttons, page size (10, 20, 50)
- [x] "Showing 21–40 of 194" summary

### Search, filter and sort
- [x] Search with `/products/search?q=`, debounced by 500 ms
- [x] Returns to page 1 whenever search, filter, sort or page size changes
- [x] Category filter populated from `/products/categories`
- [x] Sort by price, rating or title (ascending and descending)

### Product details
- [x] `/products/[id]` with image gallery, description, price, stock and reviews
- [x] "Not found" page for invalid or unknown ids (for example `/products/abc` or `/products/99999`)

### Add, edit and delete
- [x] Shared form with field-level validation for both create and edit
- [x] Save button cannot send duplicate requests
- [x] Confirmation dialog before deleting (closes with Cancel, Escape or an outside click)
- [x] Changes appear immediately and persist across page refreshes

### Loading, empty and error states
- [x] Loader while data is loading
- [x] Empty-state message when nothing matches
- [x] Error message with a **Retry** button when a request fails

### URL state
- [x] Page, page size, search, category and sort are stored in the URL, so a refresh or a shared link shows the same result
- [x] Invalid values such as `?page=abc`, `?limit=999` or `?sortBy=hack` fall back to safe defaults
- [x] Out-of-range pages such as `?page=999` are redirected to the last valid page

---

## Project Structure

```
src/
├── app/                      # Routes (App Router)
│   ├── login/                # /login
│   └── products/             # /products, /products/new, /products/[id], /products/[id]/edit
├── components/
│   ├── auth/                 # AuthGuard
│   ├── layout/               # Header
│   ├── products/             # Product-specific components
│   └── ui/                   # Reusable UI: Loader, Pagination, ConfirmModal, FormField...
├── hooks/                    # Data and state hooks (useProducts, useProductQuery...)
├── lib/                      # Axios instance, auth token, URL parsing, validation, local store
└── services/                 # API calls only (authService, productService)
```

**Data flow:** `Component → Hook → Service → Axios instance → DummyJSON`

Components never import Axios. All API calls live in `src/services`, and all request/response handling lives in `src/lib/axios.js`.

---

## Technical Decisions

### 1. One shared Axios instance
`src/lib/axios.js` creates a single instance with the base URL and a timeout.
- A **request interceptor** attaches `Authorization: Bearer <token>` to every request.
- A **response interceptor** turns every error into one shape, `{ message, status }`, so the UI only needs `err.message`. It uses the server message when available, and falls back to clear timeout, network or generic messages.
- A `401` response clears the token and redirects to `/login`.
- Cancelled requests are passed through untouched, so they never show up as errors.

### 2. The URL is the single source of truth
Page, page size, search, category and sort are never kept in component state. `useProductQuery` reads them from the URL, validates them against whitelists, and exposes `updateQuery()` to change them. Any change that affects the result set resets the page to 1. Search typing uses `router.replace` so it does not flood the browser history, while paging and filtering use `router.push` so the back button works as expected.

### 3. Search and category filter are mutually exclusive
DummyJSON cannot search inside a category (`/products/search` ignores category, and `/products/category/:slug` ignores `q`). I considered fetching all search results and filtering them on the client, but that would break server-side pagination and the "Showing X–Y of Z" count.

So **the most recent action wins**: typing a search clears the category, and choosing a category clears the search. The UI shows a short note explaining this while a search is active. If a URL contains both, search takes priority. This keeps the results and counts always correct.

### 4. Old search results never replace new ones
Each product request gets its own `AbortController`. When the query changes, the effect's cleanup aborts the previous request, so its response is never applied. As a second guard, every result is tagged with the key of the request that produced it, and a result with a stale key is treated as "still loading" rather than displayed. Debouncing reduces the number of requests. Cancellation guarantees the order of results is correct.

### 5. Add, edit and delete without a real backend
DummyJSON returns success for create/update/delete but does not persist anything, and `POST /products/add` always returns `id: 195`.

My approach:
1. Always call the real API first, so the request, validation and error handling are real.
2. On success, save the change in a small **local change store** in `localStorage` (`src/lib/localProducts.js`).
3. Whenever products are fetched, merge the local changes on top of the API data: deleted products are hidden, edited products are replaced, and new products appear at the top of page 1 (only if they match the current search or category).
4. New products get a unique id (`Date.now()`) and an `isLocal` flag. Editing or deleting them skips the API, because they do not exist on the server.

Changes survive refreshes and appear consistently on the list, details and edit pages.

### 6. Duplicate submit protection
Login, Save and Delete use two guards: a `useRef` flag that blocks a second call instantly (state updates are not synchronous), and a `useState` flag that disables the button and shows "Saving..." or "Deleting...".

### 7. Auth guard
`AuthGuard` wraps every page under `/products` through `app/products/layout.js`, so no page can forget to protect itself. It reads the token with `useSyncExternalStore`, which keeps server and client output identical during hydration.

---

## Known Limitations

- **Client-side auth only.** The token lives in `localStorage`, so routes are protected in the browser, not on the server. In production I would store the token in an `httpOnly` cookie and protect routes with Next.js middleware.
- **Local changes and server pagination.** New products appear only at the top of page 1. Deleting an item leaves one fewer row on that page. Edited products are not re-sorted by their new values. A real backend would remove these trade-offs.
- **Images for new products.** New products have no image upload and show a placeholder.

---

## Short Note

### My main choices
- **URL-driven state:** page, search, filter and sort live only in the URL, so refresh, back button and shared links always show the same result.
- **Search or category, not both:** the API cannot combine them, so the latest action wins. This keeps pagination and the "Showing X–Y of Z" count correct.
- **Real API calls + local store for add/edit/delete:** requests and errors stay real, and the changes still show in the app after a refresh.
- **Cancel old requests:** every list request can be aborted, so a slow old response can never replace a newer one.
- **Small layers:** components → hooks → services → one Axios instance. No component talks to the API directly.

### One problem I faced
When I built add, edit and delete, I noticed that DummyJSON returns success but does not save anything. After a refresh, my new product was gone. I also saw in the Network tab that every new product came back with the same id, `195`. That meant duplicate React keys in the list, and editing or deleting a product I had added returned `404`, because it never existed on the server.

To fix it, I still call the real API first. If the request succeeds, I save the change in a small local store in `localStorage`, and every time products are loaded I merge these changes on top of the API data. New products get their own id (`Date.now()`) and an `isLocal` flag, so for edit and delete I skip the API call for them. The trade-offs are listed under Known Limitations.

### How I used AI
I used an AI :
- to plan the folder structure and the order of the work
- to generate starting code for components and hooks, which I then adapted and connected
- to explain concepts I had not used much before, such as Axios interceptors, `AbortController` and `useSyncExternalStore`


