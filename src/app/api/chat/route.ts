import { NextRequest, NextResponse } from 'next/server'

const WEBHOOK_URL = 'https://automatizacion-n8n.lnr2f0.easypanel.host/webhook/aneurys2'

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()

        const webhookResponse = await fetch(WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(body),
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
