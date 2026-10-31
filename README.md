# Gestión de Transacciones — Landing Page

Sitio estático de una sola página para la **Actividad 4.2** de la asignatura
**Taller de Base de Datos** (Tecnológico Nacional de México).

Contenido: propiedades ACID, control de concurrencia y anomalías, protocolo 2PL,
niveles de aislamiento con ejemplos SQL, recuperación ante fallos y referencias
en formato APA 7.ª edición.

---

## Estructura del proyecto

```
.
├── index.html          Documento principal (sin estilos ni scripts embebidos)
├── css/
│   └── styles.css      Tokens de diseño, componentes, responsive e impresión
├── js/
│   └── main.js         Menú móvil, pestañas ACID, scroll-spy y botón superior
├── assets/
│   └── favicon.svg     Icono del sitio
├── respaldo/
│   └── ...             Versión monolítica original (no se publica)
├── .nojekyll           Evita el procesamiento de Jekyll en GitHub Pages
├── .gitignore
└── README.md
```

Todas las rutas son **relativas** (`./css/styles.css`), por lo que el sitio
funciona igual en local, en la raíz de un dominio o en un subdirectorio
`usuario.github.io/repositorio/`.

---

## Ejecutar en local

No requiere instalación ni compilación. Basta con abrir `index.html`:

```bash
# Opción 1: doble clic sobre index.html

# Opción 2: servidor local (recomendado, evita restricciones de file://)
python3 -m http.server 8000
# → http://localhost:8000
```

---

## Publicar en GitHub Pages

```bash
git init
git add .
git commit -m "Landing page Unidad 4: Gestión de Transacciones"
git branch -M main
git remote add origin https://github.com/USUARIO/REPOSITORIO.git
git push -u origin main
```

Después, en el repositorio:

1. **Settings → Pages**
2. *Source*: `Deploy from a branch`
3. *Branch*: `main` · *Folder*: `/ (root)`
4. **Save** y esperar 1–2 minutos.

La URL pública queda así:

```
https://USUARIO.github.io/REPOSITORIO/
```

> En la primera publicación puede tardar unos minutos en aparecer. Si muestra
> error 404, revisa que exista `index.html` en la raíz de la rama `main`.

---

## ⚠️ Pendiente antes de entregar: actualizar la URL

La hoja de portada contiene un marcador de posición que **debe sustituirse por
la URL real**. Aparece en **seis lugares** de `index.html` (búscalos con
`Ctrl+F` → `TU-USUARIO`):

| Línea | Elemento | Qué cambiar |
| ----- | -------- | ----------- |
| `<link rel="canonical">` | SEO | URL completa |
| `og:url` | Open Graph | URL completa |
| `.portada__url` → `href` | Enlace de la portada | URL completa |
| `.portada__url-value` | Texto visible de la portada | URL completa |

También hay que completar en la portada:

```html
<dd class="placeholder">________</dd>   <!-- Matrícula -->
<dd class="placeholder">________</dd>   <!-- Docente -->
```

---

## Generar el PDF de evidencia

1. Abre el sitio publicado en Chrome o Edge (o `index.html` en local).
2. `Ctrl + P` (Windows/Linux) o `Cmd + P` (macOS).
3. Destino: **Guardar como PDF**.
4. Tamaño de papel: **A4** · Márgenes: **Predeterminado**.
5. Activa **«Gráficos de fondo»** (obligatorio: sin esta opción se pierden la
   portada y los colores de acento).
6. Desactiva encabezados y pies de página del navegador.
7. Guarda con el nombre exigido:

```
Leyva-Reyes-Angel-Daniel-Actividad 4.2.pdf
```

La hoja de estilos incluye reglas `@media print` que fuerzan la portada en su
propia página, imprimen **los cuatro paneles ACID** (aunque en pantalla sean
pestañas) y ocultan la navegación y el botón «volver arriba».

---

## Accesibilidad y buenas prácticas aplicadas

- HTML5 semántico con un único `<h1>` y jerarquía de encabezados coherente.
- Enlace «saltar al contenido» y estilos `:focus-visible` en todos los controles.
- Pestañas ACID con patrón ARIA (`role="tablist"`, `aria-selected`) y navegación
  con flechas, `Home` y `End`.
- Menú móvil con `aria-expanded` / `aria-controls`; se cierra con `Esc` y al
  hacer clic fuera.
- Respeto de `prefers-reduced-motion: reduce`.
- Sin dependencias de frameworks: iconos en SVG inline, sin CDN de JavaScript.
- Contraste de texto conforme a WCAG AA sobre el fondo oscuro.
- Metadatos `description`, Open Graph, `canonical` y favicon.
- Hoja de impresión dedicada para la entrega en PDF.

---

## Referencias

Las citas del contenido y la lista final siguen el formato **APA 7.ª edición**:

- Coronel, C., & Morris, S. (2019). *Database systems: Design, implementation, and management* (13.ª ed.). Cengage Learning.
- Elmasri, R., & Navathe, S. B. (2016). *Fundamentals of database systems* (7.ª ed.). Pearson.
- PostgreSQL Global Development Group. (2024). *PostgreSQL 16 documentation: Transactions*.
- Silberschatz, A., Korth, H. F., & Sudarshan, S. (2020). *Database system concepts* (7.ª ed.). McGraw-Hill Education.

---

**Autor:** Angel Daniel Leyva Reyes
**Asignatura:** Taller de Base de Datos · Ingeniería en Sistemas Computacionales
**Actividad:** 4.2 — Gestión de Transacciones
