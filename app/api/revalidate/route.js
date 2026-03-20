import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'

export async function GET(request) {
  const authHeader = request.headers.get('authorization');
  
  // Sécurité pour éviter que n'importe qui déclenche la mise à jour
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response('Unauthorized', { status: 401 });
  }

  // On demande à Next.js de rafraîchir la page d'accueil et les articles
  revalidatePath('/')
  revalidatePath('/chroniques/[slug]', 'page')

  return NextResponse.json({ 
    revalidated: true, 
    now: Date.now(),
    message: "Boussole & Banjo est à jour !" 
  })
}