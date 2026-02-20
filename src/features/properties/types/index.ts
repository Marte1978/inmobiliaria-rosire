// Database types for Inmobiliaria Rosire
// Reflects the Supabase schema in supabase/migrations/001_properties.sql

export interface Property {
    id: string
    title: string
    description: string | null
    price: number
    price_label: string
    type: 'Venta' | 'Alquiler'
    location: string
    beds: number
    baths: number
    area: string | null
    image_url: string | null
    featured: boolean
    agent_name: string | null
    agent_phone: string | null
    agent_email: string | null
    agent_photo_url: string | null
    amenities: string[]
    created_at: string
}

export interface PropertyFilters {
    search?: string
    type?: 'Venta' | 'Alquiler' | ''
    priceRange?: '0-100000' | '100000-300000' | '300000+' | ''
}
