import Link from 'next/link'
import { Home, Facebook, Instagram, Twitter, Linkedin, Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
    return (
        <footer className="bg-slate-950 text-slate-300 py-16 font-sans">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

                    {/* Brand */}
                    <div className="space-y-4">
                        <Link href="/" className="flex items-center gap-2 group text-white">
                            <div className="bg-blue-600 p-2 rounded-lg">
                                <Home className="text-white w-5 h-5" />
                            </div>
                            <span className="text-xl font-bold tracking-tight">Inmobiliaria Rosire</span>
                        </Link>
                        <p className="text-sm leading-relaxed text-slate-400">
                            Transformando el mercado inmobiliario con tecnología y compromiso. Encuentra tu hogar ideal con nosotros.
                        </p>
                        <div className="flex gap-4 pt-2">
                            {[Facebook, Instagram, Twitter, Linkedin].map((Icon, i) => (
                                <a key={i} href="#" className="hover:text-white transition-colors p-2 hover:bg-slate-800 rounded-full">
                                    <Icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 className="text-white font-semibold mb-6">Navegación</h4>
                        <ul className="space-y-3 text-sm">
                            {['Inicio', 'Propiedades', 'Agentes', 'Blog', 'Contacto'].map((item) => (
                                <li key={item}>
                                    <Link href="#" className="hover:text-blue-400 transition-colors">{item}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="text-white font-semibold mb-6">Servicios</h4>
                        <ul className="space-y-3 text-sm">
                            {['Venta de Inmuebles', 'Alquiler', 'Tasaciones', 'Asesoría Legal', 'Inversiones'].map((item) => (
                                <li key={item}>
                                    <Link href="#" className="hover:text-blue-400 transition-colors">{item}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-white font-semibold mb-6">Contacto</h4>
                        <ul className="space-y-4 text-sm">
                            <li className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 text-blue-500 shrink-0" />
                                <span>Av. Principal 123, Santo Domingo, República Dominicana</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="w-5 h-5 text-blue-500 shrink-0" />
                                <span>+1 (809) 972-1828</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="w-5 h-5 text-blue-500 shrink-0" />
                                <span>contacto@inmobiliariarosire.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-slate-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
                    <p>© {new Date().getFullYear()} Inmobiliaria Rosire. Todos los derechos reservados.</p>
                    <div className="flex gap-6">
                        <Link href="#" className="hover:text-white">Política de Privacidad</Link>
                        <Link href="#" className="hover:text-white">Términos de Servicio</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
