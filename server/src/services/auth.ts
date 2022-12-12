import config from 'config';
import { init } from 'utils/http';

export async function fetchUserByToken(token: string) {
  const {
    auth: { authURL, clientId }
  } = config;

  const headers = {
    accessToken: token,
    clientId
  };

  const httpInstance = init(headers);

  return httpInstance
    .get(`${authURL}/userinfo`)
    .then((response) => response.data.data);
}
