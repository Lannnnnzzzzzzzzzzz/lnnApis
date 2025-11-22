# Kuronime API - Endpoint Documentation

Base URL: `https://lnncloud.app/apiAnime` atau `http://localhost:3000`

---

## Status: Coming Soon

Endpoint untuk Kuronime sedang dalam tahap development. Membutuhkan struktur HTML dari website kuronime.moe untuk membuat scraper yang akurat.

## Planned Endpoints

### 1. /a/kur/home
**Description:** Data anime ongoing dan complete dari halaman utama kuronime.moe
**Status:** 🚧 Coming Soon

### 2. /a/kur/schedule
**Description:** Jadwal rilis anime per hari
**Status:** 🚧 Coming Soon

### 3. /a/kur/unlimited
**Description:** Daftar semua anime dari A-Z tanpa paginasi
**Status:** 🚧 Coming Soon

### 4. /a/kur/anime/:slug
**Description:** Detail lengkap sebuah anime
**Status:** 🚧 Coming Soon

### 5. /a/kur/complete-anime/:page
**Description:** Daftar anime tamat berdasarkan halaman
**Status:** 🚧 Coming Soon

### 6. /a/kur/ongoing-anime?page=1
**Description:** Daftar anime yang sedang tayang
**Status:** 🚧 Coming Soon

### 7. /a/kur/genre
**Description:** Daftar semua genre yang tersedia
**Status:** 🚧 Coming Soon

### 8. /a/kur/genre/:slug?page=1
**Description:** Anime berdasarkan genre tertentu
**Status:** 🚧 Coming Soon

### 9. /a/kur/episode/:slug
**Description:** Detail episode dengan link streaming dan download
**Status:** 🚧 Coming Soon

---

## How to Help

Jika ingin membantu development endpoint Kuronime, kirimkan file HTML mentahan dari:
- Homepage: https://kuronime.moe/
- Detail anime page
- Episode page
- Genre page
- Schedule page

File HTML akan digunakan untuk menganalisa struktur dan membuat scraper yang tepat.

---

## URL Pattern

### Production
```
https://lnncloud.app/apiAnime/a/kur/home
https://lnncloud.app/apiAnime/a/kur/schedule
https://lnncloud.app/apiAnime/a/kur/unlimited
```

### Development
```
http://localhost:3000/a/kur/home
http://localhost:3000/a/kur/schedule
http://localhost:3000/a/kur/unlimited
```

---

## Notes

- **kur** = Kuronime.moe
- Endpoint akan diupdate setelah struktur HTML tersedia
- Response format akan sama dengan Otakudesu (JSON)
