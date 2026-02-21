'use client'

import { useState, useRef, useEffect, Fragment } from 'react'
import { MessageCircle, X, Send } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

const WEBHOOK_URL = '/api/chat' // Proxy route — evita CORS
const WHATSAPP_LINK = 'https://wa.me/18096860000' // WhatsApp de Rosire

interface ChatMessage {
    id: string
    text: string
    sender: 'user' | 'bot'
    timestamp: Date
}

// 🔍 Detección exhaustiva: busca en 8 campos diferentes
const RESPONSE_FIELDS = ['recommendations', 'text', 'output', 'message', 'response', 'result', 'data', 'content'] as const

function extractMessageFromResponse(data: unknown): string | null {
    // Si es string directo
    if (typeof data === 'string' && data.trim().length > 0) return data.trim()

    // Si es un array, buscar en el primer elemento
    if (Array.isArray(data) && data.length > 0) {
        return extractMessageFromResponse(data[0])
    }

    // Si es un objeto, buscar en los 8 campos
    if (typeof data === 'object' && data !== null) {
        const obj = data as Record<string, unknown>
        for (const field of RESPONSE_FIELDS) {
            const value = obj[field]
            if (typeof value === 'string' && value.trim().length > 0) {
                return value.trim()
            }
            // Si el campo es un objeto/array, buscar recursivamente
            if (typeof value === 'object' && value !== null) {
                const nested = extractMessageFromResponse(value)
                if (nested) return nested
            }
        }
    }

    return null
}

function renderMessageWithLinks(text: string) {
    const urlRegex = /(https?:\/\/[^\s]+)/g
    const parts = text.split(urlRegex)
    return parts.map((part, index) => {
        if (part.match(urlRegex)) {
            return (
                <a
                    key={index}
                    href={part}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 underline hover:text-blue-300 break-all transition-colors font-semibold"
                >
                    {part}
                </a>
            )
        }
        return <Fragment key={index}>{part}</Fragment>
    })
}

export default function ChatWidget() {
    const [open, setOpen] = useState(false)
    const [msgs, setMsgs] = useState<ChatMessage[]>([
        {
            id: 'init',
            text: '¡Hola! 🏠 Soy el asistente virtual de Inmobiliaria Rosire. Te ayudo a encontrar la propiedad de tus sueños o a publicar la tuya. ¿En qué puedo ayudarte hoy?',
            sender: 'bot',
            timestamp: new Date()
        }
    ])
    const [inputValue, setInputValue] = useState('')
    const [isTyping, setIsTyping] = useState(false)
    const [sessionId, setSessionId] = useState('')

    const messagesEndRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    // Session Logic
    useEffect(() => {
        let currentSession = localStorage.getItem('rosire_session_id')
        if (!currentSession) {
            currentSession = 'rosire-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9)
            localStorage.setItem('rosire_session_id', currentSession)
        }
        setSessionId(currentSession)
    }, [])

    // Auto-scroll
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    useEffect(() => {
        if (open) {
            scrollToBottom()
            setTimeout(() => inputRef.current?.focus(), 100)
        }
    }, [open, msgs])

    const handleSendMessage = async () => {
        if (!inputValue.trim()) return

        const userText = inputValue
        setInputValue('')

        setMsgs(prev => [...prev, {
            id: Date.now().toString(),
            text: userText,
            sender: 'user',
            timestamp: new Date()
        }])

        setIsTyping(true)

        try {
            const response = await fetch(WEBHOOK_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    message: userText,
                    sessionId: sessionId
                })
            })

            let botText = 'Lo siento, tuve un problema de conexión.'

            if (response.ok) {
                const contentType = response.headers.get('content-type')
                if (contentType && contentType.includes('application/json')) {
                    const data = await response.json()
                    const extracted = extractMessageFromResponse(data)
                    if (extracted) botText = extracted
                } else {
                    const text = await response.text()
                    if (text && text.length > 1) botText = text
                }
            }

            setMsgs(prev => [...prev, {
                id: (Date.now() + 1).toString(),
                text: botText,
                sender: 'bot',
                timestamp: new Date()
            }])
        } catch (error) {
            console.error('❌ Chat Error:', error)
            setMsgs(prev => [...prev, {
                id: (Date.now() + 1).toString(),
                text: 'Error de red. Verifica tu conexión.',
                sender: 'bot',
                timestamp: new Date()
            }])
        } finally {
            setIsTyping(false)
        }
    }

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') handleSendMessage()
    }

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
            {/* Chat Window */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.25 }}
                        className="w-[350px] max-w-[calc(100vw-2rem)] h-[500px] rounded-2xl flex flex-col overflow-hidden shadow-2xl border border-white/10 mb-2"
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-slate-900 to-blue-900 p-4 flex justify-between items-center relative overflow-hidden">
                            <div className="absolute inset-0 bg-white/5" />
                            <div className="flex items-center gap-3 text-white relative z-10">
                                <div className="relative">
                                    <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center backdrop-blur-sm border border-white/10">
                                        <MessageCircle size={20} />
                                    </div>
                                    <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-slate-900" />
                                </div>
                                <div>
                                    <div className="text-sm font-bold">Asistente Rosire</div>
                                    <div className="flex items-center gap-1.5">
                                        <span className="text-[10px] text-white/80">En línea</span>
                                        {sessionId && (
                                            <span className="text-[9px] bg-white/20 px-1.5 py-0.5 rounded text-white/90">
                                                • Memoria activa
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => setOpen(false)}
                                className="text-white/70 hover:text-white hover:bg-white/10 w-8 h-8 rounded-full flex items-center justify-center transition-all relative z-10"
                            >
                                <X size={16} />
                            </button>
                        </div>

                        {/* Messages Body */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-900/95">
                            {msgs.map(m => (
                                <div key={m.id} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={cn(
                                        'max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm',
                                        m.sender === 'user'
                                            ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-br-none'
                                            : 'bg-slate-800 text-slate-200 border border-slate-700 rounded-bl-none'
                                    )}>
                                        {renderMessageWithLinks(m.text)}
                                    </div>
                                </div>
                            ))}
                            {isTyping && (
                                <div className="flex justify-start">
                                    <div className="bg-slate-800 border border-slate-700 rounded-2xl rounded-bl-none px-4 py-3">
                                        <div className="flex gap-1.5">
                                            <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" />
                                            <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                            <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="p-4 bg-slate-900 border-t border-white/5">
                            <div className="relative flex items-center gap-2">
                                <input
                                    ref={inputRef}
                                    className="w-full bg-slate-800/50 border border-slate-700 rounded-full pl-5 pr-12 py-3 text-sm text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-slate-500 transition-all"
                                    placeholder="Escribe tu pregunta..."
                                    value={inputValue}
                                    onChange={e => setInputValue(e.target.value)}
                                    onKeyDown={handleKeyPress}
                                />
                                <button
                                    onClick={handleSendMessage}
                                    disabled={!inputValue.trim()}
                                    className="absolute right-1.5 w-9 h-9 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 text-white flex items-center justify-center hover:shadow-lg hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 transition-all"
                                >
                                    <Send size={14} />
                                </button>
                            </div>
                            <div className="text-center mt-2">
                                <span className="text-[10px] text-slate-600 font-medium uppercase tracking-wider">Powered by Rosire AI</span>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Chat Toggle Button */}
            {!open && (
                <motion.button
                    onClick={() => setOpen(true)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="h-14 w-14 rounded-full bg-slate-900 text-white shadow-lg shadow-slate-900/30 flex items-center justify-center hover:bg-slate-800 transition-all relative"
                >
                    <MessageCircle size={24} />
                    <span className="absolute top-0 right-0 flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75" />
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500" />
                    </span>
                </motion.button>
            )}

            {open && (
                <motion.button
                    onClick={() => setOpen(false)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="h-14 w-14 rounded-full bg-slate-900 text-white shadow-lg flex items-center justify-center"
                >
                    <X size={24} />
                </motion.button>
            )}

            {/* WhatsApp Button */}
            <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="h-14 w-14 rounded-full bg-[#25D366] text-white shadow-lg shadow-green-500/30 flex items-center justify-center text-3xl hover:scale-110 transition-all hover:shadow-green-500/50"
            >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
            </a>
        </div>
    )
}
