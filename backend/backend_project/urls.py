"""
URL configuration for backend_project project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView
from django.conf import settings
from django.views.static import serve
from pathlib import Path

urlpatterns = [
    # keep admin and api routes first
    path('admin/', admin.site.urls),
    path('api/', include('todos.urls')),

    # Serve the frontend index.html at the root path
    # TEMPLATES['DIRS'] contains BASE_DIR / 'static', so the frontend build
    # at backend/static/frontend/index.html will be found as 'frontend/index.html'
    path('', TemplateView.as_view(template_name='frontend/index.html'), name='home'),

    # Catch-all fallback to support client-side routing (React Router, etc.).
    # This should come after API and admin routes so it doesn't shadow them.
    re_path(r'^(?:.*)/?$', TemplateView.as_view(template_name='frontend/index.html'), name='spa-fallback'),
]

# During development, the frontend build places assets under backend/static/frontend/assets
# but the built index.html references `/assets/...` at the site root. The SPA catch-all
# above unintentionally returned index.html for those asset requests, producing HTML
# responses with the wrong MIME type. To fix that, serve /assets/ (and favicon) from
# the frontend build directory before the catch-all when DEBUG is enabled.
if settings.DEBUG:
    # prefer STATIC_ROOT/assets (collectstatic), otherwise fallback to project static/frontend/assets
    static_root = getattr(settings, 'STATIC_ROOT', None)
    if static_root:
        assets_docroot = Path(static_root) / 'assets'
    else:
        # BASE_DIR is available via settings.BASE_DIR (a pathlib.Path)
        assets_docroot = Path(settings.BASE_DIR) / 'static' / 'frontend' / 'assets'

    # insert at the top so assets are served before admin/api/spa routes
    urlpatterns = [
        re_path(r'^assets/(?P<path>.*)$', serve, {'document_root': str(assets_docroot)}),
        re_path(r'^favicon.ico$', serve, {'document_root': str(assets_docroot.parent), 'path': 'favicon.ico'}),
    ] + urlpatterns
