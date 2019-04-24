import config from '../config';

export default {
  getInfo: () => fetch(`${config.API_URL}/info.json`, {
    method: 'GET',
    headers: {
      Accept: 'application/json'
    },
  })
}