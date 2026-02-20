import Image from 'next/image'
import Link from 'next/link'
import { Bed, Bath, Maximize, MapPin } from 'lucide-react'
import type { Property } from '../types'

interface PropertyCardProps {
    property: Property
}

export function PropertyCard({ property }: PropertyCardProps) {
    return (
        <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-1">
            {/* Image */}
            <div className="relative h-64 overflow-hidden">
                {property.image_url ? (
                    <Image
                        src={property.image_url}
                        alt={property.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-400 text-sm">Sin imagen</span>
                    </div>
                )}

                {/* Badges */}
                <div className="absolute top-4 left-4 flex gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-sm shadow-sm text-white ${property.type === 'Venta' ? 'bg-blue-600' : 'bg-violet-600'
                        }`}>
                        {property.type}
                    </span>
                    {property.featured && (
                        <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-sm shadow-sm bg-amber-500 text-white">
                            Destacada
                        </span>
                    )}
                </div>

                {/* Price overlay */}
                <div className="absolute bottom-4 left-4 text-white font-bold text-2xl drop-shadow-md">
                    {property.price_label}
                </div>
            </div>

            {/* Content */}
            <div className="p-6">
                <div className="mb-4">
                    <h2 className="font-bold text-lg text-slate-900 mb-1 group-hover:text-blue-600 transition-colors line-clamp-1">
                        {property.title}
                    </h2>
                    <p className="text-slate-500 text-sm flex items-center gap-1">
                        <MapPin size={14} /> {property.location}
                    </p>
                </div>

                {(property.beds > 0 || property.area) && (
                    <div className="flex items-center gap-4 py-4 border-t border-gray-100 text-sm text-slate-600">
                        {property.beds > 0 && (
                            <div className="flex items-center gap-1.5" title="Habitaciones">
                                <Bed size={16} className="text-blue-500" />
                                <span className="font-medium">{property.beds}</span>
                            </div>
                        )}
                        {property.baths > 0 && (
                            <div className="flex items-center gap-1.5" title="Baños">
                                <Bath size={16} className="text-blue-500" />
                                <span className="font-medium">{property.baths}</span>
                            </div>
                        )}
                        {property.area && (
                            <div className="flex items-center gap-1.5" title="Área">
                                <Maximize size={16} className="text-blue-500" />
                                <span className="font-medium">{property.area}</span>
                            </div>
                        )}
                    </div>
                )}

                <Link
                    href={`/propiedades/${property.id}`}
                    className="block w-full text-center py-3 mt-2 rounded-xl bg-slate-50 text-slate-900 font-semibold hover:bg-slate-900 hover:text-white transition-colors"
                >
                    Ver Detalles
                </Link>
            </div>
        </div>
    )
}
