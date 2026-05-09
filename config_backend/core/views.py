from rest_framework import viewsets, mixins
from rest_framework.permissions import AllowAny
from .models import FamiliaProfesional, Curso, Solicitud, ProfesionalIndependiente
from .serializers import FamiliaProfesionalSerializer, CursoSerializer, SolicitudSerializer, ProfesionalIndependienteSerializer

class FamiliaProfesionalViewSet(viewsets.ReadOnlyModelViewSet):
    # Solo enviamos a React las familias que estén marcadas como "activas"
    queryset = FamiliaProfesional.objects.filter(activa=True)
    serializer_class = FamiliaProfesionalSerializer

class CursoViewSet(viewsets.ReadOnlyModelViewSet):
    # Solo enviamos los cursos activos
    queryset = Curso.objects.all()
    serializer_class = CursoSerializer


# Usamos CreateModelMixin para que React SOLO pueda enviar datos, no leer las solicitudes de otros.
class SolicitudViewSet(mixins.CreateModelMixin, viewsets.GenericViewSet):
    queryset = Solicitud.objects.all()
    serializer_class = SolicitudSerializer


class ProfesionalIndependienteViewSet(mixins.CreateModelMixin, mixins.ListModelMixin, viewsets.GenericViewSet):
    """
    Vista pública para registro y listado de profesionales.
    Permite peticiones POST (creación) y GET (listado de los aprobados).
    """
    queryset = ProfesionalIndependiente.objects.all()
    serializer_class = ProfesionalIndependienteSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        # Si es una petición GET para listar, solo mostramos los aprobados
        if self.action == 'list':
            return ProfesionalIndependiente.objects.filter(estado_aprobacion='APROBADO').order_by('-fecha_registro')
        return super().get_queryset()