import { environment } from '../environments/environment';

const { apiHost, apiPort, apiPrefix } = environment;

export const API_BASE_URL =
  apiPort === '443'
    ? `${apiHost}${apiPrefix}`
    : `${apiHost}:${apiPort}${apiPrefix}`;