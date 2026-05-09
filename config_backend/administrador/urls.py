from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import SliderViewSet, EmpresaViewSet, InteresEmpresaViewSet

router = DefaultRouter()
router.register(r'sliders', SliderViewSet, basename='sliders')
router.register(r'empresas', EmpresaViewSet, basename='empresas')
router.register(r'interes-empresas', InteresEmpresaViewSet, basename='interes-empresas')

urlpatterns = [
    path('', include(router.urls)),
]
