from django.contrib import admin
from .models import Slider, Empresa, InteresEmpresa

@admin.register(Slider)
class SliderAdmin(admin.ModelAdmin):
    list_display = ('id', 'texto_corto', 'activa', 'fecha_creacion')
    list_filter = ('activa',)
    search_fields = ('texto',)

    def texto_corto(self, obj):
        return obj.texto[:50] + '...' if len(obj.texto) > 50 else obj.texto
    texto_corto.short_description = 'Texto'


@admin.register(Empresa)
class EmpresaAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'activa', 'orden')
    list_filter = ('activa',)
    search_fields = ('nombre',)
    ordering = ('orden', 'nombre')


@admin.register(InteresEmpresa)
class InteresEmpresaAdmin(admin.ModelAdmin):
    list_display = ('nombre_empresa', 'perfil_buscado', 'rubro', 'urgencia', 'fecha_envio', 'leido')
    list_filter = ('leido', 'urgencia', 'rubro', 'fecha_envio')
    search_fields = ('nombre_empresa', 'perfil_buscado', 'nombre_contacto', 'email')
    ordering = ('-fecha_envio',)
    readonly_fields = ('fecha_envio',)
    list_editable = ('leido',)
