import fetch from 'node-fetch';
// start test: node test/test-rate-limit.js
const BASE_URL = 'http://localhost:3000';
const TOTAL_REQUESTS = 120;
const DELAY_MS = 50;

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function testRateLimit() {
  console.log('Starting rate limit test...');
  
  for (let i = 0; i < TOTAL_REQUESTS; i++) {
    try {
      const res = await fetch(BASE_URL);
      console.log(`Request ${i + 1}: Status ${res.status}`);
      
      const text = await res.text();
      if (text.includes('Too many requests')) {
        console.log(`Request ${i + 1}: Rate limit kicked in!`);
      }
      
      await sleep(DELAY_MS); // Attendre avant la prochaine requête
    } catch (err) {
      console.error(`Request ${i + 1} failed:`, err.code || err.message);
    }
  }
}

testRateLimit();
