import Image from 'next/image'
import { Phone, Mail, MessageCircle, Star } from 'lucide-react'

export const metadata = {
    title: 'Nuestros Agentes | Inmobiliaria Rosire',
    description: 'Conoce al equipo de agentes expertos de Inmobiliaria Rosire. Especialistas en propiedades en República Dominicana.',
}

const agents = [
    {
        id: 1,
        name: 'Rosire Ángela',
        role: 'Directora & Agente Senior',
        specialties: ['Propiedades de Lujo', 'Punta Cana', 'Inversiones'],
        phone: '+1 (809) 972-1828',
        email: 'rosire@inmobiliariarosire.com',
        deals: 120,
        rating: 5.0,
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=600&auto=format&fit=crop',
    },
    {
        id: 2,
        name: 'Carlos Reyes',
        role: 'Agente Comercial',
        specialties: ['Apartamentos', 'Santo Domingo', 'Alquiler'],
        phone: '+1 (809) 972-1828',
        email: 'carlos@inmobiliariarosire.com',
        deals: 85,
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop',
    },
    {
        id: 3,
        name: 'Laura Morel',
        role: 'Agente Residencial',
        specialties: ['Casas familiares', 'La Romana', 'Puerto Plata'],
        phone: '+1 (809) 972-1828',
        email: 'laura@inmobiliariarosire.com',
        deals: 62,
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=600&auto=format&fit=crop',
    },
    {
        id: 4,
        name: 'Miguel Espinal',
        role: 'Agente de Inversiones',
        specialties: ['Terrenos', 'Santiago', 'Proyectos'],
        phone: '+1 (809) 972-1828',
        email: 'miguel@inmobiliariarosire.com',
        deals: 47,
        rating: 4.7,
        image: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?q=80&w=600&auto=format&fit=crop',
    },
]

export default function AgentesPage() {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero */}
            <section className="relative h-56 flex items-end pb-10 pt-20 bg-slate-900 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 to-slate-900" />
                <div className="relative z-10 container mx-auto px-4">
                    <p className="text-blue-400 text-sm font-semibold uppercase tracking-widest mb-2">Equipo Profesional</p>
                    <h1 className="text-4xl md:text-5xl font-bold text-white">Nuestros Agentes</h1>
                </div>
            </section>

            {/* Intro */}
            <section className="py-14 bg-white">
                <div className="container mx-auto px-4 text-center max-w-2xl">
                    <p className="text-lg text-slate-600 leading-relaxed">
                        Contamos con un equipo de agentes certificados y con amplia experiencia en el mercado inmobiliario dominicano. Estamos listos para ayudarte a encontrar tu propiedad ideal.
                    </p>
                </div>
            </section>

            {/* Agents Grid */}
            <section className="py-12 bg-slate-50 flex-1">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {agents.map((agent) => (
                            <div key={agent.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col">
                                {/* Photo */}
                                <div className="relative h-56 overflow-hidden">
                                    <Image src={agent.image} alt={agent.name} fill className="object-cover" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent" />
                                    <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full">
                                        <Star size={12} className="text-amber-400 fill-amber-400" />
                                        <span className="text-white text-xs font-bold">{agent.rating}</span>
                                    </div>
                                </div>

                                {/* Info */}
                                <div className="p-5 flex flex-col flex-1">
                                    <div className="mb-3">
                                        <h2 className="font-bold text-slate-900 text-lg">{agent.name}</h2>
                                        <p className="text-blue-600 text-sm font-medium">{agent.role}</p>
                                    </div>

                                    <div className="flex flex-wrap gap-1.5 mb-4">
                                        {agent.specialties.map((spec) => (
                                            <span key={spec} className="text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full">{spec}</span>
                                        ))}
                                    </div>

                                    <p className="text-xs text-slate-400 mb-4">{agent.deals}+ propiedades cerradas</p>

                                    <div className="mt-auto space-y-2">
                                        <a
                                            href={`https://wa.me/${agent.phone.replace(/\D/g, '')}?text=Hola ${agent.name}, necesito asesoría inmobiliaria`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 w-full p-2.5 bg-green-600 text-white rounded-xl text-xs font-semibold hover:bg-green-700 transition-colors justify-center"
                                        >
                                            <MessageCircle size={15} /> WhatsApp
                                        </a>
                                        <div className="grid grid-cols-2 gap-2">
                                            <a
                                                href={`tel:${agent.phone}`}
                                                className="flex items-center gap-1.5 p-2 bg-slate-50 border border-gray-200 rounded-xl text-xs text-slate-600 hover:bg-slate-100 transition-colors justify-center"
                                            >
                                                <Phone size={14} /> Llamar
                                            </a>
                                            <a
                                                href={`mailto:${agent.email}`}
                                                className="flex items-center gap-1.5 p-2 bg-slate-50 border border-gray-200 rounded-xl text-xs text-slate-600 hover:bg-slate-100 transition-colors justify-center"
                                            >
                                                <Mail size={14} /> Email
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}
