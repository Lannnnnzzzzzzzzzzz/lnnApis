const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

const BASE_URLS = {
  ota: 'https://otakudesu.best',
  kur: 'https://kuronime.moe',
  bor: 'https://bornime.com'
};

// OTAKUDESU SCRAPERS
async function scrapeHomePageOta(baseUrl) {
  try {
    const { data } = await axios.get(baseUrl);
    const $ = cheerio.load(data);

    const results = {
      ongoing: [],
      complete: []
    };

    $('.venz ul li').each((index, element) => {
      const title = $(element).find('h2.jdlflm').text().trim();
      const href = $(element).find('.thumb a').attr('href') || $(element).find('.thumbz a').attr('href') || '';
      const slug = href ? href.split('/').filter(Boolean).pop() : '';
      const imgSrc = $(element).find('.thumbz img').attr('src') || $(element).find('.thumb img').attr('src');
      const episode = $(element).find('.epz').text().trim();
      const day = $(element).find('.epztipe').text().trim();
      const date = $(element).find('.newnime').text().trim();

      if (title) {
        results.ongoing.push({
          title,
          slug,
          href,
          image: imgSrc,
          episode,
          day,
          date
        });
      }
    });

    $('.rseries .rapi .venz ul li').each((index, element) => {
      const title = $(element).find('h2.jdlflm').text().trim();
      const href = $(element).find('.thumbz a').attr('href') || $(element).find('.thumb a').attr('href') || '';
      const slug = href ? href.split('/').filter(Boolean).pop() : '';
      const imgSrc = $(element).find('.thumbz img').attr('src') || $(element).find('.thumb img').attr('src');
      const episode = $(element).find('.epz').text().trim();
      const rating = $(element).find('.epztipe').text().trim();
      const date = $(element).find('.newnime').text().trim();

      if (title) {
        results.complete.push({
          title,
          slug,
          href,
          image: imgSrc,
          episode,
          rating,
          date
        });
      }
    });

    return results;
  } catch (error) {
    console.error('Error scraping home page:', error.message);
    return { ongoing: [], complete: [] };
  }
}

async function scrapeScheduleOta(baseUrl) {
  try {
    const { data } = await axios.get(`${baseUrl}/jadwal-rilis/`);
    const $ = cheerio.load(data);

    const schedule = {
      monday: [],
      tuesday: [],
      wednesday: [],
      thursday: [],
      friday: [],
      saturday: [],
      sunday: []
    };

    const dayMapping = {
      'Senin': 'monday',
      'Selasa': 'tuesday',
      'Rabu': 'wednesday',
      'Kamis': 'thursday',
      'Jumat': 'friday',
      'Sabtu': 'saturday',
      'Minggu': 'sunday'
    };

    $('.kglist321').each((index, element) => {
      const dayText = $(element).find('h2').text().trim();
      const dayKey = dayMapping[dayText];

      if (dayKey) {
        $(element).find('ul li').each((i, el) => {
          const title = $(el).find('a').text().trim();
          const href = $(el).find('a').attr('href') || '';
          const slug = href ? href.split('/').filter(Boolean).pop() : '';

          if (title) {
            schedule[dayKey].push({
              title,
              slug,
              href
            });
          }
        });
      }
    });

    return schedule;
  } catch (error) {
    console.error('Error scraping schedule:', error.message);
    return { error: 'Failed to retrieve schedule' };
  }
}

async function scrapeUnlimitedOta(baseUrl) {
  try {
    const { data } = await axios.get(`${baseUrl}/anime-list/`);
    const $ = cheerio.load(data);

    const results = {};

    $('.bariskelom').each((index, element) => {
      const letter = $(element).find('.barispenz a').text().trim();
      const animeList = [];

      $(element).find('.jdlbar').each((i, el) => {
        const title = $(el).text().trim();
        const href = $(el).attr('href') || '';
        const slug = href ? href.split('/').filter(Boolean).pop() : '';

        if (title) {
          animeList.push({
            title,
            slug,
            href
          });
        }
      });

      if (letter && animeList.length > 0) {
        results[letter] = animeList;
      }
    });

    return results;
  } catch (error) {
    console.error('Error scraping unlimited anime list:', error.message);
    return {};
  }
}

async function scrapeAnimeDetailOta(baseUrl, slug) {
  try {
    const url = `${baseUrl}/anime/${slug}/`;
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    const title = $('.jdlrx h1').text().trim();
    const japaneseTitle = $('.jdlrx .alter').text().trim();
    const imgSrc = $('.fotoanime img').attr('src');

    const infoData = {};
    $('.infozingle p').each((i, el) => {
      const text = $(el).text();
      if (text.includes('Judul:')) infoData.title = text.replace('Judul:', '').trim();
      if (text.includes('Japanese:')) infoData.japanese = text.replace('Japanese:', '').trim();
      if (text.includes('Skor:')) infoData.score = text.replace('Skor:', '').trim();
      if (text.includes('Produser:')) infoData.producer = text.replace('Produser:', '').trim();
      if (text.includes('Tipe:')) infoData.type = text.replace('Tipe:', '').trim();
      if (text.includes('Status:')) infoData.status = text.replace('Status:', '').trim();
      if (text.includes('Total Episode:')) infoData.totalEpisode = text.replace('Total Episode:', '').trim();
      if (text.includes('Durasi:')) infoData.duration = text.replace('Durasi:', '').trim();
      if (text.includes('Tanggal Rilis:')) infoData.releaseDate = text.replace('Tanggal Rilis:', '').trim();
      if (text.includes('Studio:')) infoData.studio = text.replace('Studio:', '').trim();
    });

    const genres = [];
    $('.infozingle p span.genre-info a').each((i, el) => {
      genres.push($(el).text().trim());
    });

    const synopsis = $('.sinopc').text().trim();

    const episodeList = [];
    $('.episodelist ul li').each((i, el) => {
      const episodeTitle = $(el).find('span a').text().trim();
      const episodeHref = $(el).find('span a').attr('href') || '';
      const episodeSlug = episodeHref ? episodeHref.split('/').filter(Boolean).pop() : '';
      const episodeDate = $(el).find('.zeebr').text().trim();

      if (episodeTitle) {
        episodeList.push({
          title: episodeTitle,
          slug: episodeSlug,
          href: episodeHref,
          date: episodeDate
        });
      }
    });

    return {
      title,
      japaneseTitle,
      image: imgSrc,
      info: infoData,
      genres,
      synopsis,
      episodes: episodeList
    };
  } catch (error) {
    console.error(`Error scraping anime detail ${slug}:`, error.message);
    return { error: 'Failed to retrieve anime details' };
  }
}

async function scrapeCompletedAnimeOta(baseUrl, page = 1) {
  try {
    const url = page === 1
      ? `${baseUrl}/complete-anime/`
      : `${baseUrl}/complete-anime/page/${page}/`;

    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    const results = [];

    $('.venz ul li').each((index, element) => {
      const title = $(element).find('h2.jdlflm').text().trim();
      const href = $(element).find('.thumbz a').attr('href') || $(element).find('.thumb a').attr('href') || '';
      const slug = href ? href.split('/').filter(Boolean).pop() : '';
      const imgSrc = $(element).find('.thumbz img').attr('src') || $(element).find('.thumb img').attr('src');
      const episode = $(element).find('.epz').text().trim();
      const rating = $(element).find('.epztipe').text().trim();
      const date = $(element).find('.newnime').text().trim();

      if (title) {
        results.push({
          title,
          slug,
          href,
          image: imgSrc,
          episode,
          rating,
          date
        });
      }
    });

    const pagination = {
      currentPage: page,
      hasNext: $('.pagination .next').length > 0,
      hasPrev: $('.pagination .prev').length > 0
    };

    return { data: results, pagination };
  } catch (error) {
    console.error('Error scraping completed anime:', error.message);
    return { data: [], pagination: {} };
  }
}

async function scrapeOngoingAnimeOta(baseUrl, page = 1) {
  try {
    const url = page === 1
      ? `${baseUrl}/ongoing-anime/`
      : `${baseUrl}/ongoing-anime/page/${page}/`;

    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    const results = [];

    $('.venz ul li').each((index, element) => {
      const title = $(element).find('h2.jdlflm').text().trim();
      const href = $(element).find('.thumbz a').attr('href') || $(element).find('.thumb a').attr('href') || '';
      const slug = href ? href.split('/').filter(Boolean).pop() : '';
      const imgSrc = $(element).find('.thumbz img').attr('src') || $(element).find('.thumb img').attr('src');
      const episode = $(element).find('.epz').text().trim();
      const day = $(element).find('.epztipe').text().trim();
      const date = $(element).find('.newnime').text().trim();

      if (title) {
        results.push({
          title,
          slug,
          href,
          image: imgSrc,
          episode,
          day,
          date
        });
      }
    });

    const pagination = {
      currentPage: page,
      hasNext: $('.pagination .next').length > 0,
      hasPrev: $('.pagination .prev').length > 0
    };

    return { data: results, pagination };
  } catch (error) {
    console.error('Error scraping ongoing anime:', error.message);
    return { data: [], pagination: {} };
  }
}

async function scrapeGenreListOta(baseUrl) {
  try {
    const { data } = await axios.get(`${baseUrl}/genre-list/`);
    const $ = cheerio.load(data);

    const genres = [];

    $('.genres li a').each((i, el) => {
      const name = $(el).text().trim();
      const href = $(el).attr('href') || '';
      const slug = href ? href.split('/').filter(Boolean).pop() : '';

      if (name) {
        genres.push({
          name,
          slug,
          href
        });
      }
    });

    return genres;
  } catch (error) {
    console.error('Error scraping genre list:', error.message);
    return [];
  }
}

async function scrapeAnimeByGenreOta(baseUrl, slug, page = 1) {
  try {
    const url = page === 1
      ? `${baseUrl}/genres/${slug}/`
      : `${baseUrl}/genres/${slug}/page/${page}/`;

    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    const genreName = $('.listupd .page-title').text().trim();
    const results = [];

    $('.col-anime .col-anime-con').each((index, element) => {
      const title = $(element).find('.col-anime-title a').text().trim();
      const href = $(element).find('.col-anime-title a').attr('href') || '';
      const animeSlug = href ? href.split('/').filter(Boolean).pop() : '';
      const imgSrc = $(element).find('.col-anime-cover img').attr('src');
      const studio = $(element).find('.col-anime-studio').text().trim();
      const episode = $(element).find('.col-anime-eps').text().trim();
      const rating = $(element).find('.col-anime-rating').text().trim();
      const synopsis = $(element).find('.col-synopsis p').text().trim();

      if (title) {
        results.push({
          title,
          slug: animeSlug,
          href,
          image: imgSrc,
          studio,
          episode,
          rating,
          synopsis
        });
      }
    });

    const pagination = {
      currentPage: page,
      hasNext: $('.pagination .next').length > 0,
      hasPrev: $('.pagination .prev').length > 0
    };

    return {
      genre: genreName,
      data: results,
      pagination
    };
  } catch (error) {
    console.error('Error scraping anime by genre:', error.message);
    return { genre: '', data: [], pagination: {} };
  }
}

async function scrapeEpisodeDetailOta(baseUrl, slug) {
  try {
    const url = `${baseUrl}/episode/${slug}/`;
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    const title = $('.venutama .posttl').text().trim();
    const animeTitle = $('.venutama .posttl').text().split(' Episode')[0].trim();

    const streamLinks = {
      quality_360p: [],
      quality_480p: [],
      quality_720p: [],
      quality_1080p: []
    };

    $('.download ul li').each((i, el) => {
      const quality = $(el).find('strong').text().trim();
      const links = [];

      $(el).find('a').each((idx, link) => {
        const provider = $(link).text().trim();
        const href = $(link).attr('href') || '';

        if (provider && href) {
          links.push({
            provider,
            url: href
          });
        }
      });

      if (quality.includes('360p')) streamLinks.quality_360p = links;
      if (quality.includes('480p')) streamLinks.quality_480p = links;
      if (quality.includes('720p')) streamLinks.quality_720p = links;
      if (quality.includes('1080p')) streamLinks.quality_1080p = links;
    });

    const mirrorLinks = [];
    $('.mirrorstream ul').each((i, el) => {
      const server = $(el).find('strong').text().trim();
      $(el).find('a').each((idx, link) => {
        const quality = $(link).text().trim();
        const href = $(link).attr('href') || '';

        if (quality && href) {
          mirrorLinks.push({
            server,
            quality,
            url: href
          });
        }
      });
    });

    const navigation = {
      prev: $('.flir a:contains("Episode Sebelumnya")').attr('href') || null,
      next: $('.flir a:contains("Episode Selanjutnya")').attr('href') || null
    };

    return {
      title,
      animeTitle,
      downloadLinks: streamLinks,
      streamingLinks: mirrorLinks,
      navigation
    };
  } catch (error) {
    console.error(`Error scraping episode detail ${slug}:`, error.message);
    return { error: 'Failed to retrieve episode details' };
  }
}

// KURONIME & BORNIME SCRAPERS (struktur mirip dengan Otakudesu, tinggal sesuaikan selector)
async function scrapeHomePageKurBor(baseUrl) {
  try {
    const { data } = await axios.get(baseUrl);
    const $ = cheerio.load(data);

    const results = {
      ongoing: [],
      complete: []
    };

    // Selector untuk Kuronime/Bornime (sesuaikan dengan struktur HTML mereka)
    $('.post-show ul li, .items article').each((index, element) => {
      const title = $(element).find('h2, .entry-title').text().trim();
      const href = $(element).find('a').first().attr('href') || '';
      const slug = href ? href.split('/').filter(Boolean).pop() : '';
      const imgSrc = $(element).find('img').attr('src') || $(element).find('img').attr('data-src');
      const episode = $(element).find('.episode, .type').text().trim();

      if (title) {
        results.ongoing.push({
          title,
          slug,
          href,
          image: imgSrc,
          episode,
          day: '',
          date: ''
        });
      }
    });

    return results;
  } catch (error) {
    console.error('Error scraping home page:', error.message);
    return { ongoing: [], complete: [] };
  }
}

// ROUTING
app.get('/a/ota/home', async (req, res) => {
  const data = await scrapeHomePageOta(BASE_URLS.ota);
  res.json(data);
});

app.get('/a/ota/schedule', async (req, res) => {
  const data = await scrapeScheduleOta(BASE_URLS.ota);
  res.json(data);
});

app.get('/a/ota/unlimited', async (req, res) => {
  const data = await scrapeUnlimitedOta(BASE_URLS.ota);
  res.json(data);
});

app.get('/a/ota/anime/:slug', async (req, res) => {
  const { slug } = req.params;
  const data = await scrapeAnimeDetailOta(BASE_URLS.ota, slug);
  res.json(data);
});

app.get('/a/ota/complete-anime/:page?', async (req, res) => {
  const page = parseInt(req.params.page) || 1;
  const data = await scrapeCompletedAnimeOta(BASE_URLS.ota, page);
  res.json(data);
});

app.get('/a/ota/ongoing-anime', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const data = await scrapeOngoingAnimeOta(BASE_URLS.ota, page);
  res.json(data);
});

app.get('/a/ota/genre', async (req, res) => {
  const data = await scrapeGenreListOta(BASE_URLS.ota);
  res.json(data);
});

app.get('/a/ota/genre/:slug', async (req, res) => {
  const { slug } = req.params;
  const page = parseInt(req.query.page) || 1;
  const data = await scrapeAnimeByGenreOta(BASE_URLS.ota, slug, page);
  res.json(data);
});

app.get('/a/ota/episode/:slug', async (req, res) => {
  const { slug } = req.params;
  const data = await scrapeEpisodeDetailOta(BASE_URLS.ota, slug);
  res.json(data);
});

// KURONIME ROUTES
app.get('/a/kur/home', async (req, res) => {
  const data = await scrapeHomePageKurBor(BASE_URLS.kur);
  res.json(data);
});

app.get('/a/kur/schedule', async (req, res) => {
  res.json({ message: 'Coming soon - Need HTML structure' });
});

app.get('/a/kur/unlimited', async (req, res) => {
  res.json({ message: 'Coming soon - Need HTML structure' });
});

app.get('/a/kur/anime/:slug', async (req, res) => {
  res.json({ message: 'Coming soon - Need HTML structure' });
});

app.get('/a/kur/complete-anime/:page?', async (req, res) => {
  res.json({ message: 'Coming soon - Need HTML structure' });
});

app.get('/a/kur/ongoing-anime', async (req, res) => {
  res.json({ message: 'Coming soon - Need HTML structure' });
});

app.get('/a/kur/genre', async (req, res) => {
  res.json({ message: 'Coming soon - Need HTML structure' });
});

app.get('/a/kur/genre/:slug', async (req, res) => {
  res.json({ message: 'Coming soon - Need HTML structure' });
});

app.get('/a/kur/episode/:slug', async (req, res) => {
  res.json({ message: 'Coming soon - Need HTML structure' });
});

// BORNIME ROUTES
app.get('/a/bor/home', async (req, res) => {
  const data = await scrapeHomePageKurBor(BASE_URLS.bor);
  res.json(data);
});

app.get('/a/bor/schedule', async (req, res) => {
  res.json({ message: 'Coming soon - Need HTML structure' });
});

app.get('/a/bor/unlimited', async (req, res) => {
  res.json({ message: 'Coming soon - Need HTML structure' });
});

app.get('/a/bor/anime/:slug', async (req, res) => {
  res.json({ message: 'Coming soon - Need HTML structure' });
});

app.get('/a/bor/complete-anime/:page?', async (req, res) => {
  res.json({ message: 'Coming soon - Need HTML structure' });
});

app.get('/a/bor/ongoing-anime', async (req, res) => {
  res.json({ message: 'Coming soon - Need HTML structure' });
});

app.get('/a/bor/genre', async (req, res) => {
  res.json({ message: 'Coming soon - Need HTML structure' });
});

app.get('/a/bor/genre/:slug', async (req, res) => {
  res.json({ message: 'Coming soon - Need HTML structure' });
});

app.get('/a/bor/episode/:slug', async (req, res) => {
  res.json({ message: 'Coming soon - Need HTML structure' });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.use((req, res, next) => {
  res.status(404).json({
    error: 'Not Found',
    status: 404,
    message: 'Endpoint tidak ditemukan'
  });
});

if (process.env.NODE_ENV !== 'production') {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}

module.exports = app;
