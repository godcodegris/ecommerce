# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server (Vite HMR)
npm run build     # Production build
npm run preview   # Preview production build
npm run lint      # Run ESLint
```

No test suite is configured.

## Architecture

Single-page React 19 e-commerce app built with Vite and React Router DOM v7. The UI language is Spanish.

**Entry point:** `src/main.jsx` wraps `<App>` with two providers:
- `AuthProvider` (from `src/components/AuthContext.jsx`)
- `ProductProvider` (from `src/components/ProductContext.jsx`)

**Routing** is defined in `src/App.jsx`:
- `/` → Home (product listing)
- `/producto/:id` → Product detail (uses array index as ID, not the MockAPI ID)
- `/carrito` → Cart (protected, requires login)
- `/login`, `/contact`, `/about`

**Data source:** All product data is fetched from a MockAPI endpoint (`https://68659fd989803950dbafe5ae.mockapi.io/productos`). There is no backend. Product fields: `id`, `nombre`, `descripcion`, `precio`, `imagen`.

**Authentication:** `AuthContext` holds a `user` state (`null` = logged out). The `login()` function accepts any credentials — no validation occurs in the context. The Login UI displays hardcoded placeholder credentials (`admin` / `1234`). `ProtectedRoute` redirects unauthenticated users to `/login`.

**State management — known duplication:**
- Cart state lives in `App.jsx` as local `useState` (passed down as props). `CarritoContext.jsx` exists but is **not wired up** — the `CarritoProvider` is never rendered.
- `ProductProvider.jsx` and `ProductContext.jsx` are near-duplicate files. Only `ProductContext.jsx` is imported in `main.jsx`. `ProductProvider.jsx` can be ignored.

**Product CRUD:** CRUD API calls (`DELETE`, `PUT`) are made directly inside `Card.jsx`, not in the context. After mutations, `Card.jsx` calls `window.location.reload()` to refresh data. The `eliminarProducto`/`editarProducto` methods in `ProductContext` only update local state. Edit/Delete buttons are only visible when `user` is truthy (logged in).

**Styling:** Bootstrap (imported globally in `main.jsx`) + custom CSS in `src/styles/Productos.css` and `src/App.css`.
