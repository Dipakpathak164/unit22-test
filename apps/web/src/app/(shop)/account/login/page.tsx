'use client';

import AccountPage from '../page';

export default function LoginPage() {
  return <AccountPage searchParams={Promise.resolve({ tab: 'login' })} />;
}
