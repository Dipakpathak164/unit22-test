import { components } from '@monorepo/api';

export const BIKE_COOKIE_NAME = 'selected_bike';

export function parseBikeCookie(cookieHeader?: string | null): components['schemas']['FitmentBike'] | null {
  if (!cookieHeader) return null;
  const match = cookieHeader.match(new RegExp(`(?:^|; )${BIKE_COOKIE_NAME}=([^;]*)`));
  if (!match) return null;
  try {
    return JSON.parse(decodeURIComponent(match[1]));
  } catch {
    return null;
  }
}

export function setBikeCookie(bike: components['schemas']['FitmentBike'] | null) {
  if (typeof document === 'undefined') return;
  if (!bike) {
    document.cookie = `${BIKE_COOKIE_NAME}=; path=/; max-age=0; SameSite=Lax`;
    return;
  }
  const value = encodeURIComponent(JSON.stringify(bike));
  document.cookie = `${BIKE_COOKIE_NAME}=${value}; path=/; max-age=31536000; SameSite=Lax`;
}
