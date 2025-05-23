import { Capacitor } from '@capacitor/core';
import { environment } from '../environments/environment';

const { apiHost, apiPort, apiPrefix } = environment;

const host =
  Capacitor.getPlatform() === 'android'
    ? 'https://7s68n3g8-9000.use2.devtunnels.ms'      // IP real para Android
    : apiHost;


export const API_BASE_URL =
  apiPort === '443'
    ? `${host}${apiPrefix}`
    : `${host}:${apiPort}${apiPrefix}`;