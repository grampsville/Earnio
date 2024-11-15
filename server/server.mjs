// import express from 'express';
// import fetch from 'node-fetch';
// import cron from 'node-cron';
// import fs from 'fs-extra';
// import path from 'path';
// import { fileURLToPath } from 'url';

// // Fix __dirname and __filename in ES modules
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const app = express();
// const PORT = process.env.PORT || 3000;
// const RESPONSES_DIR = path.join(__dirname, 'responses');
// const CACHE_FILE = path.join(RESPONSES_DIR, 'cachedResponse.json');

// // Ensure the responses directory exists
// fs.ensureDirSync(RESPONSES_DIR);

// // Serve static files from the root directory
// app.use(express.static(path.join(__dirname, '../')));

// // URLs to fetch data from
// const apiUrls = ['https://www.earningswhispers.com/earningsnews'];

// // Fetch data from the APIs and save to the cache file
// async function fetchData() {
//   try {
//     const responses = await Promise.all(apiUrls.map(url => fetch(url)));
//     const data = await Promise.all(responses.map(res => res.json()));

//     // Save data to cache file
//     await fs.writeFile(CACHE_FILE, data);
//     console.log(`Data fetched and saved at ${new Date().toISOString()}`);
//   } catch (error) {
//     console.error('Error fetching data:', error);
//   }
// }

// // Schedule fetchData to run every hour
// cron.schedule('0 * * * *', fetchData);

// // Endpoint to serve the cached data to the frontend
// app.get('/data', async (req, res) => {
//   try {
//     // Check if cache file exists and serve it
//     if (await fs.pathExists(CACHE_FILE)) {
//       const cachedData = await fs.readJson(CACHE_FILE);
//       return res.json(cachedData);
//     }

//     // If no cache file exists, fetch data immediately
//     await fetchData();
//     const newData = await fs.readJson(CACHE_FILE);
//     res.json(newData);
//   } catch (error) {
//     console.error('Error reading cache:', error);
//     res.status(500).json({ error: 'Failed to retrieve data' });
//   }
// });

// // Initial data fetch when the server starts
// fetchData();

// // Start the server
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });











// import express from 'express';
// import fetch from 'node-fetch';
// import fs from 'fs-extra';
// import path from 'path';
// import { fileURLToPath } from 'url';
// // import cors from 'cors';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const RESPONSES_DIR = path.join(__dirname, 'responses');
// const CACHE_FILE = path.join(RESPONSES_DIR, 'cachedResponse.json');
// fs.ensureDirSync(RESPONSES_DIR);
// const app = express();
// const PORT = 3000;
// // app.use(cors());

// let earningsData = [];

// // Function to fetch data from the API
// const fetchData = async () => {
//   try {
//     const response = await fetch('https://www.earningswhispers.com/earningsnews');
//     if (response.ok) {
      
//       await fs.writeFile(CACHE_FILE, response);
//       // earningsData = await response.json();
//       console.log("Data fetched successfully.");
//     } else {
//       console.error("Failed to fetch data:", response.statusText);
//     }
//   } catch (error) {
//     console.error("Error fetching data:", error);
//   }
// };

// // Function to call fetchData at random intervals
// const scheduleFetch = () => {
//   const interval = Math.floor(Math.random() * (60 - 10 + 1) + 10) * 60000; // Random interval between 10 and 60 minutes
//   fetchData();
//   setTimeout(scheduleFetch, interval);
// };

// // Start the fetch loop
// scheduleFetch();

// // Endpoint to provide data
// app.get('/data', (req, res) => {
//   // res.json(earningsData);
//   earningsData;
// });

// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });









import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
const PORT = 3000;
app.use(cors());

let earningsData = [];

// Function to fetch data from the API with headers
const fetchData = async () => {
  try {
    const response = await fetch('https://www.earningswhispers.com/api/todaysresults', {
      method: 'GET',
      headers: {
        'authority': 'www.earningswhispers.com',
        'path': '/api/todaysresults',
        'scheme': 'https',
        'accept': 'application/json, text/javascript, */*; q=0.01',
        'accept-encoding': 'gzip, deflate, br, zstd',
        'accept-language': 'en-US,en;q=0.9,he-IL;q=0.8,he;q=0.7',
        
        'priority': 'u=1, i',
        'referer': 'https://www.earningswhispers.com/earningsnews',
        'sec-ch-ua': '"Chromium";v="130", "Google Chrome";v="130", "Not?A_Brand";v="99"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36',
        'x-requested-with': 'XMLHttpRequest',
        //'cookie': '<YOUR_COOKIE_HERE>' // Replace with the actual cookie value from your browser
      }
    });
    
    if (response.ok) {
      earningsData = await response.json();
      console.log("Data fetched successfully.");
    } else {
      console.error("Failed to fetch data:", response.statusText);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

// Function to call fetchData at random intervals
const scheduleFetch = () => {
  const interval = Math.floor(Math.random() * (60 - 10 + 1) + 10) * 60000; // Random interval between 10 and 60 minutes
  fetchData();
  setTimeout(scheduleFetch, interval);
};

// Start the fetch loop
scheduleFetch();

// Endpoint to provide data
app.get('/data', (req, res) => {
  res.json(earningsData);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});