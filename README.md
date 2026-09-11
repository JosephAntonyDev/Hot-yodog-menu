# Hot Yo’dog · Menú digital

Web independiente en HTML y CSS. Sin instalación de dependencias, compilación ni servicios de Sites.

## GitHub

La raíz del repositorio es `hot-yodog-menu`, no `dist`. Ya está inicializado y conserva su historial. Crea un repositorio vacío en GitHub y ejecuta desde esta carpeta:

```bash
git add .
git commit -m "Preparar menú para Vercel"
git remote add origin https://github.com/TU_USUARIO/TU_REPOSITORIO.git
git push -u origin main
```

Sustituye la URL por la de tu repositorio. Actualmente no hay remotos configurados.

## Vercel

Importa el repositorio de GitHub con estas opciones:
- Root Directory: raíz del repositorio; no selecciones dist.
- Framework Preset: Other.
- Build Command: vacío, sin comando.
- Output Directory: dist.
- Sin variables de entorno ni instalación de dependencias.

El archivo vercel.json incluye esta configuración. Documentación: https://vercel.com/docs/builds/configure-a-build

## Editar

Contenido, precios y horario: dist/index.html.
Estilos responsive: dist/menu.css.
Logo, fuentes y licencias: dist/assets/.
Verificación opcional con Node: node verify.mjs.

La promoción no tiene fechas automáticas porque no se proporcionó la semana exacta de apertura. Actualiza o retira el bloque .opening cuando termine. Precios en MXN; no se inventaron teléfono, dirección ni costo de envío.

## Diseños para redes

La carta permite alternar Clásico / Rojo y blanco, y descargar ambos PNG en 1080 × 1920 desde la sección de imágenes. Los PNG están en `dist/downloads`, listos para Vercel; no se generan en el navegador ni requieren servicios externos.

Si cambian productos o precios, regenerar las imágenes con `node generate-social.mjs` antes de subir. Este generador local reutiliza `sharp`, `opentype.js` y el trazador tipográfico del proyecto hermano `hot-yo'dog_landing`; no se necesitan para servir la web. Extrae productos del HTML; al cambiar promoción u horario hay que actualizar también el generador. No hay publicación automática.

## Dirección para el QR

Usa la dirección definitiva de Vercel o tu dominio, accesible sin iniciar sesión. No uses localhost ni la anterior dirección privada de Sites. Conservando la URL, puedes editar el menú sin reimprimir el QR.

## Migración

La configuración local de Sites fue retirada. Se conserva el historial principal, sin remotos de Sites. El Git vacío dentro de dist queda respaldado fuera del proyecto en la carpeta hermana hot-yodog-menu-dist-git-backup. La publicación privada anterior no se elimina automáticamente y no es una dependencia del menú.
