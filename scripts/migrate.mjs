/**
 * Script de migración para Inmobiliaria Rosire
 * Crea la tabla `properties` en Supabase y la puebla con datos de ejemplo
 * 
 * IMPORTANTE: Antes de correr, actualiza SUPABASE_URL con la URL correcta
 * del API de Supabase (Settings > API > Project URL en el Studio)
 * 
 * Cómo correr:
 *   node scripts/migrate.mjs
 */

// ==============================
// CARGAR VARIABLES DE .ENV.LOCAL
// ==============================
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const envPath = path.resolve(__dirname, '../.env.local')

if (fs.existsSync(envPath)) {
    const envFile = fs.readFileSync(envPath, 'utf8')
    envFile.split('\n').forEach(line => {
        const [key, value] = line.split('=')
        if (key && value) process.env[key.trim()] = value.trim()
    })
}

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
    console.error('❌ Error: Faltan variables en .env.local (NEXT_PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY)')
    process.exit(1)
}

const headers = {
    'apikey': SERVICE_ROLE_KEY,
    'Authorization': `Bearer ${SERVICE_ROLE_KEY}`,
    'Content-Type': 'application/json',
    'Prefer': 'return=minimal'
}

// ==============================
// 1. MIGRATION SQL
// ==============================
const MIGRATION_SQL = `
CREATE TABLE IF NOT EXISTS properties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  price NUMERIC NOT NULL DEFAULT 0,
  price_label TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('Venta', 'Alquiler')),
  location TEXT NOT NULL,
  beds INTEGER NOT NULL DEFAULT 0,
  baths NUMERIC NOT NULL DEFAULT 0,
  area TEXT,
  image_url TEXT,
  featured BOOLEAN NOT NULL DEFAULT false,
  agent_name TEXT,
  agent_phone TEXT,
  agent_email TEXT,
  agent_photo_url TEXT,
  amenities TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE properties ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'properties_public_select') THEN
    EXECUTE 'CREATE POLICY properties_public_select ON properties FOR SELECT TO anon, authenticated USING (true)';
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_properties_type ON properties (type);
CREATE INDEX IF NOT EXISTS idx_properties_price ON properties (price);
CREATE INDEX IF NOT EXISTS idx_properties_featured ON properties (featured);
CREATE INDEX IF NOT EXISTS idx_properties_created_at ON properties (created_at DESC);
`

// ==============================
// 2. SEED DATA
// ==============================
const properties = [
    {
        title: 'Villa de Lujo en Punta Cana',
        description: 'Impresionante villa frente al mar con acabados de primer nivel. Cocina gourmet, piscina privada con vista al mar y acceso directo a la playa.',
        price: 850000, price_label: '$850,000', type: 'Venta',
        location: 'Punta Cana, La Altagracia', beds: 5, baths: 6, area: '650 m²',
        image_url: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1600&auto=format&fit=crop',
        featured: true, agent_name: 'María Rosario', agent_phone: '+18095550101',
        agent_email: 'maria@inmobiliariarosire.com',
        agent_photo_url: 'https://ui-avatars.com/api/?name=Maria+Rosario&background=1e3a5f&color=fff&size=200',
        amenities: ['Piscina privada', 'Acceso a la playa', 'Cocina gourmet', 'Terraza panorámica', 'Seguridad 24/7', 'Estacionamiento x3'],
    },
    {
        title: 'Apartamento Moderno en Piantini',
        description: 'Elegante apartamento en el corazón financiero de Santo Domingo con balcón y vistas al skyline.',
        price: 285000, price_label: '$285,000', type: 'Venta',
        location: 'Piantini, Santo Domingo', beds: 3, baths: 3.5, area: '185 m²',
        image_url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1600&auto=format&fit=crop',
        featured: false, agent_name: 'Carlos Méndez', agent_phone: '+18095550202',
        agent_email: 'carlos@inmobiliariarosire.com',
        agent_photo_url: 'https://ui-avatars.com/api/?name=Carlos+Mendez&background=2563eb&color=fff&size=200',
        amenities: ['Piscina en azotea', 'Gimnasio', 'Lobby de lujo', 'Generador eléctrico', 'Estacionamiento x2'],
    },
    {
        title: 'Penthouse Exclusivo en Bella Vista',
        description: 'Espectacular penthouse de doble altura con vistas de 360° de Santo Domingo. Terraza privada y jacuzzi exterior.',
        price: 3500, price_label: '$3,500/mes', type: 'Alquiler',
        location: 'Bella Vista, Santo Domingo', beds: 4, baths: 4, area: '320 m²',
        image_url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1600&auto=format&fit=crop',
        featured: false, agent_name: 'Ana Jiménez', agent_phone: '+18095550303',
        agent_email: 'ana@inmobiliariarosire.com',
        agent_photo_url: 'https://ui-avatars.com/api/?name=Ana+Jimenez&background=7c3aed&color=fff&size=200',
        amenities: ['Terraza privada con jacuzzi', 'Vista panorámica', 'Doble altura', 'Walk-in closet'],
    },
    {
        title: 'Casa Familiar en Los Prados',
        description: 'Amplia casa familiar en urbanización cerrada con parque. Perfecta para criar una familia en entorno seguro.',
        price: 195000, price_label: '$195,000', type: 'Venta',
        location: 'Los Prados, Santo Domingo', beds: 4, baths: 3, area: '280 m²',
        image_url: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=1600&auto=format&fit=crop',
        featured: false, agent_name: 'María Rosario', agent_phone: '+18095550101',
        agent_email: 'maria@inmobiliariarosire.com',
        agent_photo_url: 'https://ui-avatars.com/api/?name=Maria+Rosario&background=1e3a5f&color=fff&size=200',
        amenities: ['Urbanización cerrada', 'Patio trasero', 'Garaje 2 carros', 'Área de juegos'],
    },
    {
        title: 'Apartamento en La Romana',
        description: 'Moderno apartamento cerca de Casa de Campo. Ideal para ejecutivos con acceso a golf y playas.',
        price: 1800, price_label: '$1,800/mes', type: 'Alquiler',
        location: 'La Romana, La Romana', beds: 2, baths: 2, area: '110 m²',
        image_url: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=1600&auto=format&fit=crop',
        featured: false, agent_name: 'Carlos Méndez', agent_phone: '+18095550202',
        agent_email: 'carlos@inmobiliariarosire.com',
        agent_photo_url: 'https://ui-avatars.com/api/?name=Carlos+Mendez&background=2563eb&color=fff&size=200',
        amenities: ['Cerca de Casa de Campo', 'Piscina comunitaria', 'Internet de alta velocidad'],
    },
    {
        title: 'Terreno Frente al Mar en Sosúa',
        description: 'Terreno plano con frente a la costa norte. Excelente oportunidad de inversión en zona turística de alto crecimiento.',
        price: 420000, price_label: '$420,000', type: 'Venta',
        location: 'Sosúa, Puerto Plata', beds: 0, baths: 0, area: '1,200 m²',
        image_url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1600&auto=format&fit=crop',
        featured: true, agent_name: 'Ana Jiménez', agent_phone: '+18095550303',
        agent_email: 'ana@inmobiliariarosire.com',
        agent_photo_url: 'https://ui-avatars.com/api/?name=Ana+Jimenez&background=7c3aed&color=fff&size=200',
        amenities: ['Frente al mar', 'Acceso a carretera', 'Zona turística', 'Servicios básicos'],
    },
]

// ==============================
// 3. EXECUTE
// ==============================
async function runMigration() {
    console.log('🔗 Conectando a Supabase:', SUPABASE_URL)

    // Try to run SQL via pg_query RPC (Supabase admin endpoint)
    const rpcUrl = `${SUPABASE_URL}/rest/v1/rpc/`

    // First check connection
    try {
        const check = await fetch(`${SUPABASE_URL}/rest/v1/`, { headers, signal: AbortSignal.timeout(8000) })
        console.log('✅ Conexión al API:', check.status, check.statusText)
    } catch (e) {
        console.error('❌ No se puede conectar al API:', e.message)
        console.log('\n💡 La URL del API posiblemente sea diferente.')
        console.log('   Abre: Supabase Studio > Settings > API > Project URL')
        console.log('   Y actualiza SUPABASE_URL en este script y en .env.local')
        process.exit(1)
    }

    // Insert properties via REST (table should already exist if you ran the SQL migration)
    console.log('\n📦 Insertando propiedades...')
    const insert = await fetch(`${SUPABASE_URL}/rest/v1/properties`, {
        method: 'POST',
        headers: { ...headers, 'Prefer': 'return=representation' },
        body: JSON.stringify(properties),
        signal: AbortSignal.timeout(15000)
    })

    if (insert.ok) {
        const data = await insert.json()
        console.log(`✅ ${data.length} propiedades insertadas correctamente!`)
        console.log('IDs:', data.map(p => p.id).join(', '))
    } else {
        const err = await insert.text()
        console.error('❌ Error insertando propiedades:', insert.status, err)
    }
}

runMigration().catch(console.error)
