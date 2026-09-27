'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCartSummary } from '@/features/cart/hooks/useCartSummary';
import { CheckoutStepper } from '@/features/cart/components/CheckoutStepper';
import { LightGridOverlay } from '@/components/common/SectionGridOverlay';
import { useAppSelector } from '@/lib/store/store';
import { formatPaise } from '@monorepo/api';
import { Button } from '@monorepo/ui';
import {
  ShieldCheck,
  Truck,
  RotateCcw,
  CheckCircle,
  Lock,
  ChevronRight,
  Bike,
  CreditCard,
  QrCode,
  Banknote,
  Building,
  ArrowRight,
  Check,
  ShoppingBag,
} from 'lucide-react';

export default function CheckoutPage() {
  const {
    items,
    totalItemsCount,
    subtotalPaise,
    shippingCostPaise,
    grandTotalPaise,
    clearCart,
  } = useCartSummary();

  const selectedBike = useAppSelector((state) => state.fitment.selectedBike);
  const user = useAppSelector((state) => state.auth.user);

  // Form State
  const [formData, setFormData] = useState({
    fullName: user ? user.name : '',
    email: user ? user.email : '',
    phone: '',
    whatsappUpdates: true,
    pincode: '',
    address: '',
    city: '',
    state: 'Maharashtra',
  });

  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking' | 'cod'>('upi');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 50);
    return () => clearTimeout(timer);
  }, []);

  React.useEffect(() => {
    if (orderSuccess) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [orderSuccess]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setOrderSuccess(true);
      clearCart();
    }, 1500);
  };

  // Upfront Instant Discount for UPI payments
  const upiDiscountPaise = paymentMethod === 'upi' ? 10000 : 0; // ₹100 instant UPI discount
  const finalPayablePaise = Math.max(0, grandTotalPaise - upiDiscountPaise);

  if (orderSuccess) {
    return (
      <div className="bg-[#f7f6f2] text-foreground min-h-screen py-10 px-4 font-sans relative overflow-x-hidden">
        <LightGridOverlay />
        <div className="max-w-xl mx-auto space-y-6 relative z-10">
          <CheckoutStepper currentStep={3} />

          <div className="bg-white border border-[#edebe4] p-8 shadow-xl text-center space-y-6">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto animate-bounce">
              <Check className="w-9 h-9 stroke-[3]" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono text-emerald-700 font-bold uppercase tracking-widest block">
                ORDER CONFIRMED #U22-{Math.floor(100000 + Math.random() * 900000)}
              </span>
              <h1 className="text-2xl sm:text-3xl font-black uppercase text-foreground">
                RIDER ORDER PLACED SUCCESSFULLY!
              </h1>
              <p className="text-xs text-foreground/70 leading-relaxed">
                Thank you for shopping with Unit 22! Your performance motorcycle parts are being packed for express transit. We have sent receipt details to <strong className="text-foreground">{formData.email || 'your email'}</strong>.
              </p>
            </div>

            {/* Motorcycle fitment confirmation */}
            <div className="bg-[#faf9f6] border border-[#edebe4] p-4 text-xs font-mono text-left space-y-1 rounded-none">
              <div className="flex items-center justify-between text-foreground">
                <span className="font-bold flex items-center gap-1.5">
                  <Bike className="w-4 h-4 text-primary" />
                  VERIFIED BIKE FITMENT:
                </span>
                <span className="font-extrabold text-primary">
                  {selectedBike ? `${selectedBike.make} ${selectedBike.model}` : 'Universal Fitment'}
                </span>
              </div>
              <p className="text-[11px] text-foreground/60">
                Pan-India Express Dispatch within 24 Hours. WhatsApp updates enabled.
              </p>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <Button
                variant="primary"
                size="lg"
                asChild
                className="w-full sm:flex-1 h-14 sm:h-16 py-4 px-6 text-sm sm:text-base font-black uppercase tracking-wider bg-primary hover:bg-black text-white border-2 border-primary hover:border-black shadow-md hover:shadow-lg transition-all"
              >
                <Link href="/account">VIEW ORDER IN ACCOUNT</Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                asChild
                className="w-full sm:flex-1 h-14 sm:h-16 py-4 px-6 text-sm sm:text-base font-black uppercase tracking-wider border-2 border-black bg-white text-black hover:bg-black hover:text-white shadow-sm hover:shadow-md transition-all"
              >
                <Link href="/">RETURN TO SHOP</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#f7f6f2] text-foreground min-h-screen relative font-sans pb-48 lg:pb-32">
      <LightGridOverlay />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8 relative z-10">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs font-mono text-foreground/60">
          <Link href="/" className="hover:text-primary transition-colors">
            HOME
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-foreground/40 shrink-0" />
          <Link href="/cart" className="hover:text-primary transition-colors">
            SHOPPING CART
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-foreground/40 shrink-0" />
          <span className="text-foreground font-bold uppercase">CHECKOUT & PAYMENT</span>
        </nav>

        {/* Page Title */}
        <div className="border-b border-[#edebe4] pb-4 flex items-center justify-between">
          <div>
            <span className="text-xs font-mono text-primary font-bold uppercase tracking-widest block flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-primary" />
              256-BIT SSL ENCRYPTED CHECKOUT
            </span>
            <h1 className="text-2xl sm:text-3xl font-black uppercase text-foreground tracking-tight">
              EXPRESS CHECKOUT
            </h1>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-foreground/70">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>100% Dyno Tested Guaranteed Fitment</span>
          </div>
        </div>

        {/* STEPPER PROGRESS BAR (Step 2 Active, Zero Top Margin) */}
        <div className="!mt-2">
          <CheckoutStepper currentStep={2} />
        </div>

        {items.length === 0 ? (
          <div className="bg-[#ffffff] border border-[#edebe4] p-12 text-center space-y-4">
            <ShoppingBag className="w-12 h-12 text-foreground/30 mx-auto" />
            <h2 className="text-xl font-black uppercase">YOUR CART IS EMPTY</h2>
            <p className="text-xs text-foreground/60">Add motorcycle accessories to your cart before proceeding to checkout.</p>
            <Button variant="primary" asChild className="h-11 px-6 text-xs font-bold uppercase bg-primary hover:bg-black">
              <Link href="/c/brakes">BROWSE PARTS CATALOG</Link>
            </Button>
          </div>
        ) : (
          <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column (7 cols): Address & Payment Inputs */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Bike Fitment Verification Bar */}
              <div className="bg-[#000000] text-white p-4 flex items-center justify-between border border-white/10 shadow-md">
                <div className="flex items-center gap-3">
                  <Bike className="w-6 h-6 text-primary shrink-0" />
                  <div>
                    <span className="text-[10px] text-white/60 font-mono uppercase block">ACTIVE BIKE FITMENT</span>
                    <span className="text-xs font-extrabold uppercase text-white">
                      {selectedBike ? `${selectedBike.make} ${selectedBike.model}` : 'NO SPECIFIC BIKE SELECTED (UNIVERSAL PARTS)'}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-[11px] font-bold text-primary">
                  <CheckCircle className="w-4 h-4" />
                  <span>COMPATIBILITY VERIFIED</span>
                </div>
              </div>

              {/* Step 1: Shipping Address Form */}
              <div className="bg-[#ffffff] border border-[#edebe4] p-5 sm:p-6 shadow-sm space-y-5">
                <div className="border-b border-[#edebe4] pb-3 flex items-center justify-between">
                  <h2 className="text-sm font-black uppercase tracking-wider text-foreground flex items-center gap-2">
                    <span className="w-5 h-5 bg-black text-white text-xs rounded-full flex items-center justify-center font-mono">1</span>
                    SHIPPING ADDRESS & CONTACT DETAILS
                  </h2>
                  <span className="text-[11px] text-foreground/60 font-mono">Pan-India Dispatch</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
                  <div className="space-y-1 sm:col-span-2">
                    <label className="font-bold uppercase tracking-wider text-[11px] text-foreground/80 block">
                      Full Rider Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full px-3 py-2.5 border border-[#edebe4] bg-[#faf9f6] text-foreground text-xs focus:border-black focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold uppercase tracking-wider text-[11px] text-foreground/80 block">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="rider@example.com"
                      className="w-full px-3 py-2.5 border border-[#edebe4] bg-[#faf9f6] text-foreground text-xs focus:border-black focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold uppercase tracking-wider text-[11px] text-foreground/80 block">
                      Phone Number (For Delivery SMS) *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+91 98765 43210"
                      className="w-full px-3 py-2.5 border border-[#edebe4] bg-[#faf9f6] text-foreground text-xs focus:border-black focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1 sm:col-span-2">
                    <label className="font-bold uppercase tracking-wider text-[11px] text-foreground/80 block">
                      Street Address & Landmark *
                    </label>
                    <input
                      type="text"
                      name="address"
                      required
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="House/Flat No., Street Name, Landmark"
                      className="w-full px-3 py-2.5 border border-[#edebe4] bg-[#faf9f6] text-foreground text-xs focus:border-black focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold uppercase tracking-wider text-[11px] text-foreground/80 block">
                      Pincode (Pan-India) *
                    </label>
                    <input
                      type="text"
                      name="pincode"
                      required
                      maxLength={6}
                      value={formData.pincode}
                      onChange={handleInputChange}
                      placeholder="e.g. 400001"
                      className="w-full px-3 py-2.5 border border-[#edebe4] bg-[#faf9f6] text-foreground text-xs focus:border-black focus:outline-none font-mono"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold uppercase tracking-wider text-[11px] text-foreground/80 block">
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="e.g. Mumbai / Bangalore / Delhi"
                      className="w-full px-3 py-2.5 border border-[#edebe4] bg-[#faf9f6] text-foreground text-xs focus:border-black focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Step 2: Payment Method Selection */}
              <div className="bg-[#ffffff] border border-[#edebe4] p-5 sm:p-6 shadow-sm space-y-5">
                <div className="border-b border-[#edebe4] pb-3 flex items-center justify-between">
                  <h2 className="text-sm font-black uppercase tracking-wider text-foreground flex items-center gap-2">
                    <span className="w-5 h-5 bg-black text-white text-xs rounded-full flex items-center justify-center font-mono">2</span>
                    SELECT PAYMENT METHOD
                  </h2>
                  <span className="text-[11px] text-emerald-700 font-mono font-bold">Razorpay Secure</span>
                </div>

                <div className="space-y-3">
                  {/* Option 1: Instant UPI */}
                  <label
                    onClick={() => setPaymentMethod('upi')}
                    className={`p-4 border cursor-pointer flex items-center justify-between transition-all ${
                      paymentMethod === 'upi'
                        ? 'border-primary bg-primary/5 shadow-sm'
                        : 'border-[#edebe4] bg-[#faf9f6] hover:border-black/30'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === 'upi'}
                        onChange={() => setPaymentMethod('upi')}
                        className="accent-primary"
                      />
                      <QrCode className="w-6 h-6 text-primary shrink-0" />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-xs text-foreground uppercase">INSTANT UPI / QR</span>
                          <span className="bg-emerald-600 text-white text-[9px] font-mono px-1.5 py-0.5 rounded-none font-bold uppercase animate-pulse">
                            FLAT ₹100 OFF
                          </span>
                        </div>
                        <p className="text-[11px] text-foreground/60">Google Pay, PhonePe, Paytm, BHIM & All UPI Apps</p>
                      </div>
                    </div>
                  </label>

                  {/* Option 2: Credit / Debit Card */}
                  <label
                    onClick={() => setPaymentMethod('card')}
                    className={`p-4 border cursor-pointer flex items-center justify-between transition-all ${
                      paymentMethod === 'card'
                        ? 'border-primary bg-primary/5 shadow-sm'
                        : 'border-[#edebe4] bg-[#faf9f6] hover:border-black/30'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === 'card'}
                        onChange={() => setPaymentMethod('card')}
                        className="accent-primary"
                      />
                      <CreditCard className="w-6 h-6 text-primary shrink-0" />
                      <div>
                        <span className="font-extrabold text-xs text-foreground uppercase block">CREDIT / DEBIT CARD</span>
                        <p className="text-[11px] text-foreground/60">Visa, Mastercard, RuPay, Maestro & Amex</p>
                      </div>
                    </div>
                  </label>

                  {/* Option 3: Netbanking */}
                  <label
                    onClick={() => setPaymentMethod('netbanking')}
                    className={`p-4 border cursor-pointer flex items-center justify-between transition-all ${
                      paymentMethod === 'netbanking'
                        ? 'border-primary bg-primary/5 shadow-sm'
                        : 'border-[#edebe4] bg-[#faf9f6] hover:border-black/30'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === 'netbanking'}
                        onChange={() => setPaymentMethod('netbanking')}
                        className="accent-primary"
                      />
                      <Building className="w-6 h-6 text-primary shrink-0" />
                      <div>
                        <span className="font-extrabold text-xs text-foreground uppercase block">NETBANKING</span>
                        <p className="text-[11px] text-foreground/60">HDFC, ICICI, SBI, Axis & 50+ Indian Banks</p>
                      </div>
                    </div>
                  </label>

                  {/* Option 4: Cash on Delivery */}
                  <label
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-4 border cursor-pointer flex items-center justify-between transition-all ${
                      paymentMethod === 'cod'
                        ? 'border-primary bg-primary/5 shadow-sm'
                        : 'border-[#edebe4] bg-[#faf9f6] hover:border-black/30'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === 'cod'}
                        onChange={() => setPaymentMethod('cod')}
                        className="accent-primary"
                      />
                      <Banknote className="w-6 h-6 text-primary shrink-0" />
                      <div>
                        <span className="font-extrabold text-xs text-foreground uppercase block">CASH ON DELIVERY (COD)</span>
                        <p className="text-[11px] text-foreground/60">Pay cash/UPI at doorstep upon express delivery</p>
                      </div>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Right Column (5 cols): Order Items & Pricing Summary (Sticky on Desktop) */}
            <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24 lg:self-start">
              <div className="bg-[#ffffff] border border-[#edebe4] p-6 shadow-md space-y-4">
                <h3 className="text-xs font-black uppercase tracking-wider text-foreground border-b border-[#edebe4] pb-3 flex items-center justify-between">
                  <span>ORDER SUMMARY</span>
                  <span className="text-foreground/60 font-mono font-normal">({totalItemsCount} Items)</span>
                </h3>

                {/* Items Mini List */}
                <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center justify-between gap-3 text-xs border-b border-[#edebe4] pb-2">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={40}
                          height={40}
                          className="w-10 h-10 object-cover bg-[#f7f6f2] border border-[#edebe4] shrink-0"
                        />
                        <div className="min-w-0">
                          <p className="font-bold text-foreground truncate">{item.name}</p>
                          <p className="text-[10px] text-foreground/60 font-mono">Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <span className="font-extrabold font-mono text-foreground shrink-0">
                        {formatPaise(item.pricePaise * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Costs Breakdown */}
                <div className="space-y-2 text-xs font-mono pt-2 border-t border-[#edebe4]">
                  <div className="flex justify-between text-foreground/70">
                    <span>Subtotal</span>
                    <span className="font-bold text-foreground font-sans">{formatPaise(subtotalPaise)}</span>
                  </div>

                  <div className="flex justify-between text-foreground/70">
                    <span>Express Pan-India Shipping</span>
                    <span className="font-bold text-emerald-700 font-sans">
                      {shippingCostPaise === 0 ? 'FREE' : formatPaise(shippingCostPaise)}
                    </span>
                  </div>

                  {paymentMethod === 'upi' && (
                    <div className="flex justify-between text-emerald-700 font-bold">
                      <span>UPI Instant Discount</span>
                      <span>-₹100</span>
                    </div>
                  )}

                  <div className="flex justify-between text-sm font-black font-sans text-foreground pt-3 border-t border-[#edebe4]">
                    <span className="uppercase">TOTAL PAYABLE</span>
                    <span className="text-xl text-primary font-black">{formatPaise(finalPayablePaise)}</span>
                  </div>
                </div>
              </div>

              {/* Guarantees Box */}
              <div className="bg-[#000000] text-white p-5 space-y-3 text-xs shadow-md">
                <div className="flex items-center gap-2.5 text-primary font-bold uppercase text-[11px]">
                  <ShieldCheck className="w-4 h-4" />
                  <span>UNIT 22 GUARANTEE & PROTECTION</span>
                </div>
                <ul className="space-y-2 text-[11px] text-white/80 font-sans">
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                    <span>100% Dyno Tested fitment precision for your motorcycle.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                    <span>7-day easy exchange & refund policy.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                    <span>Transit insurance against loss/damage included free.</span>
                  </li>
                </ul>
              </div>
            </div>
          </form>
        )}
      </div>

      {/* SINGLE UNIFIED FIXED BOTTOM PLACE ORDER BAR (Silky Smooth 700ms Slide-Up Animation) */}
      {items.length > 0 && !orderSuccess && (
        <div
          className={`fixed bottom-[68px] inset-x-2 lg:bottom-4 lg:left-1/2 lg:-translate-x-1/2 lg:w-full lg:max-w-4xl z-30 bg-white/95 backdrop-blur-md text-foreground p-3.5 sm:p-4 border border-black/15 shadow-[0_15px_40px_rgba(0,0,0,0.25)] rounded-xl sm:rounded-2xl flex items-center justify-between gap-4 font-sans transition-all duration-700 ease-out transform ${
            isMounted ? 'translate-y-0 opacity-100' : 'translate-y-24 opacity-0'
          }`}
        >
          <div className="leading-tight">
            <span className="text-[10px] sm:text-xs text-foreground/70 font-mono font-extrabold uppercase block">
              TOTAL PAYABLE AMOUNT
            </span>
            <span className="text-lg sm:text-2xl font-black text-primary">
              {formatPaise(finalPayablePaise)}
            </span>
          </div>

          <Button
            type="button"
            variant="primary"
            size="lg"
            disabled={isSubmitting}
            onClick={handlePlaceOrder}
            className="h-11 sm:h-13 px-5 sm:px-8 text-xs sm:text-sm font-black uppercase tracking-wider bg-primary hover:bg-black text-white rounded-lg sm:rounded-xl border-0 gap-2 flex items-center shadow-lg active:scale-95 transition-all"
          >
            <span>{isSubmitting ? 'PROCESSING ORDER...' : 'PLACE ORDER NOW'}</span>
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </Button>
        </div>
      )}
    </div>
  );
}
