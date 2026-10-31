# Gestión de Transacciones — Landing Page

Sitio estático de una sola página para la **Actividad 4.2** de la asignatura
**Taller de Base de Datos** (Tecnológico Nacional de México).

Contenido: propiedades ACID, control de concurrencia y anomalías, protocolo 2PL,
niveles de aislamiento con ejemplos SQL, recuperación ante fallos y referencias
en formato APA 7.ª edición.

**Sitio publicado:** <https://yel-LDV.github.io/ladingpage/>

---

## Estructura del proyecto

```
.
├── index.html            Documento principal (sin estilos ni scripts embebidos)
├── css/
│   └── styles.css        Tokens, componentes, responsive e impresión
├── js/
│   └── main.js           Menú móvil, pestañas ACID, scroll-spy y portada
├── data/
│   └── portada.json      ★ Datos de la portada (nombre, matrícula, URL…)
├── assets/
│   └── favicon.svg
├── respaldo/
│   └── ...               Versión monolítica original (no se publica)
├── .nojekyll             Evita el procesamiento de Jekyll en GitHub Pages
├── .gitignore
└── README.md
```

Todas las rutas son **relativas**, así que el sitio funciona igual en la raíz de
un dominio o en un subdirectorio `usuario.github.io/repositorio/`.

---

## ★ Configuración de la portada

Toda la información académica de la hoja de portada vive en un solo archivo:

**`data/portada.json`**

```json
{
  "institucion": "Tecnológico Nacional de México",
  "programa": "Ingeniería en Sistemas Computacionales",
  "materia": "Taller de Base de Datos",
  "titulo": "Gestión de Transacciones",
  "actividad": "Actividad 4.2 · Unidad 4",
  "alumno": "Angel Daniel Leyva Reyes",
  "matricula": "________",
  "docente": "________",
  "fecha": "2026-10-30",
  "fechaTexto": "30 de octubre de 2026",
  "url": "https://yel-LDV.github.io/ladingpage/",
  "etiquetaUrl": "Landing Page publicada en GitHub Pages"
}
```

| Campo | Dónde aparece |
| ----- | ------------- |
| `institucion` | Portada, sobre el título |
| `programa` | Portada y tarjeta de autor del inicio |
| `materia` | Portada |
| `titulo` | Título grande de la portada (se parte en dos líneas automáticamente) |
| `actividad` | Portada y pie de página |
| `alumno` | Portada, tarjeta de autor y pie de página |
| `matricula` | Portada |
| `docente` | Portada |
| `fecha` / `fechaTexto` | Portada (`fecha` va en formato ISO para el atributo `datetime`) |
| `url` | Enlace de la portada + `<link rel="canonical">` + `og:url` |
| `etiquetaUrl` | Texto pequeño sobre la URL |

Reglas de edición:

- **Solo se edita este archivo.** No hace falta tocar `index.html`.
- Las comillas dobles son obligatorias. Si un valor lleva comillas dentro,
  escríbelas como `\"`.
- Las claves que empiezan con `_` son comentarios; el script las ignora.
- Si dejas `matricula` o `docente` con guiones bajos (`________`), se muestran
  en gris claro como campo pendiente.
- Si cambias el **nombre del repositorio** en GitHub, actualiza únicamente
  `url`. El resto de la página se ajusta solo.

> **Importante:** el JSON se lee con `fetch`, que los navegadores bloquean
> cuando la página se abre con doble clic (`file://`). En ese caso se muestran
> los valores escritos directamente en el HTML. Para previsualizar los cambios
> del JSON en local hay que servir la carpeta (ver abajo) o publicar en GitHub
> Pages.

---

## Ejecutar en local

```bash
# Recomendado: sirve la carpeta y respeta el JSON
python3 -m http.server 8000
# → http://localhost:8000

# Alternativa rápida: doble clic sobre index.html
# (funciona, pero usa los valores del HTML y no los del JSON)
```

---

## Publicar en GitHub Pages — paso a paso

### Paso 1 · Verifica que el repositorio exista

En <https://github.com/yel-LDV> debe existir un repositorio llamado
**`ladingpage`**. Si aún no lo tienes, créalo vacío (sin README, sin licencia,
sin `.gitignore`) desde **New repository**.

> Si el repositorio se llama distinto, la URL final cambia. En ese caso ajusta
> el campo `url` de `data/portada.json` y usa ese mismo nombre en el `remote`.

### Paso 2 · Conecta y sube el proyecto

El repositorio local ya está inicializado y con los cambios comprometidos.
Solo falta el remoto:

```bash
cd /home/angedl_/Proyectos/ladingpage

git remote add origin https://github.com/yel-LDV/ladingpage.git
git branch -M main
git push -u origin main
```

Si `remote add` responde `remote origin already exists`:

```bash
git remote set-url origin https://github.com/yel-LDV/ladingpage.git
git push -u origin main
```

### Paso 3 · Activa GitHub Pages

1. Abre el repositorio en GitHub.
2. Pestaña **Settings** (Configuración).
3. Menú lateral → **Pages**.
4. En *Build and deployment* → *Source*: **Deploy from a branch**.
5. *Branch*: **`main`** · *Folder*: **`/ (root)`**.
6. Pulsa **Save**.

### Paso 4 · Espera la publicación

GitHub tarda entre 30 segundos y 3 minutos. El progreso se ve en la misma
pantalla de **Pages** y en la pestaña **Actions**.

La URL quedará así:

```
https://yel-LDV.github.io/ladingpage/
```

### Paso 5 · Verifica

- Abre la URL en una ventana privada (evita caché).
- Comprueba que la portada muestra la URL correcta y tus datos.
- Si sale **404**, revisa que `index.html` esté en la raíz de la rama `main`
  y que el despliegue haya terminado en **Actions**.

### Paso 6 · Actualizaciones futuras

Cada `push` a `main` republica el sitio automáticamente:

```bash
git add .
git commit -m "Actualiza datos de la portada"
git push
```

---

## Generar el PDF de evidencia

1. Abre <https://yel-LDV.github.io/ladingpage/> en Chrome o Edge.
2. `Ctrl + P` (Windows/Linux) o `Cmd + P` (macOS).
3. Destino: **Guardar como PDF**.
4. Papel **A4**, márgenes **Predeterminado**.
5. Activa **«Gráficos de fondo»** — obligatorio, sin esto se pierden la portada
   y los colores de acento.
6. Desactiva encabezados y pies de página del navegador.
7. Guarda como:

```
Leyva-Reyes-Angel-Daniel-Actividad 4.2.pdf
```

Las reglas `@media print` fuerzan la portada en su propia página, imprimen
**los cuatro paneles ACID** (aunque en pantalla sean pestañas) y ocultan la
navegación y el botón «volver arriba».

---

## Accesibilidad y buenas prácticas aplicadas

- HTML5 semántico con un único `<h1>` y jerarquía de encabezados coherente.
- Enlace «saltar al contenido» y estilos `:focus-visible` en todos los controles.
- Pestañas ACID con patrón ARIA (`role="tablist"`, `aria-selected`) y navegación
  con flechas, `Home` y `End`.
- Menú móvil con `aria-expanded` / `aria-controls`; se cierra con `Esc` y al
  hacer clic fuera.
- Respeto de `prefers-reduced-motion: reduce`.
- Sin frameworks: iconos en SVG inline, sin CDN de JavaScript.
- Contraste de texto conforme a WCAG AA sobre el fondo oscuro.
- Metadatos `description`, Open Graph, `canonical` y favicon.
- Hoja de impresión dedicada para la entrega en PDF.

---

## Referencias

El contenido y la lista final siguen el formato **APA 7.ª edición**:

- Coronel, C., & Morris, S. (2019). *Database systems: Design, implementation, and management* (13.ª ed.). Cengage Learning.
- Elmasri, R., & Navathe, S. B. (2016). *Fundamentals of database systems* (7.ª ed.). Pearson.
- PostgreSQL Global Development Group. (2024). *PostgreSQL 16 documentation: Transactions*.
- Silberschatz, A., Korth, H. F., & Sudarshan, S. (2020). *Database system concepts* (7.ª ed.). McGraw-Hill Education.

---

**Autor:** Angel Daniel Leyva Reyes
**Asignatura:** Taller de Base de Datos · Ingeniería en Sistemas Computacionales
**Actividad:** 4.2 — Gestión de Transacciones
