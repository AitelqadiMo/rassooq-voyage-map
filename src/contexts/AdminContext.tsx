import React, { createContext, useContext, useEffect, useMemo, useReducer } from 'react';
import { toast } from 'sonner';

export type AdminDateRange = '7d' | '30d';

export interface AdminProductApproval {
  id: string;
  image: string;
  seller: string;
  title: string;
  category: string;
  status: 'Pending' | 'Approved' | 'Rejected';
}

export interface AdminCategoryNode {
  id: string;
  name: string;
  children?: AdminCategoryNode[];
}

export interface AdminBrandRequest {
  id: string;
  brand: string;
  seller: string;
  docUrl: string;
  status: 'Pending' | 'Approved' | 'Rejected';
}

export type OrderStatus = 'New' | 'In Transit' | 'Delivered' | 'Cancelled';
export interface AdminOrder {
  id: string;
  seller: string;
  buyer: string;
  city: string;
  cod: boolean;
  amount: number;
  status: OrderStatus;
  courier: string;
  shipBy: number; // epoch ms deadline
}

export interface AdminRMA {
  id: string;
  orderId: string;
  item: string;
  reason: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  notes?: string;
  photos?: string[];
  timeline: string[]; // simplistic labels
}

export interface AdminSeller {
  id: string;
  name: string;
  email: string;
  status: 'Active' | 'Suspended' | 'Pending';
  commission: number; // percent
  kycComplete: boolean;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  ordersCount: number;
  codSuccess: number; // percent
  plus: boolean;
  suspended?: boolean;
}

export interface AdminPayout {
  id: string;
  seller: string;
  amount: number;
  status: 'Pending' | 'Approved' | 'Paid' | 'Rejected';
  date: string; // ISO
}

export interface AdminCMSSlot {
  id: string;
  type: 'Hero' | 'Banner' | 'Carousel' | 'CategoryTile';
  title: string;
  start: string;
  end: string;
  image?: string;
  link?: string;
}

export interface AdminPromotion {
  id: string;
  name: string;
  endsAt: string;
  active: boolean;
}

export interface AdminArticle {
  id: string;
  title: string;
  tags: string[];
  published: boolean;
}

export interface AdminHealth {
  db: 'ok' | 'warn' | 'down';
  queueLagMs: number;
  apiUptimePct: number;
}

export interface AdminLog {
  id: string;
  who: string;
  action: string;
  target: string;
  type: 'Product' | 'Seller' | 'Order' | 'System';
  at: string; // ISO
}

interface AdminState {
  dateRange: AdminDateRange;
  kpis: { gmv: number; ordersToday: number; codSuccessPct: number; returnsPct: number; activeSellers: number };
  ordersTrend: Array<{ day: string; orders: number; gmv: number }>;
  topCategories: Array<{ name: string; sales: number }>;
  topSellers: Array<{ name: string; sales: number }>;
  notifications: Array<{ id: string; message: string; level: 'info' | 'warn' | 'error' }>;

  approvals: AdminProductApproval[];
  categories: AdminCategoryNode[];
  brands: AdminBrandRequest[];

  orders: AdminOrder[];
  rmas: AdminRMA[];
  sellers: AdminSeller[];
  users: AdminUser[];
  payouts: AdminPayout[];
  slots: AdminCMSSlot[];
  promotions: AdminPromotion[];
  articles: AdminArticle[];
  health: AdminHealth;
  logs: AdminLog[];
}

type AdminAction =
  | { type: 'SET_DATE_RANGE'; payload: AdminDateRange }
  | { type: 'APPROVAL_UPDATE'; payload: { id: string; status: 'Approved' | 'Rejected' } }
  | { type: 'CATEGORY_ADD'; payload: { parentId?: string; name: string } }
  | { type: 'CATEGORY_RENAME'; payload: { id: string; name: string } }
  | { type: 'CATEGORY_DELETE'; payload: { id: string } }
  | { type: 'BRAND_UPDATE'; payload: { id: string; status: 'Approved' | 'Rejected' } }
  | { type: 'ORDERS_UPDATE'; payload: Partial<AdminOrder> & { id: string } }
  | { type: 'RMA_UPDATE'; payload: Partial<AdminRMA> & { id: string } }
  | { type: 'SELLER_UPDATE'; payload: Partial<AdminSeller> & { id: string } }
  | { type: 'USER_UPDATE'; payload: Partial<AdminUser> & { id: string } }
  | { type: 'PAYOUT_UPDATE'; payload: Partial<AdminPayout> & { id: string } }
  | { type: 'SLOT_ADD'; payload: AdminCMSSlot }
  | { type: 'SLOT_REORDER'; payload: { from: number; to: number } }
  | { type: 'PROMO_UPDATE'; payload: Partial<AdminPromotion> & { id: string } }
  | { type: 'ARTICLE_UPDATE'; payload: Partial<AdminArticle> & { id: string } }
  | { type: 'LOG_ADD'; payload: AdminLog };

const defaultState: AdminState = {
  dateRange: '7d',
  kpis: { gmv: 1250000, ordersToday: 3421, codSuccessPct: 92, returnsPct: 3.1, activeSellers: 1842 },
  ordersTrend: Array.from({ length: 7 }).map((_, i) => ({ day: `D${i+1}`, orders: 100 + i * 35, gmv: 15000 + i * 5000 })),
  topCategories: [ { name: 'Electronics', sales: 340000 }, { name: 'Fashion', sales: 210000 }, { name: 'Beauty', sales: 90000 } ],
  topSellers: [ { name: 'TechWorld', sales: 120000 }, { name: 'StyleHub', sales: 95000 }, { name: 'GlowPro', sales: 60000 } ],
  notifications: [
    { id: 'n1', message: '5 sellers pending KYC approval', level: 'info' },
    { id: 'n2', message: 'High RTO detected for region: Cairo', level: 'warn' },
    { id: 'n3', message: 'Scheduled maintenance tonight 02:00-03:00', level: 'info' },
  ],
  approvals: Array.from({ length: 12 }).map((_, i) => ({ id: `ap${i+1}`, image: `https://picsum.photos/seed/p${i}/80/80`, seller: i%2? 'StyleHub':'TechWorld', title: `Product ${i+1}`, category: i%2?'Fashion':'Electronics', status: 'Pending' })),
  categories: [
    { id: 'c1', name: 'Electronics', children: [ { id: 'c1-1', name: 'Mobiles' }, { id: 'c1-2', name: 'Laptops' } ]},
    { id: 'c2', name: 'Fashion', children: [ { id: 'c2-1', name: 'Men' }, { id: 'c2-2', name: 'Women' } ]},
  ],
  brands: [
    { id: 'b1', brand: 'Nike', seller: 'StyleHub', docUrl: '#', status: 'Pending' },
    { id: 'b2', brand: 'Apple', seller: 'TechWorld', docUrl: '#', status: 'Pending' },
  ],
  orders: Array.from({ length: 24 }).map((_, i) => ({ id: `O-${1000+i}`, seller: i%2?'StyleHub':'TechWorld', buyer: `User ${i}`, city: i%3?'Cairo':'Riyadh', cod: i%2===0, amount: 100 + i*15, status: (['New','In Transit','Delivered','Cancelled'] as OrderStatus[])[i%4], courier: i%2?'Aramex':'DHL', shipBy: Date.now() + (i%3===0? -1:1) * (3600_000 * (6 - (i%5))) })),
  rmas: Array.from({ length: 10 }).map((_, i) => ({ id: `R-${2000+i}`, orderId: `O-${1000+i}`, item: `Item ${i+1}`, reason: i%2?'Damaged':'Not as described', status: 'Pending', photos: [], timeline: ['Requested'] })),
  sellers: Array.from({ length: 12 }).map((_, i) => ({ id: `S-${i+1}`, name: i%2?'TechWorld':'StyleHub', email: `seller${i+1}@mail.com`, status: (['Active','Suspended','Pending'] as const)[i%3], commission: 12 + (i%5), kycComplete: i%2===0 })),
  users: Array.from({ length: 18 }).map((_, i) => ({ id: `U-${i+1}`, name: `User ${i+1}`, email: `user${i+1}@mail.com`, ordersCount: 1 + (i%7), codSuccess: 70 + (i%30), plus: i%3===0 })),
  payouts: Array.from({ length: 14 }).map((_, i) => ({ id: `P-${i+1}`, seller: i%2?'StyleHub':'TechWorld', amount: 500 + i*75, status: (['Pending','Approved','Paid'] as const)[i%3], date: new Date(Date.now()-i*86400000).toISOString() })),
  slots: [ { id: 'sl1', type: 'Hero', title: 'Ramadan Sale', start: '2025-03-01', end: '2025-04-15' } ],
  promotions: [ { id: 'pr1', name: 'Summer Splash', endsAt: '2025-08-31', active: true } ],
  articles: [ { id: 'a1', title: 'Return Policy', tags: ['returns','policy'], published: true } ],
  health: { db: 'ok', queueLagMs: 120, apiUptimePct: 99.95 },
  logs: Array.from({ length: 20 }).map((_, i) => ({ id: `L-${i+1}`, who: i%2?'admin@rassooq.com':'ops@rassooq.com', action: 'UPDATE', target: `Product ${1000+i}`, type: (['Product','Seller','Order','System'] as const)[i%4], at: new Date(Date.now()-i*3600_000).toISOString() })),
};

function updateCategory(nodes: AdminCategoryNode[], id: string, update?: (n: AdminCategoryNode)=>void, remove?: boolean, addChild?: AdminCategoryNode): AdminCategoryNode[] {
  return nodes.map(n => {
    if (n.id === id) {
      if (remove) return null as any;
      const next = { ...n };
      if (update) update(next);
      if (addChild) next.children = [ ...(next.children || []), addChild ];
      return next;
    }
    if (n.children) {
      const children = updateCategory(n.children, id, update, remove, addChild).filter(Boolean) as AdminCategoryNode[];
      return { ...n, children };
    }
    return n;
  }).filter(Boolean) as AdminCategoryNode[];
}

function adminReducer(state: AdminState, action: AdminAction): AdminState {
  switch (action.type) {
    case 'SET_DATE_RANGE': {
      const days = action.payload === '7d' ? 7 : 30;
      const ordersTrend = Array.from({ length: days }).map((_, i) => ({ day: `D${i+1}`, orders: 100 + (i * (action.payload==='7d'?35:15)), gmv: 15000 + (i * (action.payload==='7d'?5000:2500)) }));
      const factor = action.payload === '7d' ? 1 : 3;
      const kpis = {
        gmv: 1250000 * factor,
        ordersToday: Math.round(3421 * (factor/2)),
        codSuccessPct: 92,
        returnsPct: 3.1,
        activeSellers: 1842,
      };
      return { ...state, dateRange: action.payload, ordersTrend, kpis };
    }
    case 'APPROVAL_UPDATE': {
      const approvals = state.approvals.map(a => a.id === action.payload.id ? { ...a, status: action.payload.status } : a);
      toast(action.payload.status === 'Approved' ? 'Product approved' : 'Product rejected');
      return { ...state, approvals };
    }
    case 'CATEGORY_ADD': {
      if (!action.payload.parentId) {
        return { ...state, categories: [ ...state.categories, { id: crypto.randomUUID(), name: action.payload.name } ] };
      }
      return { ...state, categories: updateCategory(state.categories, action.payload.parentId, undefined, undefined, { id: crypto.randomUUID(), name: action.payload.name }) };
    }
    case 'CATEGORY_RENAME':
      return { ...state, categories: updateCategory(state.categories, action.payload.id, (n)=>{ n.name = action.payload.name; }) };
    case 'CATEGORY_DELETE':
      return { ...state, categories: updateCategory(state.categories, action.payload.id, undefined, true) };
    case 'BRAND_UPDATE': {
      const brands = state.brands.map(b => b.id === action.payload.id ? { ...b, status: action.payload.status } : b);
      toast(action.payload.status === 'Approved' ? 'Brand verified' : 'Brand rejected');
      return { ...state, brands };
    }
    case 'ORDERS_UPDATE': {
      const orders = state.orders.map(o => o.id === action.payload.id ? { ...o, ...action.payload } : o);
      return { ...state, orders };
    }
    case 'RMA_UPDATE': {
      const rmas = state.rmas.map(r => r.id === action.payload.id ? { ...r, ...action.payload } : r);
      return { ...state, rmas };
    }
    case 'SELLER_UPDATE': {
      const sellers = state.sellers.map(s => s.id === action.payload.id ? { ...s, ...action.payload } : s);
      return { ...state, sellers };
    }
    case 'USER_UPDATE': {
      const users = state.users.map(u => u.id === action.payload.id ? { ...u, ...action.payload } : u);
      return { ...state, users };
    }
    case 'PAYOUT_UPDATE': {
      const payouts = state.payouts.map(p => p.id === action.payload.id ? { ...p, ...action.payload } : p);
      return { ...state, payouts };
    }
    case 'SLOT_ADD':
      return { ...state, slots: [ ...state.slots, action.payload ] };
    case 'SLOT_REORDER': {
      const slots = state.slots.slice();
      const [moved] = slots.splice(action.payload.from, 1);
      slots.splice(action.payload.to, 0, moved);
      return { ...state, slots };
    }
    case 'PROMO_UPDATE': {
      const promotions = state.promotions.map(p => p.id === action.payload.id ? { ...p, ...action.payload } : p);
      return { ...state, promotions };
    }
    case 'ARTICLE_UPDATE': {
      const articles = state.articles.map(a => a.id === action.payload.id ? { ...a, ...action.payload } : a);
      return { ...state, articles };
    }
    case 'LOG_ADD':
      return { ...state, logs: [ action.payload, ...state.logs ] };
    default:
      return state;
  }
}

const AdminContext = createContext<{ state: AdminState; dispatch: React.Dispatch<AdminAction> } | null>(null);

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(adminReducer, undefined as unknown as AdminState, () => {
    try {
      const raw = localStorage.getItem('rassooq_admin_state');
      if (raw) return JSON.parse(raw) as AdminState;
    } catch {}
    return defaultState;
  });

  useEffect(() => {
    try { localStorage.setItem('rassooq_admin_state', JSON.stringify(state)); } catch {}
  }, [state]);

  const value = useMemo(() => ({ state, dispatch }), [state]);
  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
}

export function useAdmin() {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error('useAdmin must be used within AdminProvider');
  return ctx;
}


