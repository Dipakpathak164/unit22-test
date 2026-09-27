'use client';

import React, { useState } from 'react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { MOCK_BIKES, MOCK_PRODUCTS } from '@monorepo/mocks';
import { Button, Input } from '@monorepo/ui';
import { Bike, CheckCircle, Plus, Search, ShieldCheck, Wrench, X } from 'lucide-react';

export default function FitmentMatrixPage() {
  const [bikes, setBikes] = useState(MOCK_BIKES);
  const [searchQuery, setSearchQuery] = useState('');
  const [newMake, setNewMake] = useState('');
  const [newModel, setNewModel] = useState('');
  const [newYear, setNewYear] = useState('2024');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [msg, setMsg] = useState('');

  const filteredBikes = bikes.filter((b) =>
    `${b.make} ${b.model}`.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddBike = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMake.trim() || !newModel.trim()) return;

    const newBike = {
      id: `bike-${Date.now()}`,
      make: newMake,
      model: newModel,
      year: parseInt(newYear, 10),
    };

    setBikes((prev) => [newBike, ...prev]);
    setIsModalOpen(false);
    setNewMake('');
    setNewModel('');
    setMsg(`Successfully registered ${newMake} ${newModel} into Dyno Fitment Index!`);
    setTimeout(() => setMsg(''), 3000);
  };

  return (
    <AdminLayout>
      <div className="space-y-6 font-sans">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#dedcd5] pb-4">
          <div>
            <span className="text-xs font-mono text-primary font-bold uppercase tracking-widest block">
              ENGINEERING COMPATIBILITY
            </span>
            <h1 className="text-2xl sm:text-3xl font-black uppercase text-foreground tracking-tight flex items-center gap-2">
              <Bike className="w-6 h-6 text-primary" />
              DYNO FITMENT MATRIX CMS
            </h1>
          </div>

          <Button
            onClick={() => setIsModalOpen(true)}
            variant="primary"
            className="text-xs font-black bg-primary text-black hover:bg-black hover:text-white border-0 gap-1.5 uppercase"
          >
            <Plus className="w-4 h-4" />
            <span>ADD MOTORCYCLE MODEL</span>
          </Button>
        </div>

        {msg && (
          <div className="p-3.5 bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-bold font-mono flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-700" />
            <span>{msg}</span>
          </div>
        )}

        {/* Search */}
        <div className="bg-[#ffffff] border border-[#edebe4] p-4">
          <div className="relative max-w-md">
            <Input
              type="text"
              placeholder="Search fitment index by make or model..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 text-xs bg-[#f9f9f8] border-[#d8d8da]"
            />
            <Search className="w-4 h-4 text-foreground/40 absolute left-3 top-3" />
          </div>
        </div>

        {/* Fitment Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredBikes.map((bike) => (
            <div key={bike.id} className="bg-[#ffffff] border border-[#edebe4] p-5 space-y-3 shadow-xs">
              <div className="flex items-center justify-between border-b border-[#edebe4] pb-2">
                <span className="text-xs font-black uppercase text-primary tracking-widest font-mono">
                  {bike.make} OFFICIAL
                </span>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase px-2 py-0.5 border border-emerald-300">
                  DYNO TESTED
                </span>
              </div>

              <div>
                <h3 className="text-lg font-black uppercase text-foreground">{bike.model}</h3>
                <p className="text-xs text-foreground/60 font-mono">Model Year Range: {bike.year} - 2026</p>
              </div>

              <div className="pt-2 border-t border-[#f0eee6] flex items-center justify-between text-xs font-mono">
                <span className="text-foreground/70">Compatible Parts: 6 Parts</span>
                <span className="text-primary font-bold">100% Fit</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ADD BIKE MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#ffffff] border border-[#edebe4] w-full max-w-md shadow-2xl p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-[#edebe4] pb-3">
              <h3 className="text-lg font-black uppercase text-foreground flex items-center gap-2">
                <Bike className="w-5 h-5 text-primary" />
                REGISTER MOTORCYCLE MODEL
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1 text-foreground/60 hover:text-black">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddBike} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-black uppercase text-foreground/80 block">MAKE / MANUFACTURER *</label>
                <Input
                  type="text"
                  placeholder="e.g. Royal Enfield, KTM, BMW"
                  value={newMake}
                  onChange={(e) => setNewMake(e.target.value)}
                  className="bg-[#f9f9f8] text-xs h-10"
                />
              </div>

              <div className="space-y-1">
                <label className="font-black uppercase text-foreground/80 block">MODEL NAME *</label>
                <Input
                  type="text"
                  placeholder="e.g. Shotgun 650"
                  value={newModel}
                  onChange={(e) => setNewModel(e.target.value)}
                  className="bg-[#f9f9f8] text-xs h-10"
                />
              </div>

              <div className="space-y-1">
                <label className="font-black uppercase text-foreground/80 block">START YEAR *</label>
                <Input
                  type="number"
                  placeholder="2024"
                  value={newYear}
                  onChange={(e) => setNewYear(e.target.value)}
                  className="bg-[#f9f9f8] text-xs h-10 font-bold"
                />
              </div>

              <div className="pt-3 border-t border-[#edebe4] flex justify-end gap-3">
                <Button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  variant="outline"
                  className="text-xs font-bold border-black"
                >
                  CANCEL
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  className="text-xs font-black bg-primary text-black hover:bg-black hover:text-white border-0 uppercase"
                >
                  REGISTER BIKE MODEL
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
