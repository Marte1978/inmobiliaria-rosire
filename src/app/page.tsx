import Image from 'next/image'
import Link from 'next/link'
import { Search, MapPin, Bed, Bath, Maximize, ArrowRight } from 'lucide-react'

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
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1600596542815-2250657a2e7c?q=80&w=2000&auto=format&fit=crop"
            alt="Hero Background"
            fill
            className="object-cover brightness-[0.6]"
            priority
          />
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center text-white space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight font-display">
            Encuentra el Hogar de tus Sueños
          </h1>
          <p className="text-xl md:text-2xl text-slate-200 max-w-2xl mx-auto">
            Descubre las propiedades más exclusivas en República Dominicana con el respaldo de expertos.
          </p>

          <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 mt-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Ubicación, ciudad o código postal..."
                  className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/90 text-slate-900 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex-[0.5]">
                <select className="w-full h-full px-4 rounded-xl bg-white/90 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none">
                  <option value="">Tipo de Propiedad</option>
                  <option value="casa">Casa</option>
                  <option value="apartamento">Apartamento</option>
                  <option value="terreno">Terreno</option>
                </select>
              </div>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg hover:shadow-blue-500/50 flex items-center justify-center gap-2">
                <Search className="w-5 h-5" />
                <span>Buscar</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="text-blue-600 font-semibold tracking-wider text-sm uppercase">Destacadas</span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2">Propiedades Recientes</h2>
            </div>
            <Link href="/propiedades" className="hidden md:flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 hover:translate-x-1 transition-all">
              Ver todas <ArrowRight size={20} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property) => (
              <div key={property.id} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-1">
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={property.image}
                    alt={property.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-sm shadow-sm">
                    {property.type}
                  </div>
                  <div className="absolute bottom-4 left-4 text-white font-bold text-2xl drop-shadow-md">
                    {property.price}
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-bold text-lg text-slate-900 mb-1 group-hover:text-blue-600 transition-colors line-clamp-1">{property.title}</h3>
                      <p className="text-slate-500 text-sm flex items-center gap-1">
                        <MapPin size={14} /> {property.location}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 py-4 border-t border-gray-100 text-sm text-slate-600">
                    <div className="flex items-center gap-1.5" title="Habitaciones">
                      <Bed size={16} className="text-blue-500" />
                      <span className="font-medium">{property.beds}</span>
                    </div>
                    <div className="flex items-center gap-1.5" title="Baños">
                      <Bath size={16} className="text-blue-500" />
                      <span className="font-medium">{property.baths}</span>
                    </div>
                    <div className="flex items-center gap-1.5" title="Área">
                      <Maximize size={16} className="text-blue-500" />
                      <span className="font-medium">{property.area}</span>
                    </div>
                  </div>

                  <Link
                    href={`/propiedades/${property.id}`}
                    className="block w-full text-center py-3 mt-2 rounded-xl bg-slate-50 text-slate-900 font-semibold hover:bg-slate-900 hover:text-white transition-colors"
                  >
                    Ver Detalles
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center md:hidden">
            <Link href="/propiedades" className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700">
              Ver todas las propiedades <ArrowRight size={20} />
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
