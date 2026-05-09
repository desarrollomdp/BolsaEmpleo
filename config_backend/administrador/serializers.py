from rest_framework import serializers
from .models import Slider, Empresa, InteresEmpresa

class SliderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Slider
        fields = '__all__'


class EmpresaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Empresa
        fields = '__all__'


class InteresEmpresaSerializer(serializers.ModelSerializer):
    class Meta:
        model = InteresEmpresa
        fields = [
            'nombre_empresa', 'rubro', 'localidad',
            'nombre_contacto', 'telefono', 'email',
            'perfil_buscado', 'descripcion_tareas',
            'cantidad_personas', 'urgencia',
            'modalidad', 'condiciones_adicionales',
        ]
