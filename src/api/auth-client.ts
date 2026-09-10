import { usernameClient } from 'better-auth/client/plugins';
import { createAuthClient } from 'better-auth/react';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
if (!API_URL) {
  throw new Error('NEXT_PUBLIC_API_URL is not configured');
}

export const authClient = createAuthClient({
  baseURL: `${API_URL.replace(/\/$/, '')}/auth`,
  plugins: [usernameClient()],
});
