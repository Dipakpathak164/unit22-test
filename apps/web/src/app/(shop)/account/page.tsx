'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/lib/store/store';
import { register, login, logout, updateProfile } from '@/features/auth/slice';
import { openPickerModal } from '@/features/fitment/slice';
import { MOCK_BIKES } from '@monorepo/mocks';
import { LightGridOverlay } from '@/components/common/SectionGridOverlay';
import { Button, Input, Badge } from '@monorepo/ui';
import {
  User,
  Mail,
  Lock,
  Phone,
  Bike,
  CheckCircle,
  Eye,
  EyeOff,
  ShieldCheck,
  Truck,
  Package,
  Wrench,
  LogOut,
  MapPin,
  ChevronRight,
  Sparkles,
  ArrowRight,
  Check,
  Clock,
} from 'lucide-react';

interface AccountPageProps {
  params?: Promise<Record<string, string | string[]>>;
  searchParams?: Promise<{ tab?: string }>;
}

export default function AccountPage({ searchParams }: AccountPageProps) {
  const resolvedSearchParams = searchParams ? React.use(searchParams) : undefined;
  const initialTab = resolvedSearchParams?.tab === 'login' ? 'login' : 'register';

  const dispatch = useAppDispatch();
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);

  // Auth Mode: 'register' | 'login'
  const [authTab, setAuthTab] = useState<'register' | 'login'>(initialTab);

  // Dashboard Active Tab: 'orders' | 'garage' | 'profile' | 'addresses'
  const [dashboardTab, setDashboardTab] = useState<'orders' | 'garage' | 'profile' | 'addresses'>('orders');

  // Register Form State
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regBike, setRegBike] = useState(MOCK_BIKES[0].model);
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [showRegPassword, setShowRegPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [whatsappConsent, setWhatsappConsent] = useState(true);
  const [regError, setRegError] = useState('');

  // Login Form State
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Profile Edit State
  const [editName, setEditName] = useState(user?.name || '');
  const [editPhone, setEditPhone] = useState(user?.phone || '');
  const [editBike, setEditBike] = useState(user?.bikeModel || '');
  const [profileSuccessMsg, setProfileSuccessMsg] = useState('');

  // Calculate Password Strength
  const getPasswordStrength = (pass: string) => {
    if (!pass) return { score: 0, label: '', color: 'bg-gray-200' };
    let score = 0;
    if (pass.length >= 6) score += 1;
    if (pass.length >= 10) score += 1;
    if (/[A-Z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;

    if (score <= 2) return { score: 33, label: 'Weak', color: 'bg-red-500' };
    if (score <= 4) return { score: 66, label: 'Medium', color: 'bg-amber-500' };
    return { score: 100, label: 'Strong (Dyno Approved)', color: 'bg-emerald-500' };
  };

  const passStrength = getPasswordStrength(regPassword);

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRegError('');

    if (!regName.trim()) {
      setRegError('Please enter your full name');
      return;
    }
    if (!regEmail.trim() || !regEmail.includes('@')) {
      setRegError('Please enter a valid email address');
      return;
    }
    if (!regPhone.trim() || regPhone.length < 10) {
      setRegError('Please enter a valid 10-digit mobile number');
      return;
    }
    if (!regPassword || regPassword.length < 6) {
      setRegError('Password must be at least 6 characters');
      return;
    }
    if (regPassword !== regConfirmPassword) {
      setRegError('Passwords do not match');
      return;
    }
    if (!agreeTerms) {
      setRegError('You must accept the Terms of Service to create an account');
      return;
    }

    dispatch(
      register({
        name: regName,
        email: regEmail,
        phone: regPhone.startsWith('+91') ? regPhone : `+91 ${regPhone}`,
        bikeModel: regBike,
      })
    );
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    if (!loginEmail.trim()) {
      setLoginError('Please enter your email or phone number');
      return;
    }
    if (!loginPassword) {
      setLoginError('Please enter your password');
      return;
    }

    dispatch(
      login({
        email: loginEmail,
        userProfile: {
          name: loginEmail.split('@')[0],
        },
      })
    );
  };

  const handleQuickDemoSignIn = () => {
    dispatch(
      login({
        email: 'rahul.rider@unit22.in',
        userProfile: {
          name: 'Rahul Sharma',
          phone: '+91 9876543210',
          bikeModel: 'Royal Enfield Interceptor 650',
        },
      })
    );
  };

  const handleUpdateProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(
      updateProfile({
        name: editName,
        phone: editPhone,
        bikeModel: editBike,
      })
    );
    setProfileSuccessMsg('Profile updated successfully!');
    setTimeout(() => setProfileSuccessMsg(''), 3000);
  };

  // Mock Orders Data
  const mockOrders = [
    {
      id: 'U22-ORD-89421',
      date: '2025-02-18',
      status: 'DISPATCHED',
      statusColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      totalPaise: 4899900,
      trackingNumber: 'BLR-EXP-99214',
      items: [
        { name: 'Akrapovic Titanium Slip-On Performance Exhaust', qty: 1, pricePaise: 4899900 },
      ],
    },
    {
      id: 'U22-ORD-77109',
      date: '2025-01-10',
      status: 'DELIVERED',
      statusColor: 'bg-blue-100 text-blue-800 border-blue-300',
      totalPaise: 129900,
      trackingNumber: 'DEL-EXP-44012',
      items: [
        { name: 'Interceptor 650 Sintered Brake Pads (Front)', qty: 1, pricePaise: 129900 },
      ],
    },
  ];

  return (
    <div className="bg-[#f7f6f2] text-foreground min-h-screen relative overflow-hidden font-sans">
      <LightGridOverlay />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8 relative z-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs font-mono text-foreground/60">
          <Link href="/" className="hover:text-primary transition-colors">
            HOME
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-foreground/40 shrink-0" />
          <span className="text-foreground font-bold uppercase">
            {isAuthenticated ? 'Rider Account & Garage' : 'Rider Portal'}
          </span>
        </nav>

        {/* Header Title */}
        <div className="border-b border-[#edebe4] pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-black text-primary uppercase tracking-widest block">
              UNIT22 RIDERS CLUB
            </span>
            <h1 className="text-3xl sm:text-4xl font-black uppercase text-foreground tracking-tight">
              {isAuthenticated ? `WELCOME BACK, ${user?.name.toUpperCase()}` : 'RIDER ACCOUNT & REGISTRATION'}
            </h1>
          </div>

          {!isAuthenticated && (
            <div className="flex bg-[#e9e7e1] p-1 border border-[#d8d8da] text-xs font-bold font-mono">
              <button
                onClick={() => setAuthTab('register')}
                className={`px-5 py-2 uppercase transition-colors ${
                  authTab === 'register'
                    ? 'bg-primary text-white font-extrabold shadow-sm'
                    : 'text-foreground/70 hover:text-foreground'
                }`}
              >
                CREATE ACCOUNT
              </button>
              <button
                onClick={() => setAuthTab('login')}
                className={`px-5 py-2 uppercase transition-colors ${
                  authTab === 'login'
                    ? 'bg-black text-white font-extrabold shadow-sm'
                    : 'text-foreground/70 hover:text-foreground'
                }`}
              >
                RIDER SIGN IN
              </button>
            </div>
          )}
        </div>

        {/* ------------------------------------------------------------- */}
        {/* NON-AUTHENTICATED STATE: REGISTER / LOGIN FORM */}
        {/* ------------------------------------------------------------- */}
        {!isAuthenticated ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Main Form Column (8 cols) */}
            <div className="lg:col-span-7 bg-[#ffffff] border border-[#edebe4] p-6 sm:p-8 shadow-sm space-y-6">
              {/* Form Tab 1: CREATE ACCOUNT (REGISTER) */}
              {authTab === 'register' && (
                <form onSubmit={handleRegisterSubmit} className="space-y-5">
                  <div className="border-b border-[#edebe4] pb-4 space-y-1">
                    <h2 className="text-xl font-black uppercase tracking-tight text-foreground flex items-center gap-2">
                      <User className="w-5 h-5 text-primary" />
                      CREATE YOUR RIDER ACCOUNT
                    </h2>
                    <p className="text-xs text-foreground/60">
                      Join thousands of motorcycle enthusiasts. Get 1-click checkout & dyno fitment alerts.
                    </p>
                  </div>

                  {regError && (
                    <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs font-bold font-mono">
                      ⚠️ {regError}
                    </div>
                  )}

                  {/* Full Name */}
                  <div className="space-y-1">
                    <label className="text-xs font-black uppercase tracking-wider text-foreground/80 block">
                      FULL NAME *
                    </label>
                    <div className="relative">
                      <Input
                        type="text"
                        placeholder="e.g. Rahul Sharma"
                        value={regName}
                        onChange={(e) => setRegName(e.target.value)}
                        className="pl-10 text-xs h-11 bg-[#f9f9f8] border-[#d8d8da]"
                      />
                      <User className="w-4 h-4 text-foreground/40 absolute left-3 top-3.5" />
                    </div>
                  </div>

                  {/* Email & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-black uppercase tracking-wider text-foreground/80 block">
                        EMAIL ADDRESS *
                      </label>
                      <div className="relative">
                        <Input
                          type="email"
                          placeholder="rider@example.com"
                          value={regEmail}
                          onChange={(e) => setRegEmail(e.target.value)}
                          className="pl-10 text-xs h-11 bg-[#f9f9f8] border-[#d8d8da]"
                        />
                        <Mail className="w-4 h-4 text-foreground/40 absolute left-3 top-3.5" />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-black uppercase tracking-wider text-foreground/80 block">
                        WHATSAPP / MOBILE NO. *
                      </label>
                      <div className="relative">
                        <Input
                          type="tel"
                          placeholder="+91 98765 43210"
                          value={regPhone}
                          onChange={(e) => setRegPhone(e.target.value)}
                          className="pl-10 text-xs h-11 bg-[#f9f9f8] border-[#d8d8da]"
                        />
                        <Phone className="w-4 h-4 text-foreground/40 absolute left-3 top-3.5" />
                      </div>
                    </div>
                  </div>

                  {/* Primary Bike Select */}
                  <div className="space-y-1">
                    <label className="text-xs font-black uppercase tracking-wider text-foreground/80 block">
                      PRIMARY MOTORCYCLE MODEL (FOR FITMENT VALIDATION)
                    </label>
                    <div className="relative">
                      <select
                        value={regBike}
                        onChange={(e) => setRegBike(e.target.value)}
                        className="w-full h-11 pl-10 pr-4 bg-[#f9f9f8] border border-[#d8d8da] text-xs font-bold text-foreground focus:outline-none focus:border-black appearance-none cursor-pointer"
                      >
                        {MOCK_BIKES.map((b) => (
                          <option key={b.id} value={`${b.make} ${b.model}`}>
                            {b.make} {b.model} ({b.year})
                          </option>
                        ))}
                        <option value="Other / Custom Bike">Other / Custom Motorcycle</option>
                      </select>
                      <Bike className="w-4 h-4 text-primary absolute left-3 top-3.5" />
                    </div>
                  </div>

                  {/* Password & Confirm */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-black uppercase tracking-wider text-foreground/80 block">
                        PASSWORD *
                      </label>
                      <div className="relative">
                        <Input
                          type={showRegPassword ? 'text' : 'password'}
                          placeholder="Min 6 characters"
                          value={regPassword}
                          onChange={(e) => setRegPassword(e.target.value)}
                          className="pl-10 pr-10 text-xs h-11 bg-[#f9f9f8] border-[#d8d8da]"
                        />
                        <Lock className="w-4 h-4 text-foreground/40 absolute left-3 top-3.5" />
                        <button
                          type="button"
                          onClick={() => setShowRegPassword(!showRegPassword)}
                          className="absolute right-3 top-3.5 text-foreground/40 hover:text-foreground"
                        >
                          {showRegPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-black uppercase tracking-wider text-foreground/80 block">
                        CONFIRM PASSWORD *
                      </label>
                      <div className="relative">
                        <Input
                          type={showRegPassword ? 'text' : 'password'}
                          placeholder="Re-enter password"
                          value={regConfirmPassword}
                          onChange={(e) => setRegConfirmPassword(e.target.value)}
                          className="pl-10 text-xs h-11 bg-[#f9f9f8] border-[#d8d8da]"
                        />
                        <Lock className="w-4 h-4 text-foreground/40 absolute left-3 top-3.5" />
                      </div>
                    </div>
                  </div>

                  {/* Password Strength Meter */}
                  {regPassword.length > 0 && (
                    <div className="space-y-1 pt-1">
                      <div className="flex justify-between text-[11px] font-mono">
                        <span className="text-foreground/60">Password Strength:</span>
                        <span className="font-bold text-foreground">{passStrength.label}</span>
                      </div>
                      <div className="w-full bg-[#e9e7e1] h-1.5 overflow-hidden">
                        <div
                          className={`h-full transition-all duration-300 ${passStrength.color}`}
                          style={{ width: `${passStrength.score}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Checkboxes */}
                  <div className="space-y-2 pt-2 text-xs">
                    <label className="flex items-start gap-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={agreeTerms}
                        onChange={(e) => setAgreeTerms(e.target.checked)}
                        className="mt-0.5 accent-primary h-4 w-4"
                      />
                      <span className="text-foreground/80">
                        I agree to the{' '}
                        <strong className="text-foreground">Unit22 Terms of Service</strong> and Privacy Policy.
                      </span>
                    </label>

                    <label className="flex items-start gap-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={whatsappConsent}
                        onChange={(e) => setWhatsappConsent(e.target.checked)}
                        className="mt-0.5 accent-primary h-4 w-4"
                      />
                      <span className="text-foreground/80">
                        Send me WhatsApp dispatch alerts, tracking numbers & exclusive part drops.
                      </span>
                    </label>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full h-13 text-xs font-black uppercase tracking-widest bg-primary hover:bg-black text-white hover:text-white border-0 shadow-lg transition-all duration-300 gap-2 mt-4"
                  >
                    <span>CREATE MY UNIT22 ACCOUNT</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>

                  <p className="text-center text-xs text-foreground/60 font-mono pt-2">
                    Already have an account?{' '}
                    <button
                      type="button"
                      onClick={() => setAuthTab('login')}
                      className="text-primary font-bold underline hover:text-black"
                    >
                      Sign in here
                    </button>
                  </p>
                </form>
              )}

              {/* Form Tab 2: RIDER SIGN IN (LOGIN) */}
              {authTab === 'login' && (
                <form onSubmit={handleLoginSubmit} className="space-y-5">
                  <div className="border-b border-[#edebe4] pb-4 space-y-1">
                    <h2 className="text-xl font-black uppercase tracking-tight text-foreground flex items-center gap-2">
                      <Lock className="w-5 h-5 text-primary" />
                      SIGN IN TO YOUR ACCOUNT
                    </h2>
                    <p className="text-xs text-foreground/60">
                      Enter your credentials to access your saved garage, order history, and fitment settings.
                    </p>
                  </div>

                  {loginError && (
                    <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs font-bold font-mono">
                      ⚠️ {loginError}
                    </div>
                  )}

                  <div className="space-y-1">
                    <label className="text-xs font-black uppercase tracking-wider text-foreground/80 block">
                      EMAIL ADDRESS OR PHONE NUMBER
                    </label>
                    <div className="relative">
                      <Input
                        type="text"
                        placeholder="rider@example.com or +91..."
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        className="pl-10 text-xs h-11 bg-[#f9f9f8] border-[#d8d8da]"
                      />
                      <Mail className="w-4 h-4 text-foreground/40 absolute left-3 top-3.5" />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between items-center">
                      <label className="text-xs font-black uppercase tracking-wider text-foreground/80 block">
                        PASSWORD
                      </label>
                      <button
                        type="button"
                        className="text-[11px] font-mono text-primary hover:underline"
                      >
                        Forgot Password?
                      </button>
                    </div>
                    <div className="relative">
                      <Input
                        type={showLoginPassword ? 'text' : 'password'}
                        placeholder="Enter password"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        className="pl-10 pr-10 text-xs h-11 bg-[#f9f9f8] border-[#d8d8da]"
                      />
                      <Lock className="w-4 h-4 text-foreground/40 absolute left-3 top-3.5" />
                      <button
                        type="button"
                        onClick={() => setShowLoginPassword(!showLoginPassword)}
                        className="absolute right-3 top-3.5 text-foreground/40 hover:text-foreground"
                      >
                        {showLoginPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full h-13 text-xs font-black uppercase tracking-widest bg-black hover:bg-primary text-white hover:text-white border-0 shadow-lg transition-all duration-300 gap-2 mt-4"
                  >
                    <span>SIGN IN TO MY ACCOUNT</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>

                  {/* Quick Demo Sign In Shortcut */}
                  <div className="pt-4 border-t border-[#edebe4] text-center space-y-2">
                    <p className="text-xs text-foreground/60 font-mono">Testing the platform?</p>
                    <button
                      type="button"
                      onClick={handleQuickDemoSignIn}
                      className="w-full py-2.5 bg-[#f7f6f2] hover:bg-primary/10 border border-[#d8d8da] text-xs font-bold text-foreground hover:border-primary transition-colors flex items-center justify-center gap-2 uppercase tracking-wider"
                    >
                      <Sparkles className="w-4 h-4 text-primary" />
                      <span>QUICK DEMO RIDER SIGN IN (1-CLICK)</span>
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Right Column: Benefits & Trust Panel (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-[#000000] text-white p-6 sm:p-8 space-y-6 border border-white/10 shadow-lg relative overflow-hidden">
                <div className="space-y-2">
                  <Badge variant="neutral" className="bg-primary text-white border-0 text-[10px] font-black tracking-widest">
                    BENEFITS
                  </Badge>
                  <h3 className="text-xl font-black uppercase tracking-tight text-white">
                    WHY JOIN UNIT22 RIDERS CLUB?
                  </h3>
                  <p className="text-xs text-white/70 leading-relaxed">
                    Access factory engineering data, dyno-tested part compatibility, and direct express shipping.
                  </p>
                </div>

                <div className="space-y-4 text-xs font-mono">
                  <div className="flex gap-3 items-start">
                    <div className="p-2 bg-white/10 text-primary shrink-0">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white uppercase font-sans">100% Dyno Fitment Alerts</h4>
                      <p className="text-white/60 text-[11px] leading-normal font-sans">
                        Save your motorcycle specs and instantly see compatible brake pads, exhausts, & filters.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3 items-start">
                    <div className="p-2 bg-white/10 text-primary shrink-0">
                      <Truck className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white uppercase font-sans">Pan-India Express Tracking</h4>
                      <p className="text-white/60 text-[11px] leading-normal font-sans">
                        Get live WhatsApp alerts with courier tracking numbers as soon as your order dispatches.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3 items-start">
                    <div className="p-2 bg-white/10 text-primary shrink-0">
                      <Wrench className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white uppercase font-sans">1-on-1 Master Tech Support</h4>
                      <p className="text-white/60 text-[11px] leading-normal font-sans">
                        Direct access to Unit22 mechanical engineers for torque specs & installation guides.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 text-[11px] text-white/50 flex items-center justify-between font-mono">
                  <span>Pan-India Delivery Guarantee</span>
                  <span className="text-primary font-bold">2-4 Days Express</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* ------------------------------------------------------------- */
          /* AUTHENTICATED STATE: RIDER DASHBOARD */
          /* ------------------------------------------------------------- */
          <div className="space-y-8">
            {/* Rider Header Profile Bar */}
            <div className="bg-[#ffffff] border border-[#edebe4] p-6 sm:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-primary text-white font-black text-2xl flex items-center justify-center border-2 border-black shrink-0">
                  {user?.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-black uppercase text-foreground">{user?.name}</h2>
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase px-2 py-0.5 border border-emerald-300">
                      VERIFIED RIDER
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-foreground/70 font-mono mt-1">
                    <span>{user?.email}</span>
                    <span>•</span>
                    <span>{user?.phone}</span>
                    {user?.bikeModel && (
                      <>
                        <span>•</span>
                        <span className="text-primary font-bold flex items-center gap-1">
                          <Bike className="w-3.5 h-3.5" /> {user.bikeModel}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Button
                  onClick={() => dispatch(openPickerModal())}
                  variant="outline"
                  size="sm"
                  className="text-xs font-bold border-black gap-1.5"
                >
                  <Bike className="w-4 h-4 text-primary" />
                  <span>SWITCH BIKE</span>
                </Button>

                <Button
                  onClick={() => dispatch(logout())}
                  variant="primary"
                  size="sm"
                  className="text-xs font-extrabold bg-black text-white hover:bg-primary hover:text-black border-0 gap-1.5"
                >
                  <LogOut className="w-4 h-4" />
                  <span>LOG OUT</span>
                </Button>
              </div>
            </div>

            {/* Dashboard Quick Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-[#ffffff] border border-[#edebe4] p-4 space-y-1">
                <span className="text-xs font-mono text-foreground/60 uppercase">TOTAL ORDERS</span>
                <p className="text-2xl font-black text-foreground font-sans">2</p>
                <span className="text-[10px] text-emerald-700 font-bold block">1 Dispatched, 1 Delivered</span>
              </div>
              <div className="bg-[#ffffff] border border-[#edebe4] p-4 space-y-1">
                <span className="text-xs font-mono text-foreground/60 uppercase">SAVED GARAGE BIKE</span>
                <p className="text-lg font-black text-primary font-sans truncate">{user?.bikeModel || 'Interceptor 650'}</p>
                <span className="text-[10px] text-foreground/60 font-bold block">100% Dyno Fitment Checked</span>
              </div>
              <div className="bg-[#ffffff] border border-[#edebe4] p-4 space-y-1">
                <span className="text-xs font-mono text-foreground/60 uppercase">STORE REWARD CREDITS</span>
                <p className="text-2xl font-black text-foreground font-sans">₹450</p>
                <span className="text-[10px] text-primary font-bold block">Auto-applied at checkout</span>
              </div>
              <div className="bg-[#ffffff] border border-[#edebe4] p-4 space-y-1">
                <span className="text-xs font-mono text-foreground/60 uppercase">WARRANTY STATUS</span>
                <p className="text-2xl font-black text-emerald-700 font-sans">ACTIVE</p>
                <span className="text-[10px] text-foreground/60 font-bold block">12 Months Pan-India</span>
              </div>
            </div>

            {/* Dashboard Sub-Tabs */}
            <div className="bg-[#ffffff] border border-[#edebe4] p-6 space-y-6 shadow-sm">
              <div className="flex border-b border-[#edebe4] space-x-6 text-xs font-black uppercase tracking-wider overflow-x-auto">
                <button
                  onClick={() => setDashboardTab('orders')}
                  className={`pb-3 transition-colors relative ${
                    dashboardTab === 'orders' ? 'text-primary border-b-2 border-primary' : 'text-foreground/60 hover:text-foreground'
                  }`}
                >
                  MY ORDERS ({mockOrders.length})
                </button>
                <button
                  onClick={() => setDashboardTab('garage')}
                  className={`pb-3 transition-colors relative ${
                    dashboardTab === 'garage' ? 'text-primary border-b-2 border-primary' : 'text-foreground/60 hover:text-foreground'
                  }`}
                >
                  MY GARAGE & FITMENT
                </button>
                <button
                  onClick={() => setDashboardTab('profile')}
                  className={`pb-3 transition-colors relative ${
                    dashboardTab === 'profile' ? 'text-primary border-b-2 border-primary' : 'text-foreground/60 hover:text-foreground'
                  }`}
                >
                  PROFILE SETTINGS
                </button>
                <button
                  onClick={() => setDashboardTab('addresses')}
                  className={`pb-3 transition-colors relative ${
                    dashboardTab === 'addresses' ? 'text-primary border-b-2 border-primary' : 'text-foreground/60 hover:text-foreground'
                  }`}
                >
                  SAVED ADDRESSES
                </button>
              </div>

              {/* TAB 1: MY ORDERS */}
              {dashboardTab === 'orders' && (
                <div className="space-y-4">
                  {mockOrders.map((order) => (
                    <div key={order.id} className="border border-[#edebe4] p-5 space-y-4 bg-[#f9f9f8]">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#eaeaea] pb-3 text-xs">
                        <div className="space-y-0.5">
                          <span className="font-extrabold text-foreground font-mono">{order.id}</span>
                          <span className="text-foreground/60 block font-mono">Placed on {order.date}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={`px-2.5 py-1 text-[10px] font-black uppercase border ${order.statusColor}`}>
                            {order.status}
                          </span>
                          <span className="font-black text-base text-foreground font-sans">
                            ₹{(order.totalPaise / 100).toLocaleString('en-IN')}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex justify-between items-center text-xs">
                            <span className="font-bold text-foreground">{item.name} (x{item.qty})</span>
                            <span className="font-mono text-foreground/70">
                              ₹{(item.pricePaise / 100).toLocaleString('en-IN')}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs border-t border-[#eaeaea]">
                        <span className="font-mono text-foreground/70 text-[11px] flex items-center gap-1">
                          <Truck className="w-3.5 h-3.5 text-primary" /> Courier AWB: <strong>{order.trackingNumber}</strong>
                        </span>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="text-xs font-bold border-black h-8">
                            DOWNLOAD INVOICE
                          </Button>
                          <Button variant="primary" size="sm" className="text-xs font-bold bg-black text-white h-8">
                            TRACK PACKAGE
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* TAB 2: MY GARAGE */}
              {dashboardTab === 'garage' && (
                <div className="space-y-6">
                  <div className="p-5 bg-[#f9f9f8] border border-[#edebe4] flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-black text-white flex items-center justify-center shrink-0">
                        <Bike className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-black text-sm uppercase text-foreground">
                          {user?.bikeModel || 'Royal Enfield Interceptor 650'}
                        </h4>
                        <p className="text-xs text-foreground/60 font-mono">
                          Primary Registered Vehicle • Verified Fitment Match
                        </p>
                      </div>
                    </div>

                    <Link href="/c/brakes">
                      <Button variant="primary" size="sm" className="text-xs font-black bg-primary text-white uppercase tracking-wider">
                        SHOP PARTS FOR THIS BIKE &rarr;
                      </Button>
                    </Link>
                  </div>

                  <div className="p-4 border border-dashed border-[#d8d8da] text-center space-y-2">
                    <p className="text-xs font-bold text-foreground/70">OWN MULTIPLE MOTORCYCLES?</p>
                    <p className="text-xs text-foreground/60 max-w-md mx-auto">
                      Add additional bikes to your garage to quickly filter brake pads, exhausts, and accessories.
                    </p>
                    <Button onClick={() => dispatch(openPickerModal())} variant="outline" size="sm" className="text-xs font-bold border-black mt-2">
                      + ADD MOTORCYCLE TO GARAGE
                    </Button>
                  </div>
                </div>
              )}

              {/* TAB 3: PROFILE SETTINGS */}
              {dashboardTab === 'profile' && (
                <form onSubmit={handleUpdateProfileSubmit} className="max-w-xl space-y-4">
                  {profileSuccessMsg && (
                    <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold font-mono">
                      ✓ {profileSuccessMsg}
                    </div>
                  )}

                  <div className="space-y-1">
                    <label className="text-xs font-black uppercase tracking-wider text-foreground/80 block">
                      FULL NAME
                    </label>
                    <Input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="text-xs h-11 bg-[#f9f9f8]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-black uppercase tracking-wider text-foreground/80 block">
                      PHONE NUMBER
                    </label>
                    <Input
                      type="text"
                      value={editPhone}
                      onChange={(e) => setEditPhone(e.target.value)}
                      className="text-xs h-11 bg-[#f9f9f8]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-black uppercase tracking-wider text-foreground/80 block">
                      PRIMARY MOTORCYCLE
                    </label>
                    <Input
                      type="text"
                      value={editBike}
                      onChange={(e) => setEditBike(e.target.value)}
                      className="text-xs h-11 bg-[#f9f9f8]"
                    />
                  </div>

                  <Button type="submit" variant="primary" size="lg" className="text-xs font-black bg-black text-white hover:bg-primary uppercase tracking-wider">
                    SAVE PROFILE CHANGES
                  </Button>
                </form>
              )}

              {/* TAB 4: SAVED ADDRESSES */}
              {dashboardTab === 'addresses' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-5 bg-[#f9f9f8] border border-[#edebe4] space-y-3 relative">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-black uppercase text-foreground">PRIMARY SHIPPING ADDRESS</span>
                      <span className="bg-black text-white text-[10px] font-black uppercase px-2 py-0.5">DEFAULT</span>
                    </div>
                    <div className="text-xs space-y-1 font-mono text-foreground/80">
                      <p className="font-bold text-foreground font-sans">{user?.name}</p>
                      <p>{user?.address?.street || 'Indiranagar 100ft Road'}</p>
                      <p>{user?.address?.city || 'Bengaluru'}, {user?.address?.state || 'Karnataka'} - {user?.address?.pincode || '560038'}</p>
                      <p>Phone: {user?.phone}</p>
                    </div>
                    <div className="pt-2 border-t border-[#eaeaea] flex gap-3 text-xs">
                      <button className="text-primary font-bold hover:underline">Edit Address</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
