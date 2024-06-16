export const BASE_URL =
  import.meta.env.MODE === 'development'
    ? 'http://localhost:5000'
    : 'https://api.bidai.hammadtariq.me';

export const USERS_URL = `${BASE_URL}/api/users`;
