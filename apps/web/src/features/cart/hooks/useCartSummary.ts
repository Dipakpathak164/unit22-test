'use client';

import { useAppDispatch, useAppSelector } from '@/lib/store/store';
import {
  openCartDrawer,
  closeCartDrawer,
  toggleCartDrawer,
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  CartItem,
} from '../slice';
import { components } from '@monorepo/api';

const FREE_SHIPPING_THRESHOLD = 200000; // ₹2,000 in paise
const DEFAULT_SHIPPING_COST = 15000; // ₹150 in paise

export function useCartSummary() {
  const dispatch = useAppDispatch();
  const { isCartDrawerOpen, items } = useAppSelector((state) => state.cartUi);

  const subtotalPaise = items.reduce(
    (acc, item) => acc + item.pricePaise * item.quantity,
    0
  );

  const totalItemsCount = items.reduce((acc, item) => acc + item.quantity, 0);

  const freeShippingProgressPercent = Math.min(
    100,
    Math.round((subtotalPaise / FREE_SHIPPING_THRESHOLD) * 100)
  );

  const amountLeftForFreeShipping = Math.max(
    0,
    FREE_SHIPPING_THRESHOLD - subtotalPaise
  );

  const shippingCostPaise =
    subtotalPaise >= FREE_SHIPPING_THRESHOLD || items.length === 0
      ? 0
      : DEFAULT_SHIPPING_COST;

  const grandTotalPaise = subtotalPaise + shippingCostPaise;

  const handleAddToCart = (
    product: components['schemas']['Product'],
    variantId?: string,
    quantity: number = 1
  ) => {
    dispatch(addToCart({ product, variantId, quantity }));
  };

  const handleRemoveItem = (id: string) => {
    dispatch(removeFromCart(id));
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    dispatch(updateQuantity({ id, quantity }));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleOpenCart = () => {
    dispatch(openCartDrawer());
  };

  const handleCloseCart = () => {
    dispatch(closeCartDrawer());
  };

  const handleToggleCart = () => {
    dispatch(toggleCartDrawer());
  };

  return {
    isCartDrawerOpen,
    items,
    totalItemsCount,
    subtotalPaise,
    shippingCostPaise,
    grandTotalPaise,
    freeShippingProgressPercent,
    amountLeftForFreeShipping,
    handleAddToCart,
    handleRemoveItem,
    handleUpdateQuantity,
    handleClearCart,
    clearCart: handleClearCart,
    handleOpenCart,
    handleCloseCart,
    handleToggleCart,
  };
}
