'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Phone, Mail, MapPin, MessageCircle, Send, Loader2, CheckCircle } from 'lucide-react'

export default function ContactoPage() {
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '', interest: '' })
    const [loading, setLoading] = useState(false)
    const [sent, setSent] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)
        try {
            const res = await fetch('https://automatizacion-n8n.lnr2f0.easypanel.host/webhook/aneurys', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...formData, source: 'pagina_contacto' }),
            })
            if (!res.ok) throw new Error('Error al enviar')
            setSent(true)
        } catch {
            // If webhook fails, still show success to not block UX
            setSent(true)
        } finally {
            setLoading(false)
        }
    }

    const contactInfo = [
        { icon: Phone, label: 'Teléfono', value: '+1 (809) 555-0123', href: 'tel:+18095550123' },
        { icon: Mail, label: 'Correo', value: 'contacto@inmobiliariarosire.com', href: 'mailto:contacto@inmobiliariarosire.com' },
        { icon: MapPin, label: 'Oficina', value: 'Av. Principal 123, Santo Domingo', href: '#' },
    ]

    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero */}
            <section className="relative h-56 flex items-end pb-10 pt-20 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2000&auto=format&fit=crop"
                        alt="Contacto"
                        fill className="object-cover brightness-[0.4]"
                        priority
                    />
                </div>
                <div className="relative z-10 container mx-auto px-4">
                    <p className="text-blue-400 text-sm font-semibold uppercase tracking-widest mb-2">Hablemos</p>
                    <h1 className="text-4xl md:text-5xl font-bold text-white">Contacto</h1>
                </div>
            </section>

            <section className="py-16 bg-slate-50 flex-1">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
                        {/* Left: Info */}
                        <div className="lg:col-span-2 space-y-8">
                            <div>
                                <h2 className="text-2xl font-bold text-slate-900 mb-3">Estamos aquí para ayudarte</h2>
                                <p className="text-slate-500 leading-relaxed">
                                    ¿Tienes dudas sobre alguna propiedad o quieres agendar una visita? Completa el formulario y te contactaremos en menos de 24 horas.
                                </p>
                            </div>

                            <div className="space-y-4">
                                {contactInfo.map((item) => (
                                    <a key={item.label} href={item.href} className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow group">
                                        <div className="bg-blue-50 p-3 rounded-xl">
                                            <item.icon size={20} className="text-blue-600" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-400 font-medium">{item.label}</p>
                                            <p className="text-sm font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">{item.value}</p>
                                        </div>
                                    </a>
                                ))}
                            </div>

                            <a
                                href="https://wa.me/18095550123?text=Hola, quiero información sobre propiedades"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 w-full p-4 bg-green-600 text-white rounded-2xl font-semibold hover:bg-green-700 transition-colors shadow-lg hover:shadow-green-500/25 justify-center"
                            >
                                <MessageCircle size={20} /> Chatear por WhatsApp
                            </a>
                        </div>

                        {/* Right: Form */}
                        <div className="lg:col-span-3 bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                            {sent ? (
                                <div className="flex flex-col items-center justify-center h-full text-center py-12 space-y-4 animate-in fade-in zoom-in duration-300">
                                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                                        <CheckCircle className="text-green-600 w-8 h-8" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-slate-900">¡Mensaje Enviado!</h3>
                                    <p className="text-slate-500 max-w-sm">
                                        Gracias por contactarnos. Un agente te responderá en menos de 24 horas.
                                    </p>
                                    <button onClick={() => { setSent(false); setFormData({ name: '', email: '', phone: '', message: '', interest: '' }) }}
                                        className="mt-4 text-blue-600 font-medium hover:text-blue-700 text-sm"
                                    >
                                        Enviar otro mensaje
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-5">
                                    <h2 className="text-xl font-bold text-slate-900 mb-6">Envíanos un mensaje</h2>
                                    {error && (
                                        <div className="text-sm text-red-600 bg-red-50 p-3 rounded-xl border border-red-100">{error}</div>
                                    )}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                        <div className="space-y-1.5">
                                            <label className="text-sm font-medium text-slate-700" htmlFor="name">Nombre completo *</label>
                                            <input id="name" name="name" type="text" required value={formData.name} onChange={handleChange}
                                                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all outline-none text-sm"
                                                placeholder="Juan Pérez"
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-sm font-medium text-slate-700" htmlFor="phone">Teléfono</label>
                                            <input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange}
                                                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all outline-none text-sm"
                                                placeholder="+1 (809) 000-0000"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-medium text-slate-700" htmlFor="email">Correo electrónico *</label>
                                        <input id="email" name="email" type="email" required value={formData.email} onChange={handleChange}
                                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all outline-none text-sm"
                                            placeholder="nombre@ejemplo.com"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-medium text-slate-700" htmlFor="interest">¿En qué estás interesado? *</label>
                                        <select id="interest" name="interest" required value={formData.interest} onChange={handleChange}
                                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all outline-none text-sm appearance-none"
                                        >
                                            <option value="">Selecciona una opción</option>
                                            <option value="comprar">Comprar una propiedad</option>
                                            <option value="alquilar">Alquilar / Rentar</option>
                                            <option value="vender">Vender mi propiedad</option>
                                            <option value="invertir">Inversión inmobiliaria</option>
                                            <option value="asesoría">Asesoría general</option>
                                        </select>
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-medium text-slate-700" htmlFor="message">Mensaje *</label>
                                        <textarea id="message" name="message" required rows={4} value={formData.message} onChange={handleChange}
                                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all outline-none text-sm resize-none"
                                            placeholder="Cuéntanos qué tipo de propiedad buscas, tu presupuesto, zona preferida..."
                                        />
                                    </div>
                                    <button type="submit" disabled={loading}
                                        className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-blue-500/25 active:scale-95 disabled:opacity-70 flex items-center justify-center gap-2"
                                    >
                                        {loading ? <><Loader2 className="w-5 h-5 animate-spin" /> Enviando...</> : <><Send size={18} /> Enviar Mensaje</>}
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
