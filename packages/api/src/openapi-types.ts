/**
 * Auto-generated / initial OpenAPI schema contract type definitions.
 * Synchronized via `pnpm --filter @monorepo/api generate-types`.
 */

export interface paths {
  "/api/health": {
    get: {
      responses: {
        200: {
          content: {
            "application/json": {
              status: string;
              timestamp: string;
            };
          };
        };
      };
    };
  };
  "/admin/api/health": {
    get: {
      responses: {
        200: {
          content: {
            "application/json": {
              status: string;
              timestamp: string;
            };
          };
        };
      };
    };
  };
}

export interface components {
  schemas: {
    Brand: {
      id: string;
      name: string;
      slug: string;
      logoUrl?: string;
      description?: string;
      productCount: number;
    };
    Category: {
      id: string;
      name: string;
      slug: string;
      parentId?: string | null;
      children?: components["schemas"]["Category"][];
    };
    FitmentBike: {
      id: string;
      make: string;
      model: string;
      year: number;
    };
    ProductVariant: {
      id: string;
      sku: string;
      name: string;
      pricePaise: number;
      stock: number;
      attributes: Record<string, string>;
    };
    Product: {
      id: string;
      name: string;
      slug: string;
      brand: components["schemas"]["Brand"];
      category: components["schemas"]["Category"];
      basePricePaise: number;
      images: string[];
      variants: components["schemas"]["ProductVariant"][];
      compatibleBikeIds: string[];
      specs: Record<string, string>;
      inStock: boolean;
      rating?: number;
      reviewCount?: number;
    };
    CartLine: {
      id: string;
      productId: string;
      variantId: string;
      quantity: number;
      unitPricePaise: number;
      totalPricePaise: number;
      productName: string;
      imageUrl: string;
    };
    AppliedCombo: {
      id: string;
      label: string;
      discountPaise: number;
    };
    Cart: {
      id: string;
      lines: components["schemas"]["CartLine"][];
      appliedCombos: components["schemas"]["AppliedCombo"][];
      subtotalPaise: number;
      savingsPaise: number;
      shippingPaise: number;
      taxPaise: number;
      totalPaise: number;
    };
    AdminUser: {
      id: string;
      email: string;
      name: string;
      role: 'Super Admin' | 'Catalog Manager' | 'Order Manager' | 'Content Editor';
      permissions: string[];
    };
  };
}
