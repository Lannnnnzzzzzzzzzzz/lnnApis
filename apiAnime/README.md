# API Anime Scraper - Otakudesu

API untuk scraping data anime dari website **Otakudesu.best**

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

Server berjalan di `http://localhost:3000`

## 📚 Endpoints

1. `GET /anime/home` - Halaman utama
2. `GET /anime/schedule` - Jadwal rilis
3. `GET /anime/unlimited` - Daftar A-Z
4. `GET /anime/anime/:slug` - Detail anime
5. `GET /anime/complete-anime/:page` - Anime tamat
6. `GET /anime/ongoing-anime?page=1` - Anime ongoing
7. `GET /anime/genre` - List genre
8. `GET /anime/genre/:slug?page=1` - Anime by genre
9. `GET /anime/episode/:slug` - Detail episode

Lihat **hasil-otaku.md** untuk dokumentasi lengkap.

## 🛠️ Tech Stack

- Express.js, Axios, Cheerio, Node.js

## 📝 License

ISC
