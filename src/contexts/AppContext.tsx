import { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';

// Types
export type UserRole = 'guest' | 'buyer' | 'seller' | 'admin';
export type Language = 'en' | 'fr' | 'ar';
export type Theme = 'light' | 'dark';

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

interface AppState {
  user: User | null;
  currentRole: UserRole;
  language: Language;
  theme: Theme;
  isRTL: boolean;
  cart: CartItem[];
  wishlist: string[];
}

interface CartItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
  image: string;
}

type AppAction = 
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'SET_ROLE'; payload: UserRole }
  | { type: 'SET_LANGUAGE'; payload: Language }
  | { type: 'SET_THEME'; payload: Theme }
  | { type: 'ADD_TO_CART'; payload: CartItem }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'UPDATE_CART_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'ADD_TO_WISHLIST'; payload: string }
  | { type: 'REMOVE_FROM_WISHLIST'; payload: string };

const defaultState: AppState = {
  user: null,
  currentRole: 'guest',
  language: 'en',
  theme: 'light',
  isRTL: false,
  cart: [],
  wishlist: []
};

function loadInitialState(): AppState {
  try {
    const raw = localStorage.getItem('rassooq_app_state');
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<AppState>;
      const state: AppState = {
        ...defaultState,
        ...parsed,
        // Defensive: ensure required fields exist
        cart: parsed.cart ?? [],
        wishlist: parsed.wishlist ?? [],
        currentRole: parsed.currentRole ?? 'guest',
        language: parsed.language ?? 'en',
        isRTL: parsed.language === 'ar',
      };
      return state;
    }
  } catch {}
  return defaultState;
}

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'SET_ROLE':
      return { ...state, currentRole: action.payload };
    case 'SET_LANGUAGE':
      return { 
        ...state, 
        language: action.payload,
        isRTL: action.payload === 'ar'
      };
    case 'SET_THEME':
      return { ...state, theme: action.payload };
    case 'ADD_TO_CART':
      const existingItem = state.cart.find(item => item.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          )
        };
      }
      return { ...state, cart: [...state.cart, action.payload] };
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload)
      };
    case 'UPDATE_CART_QUANTITY':
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
      };
    case 'CLEAR_CART':
      return { ...state, cart: [] };
    case 'ADD_TO_WISHLIST':
      return {
        ...state,
        wishlist: [...state.wishlist, action.payload]
      };
    case 'REMOVE_FROM_WISHLIST':
      return {
        ...state,
        wishlist: state.wishlist.filter(id => id !== action.payload)
      };
    default:
      return state;
  }
}

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, undefined as unknown as AppState, loadInitialState);

  // Persist state to localStorage
  useEffect(() => {
    try {
      const toPersist: Partial<AppState> = {
        user: state.user,
        currentRole: state.currentRole,
        language: state.language,
        theme: state.theme,
        cart: state.cart,
        wishlist: state.wishlist,
      };
      localStorage.setItem('rassooq_app_state', JSON.stringify(toPersist));
    } catch {}
  }, [state.user, state.currentRole, state.language, state.theme, state.cart, state.wishlist]);

  // Apply RTL to document based on language
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.dir = state.isRTL ? 'rtl' : 'ltr';
      document.documentElement.lang = state.language;
    }
  }, [state.isRTL, state.language]);

  // Apply theme class
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.classList.toggle('dark', state.theme === 'dark');
    }
  }, [state.theme]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
}

// Convenience hooks
export function useAuth() {
  const { state, dispatch } = useAppContext();
  
  const login = (user: User) => {
    dispatch({ type: 'SET_USER', payload: user });
    dispatch({ type: 'SET_ROLE', payload: user.role });
  };
  
  const logout = () => {
    dispatch({ type: 'SET_USER', payload: null });
    dispatch({ type: 'SET_ROLE', payload: 'guest' });
    dispatch({ type: 'CLEAR_CART' });
  };
  
  return {
    user: state.user,
    currentRole: state.currentRole,
    isAuthenticated: !!state.user,
    login,
    logout
  };
}

export function useCart() {
  const { state, dispatch } = useAppContext();
  
  const addToCart = (item: Omit<CartItem, 'quantity'>, quantity = 1) => {
    dispatch({ 
      type: 'ADD_TO_CART', 
      payload: { ...item, quantity } 
    });
  };
  
  const removeFromCart = (id: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
  };
  
  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
    } else {
      dispatch({ type: 'UPDATE_CART_QUANTITY', payload: { id, quantity } });
    }
  };
  
  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };
  
  const total = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const itemCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  
  return {
    items: state.cart,
    total,
    itemCount,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart
  };
}

export function useWishlist() {
  const { state, dispatch } = useAppContext();
  
  const addToWishlist = (id: string) => {
    dispatch({ type: 'ADD_TO_WISHLIST', payload: id });
  };
  
  const removeFromWishlist = (id: string) => {
    dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: id });
  };
  
  const isInWishlist = (id: string) => state.wishlist.includes(id);
  
  return {
    items: state.wishlist,
    addToWishlist,
    removeFromWishlist,
    isInWishlist
  };
}