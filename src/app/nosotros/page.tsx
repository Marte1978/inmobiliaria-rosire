import Image from 'next/image'
import Link from 'next/link'
import { Users, Award, MapPin, Phone, Mail, MessageCircle, Building2, Star } from 'lucide-react'

export const metadata = {
    title: 'Nosotros | Inmobiliaria Rosire',
    description: 'Conoce la historia, misión y valores de Inmobiliaria Rosire. Más de 15 años conectando familias con sus hogares en República Dominicana.',
}

const stats = [
    { value: '15+', label: 'Años de experiencia' },
    { value: '850+', label: 'Propiedades vendidas' },
    { value: '1,200+', label: 'Familias ayudadas' },
    { value: '98%', label: 'Clientes satisfechos' },
]

const values = [
    {
        icon: Award,
        title: 'Integridad',
        description: 'Actuamos con honestidad y transparencia en cada transacción, construyendo relaciones de confianza duraderas.',
    },
    {
        icon: Users,
        title: 'Servicio al Cliente',
        description: 'Tu satisfacción es nuestra prioridad. Acompañamos cada proceso de principio a fin con dedicación personalizada.',
    },
    {
        icon: Building2,
        title: 'Conocimiento del Mercado',
        description: 'Dominio experto del mercado inmobiliario dominicano. Analizamos tendencias para ofrecerte las mejores oportunidades.',
    },
    {
        icon: Star,
        title: 'Excelencia',
        description: 'Estándares de calidad en cada servicio. Nos esforzamos por superar expectativas en todo momento.',
    },
]

export default function NosotrosPage() {
    return (
        <div className="min-h-screen">
            {/* Hero */}
            <section className="relative h-72 md:h-96 flex items-end pb-12 pt-20">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2000&auto=format&fit=crop"
                        alt="Sobre Inmobiliaria Rosire"
                        fill
                        className="object-cover brightness-40"
                        priority
                    />
                </div>
                <div className="relative z-10 container mx-auto px-4">
                    <p className="text-blue-400 text-sm font-semibold uppercase tracking-widest mb-3">Nuestra Historia</p>
                    <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
                        Sobre <br className="md:hidden" />Inmobiliaria Rosire
                    </h1>
                </div>
            </section>

            {/* Stats */}
            <section className="bg-slate-900 py-12">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        {stats.map((s) => (
                            <div key={s.label}>
                                <p className="text-3xl md:text-4xl font-bold text-white mb-1">{s.value}</p>
                                <p className="text-slate-400 text-sm">{s.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Mission */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center">
                        <p className="text-blue-600 text-sm font-semibold uppercase tracking-widest mb-4">Nuestra Misión</p>
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 leading-snug">
                            Conectamos familias con sus hogares ideales en República Dominicana
                        </h2>
                        <p className="text-slate-600 text-lg leading-relaxed">
                            Fundada hace más de 15 años, Inmobiliaria Rosire nació con la visión de transformar el mercado inmobiliario dominicano.
                            Creemos que encontrar el hogar perfecto no debería ser complicado — y con nuestro equipo de expertos, tecnología de punta
                            y compromiso genuino con cada cliente, lo hacemos realidad.
                        </p>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="py-20 bg-slate-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <p className="text-blue-600 text-sm font-semibold uppercase tracking-widest mb-3">Lo que nos define</p>
                        <h2 className="text-3xl font-bold text-slate-900">Nuestros Valores</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((v) => (
                            <div key={v.title} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow group">
                                <div className="inline-flex items-center justify-center w-14 h-14 bg-blue-100 rounded-2xl mb-5 group-hover:bg-blue-600 transition-colors">
                                    <v.icon size={24} className="text-blue-600 group-hover:text-white transition-colors" />
                                </div>
                                <h3 className="font-bold text-slate-900 mb-3 text-lg">{v.title}</h3>
                                <p className="text-slate-500 text-sm leading-relaxed">{v.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Location */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-2xl mx-auto text-center">
                        <p className="text-blue-600 text-sm font-semibold uppercase tracking-widest mb-3">Dónde estamos</p>
                        <h2 className="text-3xl font-bold text-slate-900 mb-8">Visítanos</h2>
                        <div className="bg-slate-50 rounded-2xl p-8 border border-gray-100 space-y-4 text-left">
                            <div className="flex items-start gap-4">
                                <MapPin size={20} className="text-blue-600 mt-0.5 shrink-0" />
                                <div>
                                    <p className="font-semibold text-slate-900">Oficina Principal</p>
                                    <p className="text-slate-600 text-sm">Av. Abraham Lincoln #304, Torre Empresarial, Piso 8, Santo Domingo, República Dominicana</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <Phone size={20} className="text-blue-600 shrink-0" />
                                <div>
                                    <p className="font-semibold text-slate-900">Teléfono</p>
                                    <a href="tel:+18099721828" className="text-blue-600 text-sm hover:underline">+1 (809) 972-1828</a>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <Mail size={20} className="text-blue-600 shrink-0" />
                                <div>
                                    <p className="font-semibold text-slate-900">Email</p>
                                    <a href="mailto:info@inmobiliariarosire.com" className="text-blue-600 text-sm hover:underline">info@inmobiliariarosire.com</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 bg-blue-600 text-white text-center">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">¿Listo para encontrar tu hogar ideal?</h2>
                    <p className="text-blue-100 text-lg mb-8 max-w-xl mx-auto">
                        Nuestros agentes están aquí para guiarte en cada paso del proceso.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link
                            href="/propiedades"
                            className="px-8 py-3.5 bg-white text-blue-700 font-bold rounded-full hover:bg-blue-50 transition-colors shadow-lg"
                        >
                            Ver Propiedades
                        </Link>
                        <Link
                            href="/contacto"
                            className="px-8 py-3.5 bg-transparent border-2 border-white text-white font-bold rounded-full hover:bg-white/10 transition-colors"
                        >
                            Contáctanos
                        </Link>
                        <a
                            href="https://wa.me/18099721828?text=Hola! Me gustaría obtener más información sobre sus propiedades."
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-8 py-3.5 bg-green-500 text-white font-bold rounded-full hover:bg-green-600 transition-colors flex items-center gap-2"
                        >
                            <MessageCircle size={18} /> WhatsApp
                        </a>
                    </div>
                </div>
            </section>
        </div>
    )
}
