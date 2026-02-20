'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Search, MapPin, Bed, Bath, Maximize, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Home() {
  const properties = [
    {
      id: 1,
      title: 'Villa de Lujo en Punta Cana',
      price: '$850,000',
      location: 'Punta Cana, La Altagracia',
      beds: 5,
      baths: 6,
      area: '650 m²',
      image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1600&auto=format&fit=crop',
      type: 'Venta'
    },
    {
      id: 2,
      title: 'Apartamento Moderno en Piantini',
      price: '$285,000',
      location: 'Piantini, Santo Domingo',
      beds: 3,
      baths: 3.5,
      area: '185 m²',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1600&auto=format&fit=crop',
      type: 'Venta'
    },
    {
      id: 3,
      title: 'Penthouse Exclusivo',
      price: '$3,500/mes',
      location: 'Bella Vista, Santo Domingo',
      beds: 4,
      baths: 4,
      area: '320 m²',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1600&auto=format&fit=crop',
      type: 'Alquiler'
    },
  ]

  return (
    <div className="flex flex-col min-h-screen pt-16 md:pt-0">
      {/* Hero Section */}
      <section className="relative min-h-[700px] flex items-center justify-center overflow-hidden bg-slate-900">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1600596542815-2250657a2e7c?q=80&w=2000&auto=format&fit=crop"
            alt="Hero Background"
            fill
            className="object-cover brightness-[0.4] scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-transparent to-slate-950/80" />
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center text-white space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-[1.1]">
              Encuentra el Hogar <br />
              <span className="text-blue-500">de tus Sueños</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-200 max-w-2xl mx-auto mb-12 font-light leading-relaxed">
              Descubre las propiedades más exclusivas en República Dominicana con el respaldo de expertos inmobiliarios.
            </p>

            <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-xl p-5 rounded-[2.5rem] border border-white/20 shadow-2xl mt-8">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 text-white/50 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Ubicación, ciudad o zona..."
                    className="w-full pl-14 pr-6 py-5 rounded-3xl bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-500/20 transition-all shadow-xl text-lg"
                  />
                </div>
                <div className="flex-[0.5]">
                  <select className="w-full h-full px-6 py-5 rounded-3xl bg-white text-slate-900 focus:outline-none focus:ring-4 focus:ring-blue-500/20 appearance-none shadow-xl cursor-pointer text-lg">
                    <option value="">Tipo Propiedad</option>
                    <option value="casa">Casa</option>
                    <option value="apartamento">Apartamento</option>
                    <option value="terreno">Terreno</option>
                  </select>
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-5 rounded-3xl font-bold transition-all shadow-lg hover:shadow-blue-600/40 flex items-center justify-center gap-3 active:scale-95 text-lg">
                  <Search className="w-6 h-6" />
                  <span>Buscar</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Properties Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-16 gap-6">
            <div className="text-center md:text-left">
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="text-blue-600 font-bold tracking-widest text-sm uppercase"
              >
                Selección Exclusiva
              </motion.span>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mt-3">Propiedades Destacadas</h2>
            </div>
            <Link href="/propiedades" className="group flex items-center gap-3 text-slate-900 font-bold hover:text-blue-600 transition-all text-lg">
              Explorar catálogo <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {properties.map((property, idx) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-slate-100 hover:-translate-y-2">
                  <div className="relative h-72 overflow-hidden">
                    <Image
                      src={property.image}
                      alt={property.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-5 left-5 flex gap-2">
                      <span className="bg-blue-600 text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg">
                        {property.type}
                      </span>
                    </div>
                    <div className="absolute bottom-5 left-5 text-white drop-shadow-lg">
                      <p className="text-sm font-medium text-white/80 uppercase tracking-widest mb-1">Precio</p>
                      <p className="text-3xl font-black">{property.price}</p>
                    </div>
                  </div>

                  <div className="p-8">
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <h3 className="font-bold text-xl text-slate-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-1">{property.title}</h3>
                        <p className="text-slate-500 text-sm flex items-center gap-2">
                          <MapPin size={16} className="text-blue-500" /> {property.location}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-6 py-6 border-y border-slate-100 text-sm text-slate-600">
                      <div className="flex items-center gap-2" title="Habitaciones">
                        <Bed size={18} className="text-blue-500" />
                        <span className="font-bold">{property.beds}</span>
                      </div>
                      <div className="flex items-center gap-2" title="Baños">
                        <Bath size={18} className="text-blue-500" />
                        <span className="font-bold">{property.baths}</span>
                      </div>
                      <div className="flex items-center gap-2" title="Área">
                        <Maximize size={18} className="text-blue-500" />
                        <span className="font-bold">{property.area}</span>
                      </div>
                    </div>

                    <Link
                      href={`/propiedades/${property.id}`}
                      className="block w-full text-center py-4 mt-6 rounded-2xl bg-slate-50 text-slate-900 font-bold hover:bg-slate-900 hover:text-white transition-all transform active:scale-95"
                    >
                      Ver Detalles
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 text-center md:hidden">
            <Link href="/propiedades" className="inline-flex items-center gap-3 text-blue-600 font-bold hover:text-blue-700 text-lg">
              Ver catálogo completo <ArrowRight size={24} />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-600/10" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">¿Listo para encontrar tu nuevo hogar?</h2>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-10">
            Únete a Inmobiliaria Rosire y accede a las mejores oportunidades del mercado inmobiliario dominicano.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/auth/register"
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-blue-500/25 text-lg"
            >
              Registrarse Ahora
            </Link>
            <Link
              href="/contacto"
              className="px-8 py-4 bg-transparent border border-white/20 hover:bg-white/10 text-white font-bold rounded-xl transition-all text-lg backdrop-blur-sm"
            >
              Contactar Asesor
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
