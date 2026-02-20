import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MapPin, Bed, Bath, Maximize, Phone, Mail, MessageCircle, ChevronLeft, CheckCircle } from 'lucide-react'
import { getPropertyById, getProperties } from '@/features/properties/services/properties.service'

export const dynamic = 'force-dynamic'

interface PageProps {
    params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: PageProps) {
    const { id } = await params
    const property = await getPropertyById(id)

    if (!property) {
        return { title: 'Propiedad no encontrada | Inmobiliaria Rosire' }
    }

    return {
        title: `${property.title} | Inmobiliaria Rosire`,
        description: property.description ?? `${property.type} en ${property.location}. ${property.price_label}.`,
    }
}

export default async function PropertyDetailPage({ params }: PageProps) {
    const { id } = await params
    const property = await getPropertyById(id)

    if (!property) notFound()

    const whatsappMessage = encodeURIComponent(
        `Hola, estoy interesado/a en la propiedad: ${property.title} (${property.price_label}). ¿Podría darme más información?`
    )
    const whatsappUrl = `https://wa.me/${property.agent_phone?.replace(/\D/g, '')}?text=${whatsappMessage}`

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Back */}
            <div className="container mx-auto px-4 pt-24 pb-4">
                <Link href="/propiedades" className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors text-sm font-medium">
                    <ChevronLeft size={18} />
                    Volver a propiedades
                </Link>
            </div>

            <div className="container mx-auto px-4 pb-16">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Left: Image + Details */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Main Image */}
                        <div className="relative h-80 md:h-[480px] rounded-2xl overflow-hidden shadow-lg">
                            {property.image_url ? (
                                <Image
                                    src={property.image_url}
                                    alt={property.title}
                                    fill
                                    className="object-cover"
                                    priority
                                    sizes="(max-width: 1024px) 100vw, 66vw"
                                />
                            ) : (
                                <div className="w-full h-full bg-gray-200" />
                            )}
                            <div className="absolute top-4 left-4 flex gap-2">
                                <span className={`px-3 py-1.5 rounded-full text-sm font-bold text-white ${property.type === 'Venta' ? 'bg-blue-600' : 'bg-violet-600'}`}>
                                    {property.type}
                                </span>
                                {property.featured && (
                                    <span className="px-3 py-1.5 rounded-full text-sm font-bold bg-amber-500 text-white">Destacada</span>
                                )}
                            </div>
                        </div>

                        {/* Title + Price */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <div className="flex flex-wrap items-start justify-between gap-4">
                                <div>
                                    <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">{property.title}</h1>
                                    <p className="text-slate-500 flex items-center gap-1.5"><MapPin size={16} /> {property.location}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-3xl md:text-4xl font-bold text-blue-600">{property.price_label}</p>
                                    {property.type === 'Alquiler' && <p className="text-slate-400 text-sm">por mes</p>}
                                </div>
                            </div>

                            {/* Specs */}
                            {(property.beds > 0 || property.baths > 0 || property.area) && (
                                <div className="flex flex-wrap gap-6 mt-6 pt-6 border-t border-gray-100">
                                    {property.beds > 0 && (
                                        <div className="flex items-center gap-2 text-slate-700">
                                            <Bed className="text-blue-500" size={20} />
                                            <span><strong>{property.beds}</strong> habitaciones</span>
                                        </div>
                                    )}
                                    {property.baths > 0 && (
                                        <div className="flex items-center gap-2 text-slate-700">
                                            <Bath className="text-blue-500" size={20} />
                                            <span><strong>{property.baths}</strong> baños</span>
                                        </div>
                                    )}
                                    {property.area && (
                                        <div className="flex items-center gap-2 text-slate-700">
                                            <Maximize className="text-blue-500" size={20} />
                                            <span><strong>{property.area}</strong></span>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Description */}
                        {property.description && (
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                <h2 className="text-lg font-bold text-slate-900 mb-3">Descripción</h2>
                                <p className="text-slate-600 leading-relaxed">{property.description}</p>
                            </div>
                        )}

                        {/* Amenities */}
                        {property.amenities.length > 0 && (
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                <h2 className="text-lg font-bold text-slate-900 mb-4">Amenidades</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {property.amenities.map((amenity) => (
                                        <div key={amenity} className="flex items-center gap-2.5 text-slate-700">
                                            <CheckCircle size={18} className="text-green-500 shrink-0" />
                                            <span className="text-sm">{amenity}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right: Agent + Contact Form */}
                    <div className="space-y-6">
                        {/* Agent Card */}
                        {property.agent_name && (
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Agente responsable</h3>
                                <div className="flex items-center gap-4 mb-5">
                                    <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                                        {property.agent_photo_url ? (
                                            <Image src={property.agent_photo_url} alt={property.agent_name} fill className="object-cover" sizes="64px" />
                                        ) : (
                                            <div className="w-full h-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-lg">
                                                {property.agent_name[0]}
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <p className="font-bold text-slate-900">{property.agent_name}</p>
                                        <p className="text-slate-500 text-sm">Agente Inmobiliario</p>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2">
                                    {property.agent_phone && (
                                        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer"
                                            className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-green-500 text-white font-medium hover:bg-green-600 transition-colors text-sm">
                                            <MessageCircle size={16} /> WhatsApp
                                        </a>
                                    )}
                                    {property.agent_phone && (
                                        <a href={`tel:${property.agent_phone}`}
                                            className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-gray-200 text-slate-700 font-medium hover:bg-gray-50 transition-colors text-sm">
                                            <Phone size={16} /> Llamar
                                        </a>
                                    )}
                                    {property.agent_email && (
                                        <a href={`mailto:${property.agent_email}?subject=Consulta: ${encodeURIComponent(property.title)}`}
                                            className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-gray-200 text-slate-700 font-medium hover:bg-gray-50 transition-colors text-sm">
                                            <Mail size={16} /> Email
                                        </a>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Contact Form */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <h3 className="font-bold text-slate-900 mb-4">Solicitar información</h3>
                            <form
                                action={`https://automatizacion-n8n.lnr2f0.easypanel.host/webhook/aneurys`}
                                method="POST"
                                className="space-y-3"
                            >
                                <input type="hidden" name="source" value="detalle_propiedad" />
                                <input type="hidden" name="property_id" value={property.id} />
                                <input type="hidden" name="property_title" value={property.title} />

                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Tu nombre"
                                    required
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-slate-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200 text-sm"
                                />
                                <input
                                    type="tel"
                                    name="phone"
                                    placeholder="Tu teléfono / WhatsApp"
                                    required
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-slate-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200 text-sm"
                                />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Tu email (opcional)"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-slate-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200 text-sm"
                                />
                                <textarea
                                    name="message"
                                    rows={3}
                                    placeholder="¿Cuándo te gustaría visitar la propiedad?"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-slate-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200 text-sm resize-none"
                                />
                                <button
                                    type="submit"
                                    className="w-full py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-md hover:shadow-blue-200"
                                >
                                    Enviar solicitud
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
