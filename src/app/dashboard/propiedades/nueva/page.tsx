import PropertyForm from '@/features/properties/components/PropertyForm'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export const metadata = {
    title: 'Publicar Propiedad | Dashboard',
}

export const dynamic = 'force-dynamic'

export default function NuevaPropiedadPage() {
    return (
        <div className="min-h-screen bg-slate-50/50">
            {/* Header decorativo */}
            <div className="bg-slate-900 text-white pt-24 pb-32">
                <div className="container mx-auto px-4 max-w-5xl">
                    <Link
                        href="/dashboard"
                        className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-6 group text-sm font-medium"
                    >
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                        Volver al Dashboard
                    </Link>
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Publicar Nueva Propiedad</h1>
                    <p className="text-slate-400 mt-3 text-lg max-w-2xl">
                        Completa el formulario para subir una nueva propiedad al catálogo. Todas las propiedades publicadas son visibles inmediatamente para tus clientes.
                    </p>
                </div>
            </div>

            {/* Formulario Section */}
            <div className="container mx-auto px-4 -mt-16 relative z-10">
                <PropertyForm />
            </div>
        </div>
    )
}
