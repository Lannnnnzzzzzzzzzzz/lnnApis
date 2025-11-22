# API Anime Scraper

API untuk scraping data anime dari website **Otakudesu.best**, **Kuronime.moe**, dan **Bornime.com**.

## 🚀 Features

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

## 📚 Endpoints

### Halaman Home
```
GET  /anime/home
```
Mendapatkan data dari halaman utama (ongoing & complete anime).

**Response:**
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
      "date": "2024-01-01"
    }
  ],
  "complete": [...]
}
```

### Jadwal Rilis Anime
```
GET  /anime/schedule
```
Mendapatkan jadwal rilis anime per hari.

**Response:**
```json
{
  "monday": [...],
  "tuesday": [...],
  "wednesday": [...],
  "thursday": [...],
  "friday": [...],
  "saturday": [...],
  "sunday": [...]
}
```

### Daftar Semua Anime (Unlimited)
```
GET  /anime/unlimited
```
Daftar semua anime dari A-Z tanpa paginasi.

**Response:**
```json
{
  "A": [
    {
      "title": "Attack on Titan",
      "slug": "attack-on-titan-sub-indo",
      "href": "https://otakudesu.best/anime/attack-on-titan-sub-indo/"
    }
  ],
  "B": [...],
  ...
}
```

### Detail Lengkap Anime
```
GET  /anime/anime/:slug
```
Mendapatkan detail lengkap sebuah anime.

**Contoh:**
```
GET  /anime/anime/one-piece-sub-indo
```

**Response:**
```json
{
  "title": "One Piece",
  "japaneseTitle": "ワンピース",
  "image": "https://...",
  "info": {
    "title": "One Piece",
    "japanese": "ワンピース",
    "score": "8.5",
    "producer": "Toei Animation",
    "type": "TV Series",
    "status": "Ongoing",
    "totalEpisode": "1000+",
    "duration": "24 min per ep",
    "releaseDate": "Oct 20, 1999",
    "studio": "Toei Animation"
  },
  "genres": ["Action", "Adventure", "Comedy"],
  "synopsis": "...",
  "episodes": [
    {
      "title": "One Piece Episode 1000",
      "slug": "one-piece-episode-1000-sub-indo",
      "href": "https://otakudesu.best/episode/one-piece-episode-1000-sub-indo/",
      "date": "2024-01-01"
    }
  ]
}
```

### Anime Tamat per Halaman
```
GET  /anime/complete-anime/:page
```
Daftar anime tamat berdasarkan halaman.

**Contoh:**
```
GET  /anime/complete-anime/1
```

**Response:**
```json
{
  "data": [...],
  "pagination": {
    "currentPage": 1,
    "hasNext": true,
    "hasPrev": false
  }
}
```

### Anime yang Sedang Tayang
```
GET  /anime/ongoing-anime?page=1
```
Daftar anime yang sedang tayang (ongoing).

**Contoh:**
```
GET  /anime/ongoing-anime?page=1
```

### Daftar Semua Genre
```
GET  /anime/genre
```
Daftar semua genre yang tersedia.

**Response:**
```json
[
  {
    "name": "Action",
    "slug": "action",
    "href": "https://otakudesu.best/genres/action/"
  },
  ...
]
```

### Daftar Anime Berdasarkan Genre
```
GET  /anime/genre/:slug?page=1
```
Anime by genre tertentu dengan pagination.

**Contoh:**
```
GET  /anime/genre/action?page=1
```

**Response:**
```json
{
  "genre": "Action",
  "data": [...],
  "pagination": {
    "currentPage": 1,
    "hasNext": true,
    "hasPrev": false
  }
}
```

### Detail dan Link Episode
```
GET  /anime/episode/:slug
```
Detail episode dengan link streaming dan download.

**Contoh:**
```
GET  /anime/episode/one-piece-episode-1000-sub-indo
```

**Response:**
```json
{
  "title": "One Piece Episode 1000 Subtitle Indonesia",
  "animeTitle": "One Piece",
  "downloadLinks": {
    "quality_360p": [
      {
        "provider": "Zippyshare",
        "url": "https://..."
      }
    ],
    "quality_480p": [...],
    "quality_720p": [...],
    "quality_1080p": [...]
  },
  "streamingLinks": [
    {
      "server": "StreamSB",
      "quality": "720p",
      "url": "https://..."
    }
  ],
  "navigation": {
    "prev": "https://...",
    "next": "https://..."
  }
}
```

## 🌐 Base URLs

- **Otakudesu**: `https://otakudesu.best` (default)
- **Kuronime**: `https://kuronime.moe`
- **Bornime**: `https://bornime.com`

## ⚠️ Catatan

- Jika terjadi error scraping, kemungkinan struktur HTML website telah berubah
- Kirim file HTML mentahan untuk debugging jika diperlukan
- API ini hanya untuk tujuan edukasi
- Hormati hak cipta konten

## 🛠️ Tech Stack

- Express.js
- Axios
- Cheerio
- Node.js

## 📝 License

ISC

## 👨‍💻 Author

Built with ❤️ for anime lovers
