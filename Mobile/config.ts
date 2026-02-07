import Constants from 'expo-constants';

const envUrl = process.env.EXPO_PUBLIC_API_URL;
const debuggerHost =
  Constants.expoConfig?.hostUri ||
  (Constants.manifest as any)?.debuggerHost ||
  (Constants.manifest2 as any)?.extra?.expoClient?.debuggerHost ||
  '';
const host = debuggerHost ? debuggerHost.split(':')[0] : '';

// Uses EXPO_PUBLIC_API_URL if provided, otherwise auto-detects the Expo host IP.
// This keeps mobile working across different networks without editing this file.
export const API_URL =
  envUrl || (host ? `http://${host}:5001/api` : 'http://localhost:5001/api');
