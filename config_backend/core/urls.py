from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import FamiliaProfesionalViewSet, CursoViewSet, SolicitudViewSet, ProfesionalIndependienteViewSet

router = DefaultRouter()
router.register(r'familias', FamiliaProfesionalViewSet)
router.register(r'cursos', CursoViewSet)
router.register(r'solicitudes', SolicitudViewSet)
router.register(r'registro-profesionales', ProfesionalIndependienteViewSet, basename='registro-profesionales')

urlpatterns = [
    path('', include(router.urls)),
]