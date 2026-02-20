import Image from 'next/image'
import { Home, Building2, Trees } from 'lucide-react'
import { PropertyCard } from '@/features/properties/components/PropertyCard'
import { PropertyFilters } from '@/features/properties/components/PropertyFilters'
import { getProperties } from '@/features/properties/services/properties.service'
import { Suspense } from 'react'
import { motion } from 'framer-motion'
import type { PropertyFilters as Filters } from '@/features/properties/types'

export const dynamic = 'force-dynamic'

export const metadata = {
    title: 'Propiedades en Venta y Alquiler | Inmobiliaria Rosire',
    description: 'Explora nuestra cartera de propiedades en venta y alquiler en República Dominicana. Casas, apartamentos, terrenos y más.',
}

interface PageProps {
    searchParams: Promise<{ search?: string; type?: string; priceRange?: string }>
}

export default async function PropiedadesPage({ searchParams }: PageProps) {
    const params = await searchParams

    const filters: Filters = {
        search: params.search ?? '',
        type: (params.type as Filters['type']) ?? '',
        priceRange: (params.priceRange as Filters['priceRange']) ?? '',
    }

    const properties = await getProperties(filters)

    return (
        <div className="flex flex-col min-h-screen pt-16 md:pt-0">
            {/* Header Banner */}
            <section className="relative h-64 flex items-center justify-center bg-slate-900 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="https://images.unsplash.com/photo-1600582874248-1117f8582499?q=80&w=2000&auto=format&fit=crop"
                        alt="Propiedades"
                        fill
                        className="object-cover brightness-[0.4]"
                        priority
                    />
                    <div className="absolute inset-0 bg-blue-900/20" />
                </div>
                <div className="relative z-10 container mx-auto px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <p className="text-blue-400 text-sm font-bold uppercase tracking-[0.2em] mb-3">Descubre Tu Próximo Destino</p>
                        <h1 className="text-4xl md:text-6xl font-black text-white">Nuestro Catálogo</h1>
                    </motion.div>
                </div>
            </section>

            {/* Filters - Client Component with Suspense (uses useSearchParams) */}
            <Suspense fallback={<div className="bg-white border-b h-16" />}>
                <PropertyFilters />
            </Suspense>

            {/* Results */}
            <section className="py-12 bg-slate-50 flex-1">
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-center mb-8">
                        <p className="text-slate-500 text-sm">
                            Mostrando <strong className="text-slate-900">{properties.length}</strong> propiedades
                            {filters.type && <span className="ml-1">en <strong>{filters.type}</strong></span>}
                            {filters.search && <span className="ml-1">para <strong>&quot;{filters.search}&quot;</strong></span>}
                        </p>
                        <div className="flex gap-2">
                            {[Home, Building2, Trees].map((Icon, i) => (
                                <button key={i} className="p-2 rounded-lg bg-white border border-gray-200 text-slate-400 hover:text-blue-600 hover:border-blue-300 transition-colors">
                                    <Icon size={18} />
                                </button>
                            ))}
                        </div>
                    </div>

                    {properties.length === 0 ? (
                        <div className="text-center py-24">
                            <p className="text-slate-400 text-lg mb-2">No se encontraron propiedades</p>
                            <p className="text-slate-400 text-sm">Intenta cambiar los filtros de búsqueda</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {properties.map((property) => (
                                <PropertyCard key={property.id} property={property} />
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    )
}
