from django.db import models

class Slider(models.Model):
    imagen_desktop = models.ImageField(upload_to='sliders/', help_text="Tamaño recomendado: 1920x650 píxeles")
    imagen_mobile = models.ImageField(upload_to='sliders/', help_text="Tamaño recomendado: 800x800 píxeles")
    texto = models.TextField(help_text="Texto a mostrar sobre el slider")
    activa = models.BooleanField(default=True)
    fecha_creacion = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Slider"
        verbose_name_plural = "Sliders"
        ordering = ['-fecha_creacion']

    def __str__(self):
        return f"Slider: {self.texto[:30]}..."


class Empresa(models.Model):
    nombre = models.CharField(max_length=150, verbose_name="Nombre de la Empresa")
    logo = models.ImageField(upload_to='logos_empresas/', help_text="Logo de la empresa (PNG transparente recomendado)", verbose_name="Logo")
    activa = models.BooleanField(default=True, verbose_name="¿Activa?")
    orden = models.PositiveIntegerField(default=0, verbose_name="Orden de aparición", help_text="Número menor aparece primero")

    class Meta:
        verbose_name = "Empresa"
        verbose_name_plural = "Empresas"
        ordering = ['orden', 'nombre']

    def __str__(self):
        return self.nombre


class InteresEmpresa(models.Model):
    RUBRO_CHOICES = [
        ('agropecuario', 'Agropecuario / Rural'),
        ('construccion', 'Construcción / Obra'),
        ('gastronomia', 'Gastronomía / Hotelería'),
        ('industria', 'Industria / Manufactura'),
        ('comercio', 'Comercio / Ventas'),
        ('tecnologia', 'Tecnología / Sistemas'),
        ('salud', 'Salud / Cuidado personal'),
        ('educacion', 'Educación / Capacitación'),
        ('logistica', 'Logística / Transporte'),
        ('otro', 'Otro'),
    ]

    CANTIDAD_CHOICES = [
        ('1', '1 persona'),
        ('2-5', '2 a 5 personas'),
        ('6-10', '6 a 10 personas'),
        ('mas10', 'Más de 10 personas'),
    ]

    URGENCIA_CHOICES = [
        ('inmediata', 'Inmediata (ya lo necesito)'),
        ('proximos_meses', 'En los próximos 3 a 6 meses'),
        ('planificacion', 'Es una planificación a largo plazo'),
    ]

    # Datos de la empresa
    nombre_empresa = models.CharField(max_length=200, verbose_name="Nombre de la empresa / organización")
    rubro = models.CharField(max_length=50, choices=RUBRO_CHOICES, verbose_name="Rubro o sector")
    localidad = models.CharField(max_length=150, verbose_name="Localidad / Zona")

    # Datos de contacto
    nombre_contacto = models.CharField(max_length=150, verbose_name="Nombre del responsable")
    telefono = models.CharField(max_length=50, verbose_name="Teléfono / WhatsApp")
    email = models.EmailField(verbose_name="Correo electrónico")

    # Perfil profesional buscado
    perfil_buscado = models.CharField(max_length=250, verbose_name="¿Qué perfil profesional necesita?",
        help_text="Ej: Electricista, Cocinero, Operador de PC, etc.")
    descripcion_tareas = models.TextField(verbose_name="Descripción de tareas y responsabilidades")
    cantidad_personas = models.CharField(max_length=10, choices=CANTIDAD_CHOICES, verbose_name="Cantidad de personas requeridas")
    urgencia = models.CharField(max_length=20, choices=URGENCIA_CHOICES, default='proximos_meses', verbose_name="Urgencia")

    # Condiciones laborales
    modalidad = models.CharField(max_length=200, blank=True, null=True,
        verbose_name="Modalidad de contratación",
        help_text="Ej: Relación de dependencia, por hora, temporario, etc.")
    condiciones_adicionales = models.TextField(blank=True, null=True,
        verbose_name="Requisitos o condiciones adicionales")

    # Metadatos
    leido = models.BooleanField(default=False, verbose_name="¿Leído?")
    fecha_envio = models.DateTimeField(auto_now_add=True, verbose_name="Fecha de envío")
    notas_internas = models.TextField(blank=True, null=True, verbose_name="Notas internas (solo admins)")

    class Meta:
        verbose_name = "Interés de Empresa"
        verbose_name_plural = "Intereses de Empresas"
        ordering = ['-fecha_envio']

    def __str__(self):
        return f"{self.nombre_empresa} — {self.perfil_buscado} ({self.fecha_envio.strftime('%d/%m/%Y')})"
