'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { MOCK_PRODUCTS, MOCK_BRANDS, MOCK_BIKES } from '@monorepo/mocks';
import { components, formatPaise } from '@monorepo/api';
import { Button, Input, Badge } from '@monorepo/ui';
import {
  Package,
  Plus,
  Search,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  Filter,
  X,
  Bike,
  Save,
  Check,
  Tag,
  DollarSign,
} from 'lucide-react';

export default function ProductCatalogCmsPage() {
  const [products, setProducts] = useState<components['schemas']['Product'][]>(MOCK_PRODUCTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrandFilter, setSelectedBrandFilter] = useState<string>('ALL');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<components['schemas']['Product'] | null>(null);

  // Modal Form Inputs
  const [formName, setFormName] = useState('');
  const [formSlug, setFormSlug] = useState('');
  const [formBrandId, setFormBrandId] = useState(MOCK_BRANDS[0].id);
  const [formPrice, setFormPrice] = useState('1299');
  const [formStock, setFormStock] = useState('50');
  const [formSpecKey, setFormSpecKey] = useState('Material');
  const [formSpecVal, setFormSpecVal] = useState('Sintered Metal');
  const [successMsg, setSuccessMsg] = useState('');

  // Filter products
  const filteredProducts = products.filter((prod) => {
    const matchesSearch =
      prod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.slug.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesBrand = selectedBrandFilter === 'ALL' || prod.brand.id === selectedBrandFilter;
    return matchesSearch && matchesBrand;
  });

  const handleOpenCreateModal = () => {
    setEditingProduct(null);
    setFormName('');
    setFormSlug('');
    setFormPrice('1299');
    setFormStock('50');
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (prod: components['schemas']['Product']) => {
    setEditingProduct(prod);
    setFormName(prod.name);
    setFormSlug(prod.slug);
    setFormPrice((prod.basePricePaise / 100).toString());
    setFormStock((prod.variants[0]?.stock || 20).toString());
    setIsModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) return;

    const pricePaise = Math.round(parseFloat(formPrice || '0') * 100);
    const stockNum = parseInt(formStock || '0', 10);
    const selectedBrand = MOCK_BRANDS.find((b) => b.id === formBrandId) || MOCK_BRANDS[0];

    if (editingProduct) {
      // Update
      setProducts((prev) =>
        prev.map((p) =>
          p.id === editingProduct.id
            ? {
                ...p,
                name: formName,
                slug: formSlug || formName.toLowerCase().replace(/\s+/g, '-'),
                brand: selectedBrand,
                basePricePaise: pricePaise,
                inStock: stockNum > 0,
                variants: [
                  {
                    ...p.variants[0],
                    pricePaise: pricePaise,
                    stock: stockNum,
                  },
                ],
              }
            : p
        )
      );
    } else {
      // Create new
      const newProduct: components['schemas']['Product'] = {
        id: `p-${Date.now()}`,
        name: formName,
        slug: formSlug || formName.toLowerCase().replace(/\s+/g, '-'),
        brand: selectedBrand,
        category: { id: 'c-1', name: 'Performance', slug: 'brakes' },
        basePricePaise: pricePaise,
        images: ['/images/product_brake_pads.png'],
        variants: [
          {
            id: `v-${Date.now()}`,
            sku: `U22-${formName.substring(0, 3).toUpperCase()}-01`,
            name: 'Standard Spec',
            pricePaise: pricePaise,
            stock: stockNum,
            attributes: {},
          },
        ],
        compatibleBikeIds: ['bike-1', 'bike-2'],
        specs: { [formSpecKey]: formSpecVal },
        inStock: stockNum > 0,
        rating: 5.0,
        reviewCount: 1,
      };

      setProducts((prev) => [newProduct, ...prev]);
    }

    setIsModalOpen(false);
    setSuccessMsg(editingProduct ? 'Product updated successfully!' : 'New product created successfully!');
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const handleDeleteProduct = (id: string) => {
    if (confirm('Are you sure you want to remove this product from the CMS catalog?')) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6 font-sans">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#dedcd5] pb-4">
          <div>
            <span className="text-xs font-mono text-primary font-bold uppercase tracking-widest block">
              CATALOG MANAGEMENT
            </span>
            <h1 className="text-2xl sm:text-3xl font-black uppercase text-foreground tracking-tight flex items-center gap-2">
              <Package className="w-6 h-6 text-primary" />
              PRODUCT CATALOG CMS
            </h1>
          </div>

          <Button
            onClick={handleOpenCreateModal}
            variant="primary"
            className="text-xs font-black bg-primary text-black hover:bg-black hover:text-white border-0 gap-1.5 uppercase"
          >
            <Plus className="w-4 h-4" />
            <span>CREATE NEW PRODUCT</span>
          </Button>
        </div>

        {successMsg && (
          <div className="p-3.5 bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-bold font-mono flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-700" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Filter & Search Toolbar */}
        <div className="bg-[#ffffff] border border-[#edebe4] p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative flex-1 w-full max-w-md">
            <Input
              type="text"
              placeholder="Filter catalog by product title, slug, or SKU..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 text-xs bg-[#f9f9f8] border-[#d8d8da]"
            />
            <Search className="w-4 h-4 text-foreground/40 absolute left-3 top-3" />
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <span className="text-xs font-mono text-foreground/60 uppercase font-bold flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> BRAND:
            </span>
            <select
              value={selectedBrandFilter}
              onChange={(e) => setSelectedBrandFilter(e.target.value)}
              className="bg-[#f9f9f8] border border-[#d8d8da] text-xs font-bold text-foreground px-3 py-2 focus:outline-none focus:border-black cursor-pointer"
            >
              <option value="ALL">All Official Brands ({MOCK_BRANDS.length})</option>
              {MOCK_BRANDS.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Products CMS Table */}
        <div className="bg-[#ffffff] border border-[#edebe4] shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-[#000000] text-white uppercase border-b border-white/10">
                <tr>
                  <th className="p-3">Product Part</th>
                  <th className="p-3">Brand</th>
                  <th className="p-3">Base Price (₹)</th>
                  <th className="p-3">Stock Level</th>
                  <th className="p-3">Dyno Bikes</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">CMS Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#edebe4]">
                {filteredProducts.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-foreground/60 font-sans">
                      No products found matching &quot;{searchQuery}&quot;.
                    </td>
                  </tr>
                ) : (
                  filteredProducts.map((prod) => {
                    const stockVal = prod.variants?.[0]?.stock ?? (prod.inStock ? 15 : 0);

                    return (
                      <tr key={prod.id} className="hover:bg-[#faf9f6] transition-colors">
                        <td className="p-3 font-sans">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 relative bg-[#f7f6f2] border border-[#edebe4] shrink-0">
                              <Image
                                src={prod.images[0] || '/images/product_brake_pads.png'}
                                alt={prod.name}
                                fill
                                className="object-contain p-1"
                              />
                            </div>
                            <div>
                              <span className="font-extrabold text-foreground text-xs leading-snug block">
                                {prod.name}
                              </span>
                              <span className="text-[10px] text-foreground/50 font-mono">
                                SKU: U22-PART-{prod.id.toUpperCase()}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="p-3 font-bold text-primary font-sans">{prod.brand.name}</td>
                        <td className="p-3 font-bold text-foreground font-sans text-sm">
                          {formatPaise(prod.basePricePaise)}
                        </td>
                        <td className="p-3">
                          {stockVal <= 3 ? (
                            <span className="bg-red-100 text-red-800 text-[10px] font-bold px-2 py-0.5 border border-red-300">
                              LOW ({stockVal})
                            </span>
                          ) : (
                            <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 border border-emerald-300">
                              IN STOCK ({stockVal})
                            </span>
                          )}
                        </td>
                        <td className="p-3 text-foreground/80 font-mono">
                          {prod.compatibleBikeIds.length} Bikes Verified
                        </td>
                        <td className="p-3">
                          <span className="text-emerald-700 font-bold flex items-center gap-1">
                            <CheckCircle className="w-3.5 h-3.5" /> Published
                          </span>
                        </td>
                        <td className="p-3 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleOpenEditModal(prod)}
                              className="p-1.5 bg-[#f7f6f2] hover:bg-black hover:text-white border border-[#d8d8da] transition-colors"
                              title="Edit product in CMS"
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(prod.id)}
                              className="p-1.5 bg-red-50 hover:bg-red-600 hover:text-white border border-red-200 text-red-600 transition-colors"
                              title="Delete product"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Interactive CREATE / EDIT PRODUCT Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#ffffff] border border-[#edebe4] w-full max-w-xl shadow-2xl p-6 space-y-5 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-[#edebe4] pb-3">
              <h3 className="text-lg font-black uppercase text-foreground flex items-center gap-2">
                <Package className="w-5 h-5 text-primary" />
                {editingProduct ? 'EDIT PRODUCT IN CMS' : 'CREATE NEW CATALOG PRODUCT'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-foreground/60 hover:text-black"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-black uppercase text-foreground/80 block">PRODUCT TITLE *</label>
                <Input
                  type="text"
                  placeholder="e.g. Royal Enfield Continental GT Sintered Disc Rotor"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="bg-[#f9f9f8] text-xs h-10"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-black uppercase text-foreground/80 block">BRAND</label>
                  <select
                    value={formBrandId}
                    onChange={(e) => setFormBrandId(e.target.value)}
                    className="w-full h-10 px-3 bg-[#f9f9f8] border border-[#d8d8da] font-bold text-xs"
                  >
                    {MOCK_BRANDS.map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-black uppercase text-foreground/80 block">URL SLUG</label>
                  <Input
                    type="text"
                    placeholder="e.g. continental-gt-sintered-rotor"
                    value={formSlug}
                    onChange={(e) => setFormSlug(e.target.value)}
                    className="bg-[#f9f9f8] text-xs h-10 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-black uppercase text-foreground/80 block">BASE PRICE (₹) *</label>
                  <Input
                    type="number"
                    placeholder="e.g. 1299"
                    value={formPrice}
                    onChange={(e) => setFormPrice(e.target.value)}
                    className="bg-[#f9f9f8] text-xs h-10 font-bold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-black uppercase text-foreground/80 block">STOCK LEVEL (UNITS) *</label>
                  <Input
                    type="number"
                    placeholder="e.g. 50"
                    value={formStock}
                    onChange={(e) => setFormStock(e.target.value)}
                    className="bg-[#f9f9f8] text-xs h-10 font-bold"
                  />
                </div>
              </div>

              <div className="p-3 bg-[#f7f6f2] border border-[#edebe4] space-y-2">
                <label className="font-black uppercase text-foreground/80 block">SPECIFICATION HIGHLIGHT</label>
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    type="text"
                    placeholder="Key (e.g. Material)"
                    value={formSpecKey}
                    onChange={(e) => setFormSpecKey(e.target.value)}
                    className="bg-white text-xs h-9 font-mono"
                  />
                  <Input
                    type="text"
                    placeholder="Value (e.g. Titanium & Carbon)"
                    value={formSpecVal}
                    onChange={(e) => setFormSpecVal(e.target.value)}
                    className="bg-white text-xs h-9 font-mono"
                  />
                </div>
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
                  className="text-xs font-black bg-primary text-black hover:bg-black hover:text-white border-0 gap-1.5 uppercase"
                >
                  <Save className="w-4 h-4" />
                  <span>SAVE PRODUCT TO CMS</span>
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
