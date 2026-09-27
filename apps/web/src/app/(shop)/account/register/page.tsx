'use client';

import AccountPage from '../page';

export default function RegisterPage() {
  return <AccountPage searchParams={Promise.resolve({ tab: 'register' })} />;
}
