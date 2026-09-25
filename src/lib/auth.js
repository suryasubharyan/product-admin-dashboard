const TOKEN_KEY = "auth_token";
const USER_KEY = "auth_user";

export function getToken() {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token) {
    localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
}

export function setUser(user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
}

// Returns the raw JSON string so it can be compared between renders.
export function getStoredUser() {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(USER_KEY);
}

export function parseUser(json) {
    try {
        return json ? JSON.parse(json) : null;
    } catch {
        return null;
    }
}
