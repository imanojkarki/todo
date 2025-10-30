#!/usr/bin/env bash
set -euo pipefail

# Script to build frontend and copy build artifacts into Django backend static folder.
# Usage: ./scripts/build-and-copy.sh

PROJECT_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
FRONTEND_DIST_DIR="$PROJECT_ROOT/dist"
BACKEND_STATIC_DIR="$PROJECT_ROOT/backend/static/frontend"

echo "Project root: $PROJECT_ROOT"

# Ensure frontend build exists
if [ ! -d "$FRONTEND_DIST_DIR" ]; then
  echo "Frontend build directory not found at $FRONTEND_DIST_DIR"
  echo "Run 'npm run build' first or run this script via 'npm run build:copy' which runs build then copies."
  exit 1
fi

# Remove old static frontend folder and recreate
rm -rf "$BACKEND_STATIC_DIR"
mkdir -p "$BACKEND_STATIC_DIR"

# Copy files
cp -R "$FRONTEND_DIST_DIR"/* "$BACKEND_STATIC_DIR/"

echo "Copied frontend build to $BACKEND_STATIC_DIR"

# If a backend venv python exists, try to run collectstatic
VENV_PYTHON="$PROJECT_ROOT/backend/.venv/bin/python"
MANAGE_PY="$PROJECT_ROOT/backend/manage.py"
if [ -x "$VENV_PYTHON" ] && [ -f "$MANAGE_PY" ]; then
  echo "Detected backend venv python at $VENV_PYTHON — running collectstatic"
  "$VENV_PYTHON" "$MANAGE_PY" collectstatic --noinput
  echo "collectstatic finished"
else
  echo "No backend virtualenv python found at $VENV_PYTHON or manage.py missing."
  echo "If you want collectstatic to run automatically, create a venv at backend/.venv and install requirements."
fi

echo "build-and-copy completed"
