import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  if (req.headers.get('x-requested-with') !== 'fetch') return

  const { searchParams } = new URL(req.url, 'http://localhost:3000/')
  const offset = searchParams.get('offset')
  const limit = searchParams.get('limit')

  if (!offset || !limit) return

  const url = new URL(process.env.API_URL + '')
  url.searchParams.set('orders', '-publishedAt')
  url.searchParams.set('fields', 'id,titleEn,archiveImg,useTools')
  url.searchParams.set('offset', offset)
  url.searchParams.set('limit', limit)

  const response = await fetch(url.href, {
    headers: {
      'X-MICROCMS-API-KEY': process.env.API_KEY + '',
      Accept: 'application/json',
      'Content-Type': 'application/json;charset=utf-8',
    },
  })
  const data = await response.json()
  return NextResponse.json(data)
}
