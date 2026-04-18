import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Product } from '@/types';
import { toast } from 'sonner';

export interface AnimationData {
  id: number;
  startX: number;
  startY: number;
  imageUrl: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
  triggerFlyAnimation: (x: number, y: number, imageUrl: string) => void;
  animations: AnimationData[];
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem('godsway-cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [animations, setAnimations] = useState<AnimationData[]>([]);

  useEffect(() => {
    localStorage.setItem('godsway-cart', JSON.stringify(cart));
  }, [cart]);

  const triggerFlyAnimation = (x: number, y: number, imageUrl: string) => {
    const id = Date.now();
    setAnimations(prev => [...prev, { id, startX: x, startY: y, imageUrl }]);
    
    setTimeout(() => {
      setAnimations(prev => prev.filter(a => a.id !== id));
    }, 1000);
  };

  const addToCart = (product: Product, quantity: number = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        toast.success(`Increased quantity of ${product.name}`);
        return prev.map(item =>
          item.id === product.id
            ? { ...item, cartQuantity: item.cartQuantity + quantity }
            : item
        );
      }
      toast.success(`Added ${product.name} to cart`);
      return [...prev, { ...product, cartQuantity: quantity }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.id !== productId));
    toast.info('Item removed from cart');
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.id === productId ? { ...item, cartQuantity: quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('godsway-cart');
  };

  const cartTotal = cart.reduce((acc, item) => acc + item.price * item.cartQuantity, 0);
  const cartCount = cart.reduce((acc, item) => acc + item.cartQuantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartCount,
        triggerFlyAnimation,
        animations,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
