import Image from 'next/image'
import Link from 'next/link'
import { Search, MapPin, Bed, Bath, Maximize, ArrowRight } from 'lucide-react'
import { createClient } from '@/utils/supabase/server'

export const dynamic = 'force-dynamic'

export default async function Home() {
  // Load featured properties from Supabase
  const supabase = await createClient()
  const { data: properties } = await supabase
    .from('properties')
    .select('*')
    .eq('featured', true)
    .order('created_at', { ascending: false })
    .limit(3)

  // Fallback: if no featured, get latest 3
  let displayProperties = properties ?? []
  if (displayProperties.length === 0) {
    const { data: latest } = await supabase
      .from('properties')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(3)
    displayProperties = latest ?? []
  }

  return (
    <div className="flex flex-col min-h-screen pt-16 md:pt-0">
      {/* Hero Section */}
      <section className="relative min-h-[700px] flex items-center justify-center overflow-hidden bg-slate-900">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2000&auto=format&fit=crop"
            alt="Hero Background"
            fill
            className="object-cover brightness-[0.45] scale-100 transition-transform duration-[10s] ease-linear hover:scale-110"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-transparent to-slate-950" />
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center text-white space-y-8">
          <div className="animate-fadeInUp">
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.9]">
              Tu Exclusivo <br />
              <span className="text-blue-500">Legado Inmobiliario</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-200 max-w-2xl mx-auto mb-14 font-light leading-relaxed">
              Descubra un portafolio curado de piezas arquitectónicas únicas en los destinos más privilegiados del Caribe.
            </p>

            <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-xl p-5 rounded-[2.5rem] border border-white/20 shadow-2xl mt-8">
              <form action="/propiedades" method="GET" className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input
                    type="text"
                    name="search"
                    placeholder="Ubicación, ciudad o zona..."
                    className="w-full pl-14 pr-6 py-5 rounded-3xl bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-500/20 transition-all shadow-xl text-lg"
                  />
                </div>
                <div className="flex-[0.5]">
                  <select
                    name="type"
                    className="w-full h-full px-6 py-5 rounded-3xl bg-white text-slate-900 focus:outline-none focus:ring-4 focus:ring-blue-500/20 appearance-none shadow-xl cursor-pointer text-lg"
                  >
                    <option value="">Tipo Propiedad</option>
                    <option value="Venta">Venta</option>
                    <option value="Alquiler">Alquiler</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-5 rounded-3xl font-bold transition-all shadow-lg hover:shadow-blue-600/40 flex items-center justify-center gap-3 active:scale-95 text-lg"
                >
                  <Search className="w-6 h-6" />
                  <span>Buscar</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-16 gap-6">
            <div className="text-center md:text-left">
              <span className="text-blue-600 font-bold tracking-widest text-sm uppercase animate-fadeInLeft">
                Selección Exclusiva
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mt-3">Propiedades Destacadas</h2>
            </div>
            <Link href="/propiedades" className="group flex items-center gap-3 text-slate-900 font-bold hover:text-blue-600 transition-all text-lg">
              Explorar catálogo <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>

          {displayProperties.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-slate-400 text-lg">No hay propiedades disponibles en este momento.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {displayProperties.map((property, idx) => (
                <div
                  key={property.id}
                  className="animate-fadeInUp"
                  style={{ animationDelay: `${idx * 150}ms` }}
                >
                  <div className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-slate-100 hover:-translate-y-2">
                    <div className="relative h-72 overflow-hidden">
                      {property.image_url ? (
                        <Image
                          src={property.image_url}
                          alt={property.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-700"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      ) : (
                        <div className="w-full h-full bg-slate-200 flex items-center justify-center">
                          <span className="text-slate-400">Sin imagen</span>
                        </div>
                      )}
                      <div className="absolute top-5 left-5 flex gap-2">
                        <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg text-white ${property.type === 'Venta' ? 'bg-blue-600' : 'bg-violet-600'}`}>
                          {property.type}
                        </span>
                        {property.featured && (
                          <span className="bg-amber-500 text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg">
                            Destacada
                          </span>
                        )}
                      </div>
                      <div className="absolute bottom-5 left-5 text-white drop-shadow-lg">
                        <p className="text-sm font-medium text-white/80 uppercase tracking-widest mb-1">Precio</p>
                        <p className="text-3xl font-black">{property.price_label}</p>
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
                        {property.beds > 0 && (
                          <div className="flex items-center gap-2" title="Habitaciones">
                            <Bed size={18} className="text-blue-500" />
                            <span className="font-bold">{property.beds}</span>
                          </div>
                        )}
                        {property.baths > 0 && (
                          <div className="flex items-center gap-2" title="Baños">
                            <Bath size={18} className="text-blue-500" />
                            <span className="font-bold">{property.baths}</span>
                          </div>
                        )}
                        {property.area && (
                          <div className="flex items-center gap-2" title="Área">
                            <Maximize size={18} className="text-blue-500" />
                            <span className="font-bold">{property.area}</span>
                          </div>
                        )}
                      </div>

                      <Link
                        href={`/propiedades/${property.id}`}
                        className="block w-full text-center py-4 mt-6 rounded-2xl bg-slate-50 text-slate-900 font-bold hover:bg-slate-900 hover:text-white transition-all transform active:scale-95"
                      >
                        Ver Detalles
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

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
              href="/propiedades"
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-blue-500/25 text-lg"
            >
              Ver Propiedades
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
