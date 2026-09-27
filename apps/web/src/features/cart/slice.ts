import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { components } from '@monorepo/api';

export interface CartItem {
  id: string;
  productId: string;
  variantId?: string;
  name: string;
  slug: string;
  pricePaise: number;
  image: string;
  brandName: string;
  variantName?: string;
  quantity: number;
  compatibleBikeIds?: string[];
}

interface CartUiState {
  isCartDrawerOpen: boolean;
  items: CartItem[];
}

const initialState: CartUiState = {
  isCartDrawerOpen: false,
  items: [
    {
      id: 'cart-item-1',
      productId: 'p-1',
      variantId: 'v-1',
      name: 'Interceptor 650 Sintered Brake Pads (Front)',
      slug: 'interceptor-650-brake-pads',
      pricePaise: 129900,
      image: '/images/product_brake_pads.png',
      brandName: 'Brembo Brakes',
      variantName: 'Front Set',
      quantity: 1,
    },
  ],
};

export const cartUiSlice = createSlice({
  name: 'cartUi',
  initialState,
  reducers: {
    openCartDrawer: (state) => {
      state.isCartDrawerOpen = true;
    },
    closeCartDrawer: (state) => {
      state.isCartDrawerOpen = false;
    },
    toggleCartDrawer: (state) => {
      state.isCartDrawerOpen = !state.isCartDrawerOpen;
    },
    addToCart: (
      state,
      action: PayloadAction<{
        product: components['schemas']['Product'];
        variantId?: string;
        quantity?: number;
      }>
    ) => {
      const { product, variantId, quantity = 1 } = action.payload;
      const targetVariant = product.variants?.find((v) => v.id === variantId) || product.variants?.[0];
      const targetPrice = targetVariant ? targetVariant.pricePaise : product.basePricePaise;
      const targetVariantId = targetVariant ? targetVariant.id : 'v-default';
      const targetVariantName = targetVariant ? targetVariant.name : undefined;

      const existingIndex = state.items.findIndex(
        (item) => item.productId === product.id && item.variantId === targetVariantId
      );

      if (existingIndex > -1) {
        state.items[existingIndex].quantity += quantity;
      } else {
        state.items.push({
          id: `cart-${product.id}-${targetVariantId}-${Date.now()}`,
          productId: product.id,
          variantId: targetVariantId,
          name: product.name,
          slug: product.slug,
          pricePaise: targetPrice,
          image: product.images?.[0] || '/images/hero_banner_brakes.png',
          brandName: product.brand?.name || 'Unit22',
          variantName: targetVariantName,
          quantity: quantity,
          compatibleBikeIds: product.compatibleBikeIds,
        });
      }

      state.isCartDrawerOpen = true;
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) => {
      const { id, quantity } = action.payload;
      if (quantity <= 0) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        const item = state.items.find((i) => i.id === id);
        if (item) {
          item.quantity = quantity;
        }
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const {
  openCartDrawer,
  closeCartDrawer,
  toggleCartDrawer,
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
} = cartUiSlice.actions;

export default cartUiSlice.reducer;

