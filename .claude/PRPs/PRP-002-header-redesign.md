# Rediseño de Header y Hero Section

Este plan detalla el rediseño de la sección principal (Hero) de la página de inicio para mejorar el impacto visual y la profesionalidad de la Inmobiliaria Rosire, utilizando nuevas imágenes generadas y ajustes en la interfaz.

## Proposed Changes

### UI & UX

#### [MODIFY] [page.tsx](file:///c:/Users/willy/pagina%20inmobiliaria/inmobiliaria-rosire/src/app/page.tsx)

- Reemplazar la imagen de fondo del Hero con una nueva imagen premium generada por IA.
- Actualizar el título y subtítulo para una mejor conversión.
- Ajustar los efectos de Framer Motion para una entrada más fluida y elegante.
- Reemplazar las imágenes de las propiedades destacadas (mock data) con imágenes más realistas y atractivas.

#### [MODIFY] [Navbar.tsx](file:///c:/Users/willy/pagina%20inmobiliaria/inmobiliaria-rosire/src/components/Navbar.tsx)

- Revisar consistencia visual con el nuevo Hero.
- Asegurar que el logo y los enlaces tengan buen contraste sobre la nueva imagen.

## Verification Plan

### Manual Verification

- Verificar visualmente los cambios en el entorno local.
- Confirmar que las imágenes cargan correctamente y tienen buena calidad.
- Probar la responsividad en dispositivos móviles.
- **Paso crítico**: Realizar un commit y push a Git para disparar el despluegue en Vercel y confirmar que los cambios se reflejan en producción.

### Automated Tests

- Ejecutar `npm run build` para asegurar que los cambios no rompen la compilación de Next.js.
