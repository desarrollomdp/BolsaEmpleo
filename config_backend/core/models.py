from django.db import models

class FamiliaProfesional(models.Model):
    #Nombre de la familia profesional
    nombre = models.CharField(max_length=100, unique=True, verbose_name="Nombre de la Familia")
    #Activa o inactiva
    activa = models.BooleanField(default=True, verbose_name="¿Está activa?")

    class Meta:
        #Nombre en singular y plural para el administrador
        verbose_name = "Familia Profesional"
        verbose_name_plural = "Familias Profesionales"

    def __str__(self):
        #Lo que se muestra en el administrador
        return self.nombre


class Curso(models.Model):
    #Clave foranea que relaciona con la familia profesional
    familia = models.ForeignKey(FamiliaProfesional, on_delete=models.CASCADE, related_name='cursos')
    #Nombre del curso
    nombre = models.CharField(max_length=200, verbose_name="Nombre del Curso")
    #Descripción del curso
    descripcion = models.TextField(blank=True, null=True, verbose_name="Descripción (Opcional)")
    #imagen
    imagen = models.ImageField(upload_to='imagenes_cursos/', blank=True, null=True, verbose_name="Imagen del Curso")
    #Perfil Profesional
    perfil_profesional = models.TextField(blank=True, null=True, verbose_name="Perfil Profesional (Opcional)")

    class Meta:
        #Nombre en singular y plural para el administrador
        verbose_name = "Curso"
        verbose_name_plural = "Cursos"

    def __str__(self):
        #Lo que se muestra en el administrador
        return f"{self.nombre} ({self.familia.nombre})"


class Egresado(models.Model):
    nombre_completo = models.CharField(max_length=150, verbose_name="Nombre Completo")
    dni = models.CharField(max_length=20, unique=True, verbose_name="DNI")
    curso = models.ForeignKey(Curso, on_delete=models.SET_NULL, null=True, related_name='egresados', verbose_name="Curso Realizado")
    anio_egreso = models.IntegerField(verbose_name="Año de Egreso")
    nombre_instructor = models.CharField(max_length=100, verbose_name="Instructor de la cursada")
    
    telefono_principal = models.CharField(max_length=50, verbose_name="Teléfono Principal")
    tiene_whatsapp = models.BooleanField(default=True, verbose_name="¿Tiene WhatsApp?")
    telefono_alternativo = models.CharField(max_length=50, blank=True, null=True, verbose_name="Teléfono Alternativo")
    
    matricula = models.CharField(max_length=100, blank=True, null=True, verbose_name="Matrícula (Si aplica)")
    notas_admin = models.TextField(blank=True, null=True, verbose_name="Notas del Administrador (Privado)")
    foto_certificado = models.ImageField(upload_to='certificados/', blank=True, null=True, verbose_name="Foto del Certificado")

    class Meta:
        verbose_name = "Egresado"
        verbose_name_plural = "Egresados"

    def __str__(self):
        return f"{self.nombre_completo} - {self.curso.nombre if self.curso else 'Sin curso'}"


class Solicitud(models.Model):
    ESTADOS = [
        ('NUEVA', 'Recibida - Sin leer'),
        ('REVISION', 'En Revisión'),
        ('CONTACTADO', 'Contacto Establecido'),
        ('FINALIZADA', 'Finalizada / Cerrada'),
    ]
    
    URGENCIAS = [
        ('BAJA', 'Baja (Planificable)'),
        ('MEDIA', 'Media (Próximos días)'),
        ('ALTA', 'Alta / Inmediata'),
    ]
    solicitante= [
        ('empresa', 'Empresa'),
        ('particular', 'Particular'),
        ('otro', 'Otro')
    ]
    tipo_solicitante= models.CharField(max_length=50, choices=solicitante, verbose_name="Tipo de Solicitante")
    nombre_solicitante = models.CharField(max_length=150, verbose_name="Nombre o Razón Social")
    telefono = models.CharField(max_length=50, verbose_name="Teléfono de Contacto")
    es_whatsapp = models.BooleanField(default=False, verbose_name="¿Es WhatsApp?")
    email = models.EmailField(verbose_name="Correo Electrónico")
    
    # Puede ser nulo si el usuario elige "No estoy seguro / Otro"
    curso_requerido = models.ForeignKey(Curso, on_delete=models.SET_NULL, null=True, blank=True, verbose_name="Especialidad Requerida")
    zona_trabajo = models.CharField(max_length=150, verbose_name="Zona del Trabajo")
    urgencia = models.CharField(max_length=20, choices=URGENCIAS, default='MEDIA', verbose_name="Nivel de Urgencia")
    descripcion_trabajo = models.TextField(verbose_name="Descripción del requerimiento")
    
    estado = models.CharField(max_length=20, choices=ESTADOS, default='NUEVA', verbose_name="Estado de la Solicitud")
    fecha_creacion = models.DateTimeField(auto_now_add=True, verbose_name="Fecha de Solicitud")
    notas_resolucion = models.TextField(blank=True, null=True, verbose_name="Notas de Resolución (Admin)")

    class Meta:
        verbose_name = "Solicitud de Profesional"
        verbose_name_plural = "Solicitudes de Profesionales"
        ordering = ['-fecha_creacion'] # Las más nuevas aparecen primero

    def __str__(self):
        return f"Solicitud de {self.tipo_solicitante} {self.nombre_solicitante} ({self.get_estado_display()})"


class ProfesionalIndependiente(models.Model):
    ESTADO_CHOICES = [
        ('PENDIENTE', 'Pendiente'),
        ('APROBADO', 'Aprobado'),
        ('RECHAZADO', 'Rechazado'),
    ]

    nombre_completo = models.CharField(max_length=150)
    dni = models.CharField(max_length=20, unique=True)
    telefono = models.CharField(max_length=50)
    email = models.EmailField()
    matricula = models.CharField(max_length=100, blank=True, null=True)
    redes_sociales = models.TextField(blank=True, null=True)
    descripcion_perfil = models.TextField()
    cursos_realizados = models.CharField(max_length=255, verbose_name="Cursos Realizados", help_text="Ej: Electricista Industrial, Herrero")
    cv_archivo = models.FileField(upload_to='cv_profesionales/', blank=True, null=True)
    foto_certificado = models.ImageField(upload_to='certificados_autonomos/', blank=True, null=True, verbose_name="Foto del Certificado (Opcional)")
    estado_aprobacion = models.CharField(
        max_length=20, 
        choices=ESTADO_CHOICES, 
        default='PENDIENTE'
    )
    fecha_registro = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = 'Profesional Independiente'
        verbose_name_plural = 'Profesionales Independientes'

    def __str__(self):
        return f"{self.nombre_completo} - DNI: {self.dni}"