'use client'

import { useEffect, useState } from 'react'
import QRCode from 'qrcode'

export default function QrCodePage() {
  const [qrCode, setQrCode] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    QRCode.toDataURL(`${window.location.origin}/`, {
      width: 320,
      margin: 2,
      color: { dark: '#111317', light: '#ffffff' },
    })
      .then(setQrCode)
      .catch(() => setError('Impossible de générer le QR code. Rechargez la page pour réessayer.'))
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#090a0c] px-5 py-12 text-white">
      <a href="/" className="mb-10 flex items-center gap-3 transition-opacity hover:opacity-80">
        <img src="/pathe-logo.webp" alt="Pathé" className="h-10 w-[60px] object-contain" />
        <span className="font-semibold tracking-tight">Pathé</span>
      </a>

      <section className="w-full max-w-md rounded-3xl border border-white/10 bg-[#111317] p-7 text-center shadow-2xl sm:p-10">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#ffc400]">Commande depuis votre siège</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight">Scannez pour commander</h1>
        <p className="mx-auto mt-3 max-w-xs text-sm leading-6 text-white/55">
          Scannez ce QR code avec votre téléphone pour accéder à la page d’accueil et découvrir notre menu.
        </p>

        <div className="mx-auto mt-8 flex size-[280px] max-w-full items-center justify-center rounded-2xl bg-white p-3 sm:size-[320px]">
          {qrCode ? (
            <img src={qrCode} alt="QR code vers la page d’accueil de Pathé" className="size-full" />
          ) : error ? (
            <p role="alert" className="text-sm text-red-700">{error}</p>
          ) : (
            <div className="size-full animate-pulse rounded-lg bg-black/10" aria-label="Génération du QR code" />
          )}
        </div>

        <a href="/" className="mt-8 inline-flex rounded-xl bg-[#ffc400] px-5 py-3 font-semibold text-[#17130a] transition hover:bg-[#ffda45]">
          Accéder à la page d’accueil
        </a>
      </section>
    </main>
  )
}
