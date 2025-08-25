const isProduction = process.env.NODE_ENV === 'production';

const API_URL = isProduction
  ? 'https://automaze-to-do.onrender.com/api'
  : 'http://localhost:5000/api';

export default API_URL;
