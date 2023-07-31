import { NextResponse } from "next/server";

export async function GET(req: Request) {
  if (req.headers.get('x-requested-with') !== 'fetch') return;

  const { searchParams } = new URL(req.url, "http://localhost:3000/");
  const publishedAt = searchParams.get("publishedAt");

  if (!publishedAt) return;

  const url = new URL(process.env.API_URL+'');
  url.searchParams.set("limit", '1');
  url.searchParams.set("fields", "id,title_en");
  url.searchParams.set("orders", "-publishedAt");
  url.searchParams.set("filters", `publishedAt[less_than]${publishedAt}`);

  const response = await fetch(url.href, {
    headers: {
      "X-MICROCMS-API-KEY": process.env.API_KEY + '',
      Accept: "application/json",
      "Content-Type": "application/json;charset=utf-8"
    }});

    try {
      const data = await response.json();
      const {contents} = data
      return NextResponse.json(contents[0]);
    } catch (error) {
      return
    }
  }