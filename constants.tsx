
import { Asset, MarketRate, NewsItem } from './types';

export const INITIAL_ASSETS: Asset[] = [
  {
    id: '1',
    symbol: 'AAPL',
    name: 'Apple Inc.',
    market: 'US',
    quantity: 15.0,
    price: 228.45,
    change: 0.85,
    logo: 'https://logo.clearbit.com/apple.com',
    type: 'Stock'
  },
  {
    id: '2',
    symbol: 'YPFD',
    name: 'YPF S.A.',
    market: 'ARG',
    quantity: 450.0,
    price: 36540.00,
    change: 2.15,
    logo: 'https://logo.clearbit.com/ypf.com',
    type: 'Merval'
  },
  {
    id: '3',
    symbol: 'KO',
    name: 'Coca-Cola',
    market: 'US',
    quantity: 50,
    price: 72.15,
    change: -0.12,
    logo: 'https://logo.clearbit.com/coca-cola.com',
    type: 'Stock'
  },
  {
    id: '4',
    symbol: 'NVDA',
    name: 'NVIDIA Corp.',
    market: 'US',
    quantity: 10.0,
    price: 132.80,
    change: 3.12,
    logo: 'https://logo.clearbit.com/nvidia.com',
    type: 'Stock'
  },
  {
    id: '5',
    symbol: 'GGAL',
    name: 'Grupo Galicia',
    market: 'ARG',
    quantity: 1200,
    price: 5850.20,
    change: 1.80,
    logo: 'https://logo.clearbit.com/grupogalicia.com.ar',
    type: 'Merval'
  },
  {
    id: '6',
    symbol: 'MELI',
    name: 'Mercado Libre',
    market: 'US',
    quantity: 5,
    price: 1945.20,
    change: 1.45,
    logo: 'https://logo.clearbit.com/mercadolibre.com',
    type: 'Stock'
  }
];

export const MARKET_RATES: MarketRate[] = [
  { nombre: 'Dólar Blue', compra: 1245, venta: 1265, fechaActualizacion: new Date().toISOString(), icon: 'currency_exchange', color: 'text-blue-400' },
  { nombre: 'Dólar MEP', compra: 1210, venta: 1215, fechaActualizacion: new Date().toISOString(), change: 0.8, icon: 'trending_up', color: 'text-primary' },
  { nombre: 'Dólar CCL', compra: 1235, venta: 1240, fechaActualizacion: new Date().toISOString(), change: -0.2, icon: 'account_balance', color: 'text-purple-400' }
];

export const NEWS_ITEMS: NewsItem[] = [
  {
    id: 'n1',
    source: 'Investing.com',
    sourceLogo: 'https://logo.clearbit.com/investing.com',
    time: 'Ahora',
    title: 'Wall Street abre mixto mientras los inversores asimilan datos de inflación',
    imageUrl: 'https://images.investing.com/news/LYNXMPEH2L086_L.jpg'
  },
  {
    id: 'n2',
    source: 'Bloomberg',
    sourceLogo: 'https://logo.clearbit.com/bloomberg.com',
    time: 'Hace 15m',
    title: 'Acciones argentinas extienden rally tras confirmación de superávit fiscal',
    imageUrl: 'https://images.investing.com/news/world_news_2_1603991269_L.jpg'
  },
  {
    id: 'n3',
    source: 'Reuters',
    sourceLogo: 'https://logo.clearbit.com/reuters.com',
    time: 'Hace 1h',
    title: 'Bitcoin rompe récords: analistas prevén un nuevo techo para fin de año',
    imageUrl: 'https://images.investing.com/news/moved_f8540d58525b3997d81977755b76c8c4_L.jpg'
  }
];
