# PRP-002: Propiedades con Datos Reales de Supabase

> **Estado**: COMPLETADO ✅
> **Fecha**: 2026-02-20
> **Proyecto**: Inmobiliaria Rosire

---

## Objetivo

Conectar las páginas de propiedades a una base de datos real en Supabase, implementar filtros funcionales en el cliente, refactorizar hacia arquitectura Feature-First del GEMINI.md, y agregar la página `/nosotros` que falta en el Navbar.

## Por Qué

| Problema | Solución |
|----------|----------|
| Propiedades son mock data hardcodeada | Tabla `properties` en Supabase con RLS |
| Filtros de búsqueda no hacen nada | Filtros client-side con `useState` + URL params |
| Código no sigue Feature-First | Mover lógica a `src/features/properties/` |
| Navbar tiene "Nosotros" pero la ruta `/nosotros` no existe | Crear página `/nosotros` |
| Dashboard muestra stats mockeadas | Conectar stats reales desde Supabase |

**Valor de negocio**: El cliente puede agregar/editar propiedades desde Supabase Dashboard sin tocar código. Los agentes ven leads reales en su dashboard.

## Qué

### Criterios de Éxito
- [ ] Tabla `properties` en Supabase con RLS público para leer
- [ ] `/propiedades` carga datos reales desde Supabase
- [ ] Filtros de tipo, precio y búsqueda por texto funcionan
- [ ] `/propiedades/[id]` carga detalle real por slug/id
- [ ] Dashboard muestra conteo real de propiedades
- [ ] `/nosotros` existe y carga sin 404
- [ ] `npm run build` sigue exitoso

### Comportamiento Esperado (Happy Path)
1. Admin agrega propiedad en Supabase Dashboard
2. Usuario va a `/propiedades` → ve la propiedad nueva
3. Filtra por "Venta" → solo ve propiedades en venta
4. Hace clic → ve el detalle completo
5. Agente va a `/dashboard` → ve el conteo correcto

---

## Contexto

### Estado Actual
- `src/app/propiedades/page.tsx` — array `properties` hardcodeado, filtros sin lógica
- `src/app/propiedades/[id]/page.tsx` — objeto `properties` hardcodeado, sin Supabase
- `src/app/dashboard/page.tsx` — stats mockeadas (`42`, `18`, `7`, `3`)
- `src/components/` — no tiene `features/` aún

### Arquitectura Propuesta (Feature-First)
```
src/
├── features/
│   └── properties/
│       ├── components/
│       │   ├── PropertyCard.tsx
│       │   └── PropertyFilters.tsx
│       ├── services/
│       │   └── properties.service.ts   ← fetch desde Supabase
│       └── types/
│           └── index.ts                ← Property interface
├── app/
│   ├── propiedades/
│   │   ├── page.tsx       ← usa features/properties
│   │   └── [id]/page.tsx
│   ├── nosotros/
│   │   └── page.tsx       ← nueva
│   └── dashboard/
│       └── page.tsx       ← stats reales
```

### Modelo de Datos (Supabase)
```sql
CREATE TABLE properties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  price NUMERIC NOT NULL,
  price_label TEXT,          -- "$850,000" o "$3,500/mes"
  type TEXT NOT NULL,        -- 'Venta' | 'Alquiler'
  location TEXT NOT NULL,
  beds INTEGER DEFAULT 0,
  baths NUMERIC DEFAULT 0,
  area TEXT,
  image_url TEXT,
  featured BOOLEAN DEFAULT false,
  agent_name TEXT,
  agent_phone TEXT,
  agent_photo_url TEXT,
  amenities TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS: público para leer
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Propiedades públicas" ON properties
  FOR SELECT TO anon, authenticated USING (true);
```

---

## Blueprint (Assembly Line)

> Solo FASES — subtareas se generan al entrar a cada fase

### Fase 1: Base de Datos y Servicio
**Objetivo**: Tabla `properties` en Supabase con datos reales + servicio TypeScript
**Validación**: `SELECT * FROM properties` retorna datos en Supabase Dashboard

### Fase 2: Feature-First — Properties
**Objetivo**: `src/features/properties/` con types, service y componentes
**Validación**: `PropertyCard` renderiza sin errores

### Fase 3: Páginas Conectadas
**Objetivo**: `/propiedades` y `/propiedades/[id]` leen desde Supabase, filtros funcionales
**Validación**: Cambiar tipo en filtro actualiza la lista

### Fase 4: Dashboard Real + Nosotros
**Objetivo**: Stats del dashboard reales desde Supabase, página `/nosotros` creada
**Validación**: Dashboard muestra count correcto, `/nosotros` carga sin 404

### Fase 5: Validación Final
**Objetivo**: Build exitoso, sin regresiones
**Validación**:
- [ ] `npm run build` exitoso
- [ ] Filtros funcionan (tipo, precio, búsqueda texto)
- [ ] Datos reales visibles en `/propiedades`

---

## 🧠 Aprendizajes (Heredados de PRP-001)

### 2026-02-20: `dynamic = 'force-dynamic'` en páginas con Supabase
- **Fix**: Agregar `export const dynamic = 'force-dynamic'` a toda page que llame a Supabase
- **Aplicar en**: `/propiedades/page.tsx`, `/propiedades/[id]/page.tsx`, `/dashboard/page.tsx`

---

## Gotchas

- [ ] Supabase anon key solo tiene permisos que RLS permita — configurar policy correctamente
- [ ] `propiedades/[id]` usa async params en Next.js 16: `const { id } = await params`
- [ ] Filtros de precio necesitan convertir string a número para comparar
- [ ] Imágenes externas (Unsplash) deben estar en `next.config.ts` `images.domains`
