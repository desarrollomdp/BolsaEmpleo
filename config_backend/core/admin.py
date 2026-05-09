from django.contrib import admin
from .models import FamiliaProfesional, Curso, Egresado, Solicitud, ProfesionalIndependiente

@admin.register(FamiliaProfesional)
class FamiliaProfesionalAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'activa')
    list_filter = ('activa',)
    search_fields = ('nombre',)

@admin.register(Curso)
class CursoAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'familia')
    list_filter = ('familia','nombre')
    search_fields = ('nombre', 'descripcion')




# No olvides importar los modelos arriba: from .models import FamiliaProfesional, Curso, Egresado, Solicitud

@admin.register(Egresado)
class EgresadoAdmin(admin.ModelAdmin):
    list_display = ('nombre_completo', 'curso', 'anio_egreso', 'telefono_principal')
    list_filter = ('curso', 'anio_egreso')
    search_fields = ('nombre_completo', 'dni')

@admin.register(Solicitud)
class SolicitudAdmin(admin.ModelAdmin):
    # Actualizamos los nombres para que coincidan con tu modelo nuevo
    list_display = ('nombre_solicitante', 'tipo_solicitante', 'curso_requerido', 'urgencia', 'estado', 'fecha_creacion')
    list_filter = ('estado', 'urgencia', 'tipo_solicitante', 'curso_requerido')
    search_fields = ('nombre_solicitante', 'email', 'descripcion_trabajo')
    readonly_fields = ('fecha_creacion',)


@admin.register(ProfesionalIndependiente)
class ProfesionalIndependienteAdmin(admin.ModelAdmin):
    list_display = ('nombre_completo', 'dni', 'estado_aprobacion', 'fecha_registro')
    list_filter = ('estado_aprobacion',)
    search_fields = ('nombre_completo', 'dni', 'email')