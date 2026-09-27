'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/lib/store/store';
import { closePickerModal, setSelectedBike, clearSelectedBike } from '../slice';
import { Button } from '@monorepo/ui';
import { MOCK_BIKES } from '@monorepo/mocks';
import { X, Bike, Trash2, ArrowRight } from 'lucide-react';

export function BikePickerModal() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.fitment.isPickerModalOpen);
  const currentBike = useAppSelector((state) => state.fitment.selectedBike);

  const [selectedMake, setSelectedMake] = useState<string>(currentBike?.make || '');
  const [selectedModel, setSelectedModel] = useState<string>(currentBike?.model || '');

  if (!isOpen) return null;

  const makes = Array.from(new Set(MOCK_BIKES.map((b) => b.make)));
  const availableModels = MOCK_BIKES.filter((b) => b.make === selectedMake).map((b) => b.model);

  const handleSaveAndNavigate = () => {
    if (!selectedMake) return;

    const found = MOCK_BIKES.find(
      (b) => b.make === selectedMake && (selectedModel ? b.model === selectedModel : true)
    );

    if (found) {
      dispatch(setSelectedBike(found));
    } else {
      dispatch(
        setSelectedBike({
          id: `custom-${selectedMake}-${selectedModel || 'all'}`,
          make: selectedMake,
          model: selectedModel || 'All Models',
          year: 2024,
        })
      );
    }

    dispatch(closePickerModal());

    // Navigate to product list page with specific selection query
    const searchQuery = selectedModel ? `${selectedMake} ${selectedModel}` : selectedMake;
    router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
  };

  const handleClear = () => {
    dispatch(clearSelectedBike());
    setSelectedMake('');
    setSelectedModel('');
    dispatch(closePickerModal());
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4 animate-in fade-in duration-200 font-sans">
      <div className="bg-[#ffffff] text-foreground border border-[#edebe4] w-full max-w-lg shadow-2xl relative p-6 space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#edebe4] pb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-primary/10 text-primary">
              <Bike className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black uppercase tracking-tight text-foreground">
                SELECT BRAND & MOTORCYCLE
              </h2>
              <p className="text-xs text-foreground/60">
                Filter catalog by 100% physical dyno-verified fitment
              </p>
            </div>
          </div>
          <button
            onClick={() => dispatch(closePickerModal())}
            className="p-1.5 text-foreground/60 hover:text-black hover:bg-[#f7f6f2] transition-colors focus:outline-none"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Currently Selected Banner */}
        {currentBike && (
          <div className="bg-[#f7f6f2] border border-[#edebe4] p-3 flex items-center justify-between text-xs font-mono">
            <div>
              <span className="text-[10px] uppercase font-bold text-foreground/60 block">Currently Active Filter:</span>
              <p className="font-extrabold text-foreground font-sans">
                {currentBike.make} {currentBike.model}
              </p>
            </div>
            <Button variant="outline" size="sm" onClick={handleClear} className="gap-1.5 text-xs font-bold border-black h-8">
              <Trash2 className="w-3.5 h-3.5 text-red-600" /> Reset Selection
            </Button>
          </div>
        )}

        {/* Select Fields */}
        <div className="space-y-4 text-xs font-sans">
          {/* Brand Select */}
          <div className="space-y-1.5">
            <label className="block font-black uppercase tracking-wider text-foreground/80">
              Select Brand
            </label>
            <select
              value={selectedMake}
              onChange={(e) => {
                setSelectedMake(e.target.value);
                setSelectedModel('');
              }}
              className="w-full h-11 border border-[#d8d8da] bg-[#f9f9f8] px-3 font-bold text-xs text-foreground focus:outline-none focus:border-black cursor-pointer"
            >
              <option value="">-- Select Brand --</option>
              {makes.map((make) => (
                <option key={make} value={make}>
                  {make}
                </option>
              ))}
            </select>
          </div>

          {/* Model Select */}
          <div className="space-y-1.5">
            <label className="block font-black uppercase tracking-wider text-foreground/80">
              Select Model
            </label>
            <select
              disabled={!selectedMake}
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              className="w-full h-11 border border-[#d8d8da] bg-[#f9f9f8] px-3 font-bold text-xs text-foreground disabled:opacity-50 disabled:bg-[#f0eee6] focus:outline-none focus:border-black cursor-pointer"
            >
              <option value="">-- Select Model (Optional) --</option>
              {availableModels.map((model) => (
                <option key={model} value={model}>
                  {model}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#edebe4]">
          <Button
            type="button"
            variant="outline"
            onClick={() => dispatch(closePickerModal())}
            className="text-xs font-bold border-black h-11"
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="primary"
            disabled={!selectedMake}
            onClick={handleSaveAndNavigate}
            className="text-xs font-black uppercase tracking-wider bg-primary text-white hover:bg-black border-0 h-11 px-5 gap-2"
          >
            <span>VIEW COMPATIBLE PARTS</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
