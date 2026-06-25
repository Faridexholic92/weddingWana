# Walimatul Urus · Hafiz & Aswana 🌿

Kad jemputan perkahwinan digital yang direka semula dengan tema **Emerald & Emas** — elegan, moden dan mesra telefon.

## ✨ Ciri-ciri
- **Tema Emerald & Emas** — botanical luxe, bersih dan mewah
- **Hero penuh skrin** dengan bingkai emas & gambar latar
- **Countdown Timer** ke hari majlis
- **Butiran Majlis** — Akad Nikah & Jamuan/Walimah + butang navigasi peta
- **Atur Cara (Tentatif)** majlis
- **Kod Pakaian** dengan palet warna
- **Kisah Cinta** — timeline berselang
- **Galeri Foto** grid responsif
- **Doa & Ucapan** — tetamu boleh tinggal ucapan (disimpan di pelayar)
- **RSVP** — borang pengesahan kehadiran + modal terima kasih
- **Hadiah/Sumbangan** — nombor akaun (butang salin) + ruang QR DuitNow
- **Hubungi** — telefon + WhatsApp
- **Muzik latar**, floating petals, scroll animations, back-to-top
- **100% responsif** untuk telefon, tablet & desktop

## 🛠 Teknologi
- HTML5, CSS3 (Grid, Flexbox, Custom Properties, Animations)
- Vanilla JavaScript (tiada framework)
- Google Fonts (Playfair Display, Great Vibes, Cormorant Garamond, Jost)
- Font Awesome 6

## 📝 Cara Sesuaikan (Edit di sini)
| Apa | Di mana |
|-----|---------|
| **Tarikh & masa majlis** | `js/main.js` → pemboleh ubah `WEDDING_DATE` (di baris paling atas) |
| **Nama pengantin & ibu bapa** | `index.html` — cari `Hafiz`, `Aswana`, dan `____________` |
| **Lokasi & masa** | bahagian `#event` dan `#tentatif` dalam `index.html` |
| **Pautan peta (Waze/Google)** | butang `.btn-map` — ganti `href="#"` |
| **No. akaun bank** | bahagian `#gift` — teks + atribut `data-copy` pada butang Salin |
| **QR DuitNow** | ganti `.qr-ph` dengan `<img src="...">` |
| **No. telefon / WhatsApp** | bahagian `#contact` |
| **Foto pasangan** | ganti `.portrait-inner` dengan `<img src="...">` |
| **Foto galeri** | ganti `.gal-ph` dengan `<img src="...">` |
| **Muzik** | ganti `assets/music/wedding-song.mp3` |

## 🚀 Cara Guna
1. Buka `index.html` terus dalam pelayar, atau
2. Deploy ke **GitHub Pages / Netlify / Vercel** (drag & drop folder).

## 💡 Nota
- Ucapan tetamu & RSVP kini disimpan di pelayar tetamu (localStorage / demo sahaja).
  Untuk kumpul data sebenar, sambungkan borang ke Google Forms, Formspree, atau Supabase.

---
Direka semula dengan ❤️ untuk Hafiz & Aswana
