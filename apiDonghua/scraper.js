const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

async function scrapeMainPage() {
  try {
    const { data } = await axios.get('https://anichin.cafe/');
    const $ = cheerio.load(data);

    const results = [];

    // Scrape latest releases from homepage
    $('.listupd.normal .excstf article.bs').each((index, element) => {
      const title = $(element).find('h2[itemprop="headline"]').text().trim();
      const href = $(element).find('a.tip').attr('href')?.replace('https://anichin.cafe', '/episode') || '';
      const imgSrc = $(element).find('img.ts-post-image').attr('src');
      const episode = $(element).find('.bt .epx').text().trim();
      const type = $(element).find('.typez').text().trim();

      results.push({
        title,
        href,
        image: imgSrc,
        episode,
        type
      });
    });

    return results;
  } catch (error) {
    console.error('Error scraping the main page:', error);
    return [];
  }
}

async function scrapeOngoingPage() {
  try {
      const url = 'https://anichin.cafe/schedule/';
      const { data } = await axios.get(url);
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
        'sch_monday': 'monday',
        'sch_tuesday': 'tuesday',
        'sch_wednesday': 'wednesday',
        'sch_thursday': 'thursday',
        'sch_friday': 'friday',
        'sch_saturday': 'saturday',
        'sch_sunday': 'sunday'
      };

      // Iterate through each day section
      Object.keys(dayMapping).forEach(dayClass => {
        const dayKey = dayMapping[dayClass];
        $(`.bixbox.schedulepage.${dayClass} .listupd .bs`).each((i, element) => {
          const title = $(element).find('a').attr('title')?.trim() || '';
          const seriesLink = $(element).find('a').attr('href')?.replace('https://anichin.cafe', '') || '';
          const imageSrc = $(element).find('img').attr('src') || '';
          const episodeCount = $(element).find('.bt .sb').text().trim();
          const releaseTime = $(element).find('.bt .epx').text().trim();

          schedule[dayKey].push({
              title,
              seriesLink,
              imageSrc,
              episodeCount,
              releaseTime
          });
        });
      });

      return schedule;
  } catch (error) {
      console.error('Error scraping ongoing series:', error);
      return { error: 'Failed to retrieve ongoing series' };
  }
}

// Function to scrape a specific episode
async function scrapeEndpoint(endpoint) {
  try {
    const url = `https://anichin.cafe${endpoint}`;
    console.log('Scraping URL:', url);

    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    const title = $('.entry-title').text().trim();
    const iframeSrc = $('.player-embed iframe').attr('src');

    const singleInfo = $('.single-info.bixbox');

    const mainImage = singleInfo.find('.thumb img').attr('src');
    const mainTitle = singleInfo.find('.infox h2[itemprop="partOfSeries"]').text().trim();
    const alternativeTitle = singleInfo.find('.infox .alter').text().trim();
    const rating = singleInfo.find('.infox .rating strong').text().replace('Rating', '').trim();

    const infoContent = singleInfo.find('.infox .info-content .spe');
    const status = infoContent.find('span:contains("Status:")').text().replace('Status:', '').trim();
    const network = infoContent.find('span:contains("Network:") a').text().trim();
    const studio = infoContent.find('span:contains("Studio:") a').text().trim();
    const released = infoContent.find('span:contains("Released:")').text().replace('Released:', '').trim();
    const duration = infoContent.find('span:contains("Duration:")').text().replace('Duration:', '').trim();
    const season = infoContent.find('span:contains("Season:") a').text().trim();
    const country = infoContent.find('span:contains("Country:") a').text().trim();
    const type = infoContent.find('span:contains("Type:")').text().replace('Type:', '').trim();
    const episodes = infoContent.find('span:contains("Episodes:")').text().replace('Episodes:', '').trim();
    const fansub = infoContent.find('span:contains("Fansub:")').text().replace('Fansub:', '').trim();

    const genres = singleInfo.find('.infox .genxed a').map((i, el) => $(el).text().trim()).get();
    const description = singleInfo.find('.infox .desc').text().trim();

    const episodeList = [];
    $('.eplister ul li').each((index, element) => {
      const episodeHref = $(element).find('a').attr('href')?.replace('https://anichin.cafe', '/episode') || '';
      const thumbnelSrc = $(element).find('.thumbnel img').attr('src');
      const episodeTitle = $(element).find('.playinfo h4').text().trim();
      const episodeDetails = $(element).find('.playinfo span').text().trim();

      episodeList.push({
        href: episodeHref,
        thumbnail: thumbnelSrc,
        title: episodeTitle,
        details: episodeDetails
      });
    });

    return {
      title,
      video_link: iframeSrc,
      details: {
        mainImage,
        mainTitle,
        alternativeTitle,
        rating,
        status,
        network,
        studio,
        released,
        duration,
        season,
        country,
        type,
        episodesCount: episodes,
        fansub,
        genres,
        description
      },
      episodes: episodeList

    };
  } catch (error) {
    console.error(`Error scraping the endpoint ${endpoint}:`, error);
    return { title: 'Error', releasedOn: 'Error', video: 'Error', episodes: [], details: {} };
  }
}

// list all completed series
async function scrapeCompletedPage(page = 1) {
  try {
    const url = page === 1 ? 'https://anichin.cafe/completed/' : `https://anichin.cafe/completed/page/${page}/`;
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    const results = [];

    // Scrape series from completed page
    $('article.bs').each((index, element) => {
      const title = $(element).find('h2[itemprop="headline"]').text().trim();
      const href = $(element).find('a.tip').attr('href');
      const path = href ? new URL(href, 'https://anichin.cafe').pathname : '';
      const imgSrc = $(element).find('img').attr('src');
      const type = $(element).find('.typez').text().trim();

      results.push({ title, href: path, image: imgSrc, type });
    });

    return results;
  } catch (error) {
    console.error('Error scraping the completed page:', error);
    return [];
  }
}



// scrape series
async function scrapeSeries(endpoint) {
    try {
        const url = `https://anichin.cafe/seri/${endpoint}`;
        console.log('Scraping Series URL:', url);

        const { data } = await axios.get(url);
        const $ = cheerio.load(data);

        const bigContent = $('.bigcontent');

        const mainImage = bigContent.find('.thumbook .thumb img').attr('src');
        const rating = bigContent.find('.rt .rating strong').text().replace('Rating ', '').trim();
        const followed = bigContent.find('.rt .bmc').text().replace('Followed ', '').trim();
        const mainTitle = bigContent.find('.infox h1.entry-title').text().trim();
        const alternativeTitle = bigContent.find('.infox .ninfo .alter').text().trim();
        const shortDescription = bigContent.find('.infox .ninfo .mindesc').text().trim();

        const infoContent = bigContent.find('.infox .info-content .spe');
        const status = infoContent.find('span:contains("Status:")').text().replace('Status:', '').trim();
        const network = infoContent.find('span:contains("Network:") a').text().trim();
        const studio = infoContent.find('span:contains("Studio:") a').text().trim();
        const released = infoContent.find('span:contains("Released:")').text().replace('Released:', '').trim();
        const duration = infoContent.find('span:contains("Duration:")').text().replace('Duration:', '').trim();
        const season = infoContent.find('span:contains("Season:") a').text().trim();
        const country = infoContent.find('span:contains("Country:") a').text().trim();
        const type = infoContent.find('span:contains("Type:")').text().replace('Type:', '').trim();
        const episodes = infoContent.find('span:contains("Episodes:")').text().replace('Episodes:', '').trim();
        const fansub = infoContent.find('span:contains("Fansub:")').text().replace('Fansub:', '').trim();
        const releasedOn = infoContent.find('span:contains("Released on:") time').text().trim();
        const updatedOn = infoContent.find('span:contains("Updated on:") time').text().trim();

        const genres = bigContent.find('.infox .genxed a').map((i, el) => $(el).text().trim()).get();
        const description = bigContent.find('.infox .info-content .desc').text().trim();

        const episodeList = [];
        $('.eplister ul li').each((i, el) => {
            const episodeNumber = $(el).find('.epl-num').text().trim();
            const episodeTitle = $(el).find('.epl-title').text().trim();
            const episodeLink = $(el).find('a').attr('href')?.replace('https://anichin.cafe', '/episode') || '';
            const episodeDate = $(el).find('.epl-date').text().trim();
            const subtitleStatus = $(el).find('.epl-sub span').text().trim();

            episodeList.push({
                episodeNumber,
                episodeTitle,
                episodeLink,
                episodeDate,
                subtitleStatus
            });
        });

        return {
            details: [{
                mainImage,
                mainTitle,
                alternativeTitle,
                shortDescription,
                rating,
                followed,
                status,
                network,
                studio,
                released,
                duration,
                season,
                country,
                type,
                episodes,
                fansub,
                releasedOn,
                updatedOn,
                genres,
                description,
            }],
            episode_list: episodeList
        };
    } catch (error) {
        console.error(`Error scraping the series endpoint ${endpoint}:`, error);
        return { error: 'Failed to retrieve series details' };
    }
}

async function scrapeGenres(genreName) {
  try {
    const url = `https://anichin.cafe/genres/${genreName}`;
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    const results = [];

    $('article.bs').each((index, element) => {
      const title = $(element).find('h2[itemprop="headline"]').text().trim();
      const href = $(element).find('a.tip').attr('href')?.replace('https://anichin.cafe', '') || '';
      const imgSrc = $(element).find('img').attr('src');
      const type = $(element).find('.typez').text().trim();

      results.push({ title, href, image: imgSrc, type });
    });

    return results;
  } catch (error) {
    console.error('Error scraping genres:', error);
    return [];
  }
}



app.get('/home', async (req, res) => {
  const data = await scrapeMainPage();
  res.json(data);
});

app.get('/ongoing', async (req, res) => {
  const data = await scrapeOngoingPage();
  res.json(data);
});

app.get('/episode/:endpoint', async (req, res) => {
  const { endpoint } = req.params;
  const data = await scrapeEndpoint(`/${endpoint}`);
  res.json(data);
});

app.get('/completed/:page?', async (req, res) => {
  const page = req.params.page || 1;
  const data = await scrapeCompletedPage(page);
  res.json(data);
});

app.get('/seri/:endpoint', async (req, res) => {
  const { endpoint } = req.params;
  const data = await scrapeSeries(endpoint);
  res.json(data);
});

app.get('/genres/:genreName', async (req, res) => {
  const { genreName } = req.params;
  const data = await scrapeGenres(genreName);
  res.json(data);
});


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});
  
app.use((req, res, next) => {
  res.status(404).json({
      error: 'Not Found',
      status: 404
  });
});


if (process.env.NODE_ENV !== 'production') {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}

module.exports = app;
