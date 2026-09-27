import { http, HttpResponse } from 'msw';
import { MOCK_BRANDS, MOCK_PRODUCTS, MOCK_ADMIN_USER, MOCK_BIKES } from './fixtures';

export const handlers = [
  // Health check handlers
  http.get('/api/health', () => {
    return HttpResponse.json({ status: 'ok', timestamp: new Date().toISOString() });
  }),
  http.get('/admin/api/health', () => {
    return HttpResponse.json({ status: 'ok', timestamp: new Date().toISOString() });
  }),

  // Brands & Products (Storefront & Admin base handlers)
  http.get('/api/brands', () => {
    return HttpResponse.json(MOCK_BRANDS);
  }),
  http.get('/api/products', () => {
    return HttpResponse.json(MOCK_PRODUCTS);
  }),
  http.get('/api/bikes', () => {
    return HttpResponse.json(MOCK_BIKES);
  }),

  // Admin auth check
  http.get('/admin/api/auth/me', () => {
    return HttpResponse.json(MOCK_ADMIN_USER);
  }),
];
