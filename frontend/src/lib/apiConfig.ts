const isProduction = process.env.NODE_ENV === 'production';

const API_URL = isProduction
  ? 'https://automaze-to-do.onrender.com'
  : 'http://localhost:5000';

export default API_URL;
