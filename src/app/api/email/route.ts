import { NextResponse, type NextRequest } from 'next/server'
import nodemailer from 'nodemailer'
import Mail from 'nodemailer/lib/mailer'

export async function POST(request: NextRequest) {
  const { name, email, message } = await request.json()

  const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PASSWORD,
    },
  })

  // 管理者用
  const mailOptionsToAdmin: Mail.Options = {
    from: process.env.NODEMAILER_EMAIL,
    to: process.env.NODEMAILER_EMAIL,
    subject: `Message from お問い合わせ (${email})`,
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  }

  // 自動返信メールのオプション
  const autoReplyMailOptions: Mail.Options = {
    from: process.env.NODEMAILER_EMAIL,
    to: email,
    subject: 'お問い合わせありがとうございます',
    text: `${name}様\n\nお問い合わせありがとうございます。\n以下の内容で承りました。\n\n---\n${message}\n---\n\nお問い合わせ内容を確認後、\n数日以内にメールにて返信させて頂きます。`,
  }

  try {
    await transport.sendMail(mailOptionsToAdmin)
    await transport.sendMail(autoReplyMailOptions)

    return NextResponse.json({ message: 'Success!', status: 200 })
  } catch (err) {
    console.error('Failed to send email:', err)
    return NextResponse.json({ message: 'Failed!', status: 500 })
  }
}
