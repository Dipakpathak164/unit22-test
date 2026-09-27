import React from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { AlertTriangle, CheckCircle, Trash2, Info } from 'lucide-react';

export function StyleguideComponent() {
  return (
    <div className="max-w-5xl mx-auto p-6 space-y-10 bg-background text-foreground min-h-screen border border-border my-6">
      <header className="border-b border-border pb-4">
        <h1 className="text-3xl font-bold tracking-tight">Design Token & Palette Styleguide</h1>
        <p className="text-sm mt-1 text-foreground/80">
          Enforcing strict 5-color palette (#000000, #fa0d13, #fefefe, #ffffff, #d8d8da) & WCAG 2.1 AA accessibility guidelines.
        </p>
      </header>

      {/* Brand Color Tokens */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold border-b border-border pb-1">1. Brand Palette Tokens</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center text-xs font-mono">
          <div className="p-4 bg-[#000000] text-[#ffffff] border border-border">
            <p className="font-bold">Black (#000000)</p>
            <p className="opacity-75">Primary text, sidebar</p>
          </div>
          <div className="p-4 bg-[#fa0d13] text-[#000000] border border-border">
            <p className="font-bold">Red (#fa0d13)</p>
            <p className="opacity-90">Brand accent CTA</p>
          </div>
          <div className="p-4 bg-[#fefefe] text-[#000000] border border-border">
            <p className="font-bold">Off-white (#fefefe)</p>
            <p className="opacity-75">Page background</p>
          </div>
          <div className="p-4 bg-[#ffffff] text-[#000000] border border-border">
            <p className="font-bold">White (#ffffff)</p>
            <p className="opacity-75">Cards, input, surface</p>
          </div>
          <div className="p-4 bg-[#d8d8da] text-[#000000] border border-border">
            <p className="font-bold">Light Grey (#d8d8da)</p>
            <p className="opacity-75">Borders, disabled</p>
          </div>
        </div>
      </section>

      {/* Button States */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold border-b border-border pb-1">2. Button States</h2>
        <div className="flex flex-wrap gap-4 items-center">
          <Button variant="primary">Primary CTA (Red + Black Text)</Button>
          <Button variant="secondary">Secondary CTA (Black)</Button>
          <Button variant="outline">Outline Button</Button>
          <Button variant="destructive-trigger" className="gap-2">
            <Trash2 className="w-4 h-4" /> Delete (Trigger)
          </Button>
          <Button variant="primary" disabled>Disabled State</Button>
        </div>
      </section>

      {/* Badges & Status Indicators */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold border-b border-border pb-1">3. Badges & Status Indicators</h2>
        <div className="flex flex-wrap gap-4 items-center">
          <Badge variant="sale">SALE 20% OFF</Badge>
          <Badge variant="neutral">
            <CheckCircle className="w-3.5 h-3.5" /> In Stock
          </Badge>
          <Badge variant="status">
            <AlertTriangle className="w-3.5 h-3.5" /> Low Stock (2 left)
          </Badge>
          <Badge variant="neutral">
            <Info className="w-3.5 h-3.5" /> Fits your bike
          </Badge>
        </div>
      </section>

      {/* Form Controls & Inputs */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold border-b border-border pb-1">4. Form Inputs & Error States</h2>
        <div className="grid md:grid-cols-2 gap-4 max-w-2xl">
          <div>
            <label className="text-xs font-semibold block mb-1">Standard Input</label>
            <Input placeholder="Enter bike make or model..." />
          </div>
          <div>
            <label className="text-xs font-semibold block mb-1">Invalid Error State</label>
            <Input placeholder="Invalid pincode" error defaultValue="abc" />
            <span className="text-xs text-primary-hover flex items-center gap-1 mt-1 font-semibold">
              <AlertTriangle className="w-3 h-3" /> Pincode must be 6 digits
            </span>
          </div>
        </div>
      </section>

      {/* Table Sample */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold border-b border-border pb-1">5. Table Rows & Headers</h2>
        <div className="border border-border overflow-x-auto bg-card">
          <table className="w-full text-left text-sm">
            <thead className="bg-background border-b border-border text-xs uppercase font-semibold">
              <tr>
                <th className="p-3">SKU</th>
                <th className="p-3">Product Name</th>
                <th className="p-3">Stock</th>
                <th className="p-3">Price</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr>
                <td className="p-3 font-mono">RE-INT650-BP</td>
                <td className="p-3 font-medium">Interceptor 650 Brake Pads</td>
                <td className="p-3">45</td>
                <td className="p-3">₹1,299</td>
                <td className="p-3"><Badge variant="neutral">Active</Badge></td>
              </tr>
              <tr>
                <td className="p-3 font-mono">KT-DUKE390-EX</td>
                <td className="p-3 font-medium">Duke 390 Exhaust System</td>
                <td className="p-3">2</td>
                <td className="p-3">₹18,500</td>
                <td className="p-3"><Badge variant="status">Low Stock</Badge></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
