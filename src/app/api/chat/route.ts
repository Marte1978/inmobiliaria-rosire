import { NextRequest, NextResponse } from 'next/server'
import { getProperties } from '@/features/properties/services/properties.service'

const WEBHOOK_URL = 'https://automatizacion-n8n.lnr2f0.easypanel.host/webhook/aneurys2'

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()

        // 🧠 Get properties for context
        const properties = await getProperties()
        const propertiesContext = properties.map(p =>
            `- ${p.title} en ${p.location}: ${p.price_label}, ${p.beds} habs, ${p.baths} baños. Tipo: ${p.type}.`
        ).join('\n')

        // Include context in the payload for n8n/AI
        const payload = {
            ...body,
            systemContext: `Información de propiedades disponibles actualmente en Inmobiliaria Rosire:\n${propertiesContext}\n\nResponde siempre basándote en esta información si el usuario pregunta por propiedades.`
        }

        const webhookResponse = await fetch(WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(payload),
        })

        if (!webhookResponse.ok) {
            return NextResponse.json(
                { error: 'Webhook request failed', status: webhookResponse.status },
                { status: webhookResponse.statusText ? 502 : 500 }
            )
        }

        const contentType = webhookResponse.headers.get('content-type')

        if (contentType && contentType.includes('application/json')) {
            const data = await webhookResponse.json()
            return NextResponse.json(data)
        } else {
            const text = await webhookResponse.text()
            return NextResponse.json({ text })
        }
    } catch (error) {
        console.error('❌ Chat proxy error:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}
