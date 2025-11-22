# Otakudesu API - Endpoint Documentation

Base URL: `https://lnncloud.app/apiAnime` atau `http://localhost:3000`

---

## 1. /a/ota/home

**Description:** Data anime ongoing dan complete dari halaman utama otakudesu.best

**Method:** GET

**Endpoint:** `/a/ota/home`

**Response Sample:**
```json
{
  "ongoing": [
    {
      "title": "Watari-kun no xx ga Houkai Sunzen",
      "slug": "watari-xx-ga-houkai-sunzen-sub-indo",
      "href": "https://otakudesu.best/anime/watari-xx-ga-houkai-sunzen-sub-indo/",
      "image": "https://otakudesu.best/wp-content/uploads/2025/07/Watari-kun-no-xx-ga-Houkai-Sunzen.jpg",
      "episode": "Episode 21",
      "day": "Sabtu",
      "date": "22 Nov"
    },
    {
      "title": "Sanda",
      "slug": "sanda-sub-indo",
      "href": "https://otakudesu.best/anime/sanda-sub-indo/",
      "image": "https://otakudesu.best/wp-content/uploads/2025/10/151767.jpg",
      "episode": "Episode 8",
      "day": "Sabtu",
      "date": "22 Nov"
    }
  ],
  "complete": [
    {
      "title": "Jibaku Shounen Hanako-kun Season 2 Part 2",
      "slug": "jibaku-shounen-hanako-kun-season-2-part-2-sub-indo",
      "href": "https://otakudesu.best/anime/jibaku-shounen-hanako-kun-season-2-part-2-sub-indo/",
      "image": "https://otakudesu.best/wp-content/uploads/2025/11/Jibaku-Shounen-Hanako-kun-Season-2-Part-2-Sub-Indo.jpg",
      "episode": "12 Episode",
      "rating": "8.03",
      "date": "12 Nov"
    }
  ]
}
```

---

## 2. /a/ota/schedule

**Description:** Jadwal rilis anime per hari (Senin-Minggu)

**Method:** GET

**Endpoint:** `/a/ota/schedule`

**Response Sample:**
```json
{
  "monday": [
    {
      "title": "One Piece",
      "slug": "one-piece-sub-indo",
      "href": "https://otakudesu.best/anime/one-piece-sub-indo/"
    },
    {
      "title": "Boruto: Naruto Next Generations",
      "slug": "boruto-naruto-next-generations-sub-indo",
      "href": "https://otakudesu.best/anime/boruto-naruto-next-generations-sub-indo/"
    }
  ],
  "tuesday": [],
  "wednesday": [],
  "thursday": [],
  "friday": [],
  "saturday": [],
  "sunday": []
}
```

---

## 3. /a/ota/unlimited

**Description:** Daftar semua anime dari A-Z tanpa paginasi

**Method:** GET

**Endpoint:** `/a/ota/unlimited`

**Response Sample:**
```json
{
  "A": [
    {
      "title": "Attack on Titan",
      "slug": "attack-on-titan-sub-indo",
      "href": "https://otakudesu.best/anime/attack-on-titan-sub-indo/"
    },
    {
      "title": "Ao no Exorcist",
      "slug": "ao-no-exorcist-sub-indo",
      "href": "https://otakudesu.best/anime/ao-no-exorcist-sub-indo/"
    }
  ],
  "B": [
    {
      "title": "Bleach",
      "slug": "bleach-sub-indo",
      "href": "https://otakudesu.best/anime/bleach-sub-indo/"
    }
  ]
}
```

---

## 4. /a/ota/anime/:slug

**Description:** Detail lengkap sebuah anime

**Method:** GET

**Endpoint:** `/a/ota/anime/:slug`

**Example:** `/a/ota/anime/one-piece-sub-indo`

**Response Sample:**
```json
{
  "title": "One Piece",
  "japaneseTitle": "ワンピース",
  "image": "https://otakudesu.best/wp-content/uploads/2019/10/One-Piece-Sub-Indo.jpg",
  "info": {
    "title": "One Piece",
    "japanese": "ワンピース",
    "score": "8.58",
    "producer": "Toei Animation",
    "type": "TV Series",
    "status": "Ongoing",
    "totalEpisode": "1000+",
    "duration": "24 min per ep",
    "releaseDate": "Oct 20, 1999",
    "studio": "Toei Animation"
  },
  "genres": ["Action", "Adventure", "Comedy", "Drama", "Fantasy"],
  "synopsis": "Gol D. Roger, seorang yang dikenal sebagai Raja Bajak Laut...",
  "episodes": [
    {
      "title": "One Piece Episode 1000 Subtitle Indonesia",
      "slug": "one-piece-episode-1000-sub-indo",
      "href": "https://otakudesu.best/episode/one-piece-episode-1000-sub-indo/",
      "date": "22 Nov"
    }
  ]
}
```

---

## 5. /a/ota/complete-anime/:page

**Description:** Daftar anime tamat berdasarkan halaman

**Method:** GET

**Endpoint:** `/a/ota/complete-anime/:page`

**Example:** `/a/ota/complete-anime/1`

**Response Sample:**
```json
{
  "data": [
    {
      "title": "Sword Art Online: Alicization",
      "slug": "sao-alicization-sub-indo",
      "href": "https://otakudesu.best/anime/sao-alicization-sub-indo/",
      "image": "https://otakudesu.best/wp-content/uploads/2019/10/SAO-Alicization.jpg",
      "episode": "24 Episode",
      "rating": "7.85",
      "date": "15 Nov"
    },
    {
      "title": "Jujutsu Kaisen Season 2",
      "slug": "jujutsu-kaisen-season-2-sub-indo",
      "href": "https://otakudesu.best/anime/jujutsu-kaisen-season-2-sub-indo/",
      "image": "https://otakudesu.best/wp-content/uploads/2023/07/JJK-S2.jpg",
      "episode": "23 Episode",
      "rating": "8.78",
      "date": "10 Nov"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "hasNext": true,
    "hasPrev": false
  }
}
```

---

## 6. /a/ota/ongoing-anime?page=1

**Description:** Daftar anime yang sedang tayang (ongoing)

**Method:** GET

**Endpoint:** `/a/ota/ongoing-anime?page=1`

**Response Sample:**
```json
{
  "data": [
    {
      "title": "Blue Lock Season 2",
      "slug": "blue-lock-season-2-sub-indo",
      "href": "https://otakudesu.best/anime/blue-lock-season-2-sub-indo/",
      "image": "https://otakudesu.best/wp-content/uploads/2025/10/blue-lock-s2.jpg",
      "episode": "Episode 9",
      "day": "Sabtu",
      "date": "22 Nov"
    },
    {
      "title": "Dandadan",
      "slug": "dandadan-sub-indo",
      "href": "https://otakudesu.best/anime/dandadan-sub-indo/",
      "image": "https://otakudesu.best/wp-content/uploads/2025/10/dandadan.jpg",
      "episode": "Episode 8",
      "day": "Jumat",
      "date": "21 Nov"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "hasNext": true,
    "hasPrev": false
  }
}
```

---

## 7. /a/ota/genre

**Description:** Daftar semua genre yang tersedia

**Method:** GET

**Endpoint:** `/a/ota/genre`

**Response Sample:**
```json
[
  {
    "name": "Action",
    "slug": "action",
    "href": "https://otakudesu.best/genres/action/"
  },
  {
    "name": "Adventure",
    "slug": "adventure",
    "href": "https://otakudesu.best/genres/adventure/"
  },
  {
    "name": "Comedy",
    "slug": "comedy",
    "href": "https://otakudesu.best/genres/comedy/"
  },
  {
    "name": "Drama",
    "slug": "drama",
    "href": "https://otakudesu.best/genres/drama/"
  }
]
```

---

## 8. /a/ota/genre/:slug?page=1

**Description:** Anime berdasarkan genre tertentu dengan pagination

**Method:** GET

**Endpoint:** `/a/ota/genre/:slug?page=1`

**Example:** `/a/ota/genre/action?page=1`

**Response Sample:**
```json
{
  "genre": "Action",
  "data": [
    {
      "title": "One Punch Man Season 3",
      "slug": "one-punch-man-season-3-sub-indo",
      "href": "https://otakudesu.best/anime/one-punch-man-season-3-sub-indo/",
      "image": "https://otakudesu.best/wp-content/uploads/2025/10/opm-s3.jpg",
      "studio": "Madhouse",
      "episode": "24 Episodes",
      "rating": "8.65",
      "synopsis": "Saitama adalah seorang pahlawan yang bisa mengalahkan musuh dengan satu pukulan..."
    }
  ],
  "pagination": {
    "currentPage": 1,
    "hasNext": true,
    "hasPrev": false
  }
}
```

---

## 9. /a/ota/episode/:slug

**Description:** Detail episode dengan link streaming dan download

**Method:** GET

**Endpoint:** `/a/ota/episode/:slug`

**Example:** `/a/ota/episode/one-piece-episode-1000-sub-indo`

**Response Sample:**
```json
{
  "title": "One Piece Episode 1000 Subtitle Indonesia",
  "animeTitle": "One Piece",
  "downloadLinks": {
    "quality_360p": [
      {
        "provider": "Zippyshare",
        "url": "https://..."
      },
      {
        "provider": "Google Drive",
        "url": "https://..."
      }
    ],
    "quality_480p": [],
    "quality_720p": [],
    "quality_1080p": []
  },
  "streamingLinks": [
    {
      "server": "StreamSB",
      "quality": "720p",
      "url": "https://..."
    },
    {
      "server": "Desustream",
      "quality": "1080p",
      "url": "https://..."
    }
  ],
  "navigation": {
    "prev": "https://otakudesu.best/episode/one-piece-episode-999-sub-indo/",
    "next": "https://otakudesu.best/episode/one-piece-episode-1001-sub-indo/"
  }
}
```

---

## URL Pattern

### Production
```
https://lnncloud.app/apiAnime/a/ota/home
https://lnncloud.app/apiAnime/a/kur/home
https://lnncloud.app/apiAnime/a/bor/home
```

### Development
```
http://localhost:3000/a/ota/home
http://localhost:3000/a/kur/home
http://localhost:3000/a/bor/home
```

---

## Notes

- **ota** = Otakudesu.best
- **kur** = Kuronime.moe (Coming soon - Need HTML structure)
- **bor** = Bornime.com (Coming soon - Need HTML structure)
- Semua endpoint menggunakan metode GET
- Response format: JSON
- Timestamp menggunakan ISO 8601 format
