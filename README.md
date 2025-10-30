# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

````js
export default defineConfig([
  globalIgnores(['dist']),
  {
    # Todo App (React + TypeScript frontend, Django REST backend)

    A small full-stack todo application demonstrating CRUD between a React + TypeScript frontend (Vite) and a Django REST Framework backend.

    Repository: https://github.com/imanojkarki/todo.git

    Features
    - Add, edit, complete and delete todos
    - Frontend: React + TypeScript + Vite, Redux Toolkit + RTK Query for server state, Sonner for toasts
    - Backend: Django + Django REST Framework (DRF) providing a simple /api/todos/ CRUD API
    - Development convenience: CORS enabled for Vite, editor settings for Python venv

    Tech stack
    - Frontend: React, TypeScript, Vite, Tailwind (optional), Redux Toolkit, RTK Query
    - Backend: Django, Django REST Framework, django-cors-headers

    Getting started (quick)

    Prerequisites
    - Node.js (16+)
    - npm or yarn
    - Python 3.10+ and virtualenv

    1) Clone the repo

    ```bash
    git clone https://github.com/imanojkarki/todo.git
    cd todo-app-in-react
    ```

    Frontend setup

    ```bash
    # from project root
    npm install
    npm run dev
    # open http://localhost:5173
    ```

    Backend setup (Django)

    ```bash
    cd backend
    python -m venv .venv
    source .venv/bin/activate   # macOS / Linux
    pip install -r requirements.txt
    python manage.py migrate
    python manage.py runserver 8000
    # API base: http://127.0.0.1:8000/api/todos/
    ```

    Environment variables
    - Frontend: create `.env` at project root (Vite will load variables prefixed with VITE_)

    ```
    VITE_API_BASE=http://127.0.0.1:8000/api/
    ```

    Notes on development
    - The frontend RTK Query slice is configured to use `VITE_API_BASE` (see `src/redux/api.ts`). Restart Vite after changing `.env`.
    - CORS is enabled on the Django backend for the Vite origin during development. Check `backend/backend_project/settings.py` for `CORS_ALLOWED_ORIGINS`.
    - The project includes an example `.vscode/settings.json` to point VS Code at the backend virtualenv for Python language features.

    Testing API with curl

    ```bash
    # list
    curl http://127.0.0.1:8000/api/todos/

    # create
    curl -X POST http://127.0.0.1:8000/api/todos/ \
      -H "Content-Type: application/json" \
      -d '{"title":"Buy milk","completed":false}'

    # update
    curl -X PATCH http://127.0.0.1:8000/api/todos/1/ \
      -H "Content-Type: application/json" \
      -d '{"completed":true}'

    # delete
    curl -X DELETE http://127.0.0.1:8000/api/todos/1/
    ```

    Deployment notes
    - For production use a proper database (Postgres) and serve backend with Gunicorn / Daphne behind nginx.
    - Tighten CORS settings and enable authentication (JWT or session + CSRF) before exposing the API publicly.

    Contributing
    - Open issues or PRs with focused changes. If you add features, include tests and update README with setup notes.

    License
    - Choose a license for the repo (MIT is a common choice). Add `LICENSE` file if you want to open-source it.

    Contact
    - Repo: https://github.com/imanojkarki/todo.git
````
