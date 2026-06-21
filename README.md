# NovaTours Perú - Documentación del Proyecto

Bienvenido a la documentación oficial de **NovaTours Perú**, una plataforma web moderna, rápida y optimizada para la promoción de destinos turísticos y experiencias en el Perú.

## 📌 Arquitectura del Proyecto

Este es un sitio web **estático** de alto rendimiento, sin necesidad de un backend tradicional. Se apoya fuertemente en el lado del cliente (Front-End) para ofrecer una experiencia fluida, y se sirve a través de un servidor web optimizado en la nube.

### Tecnologías Principales
*   **Estructura:** HTML5 Semántico.
*   **Estilos:** SCSS (Sass) compilado a CSS (Vanilla CSS, siguiendo la metodología BEM para modularidad).
*   **Interactividad:** JavaScript Vanilla (sin frameworks pesados como React o jQuery para mantener el peso al mínimo).
*   **Despliegue y Servidor:** Google Cloud Run, Cloud Build, Docker y Nginx.
*   **Rendimiento y SEO:** Imágenes responsivas (`srcset`), carga diferida asíncrona, Sitemap XML, `robots.txt` y `llms.txt` (Agentic Browsing).

---

## 📂 Estructura de Directorios

El proyecto está organizado de la siguiente manera:

```text
/tours
├── index.html              # Página de inicio (Landing Page principal)
├── experiencias.html       # Catálogo de experiencias turísticas
├── inspiracion.html        # Blog o historias inspiracionales
├── contacto.html           # Formulario de contacto
│
├── destinos/               # Carpeta con las páginas individuales de cada destino
│   ├── lima.html
│   ├── cusco.html
│   └── ... (arequipa, puno, loreto, etc.)
│
├── scss/                   # Código fuente de estilos en formato SASS
│   └── main.scss           # Archivo principal que importa todos los módulos SCSS
│
├── css/                    # Archivo final compilado (Generado por Node.js/Sass)
│   └── main.css            # Hoja de estilos de producción (Minificada y optimizada)
│
├── js/                     # Lógica de la aplicación
│   └── main.js             # Scripts para el carrusel, menú móvil, interacciones, etc.
│
├── Dockerfile              # Instrucciones para "empaquetar" el sitio en un contenedor
├── default.conf.template   # Configuración de Nginx (Gzip, Caché, Puertos)
├── sitemap.xml             # Mapa del sitio para rastreadores de Google (SEO)
├── robots.txt              # Reglas de indexación para bots de búsqueda
├── llms.txt                # Documento estandarizado para Inteligencias Artificiales
└── package.json            # Dependencias de Node.js (principalmente compilador SASS)
```

---

## 🚀 Flujo de Trabajo y Despliegue (CI/CD)

El sitio utiliza **Despliegue Continuo (Continuous Deployment)** a través de Google Cloud Build hacia Google Cloud Run. El flujo funciona de forma 100% automatizada:

1. **Desarrollo Local:** 
   El desarrollador realiza cambios en los archivos (HTML, JS, o edita los archivos dentro de `scss/`).
2. **Control de Versiones (Git):** 
   Los cambios se guardan y se empujan (`git push`) a la rama `main` del repositorio en GitHub (`felipeostosb/novatours-peru`).
3. **Google Cloud Build (El "Obrero"):** 
   Google Cloud detecta automáticamente el cambio en GitHub y lee el archivo `Dockerfile`.
   *   **Etapa 1 (Builder):** Arranca un contenedor temporal con Node.js, instala la herramienta `sass`, y compila los estilos modernos de `scss/` hacia `css/main.css`.
   *   **Etapa 2 (Servidor Web):** Crea un servidor Nginx ultraligero (versión Alpine), copia los archivos HTML, JS y el CSS recién compilado. Reemplaza la configuración de Nginx con nuestro `default.conf.template`.
4. **Google Cloud Run (Producción):** 
   El contenedor finalizado es desplegado instantáneamente en Google Cloud Run (Región: Iowa `us-central1`), listo para recibir miles de visitas simultáneas con auto-escalado.

---

## ⚡ Optimizaciones Clave (Core Web Vitals)

El proyecto ha sido rigurosamente ajustado para alcanzar puntuaciones perfectas en **Google PageSpeed Insights**, aplicando estrategias avanzadas:

*   **Responsive Images & DPR Aware:** Las imágenes principales utilizan atributos `srcset` y `sizes`. Esto significa que si el usuario visita la web desde un teléfono 4G, no descarga la imagen de 1400px (que pesa más de 300KB), sino una versión comprimida y ajustada a la densidad de píxeles (DPR) de su pantalla.
*   **Eliminación de Render-Blocking:** Fuentes de Google Fonts, FontAwesome y Fontsource se cargan mediante un truco asíncrono (`media="print" onload="this.media='all'"`), impidiendo que la pantalla se quede en blanco mientras las letras o íconos descargan en redes lentas.
*   **Compresión Gzip (Nginx):** El código HTML, CSS y JS se "comprime en zip" al vuelo en el servidor Nginx, logrando que el navegador de los usuarios descargue archivos hasta un 80% más livianos.
*   **Políticas de Caché Agresivas:** Nginx instruye al navegador de los visitantes a guardar las imágenes y el CSS (`Cache-Control`) durante 1 mes en su memoria interna, haciendo que las visitas recurrentes carguen en milisegundos.
*   **LCP Priorization:** Las primeras imágenes visibles del Hero tienen el atributo `fetchpriority="high"`, mientras que todas las imágenes secundarias (las tarjetas de destinos) usan `loading="lazy"` para no consumir datos innecesarios hasta que el usuario hace scroll hacia abajo.

---

## 🛠 Comandos Útiles Locales

Si deseas trabajar de forma local en tu computadora:

*   **Instalar dependencias:** `npm install` (Solo necesario la primera vez, instalará el compilador SASS).
*   **Compilar SASS en tiempo real:** `npm run dev` (Quedará escuchando los cambios en los archivos `.scss` y generará el `main.css` automáticamente al guardar).
*   **Compilar SASS para Producción:** `npm run build` (Minifica el CSS para que pese lo menos posible).

*(Nota: En producción, no es necesario ejecutar el build manualmente, el Dockerfile lo hace por ti en Google Cloud).*
