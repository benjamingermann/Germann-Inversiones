
import { Asset, MarketRate, NewsItem } from './types';

// Empezamos con una lista vacía para que el usuario ingrese sus propias acciones
export const INITIAL_ASSETS: Asset[] = [];

export const MARKET_RATES: MarketRate[] = [
  { nombre: 'Dólar Blue', compra: 0, venta: 0, fechaActualizacion: new Date().toISOString(), icon: 'payments', color: 'text-blue-400' },
  { nombre: 'Dólar MEP', compra: 0, venta: 0, fechaActualizacion: new Date().toISOString(), change: 0, icon: 'trending_up', color: 'text-primary' },
  { nombre: 'Dólar CCL', compra: 0, venta: 0, fechaActualizacion: new Date().toISOString(), change: 0, icon: 'account_balance', color: 'text-purple-400' }
];

export const NEWS_ITEMS: NewsItem[] = [
  {
    id: 'n1',
    source: 'Mercado Libre',
    time: 'Ahora',
    title: 'Nuevas proyecciones para el Cedear de MELI tras el balance trimestral',
    imageUrl: 'https://images.unsplash.com/photo-1611974717482-58f00724bc89?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 'n2',
    source: 'Wall Street',
    time: 'Hace 15m',
    title: 'El S&P 500 marca nuevos máximos históricos impulsado por tecnológicas',
    imageUrl: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 'n3',
    source: 'Merval',
    time: 'Hace 1h',
    title: 'Acciones energéticas argentinas lideran las subas en la bolsa local',
    imageUrl: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?q=80&w=1000&auto=format&fit=crop'
  }
];
