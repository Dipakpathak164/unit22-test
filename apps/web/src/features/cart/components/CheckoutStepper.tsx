'use client';

import React from 'react';
import { ShoppingBag, MapPin, CreditCard, Check } from 'lucide-react';

interface CheckoutStepperProps {
  currentStep: 1 | 2 | 3;
}

export function CheckoutStepper({ currentStep }: CheckoutStepperProps) {
  const steps = [
    {
      step: 1,
      label: 'CART SUMMARY',
      icon: ShoppingBag,
    },
    {
      step: 2,
      label: 'CONFIRM DETAILS',
      icon: MapPin,
    },
    {
      step: 3,
      label: 'FINAL PAYMENT',
      icon: CreditCard,
    },
  ];

  // Width of completed progress line fill
  const getProgressWidth = () => {
    if (currentStep === 1) return 'w-0';
    if (currentStep === 2) return 'w-1/2';
    return 'w-full';
  };

  return (
    <div className="w-full bg-transparent p-0 font-sans relative mt-0 mb-0">
      <div className="max-w-2xl mx-auto relative px-4">
        {/* Progress Track Line (Passing directly through center of the circles) */}
        <div className="absolute top-5 sm:top-6 inset-x-12 sm:inset-x-16 h-1 bg-[#edebe4] -translate-y-1/2 z-0 rounded-full overflow-hidden">
          <div
            className={`h-full bg-emerald-600 transition-all duration-500 ease-out ${getProgressWidth()}`}
          />
        </div>

        {/* Stepper Circles & Bottom Labels */}
        <div className="relative z-10 flex items-center justify-between">
          {steps.map((s) => {
            const Icon = s.icon;
            // Step is completed if currentStep is higher, OR if currentStep === 3 (Order Placed)
            const isCompleted = currentStep > s.step || (currentStep === 3 && s.step === 3);
            const isActive = currentStep === s.step && !isCompleted;

            return (
              <div key={s.step} className="flex flex-col items-center text-center gap-2 group">
                {/* Center Circle */}
                <div
                  className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm ${
                    isCompleted
                      ? 'bg-emerald-600 text-white border-2 border-emerald-600 shadow-emerald-200'
                      : isActive
                      ? 'bg-primary text-white border-2 border-primary shadow-[0_0_15px_rgba(250,13,19,0.5)] animate-pulse'
                      : 'bg-[#ffffff] text-foreground/40 border-2 border-[#edebe4]'
                  }`}
                >
                  {isCompleted ? (
                    <Check className="w-5 h-5 sm:w-6 sm:h-6 stroke-[3]" />
                  ) : (
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  )}
                </div>

                {/* Bottom Label Text */}
                <span
                  className={`text-[10px] sm:text-xs font-black uppercase tracking-wider transition-colors ${
                    isCompleted
                      ? 'text-emerald-700 font-black'
                      : isActive
                      ? 'text-primary font-black'
                      : 'text-foreground/40 font-bold'
                  }`}
                >
                  {s.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
