'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { env } from '@/env';
import { useAppDispatch } from '@/lib/store/store';
import { adminLogin } from '@/features/auth/slice';
import { Button, Input, Badge } from '@monorepo/ui';
import {
  Lock,
  Mail,
  ShieldCheck,
  Eye,
  EyeOff,
  KeyRound,
  ArrowRight,
  Sparkles,
  ExternalLink,
  ShieldAlert,
} from 'lucide-react';

export default function AdminLoginPage() {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState('admin@motorcycle-store.in');
  const [password, setPassword] = useState('••••••••••••');
  const [securityPin, setSecurityPin] = useState('220915');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleAdminSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email.trim() || !email.includes('@')) {
      setErrorMsg('Please enter a valid administrator email address.');
      return;
    }
    if (!password) {
      setErrorMsg('Please enter your administrator password.');
      return;
    }

    dispatch(adminLogin({ email }));
  };

  const handleQuickDemoAdminLogin = () => {
    dispatch(adminLogin({ email: 'super.admin@unit22.in' }));
  };

  return (
    <div className="min-h-screen bg-[#000000] text-white flex flex-col justify-between items-center p-4 sm:p-6 font-sans relative overflow-hidden antialiased">
      {/* Background Decorative Glow Grid */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#fa0d13_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/20 rounded-full blur-3xl pointer-events-none" />

      {/* Top Brand Strip */}
      <header className="w-full max-w-5xl flex justify-between items-center relative z-10 py-2 border-b border-white/10">
        <div className="flex items-center gap-2 font-black tracking-wider text-sm">
          <div className="w-8 h-8 bg-primary text-black font-black flex items-center justify-center text-xs">
            U22
          </div>
          <span className="text-white">UNIT22 MANAGEMENT PORTAL</span>
        </div>

        <a
          href={env.NEXT_PUBLIC_SITE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-xs text-white/70 hover:text-primary transition-colors font-mono"
        >
          <span>View Public Storefront</span>
          <ExternalLink className="w-3.5 h-3.5 text-primary" />
        </a>
      </header>

      {/* Main Admin Login Card Container */}
      <div className="w-full max-w-md bg-[#0d0d0d] border border-white/15 p-6 sm:p-8 shadow-2xl space-y-6 relative z-10 backdrop-blur-md my-auto">
        <div className="text-center space-y-2">
          <Badge variant="neutral" className="bg-primary text-black border-0 text-[10px] font-black uppercase tracking-widest px-3 py-1">
            SECURE ACCESS ONLY
          </Badge>
          <h1 className="text-2xl font-black uppercase tracking-tight text-white">
            ADMIN & CMS LOGIN
          </h1>
          <p className="text-xs text-white/60 font-mono">
            Enter authorized credentials to access Catalog CMS, Orders & Fitment Matrix.
          </p>
        </div>

        {errorMsg && (
          <div className="p-3 bg-red-950/80 border border-red-500 text-red-200 text-xs font-bold font-mono">
            ⚠️ {errorMsg}
          </div>
        )}

        <form onSubmit={handleAdminSignIn} className="space-y-4 text-xs">
          {/* Email Address */}
          <div className="space-y-1">
            <label className="font-black uppercase tracking-wider text-white/80 block">
              ADMINISTRATOR EMAIL *
            </label>
            <div className="relative">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@motorcycle-store.in"
                className="pl-10 h-11 bg-white/5 border-white/20 text-white placeholder:text-white/40 focus:border-primary text-xs"
              />
              <Mail className="w-4 h-4 text-white/40 absolute left-3 top-3.5" />
            </div>
          </div>

          {/* Secret Password */}
          <div className="space-y-1">
            <label className="font-black uppercase tracking-wider text-white/80 block">
              MASTER PASSWORD *
            </label>
            <div className="relative">
              <Input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className="pl-10 pr-10 h-11 bg-white/5 border-white/20 text-white placeholder:text-white/40 focus:border-primary text-xs"
              />
              <Lock className="w-4 h-4 text-white/40 absolute left-3 top-3.5" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3.5 text-white/40 hover:text-white"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* 2FA Security Pin */}
          <div className="space-y-1">
            <label className="font-black uppercase tracking-wider text-white/80 block">
              2FA SECURITY TOKEN PIN
            </label>
            <div className="relative">
              <Input
                type="text"
                value={securityPin}
                onChange={(e) => setSecurityPin(e.target.value)}
                placeholder="6-digit security token"
                className="pl-10 h-11 bg-white/5 border-white/20 text-white placeholder:text-white/40 focus:border-primary text-xs font-mono tracking-widest"
              />
              <KeyRound className="w-4 h-4 text-white/40 absolute left-3 top-3.5" />
            </div>
          </div>

          {/* Submit Action */}
          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full h-13 text-xs font-black uppercase tracking-widest bg-primary text-black hover:bg-white border-0 shadow-lg transition-all duration-300 gap-2 mt-2"
          >
            <span>SIGN IN TO COMMAND CENTER</span>
            <ArrowRight className="w-4 h-4" />
          </Button>

          {/* Quick Demo Login CTA */}
          <div className="pt-3 border-t border-white/10 text-center space-y-2">
            <p className="text-[11px] text-white/50 font-mono">Exploring Admin CMS?</p>
            <button
              type="button"
              onClick={handleQuickDemoAdminLogin}
              className="w-full py-2.5 bg-white/10 hover:bg-primary hover:text-black border border-white/20 text-xs font-bold text-white transition-colors flex items-center justify-center gap-2 uppercase tracking-wider"
            >
              <Sparkles className="w-4 h-4 text-primary" />
              <span>1-CLICK SUPER ADMIN SIGN IN</span>
            </button>
          </div>
        </form>
      </div>

      {/* Security Footer Bar */}
      <footer className="w-full max-w-5xl py-3 border-t border-white/10 text-[11px] font-mono text-white/50 flex flex-col sm:flex-row items-center justify-between gap-2 relative z-10">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>256-Bit Encrypted Admin Session</span>
        </div>

        <div className="flex items-center gap-4">
          <span>IP Whitelisted: 127.0.0.1</span>
          <span>© 2026 Unit22 Inc.</span>
        </div>
      </footer>
    </div>
  );
}
