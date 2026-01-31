import { NextRequest, NextResponse } from 'next/server';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://painel.bvx.my.srv.br';
const SITE_ID = process.env.NEXT_PUBLIC_SITE_ID || '';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, name } = body;

    if (!email) {
      return NextResponse.json(
        { success: false, message: 'E-mail é obrigatório' },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: 'E-mail inválido' },
        { status: 400 }
      );
    }

    // Forward to main API
    const response = await fetch(`${API_URL}/api/v1/sites/${SITE_ID}/newsletter/subscribe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, name }),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { success: false, message: data.message || 'Erro ao processar inscrição' },
        { status: response.status }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Inscrição realizada com sucesso!',
    });
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      { success: false, message: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
