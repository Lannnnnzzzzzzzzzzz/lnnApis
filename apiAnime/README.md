# API Anime Scraper

API untuk scraping data anime dari website **Otakudesu.best**, **Kuronime.moe**, dan **Bornime.com**.

## 🚀 Features

- ✅ Scraping dari 3 source (Otakudesu, Kuronime, Bornime)
- ✅ Scraping halaman utama (ongoing & complete anime)
- ✅ Jadwal rilis anime per hari
- ✅ Daftar anime unlimited (A-Z)
- ✅ Detail lengkap anime
- ✅ Daftar anime tamat dengan pagination
- ✅ Daftar anime ongoing dengan pagination
- ✅ Daftar semua genre
- ✅ Anime berdasarkan genre dengan pagination
- ✅ Detail episode dengan link streaming & download

## 📦 Installation

```bash
npm install
```

## 🔧 Usage

### Development
```bash
npm run dev
```

Server akan berjalan di `http://localhost:3000`

### Production
Deploy ke Vercel atau platform Node.js lainnya.

## 📚 API Structure

### Base URLs

**Production:**
```
https://lnncloud.app/apiAnime
```

**Development:**
```
http://localhost:3000
```

### Source Identifiers

- **ota** = Otakudesu.best (✅ Ready)
- **kur** = Kuronime.moe (🚧 Coming Soon)
- **bor** = Bornime.com (🚧 Coming Soon)

### URL Pattern

```
/a/{source}/{endpoint}
```

**Examples:**
```
/a/ota/home
/a/kur/home
/a/bor/home
```

## 📚 Otakudesu Endpoints (Ready)

### 1. Halaman Home
```
GET  /a/ota/home
```
Mendapatkan data dari halaman utama (ongoing & complete anime).

### 2. Jadwal Rilis Anime
```
GET  /a/ota/schedule
```
Mendapatkan jadwal rilis anime per hari.

### 3. Daftar Semua Anime (Unlimited)
```
GET  /a/ota/unlimited
```
Daftar semua anime dari A-Z tanpa paginasi.

### 4. Detail Lengkap Anime
```
GET  /a/ota/anime/:slug
```
Mendapatkan detail lengkap sebuah anime.

**Example:** `/a/ota/anime/one-piece-sub-indo`

### 5. Anime Tamat per Halaman
```
GET  /a/ota/complete-anime/:page
```
Daftar anime tamat berdasarkan halaman.

**Example:** `/a/ota/complete-anime/1`

### 6. Anime yang Sedang Tayang
```
GET  /a/ota/ongoing-anime?page=1
```
Daftar anime yang sedang tayang (ongoing).

### 7. Daftar Semua Genre
```
GET  /a/ota/genre
```
Daftar semua genre yang tersedia.

### 8. Daftar Anime Berdasarkan Genre
```
GET  /a/ota/genre/:slug?page=1
```
Anime by genre tertentu (paged).

**Example:** `/a/ota/genre/action?page=1`

### 9. Detail dan Link Episode
```
GET  /a/ota/episode/:slug
```
Detail episode & link streaming.

**Example:** `/a/ota/episode/one-piece-episode-1000-sub-indo`

## 📖 Documentation Files

- **hasil-otaku.md** - Dokumentasi lengkap untuk Otakudesu endpoints
- **hasil-kuronime.md** - Dokumentasi untuk Kuronime endpoints (Coming Soon)
- **hasil-bornime.md** - Dokumentasi untuk Bornime endpoints (Coming Soon)

## 🌐 Response Format

Semua endpoint mengembalikan data dalam format JSON.

**Example Response:**
```json
{
  "ongoing": [
    {
      "title": "One Piece",
      "slug": "one-piece-sub-indo",
      "href": "https://otakudesu.best/anime/one-piece-sub-indo/",
      "image": "https://...",
      "episode": "Episode 1000",
      "day": "Minggu",
      "date": "22 Nov"
    }
  ],
  "complete": [...]
}
```

## ⚠️ Catatan

- Jika terjadi error scraping, kemungkinan struktur HTML website telah berubah
- Kirim file HTML mentahan untuk debugging jika diperlukan
- API ini hanya untuk tujuan edukasi
- Hormati hak cipta konten

## 🚧 Development Status

| Source | Status | Endpoints Available |
|--------|--------|---------------------|
| Otakudesu | ✅ Ready | 9/9 |
| Kuronime | 🚧 Coming Soon | 0/9 |
| Bornime | 🚧 Coming Soon | 0/9 |

## 🛠️ Tech Stack

- Express.js
- Axios
- Cheerio
- Node.js

## 📝 License

ISC

## 👨‍💻 Author

Built with ❤️ for anime lovers
