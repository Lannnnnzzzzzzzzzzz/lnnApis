# Bornime API - Endpoint Documentation

Base URL: `https://lnncloud.app/apiAnime` atau `http://localhost:3000`

---

## Status: Coming Soon

Endpoint untuk Bornime sedang dalam tahap development. Membutuhkan struktur HTML dari website bornime.com untuk membuat scraper yang akurat.

## Planned Endpoints

### 1. /a/bor/home
**Description:** Data anime ongoing dan complete dari halaman utama bornime.com
**Status:** 🚧 Coming Soon

### 2. /a/bor/schedule
**Description:** Jadwal rilis anime per hari
**Status:** 🚧 Coming Soon

### 3. /a/bor/unlimited
**Description:** Daftar semua anime dari A-Z tanpa paginasi
**Status:** 🚧 Coming Soon

### 4. /a/bor/anime/:slug
**Description:** Detail lengkap sebuah anime
**Status:** 🚧 Coming Soon

### 5. /a/bor/complete-anime/:page
**Description:** Daftar anime tamat berdasarkan halaman
**Status:** 🚧 Coming Soon

### 6. /a/bor/ongoing-anime?page=1
**Description:** Daftar anime yang sedang tayang
**Status:** 🚧 Coming Soon

### 7. /a/bor/genre
**Description:** Daftar semua genre yang tersedia
**Status:** 🚧 Coming Soon

### 8. /a/bor/genre/:slug?page=1
**Description:** Anime berdasarkan genre tertentu
**Status:** 🚧 Coming Soon

### 9. /a/bor/episode/:slug
**Description:** Detail episode dengan link streaming dan download
**Status:** 🚧 Coming Soon

---

## How to Help

Jika ingin membantu development endpoint Bornime, kirimkan file HTML mentahan dari:
- Homepage: https://bornime.com/
- Detail anime page
- Episode page
- Genre page
- Schedule page

File HTML akan digunakan untuk menganalisa struktur dan membuat scraper yang tepat.

---

## URL Pattern

### Production
```
https://lnncloud.app/apiAnime/a/bor/home
https://lnncloud.app/apiAnime/a/bor/schedule
https://lnncloud.app/apiAnime/a/bor/unlimited
```

### Development
```
http://localhost:3000/a/bor/home
http://localhost:3000/a/bor/schedule
http://localhost:3000/a/bor/unlimited
```

---

## Notes

- **bor** = Bornime.com
- Endpoint akan diupdate setelah struktur HTML tersedia
- Response format akan sama dengan Otakudesu (JSON)
