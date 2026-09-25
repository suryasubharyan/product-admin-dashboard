// Unlike layout.js, a template re-mounts on every navigation,
// so each page gets a short fade-in when it opens (opacity only, no movement).
export default function ProductsTemplate({ children }) {
  return <div className="motion-safe:animate-fade-in">{children}</div>;
}
