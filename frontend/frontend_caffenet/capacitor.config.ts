import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.caffeNet.app',
  appName: 'Caffenet',
  webDir: 'www',
  server: {
    cleartext: true,

    // @ts-ignore: Capacitor runtime acepta esta propiedad aunque no esté en los tipos
    allowMixedContent: true,

    allowNavigation: ['*']
  }
};

export default config;
