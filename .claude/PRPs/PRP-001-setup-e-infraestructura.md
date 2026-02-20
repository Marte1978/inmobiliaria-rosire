# PRP-001: Setup e Infraestructura Base

> **Estado**: COMPLETADO ✅
> **Fecha**: 2026-02-20
> **Proyecto**: Inmobiliaria Rosire

---

## Objetivo

Inicializar el proyecto Next.js 16 con Supabase, construir todas las páginas principales del sitio inmobiliario (auth, dashboard, propiedades, agentes, contacto) y portarla infraestructura SaaS Factory V3.

## Por Qué

| Problema | Solución |
|----------|----------|
| Cliente necesita sitio inmobiliario profesional | Next.js 16 + Supabase full-stack |
| Agentes necesitan portal con leads | Dashboard protegido por auth |
| Visitantes necesitan ver y filtrar propiedades | Listado con filtros + detalle |
| Necesita captura de leads | Formulario → n8n webhook |

**Valor de negocio**: Presencia digital profesional + sistema de captura de leads automatizado vía n8n.

## Qué

### Criterios de Éxito
- [x] `npm run build` exitoso (exit code 0)
- [x] Auth completo: registro → login → dashboard (protegido)
- [x] Listado de propiedades con filtros
- [x] Detalle de propiedad con formulario de contacto
- [x] Página de agentes
- [x] Página de contacto → n8n webhook
- [x] SaaS Factory V3 portada al proyecto

---

## Blueprint (Fases Completadas)

### Fase 1: Autenticación ✅
**Objetivo**: Login, register, dashboard protegido con Supabase
**Archivos creados**:
- `src/utils/supabase/server.ts` — cliente servidor
- `src/proxy.ts` — protección de rutas (Next.js 16)
- `src/app/auth/login/page.tsx`
- `src/components/auth/LoginForm.tsx`
- `src/app/auth/callback/route.ts`
- `src/app/dashboard/page.tsx`

### Fase 2: Propiedades ✅
**Objetivo**: Listado con filtros + detalle completo
**Archivos creados**:
- `src/app/propiedades/page.tsx`
- `src/app/propiedades/[id]/page.tsx`

### Fase 3: Páginas Secundarias ✅
**Objetivo**: Agentes + Contacto
**Archivos creados**:
- `src/app/agentes/page.tsx`
- `src/app/contacto/page.tsx`

### Fase 4: Portación SaaS Factory V3 ✅
**Objetivo**: GEMINI.md + .claude/PRPs/ en el proyecto
**Archivos creados**:
- `GEMINI.md` — reglas de la fábrica adaptadas al proyecto
- `.claude/PRPs/prp-base.md` — template
- `.claude/PRPs/PRP-001-setup-e-infraestructura.md` — este archivo
- `.claude/prompts/bucle-agentico-blueprint.md` — proceso agéntico

---

## 🧠 Aprendizajes (Auto-Blindaje)

### 2026-02-20: Next.js 16 depreca `middleware.ts`
- **Error**: Warning en build — `middleware` file convention is deprecated
- **Fix**: Renombrar `src/middleware.ts` → `src/proxy.ts` y exportar `export async function proxy()`
- **Aplicar en**: TODO proyecto New Next.js 16+

### 2026-02-20: Supabase falla en prerender estático
- **Error**: Build falla con `@supabase/ssr: Your project's URL and API key are required`
- **Fix**: `export const dynamic = 'force-dynamic'` en pages que usen `createClient()` de Supabase
- **Aplicar en**: `/auth/login`, `/auth/register`, `/dashboard`, cualquier server page con Supabase

---

## Gotchas

- [x] Supabase necesita env vars: `NEXT_PUBLIC_SUPABASE_URL` + `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- [x] Next.js 16 usa `proxy.ts` no `middleware.ts`
- [x] Pages con Supabase necesitan `dynamic = 'force-dynamic'`
- [ ] RLS en Supabase debe configurarse para tablas reales de propiedades y leads
