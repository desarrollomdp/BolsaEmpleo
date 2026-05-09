from rest_framework import viewsets, mixins
from rest_framework.permissions import AllowAny
from .models import Slider, Empresa, InteresEmpresa
from .serializers import SliderSerializer, EmpresaSerializer, InteresEmpresaSerializer

class SliderViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Vista pública para obtener los sliders activos.
    """
    queryset = Slider.objects.filter(activa=True)
    serializer_class = SliderSerializer
    permission_classes = [AllowAny]


class EmpresaViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Vista pública para obtener las empresas activas.
    """
    queryset = Empresa.objects.filter(activa=True)
    serializer_class = EmpresaSerializer
    permission_classes = [AllowAny]


class InteresEmpresaViewSet(mixins.CreateModelMixin, viewsets.GenericViewSet):
    """
    Vista pública — solo permite POST para registrar intereses de empresas.
    Los datos no son legibles desde el frontend (solo desde el admin de Django).
    """
    queryset = InteresEmpresa.objects.all()
    serializer_class = InteresEmpresaSerializer
    permission_classes = [AllowAny]
