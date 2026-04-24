# Requirements Document

## Introduction

Este documento define los requisitos para construir y desplegar un sitio web de portfolio profesional para Miguel Romero, Senior Solutions Architect especializado en AWS. El sitio será construido con el framework Hugo usando el template hugo-celadon y desplegado como GitHub Pages. El objetivo es presentar de forma clara y profesional la experiencia, habilidades, certificaciones y proyectos del usuario para audiencias técnicas y de negocio.

## Glossary

- **Site**: El sitio web de portfolio profesional desplegado en GitHub Pages.
- **Hugo**: Framework de generación de sitios estáticos usado para construir el Site.
- **hugo-celadon**: Template de Hugo (https://github.com/Yajie-Xu/hugo-celadon) usado como base visual del Site.
- **GitHub Pages**: Servicio de hosting estático de GitHub donde se desplegará el Site.
- **GitHub Actions**: Sistema de CI/CD de GitHub usado para automatizar el build y despliegue del Site.
- **Content_File**: Archivo Markdown dentro de la estructura de Hugo que representa una sección o página del Site.
- **Config_File**: Archivo de configuración principal de Hugo (`hugo.toml` o `config.toml`) que controla el comportamiento global del Site.
- **Static_Asset**: Imagen, ícono, fuente u otro recurso estático servido directamente por el Site.
- **Section**: Área temática del Site (About, Experience, Skills, Certifications, Education, Contact).
- **Deployment_Pipeline**: Workflow de GitHub Actions que construye y publica el Site en GitHub Pages.

---

## Requirements

### Requirement 1: Configuración del proyecto Hugo con hugo-celadon

**User Story:** Como propietario del portfolio, quiero que el proyecto Hugo esté correctamente configurado con el template hugo-celadon, para que el Site tenga una base técnica sólida y reproducible.

#### Acceptance Criteria

1. THE Site SHALL estar estructurado como un proyecto Hugo válido con los directorios estándar: `content/`, `static/`, `themes/`, `layouts/` y el Config_File en la raíz.
2. THE Config_File SHALL incluir el template hugo-celadon como tema activo mediante la propiedad `theme = "hugo-celadon"`.
3. THE Config_File SHALL definir `baseURL` apuntando al dominio de GitHub Pages del usuario (`https://<username>.github.io/<repo>/`).
4. THE Config_File SHALL definir el idioma principal del Site como inglés (`languageCode = "en-us"`).
5. WHEN el comando `hugo` es ejecutado en la raíz del proyecto, THE Site SHALL generar el directorio `public/` con todos los archivos HTML, CSS y Static_Assets sin errores.
6. IF el template hugo-celadon no está presente en el directorio `themes/`, THEN THE Config_File SHALL referenciar el tema como submódulo de Git apuntando a `https://github.com/Yajie-Xu/hugo-celadon`.

---

### Requirement 2: Sección About / Perfil profesional

**User Story:** Como visitante del Site, quiero ver un resumen profesional claro de Miguel Romero, para que pueda entender rápidamente su perfil y propuesta de valor.

#### Acceptance Criteria

1. THE Site SHALL mostrar una sección "About" visible en la página principal que incluya el nombre completo "Miguel Romero" y el título profesional "Senior Solutions Architect".
2. THE Site SHALL mostrar en la sección About un resumen profesional que describa la especialización en transformación cloud, arquitectura AWS, IA generativa e ingeniería de datos.
3. THE Site SHALL mostrar en la sección About la ubicación "Bogotá, Colombia".
4. THE Site SHALL mostrar en la sección About un enlace al perfil de LinkedIn `https://www.linkedin.com/in/miguelromerog/`.
5. THE Site SHALL mostrar en la sección About un enlace de contacto por email a `miguel.romerog@outlook.com`.
6. WHERE una foto de perfil es proporcionada como Static_Asset, THE Site SHALL mostrar la foto en la sección About.

---

### Requirement 3: Sección de Experiencia Profesional

**User Story:** Como reclutador o cliente potencial, quiero ver el historial de experiencia laboral de Miguel ordenado cronológicamente, para que pueda evaluar su trayectoria profesional.

#### Acceptance Criteria

1. THE Site SHALL mostrar una sección "Experience" que liste todas las posiciones laborales en orden cronológico inverso (más reciente primero).
2. WHEN una posición laboral es renderizada, THE Site SHALL mostrar el título del cargo, nombre de la empresa, período de tiempo y una lista de responsabilidades y logros para cada posición.
3. THE Site SHALL incluir las siguientes posiciones en la sección Experience:
   - Solutions Architect | Amazon Web Services | Ago 2022 – Presente
   - Big Data Engineer | 4Strategies Technology | Ene 2022 – Jul 2022
   - AWS Cloud Architect and Tech Lead | Cencosud | Jul 2017 – Ene 2022
   - IT Consultant | Hard Tech | Nov 2015 – Jul 2017
4. WHEN una posición laboral es la posición actual, THE Site SHALL indicar "Present" o "Presente" como fecha de fin en lugar de una fecha específica.
5. THE Site SHALL renderizar cada posición laboral desde un Content_File Markdown independiente dentro de la sección `content/experience/`.

---

### Requirement 4: Sección de Habilidades Técnicas

**User Story:** Como visitante técnico, quiero ver las habilidades y tecnologías de Miguel organizadas por categoría, para que pueda identificar rápidamente su stack tecnológico y áreas de expertise.

#### Acceptance Criteria

1. THE Site SHALL mostrar una sección "Skills" que presente las habilidades técnicas agrupadas por categoría.
2. THE Site SHALL incluir en la sección Skills las siguientes categorías con sus habilidades correspondientes:
   - Cloud Architecture: AWS Cloud Architecture, Migration & Modernization, SaaS Solutions
   - Artificial Intelligence: Generative AI, AI Practitioner
   - Data: Data Engineering, Data Lakes, Data Warehousing
   - Strategy: Enterprise Architecture, Digital Transformation
3. THE Site SHALL renderizar las habilidades de forma visualmente diferenciada (etiquetas, badges o lista estructurada) para facilitar el escaneo visual.
4. WHEN la sección Skills es renderizada, THE Site SHALL mostrar todas las habilidades definidas en el Config_File o en el Content_File correspondiente sin omitir ninguna.

---

### Requirement 5: Sección de Certificaciones

**User Story:** Como visitante del Site, quiero ver las certificaciones profesionales de Miguel con sus fechas de obtención, para que pueda verificar sus credenciales técnicas.

#### Acceptance Criteria

1. THE Site SHALL mostrar una sección "Certifications" que liste todas las certificaciones profesionales activas.
2. WHEN una certificación es renderizada, THE Site SHALL mostrar el nombre completo de la certificación y el año de obtención.
3. THE Site SHALL incluir las siguientes certificaciones en la sección Certifications:
   - AWS Certified AI Practitioner (2025)
   - AWS Generative AI Technical Intermediate (2025)
   - AWS Industry Financial Services Foundational (2025)
   - AWS Industry Healthcare Intermediate (2025)
   - AWS Certified Security – Specialty (2023)
   - AWS Certified Developer – Associate (2023)
   - AWS Certified Solutions Architect – Associate (2022)
4. THE Site SHALL renderizar las certificaciones en orden cronológico inverso (más reciente primero).

---

### Requirement 6: Sección de Educación

**User Story:** Como visitante del Site, quiero ver la formación académica de Miguel, para que pueda evaluar su base educativa junto con su experiencia práctica.

#### Acceptance Criteria

1. THE Site SHALL mostrar una sección "Education" que liste los títulos académicos obtenidos.
2. WHEN un título académico es renderizado, THE Site SHALL mostrar el nombre del grado, la institución educativa y el año de graduación.
3. THE Site SHALL incluir los siguientes títulos en la sección Education:
   - Master's Degree en Strategic Management in Information Technology – Universidad Internacional Iberoamericana (2020)
   - Electronic Engineering – Universidad del Magdalena (2015)
4. THE Site SHALL renderizar los títulos académicos en orden cronológico inverso (más reciente primero).

---

### Requirement 7: Sección de Idiomas

**User Story:** Como visitante internacional, quiero ver los idiomas que habla Miguel con su nivel de competencia, para que pueda evaluar su capacidad de comunicación en proyectos globales.

#### Acceptance Criteria

1. THE Site SHALL mostrar una sección "Languages" o incluir los idiomas dentro de la sección Skills/About que liste los idiomas con su nivel de competencia.
2. THE Site SHALL incluir los siguientes idiomas con sus niveles:
   - Español – Nativo
   - Inglés – B2
   - Portugués – Técnico-Intermedio
3. WHEN un idioma es renderizado, THE Site SHALL mostrar el nombre del idioma y el nivel de competencia correspondiente.

---

### Requirement 8: Sección de Contacto

**User Story:** Como visitante interesado, quiero poder contactar a Miguel fácilmente desde el Site, para que pueda iniciar una conversación profesional sin necesidad de buscar su información en otro lugar.

#### Acceptance Criteria

1. THE Site SHALL mostrar una sección "Contact" con los datos de contacto de Miguel Romero.
2. THE Site SHALL mostrar en la sección Contact el email `miguel.romerog@outlook.com` como enlace `mailto:` clickeable.
3. THE Site SHALL mostrar en la sección Contact el número de teléfono `+57 300 816 2990`.
4. THE Site SHALL mostrar en la sección Contact un enlace al perfil de LinkedIn `https://www.linkedin.com/in/miguelromerog/` que abra en una nueva pestaña del navegador.
5. IF un formulario de contacto no está disponible en el template hugo-celadon, THEN THE Site SHALL mostrar los datos de contacto directos como alternativa funcional.

---

### Requirement 9: Navegación y estructura del Site

**User Story:** Como visitante del Site, quiero poder navegar entre las secciones del portfolio de forma intuitiva, para que pueda encontrar la información que busco sin fricción.

#### Acceptance Criteria

1. THE Site SHALL mostrar un menú de navegación principal que incluya enlaces a todas las Sections: About, Experience, Skills, Certifications, Education y Contact.
2. WHEN un enlace del menú de navegación es activado, THE Site SHALL desplazar la vista a la Section correspondiente o navegar a la página correspondiente sin errores de enrutamiento.
3. THE Site SHALL ser navegable con teclado, permitiendo que los enlaces del menú sean accesibles mediante la tecla Tab.
4. THE Config_File SHALL definir las entradas del menú de navegación principal con sus rutas correspondientes.
5. THE Site SHALL mostrar el título "Miguel Romero – Solutions Architect" o equivalente en la pestaña del navegador (elemento `<title>` del HTML).

---

### Requirement 10: Despliegue automatizado en GitHub Pages

**User Story:** Como propietario del portfolio, quiero que el Site se despliegue automáticamente en GitHub Pages cada vez que hago un push a la rama principal, para que los cambios de contenido sean publicados sin intervención manual.

#### Acceptance Criteria

1. THE Deployment_Pipeline SHALL estar definido como un archivo de workflow de GitHub Actions en `.github/workflows/`.
2. WHEN un commit es pushed a la rama `main` del repositorio, THE Deployment_Pipeline SHALL ejecutar el build de Hugo y publicar el contenido del directorio `public/` en GitHub Pages.
3. THE Deployment_Pipeline SHALL usar la versión de Hugo especificada en el workflow para garantizar builds reproducibles.
4. IF el build de Hugo falla durante la ejecución del Deployment_Pipeline, THEN THE Deployment_Pipeline SHALL marcar el workflow como fallido y no publicar contenido desactualizado.
5. WHEN el Deployment_Pipeline completa exitosamente, THE Site SHALL estar accesible en la URL de GitHub Pages configurada en el Config_File dentro de los 5 minutos posteriores al push.
6. THE Deployment_Pipeline SHALL incluir el paso de inicialización de submódulos de Git para garantizar que el tema hugo-celadon esté disponible durante el build.

---

### Requirement 11: Rendimiento y accesibilidad del Site

**User Story:** Como visitante del Site, quiero que el portfolio cargue rápidamente y sea accesible desde cualquier dispositivo, para que pueda consultarlo desde desktop o móvil sin degradación de experiencia.

#### Acceptance Criteria

1. THE Site SHALL ser responsivo y adaptar su layout a pantallas de ancho mínimo de 320px y máximo de 1920px sin pérdida de contenido ni superposición de elementos.
2. WHEN el Site es accedido desde un dispositivo móvil, THE Site SHALL mostrar el menú de navegación en un formato adaptado al tamaño de pantalla (menú hamburguesa u equivalente).
3. THE Site SHALL generar únicamente archivos HTML estáticos, CSS y JavaScript durante el build de Hugo, sin requerir procesamiento server-side en tiempo de ejecución.
4. THE Site SHALL incluir metadatos Open Graph en el `<head>` de la página principal con título, descripción e imagen representativa para habilitar previsualizaciones en redes sociales.
5. WHEN un motor de búsqueda indexa el Site, THE Site SHALL exponer un archivo `sitemap.xml` generado automáticamente por Hugo en la raíz del Site.
