import axios from 'axios';

export function init(headers = {}) {
  return axios.create({ headers });
}
