const axios = require('axios');

const axiosHelper = {
  get: (url) => axios.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36' } }),
};

module.exports = axiosHelper;
