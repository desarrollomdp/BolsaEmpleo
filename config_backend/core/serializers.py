from rest_framework import serializers
from .models import FamiliaProfesional, Curso, Solicitud, ProfesionalIndependiente 

class FamiliaProfesionalSerializer(serializers.ModelSerializer):
    class Meta:
        model = FamiliaProfesional
        fields = '__all__' # Esto traduce todos los campos del modelo

class CursoSerializer(serializers.ModelSerializer):
    # Campos extra calculados: nombre de familia y cantidad de egresados disponibles
    familia_nombre = serializers.ReadOnlyField(source='familia.nombre')
    cantidad_egresados = serializers.SerializerMethodField()

    class Meta:
        model = Curso
        fields = [
            'id', 'nombre', 'descripcion', 'imagen', 'perfil_profesional',
            'familia', 'familia_nombre', 'cantidad_egresados'
        ]

    def get_cantidad_egresados(self, obj):
        return obj.egresados.count()



class SolicitudSerializer(serializers.ModelSerializer):
    class Meta:
        model = Solicitud
        # El usuario no envía 'estado', 'fecha_creacion' ni 'notas_resolucion', eso es interno.
        # Por eso solo habilitamos los campos que llenará en el formulario web.
        fields = ['tipo_solicitante', 'nombre_solicitante', 'telefono', 'es_whatsapp', 'email', 'curso_requerido', 'zona_trabajo', 'urgencia', 'descripcion_trabajo']


class ProfesionalIndependienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProfesionalIndependiente
        exclude = ['estado_aprobacion']