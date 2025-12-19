
export type Screen = 'WELCOME' | 'SETUP' | 'DASHBOARD' | 'DETAIL' | 'MARKETS';

export interface Asset {
  id: string;
  symbol: string;
  name: string;
  market: 'US' | 'ARG';
  quantity: number;
  price: number;
  change: number;
  logo?: string;
  type: 'Stock' | 'CEDEAR' | 'Merval';
}

export interface NewsItem {
  id: string;
  source: string;
  time: string;
  title: string;
  imageUrl: string;
}

export interface MarketRate {
  nombre: string;
  compra: number;
  venta: number;
  fechaActualizacion: string;
  // Optional properties for local usage and UI enhancements
  icon?: string;
  color?: string;
  change?: number;
}

export interface DollarRates {
  blue?: MarketRate;
  mep?: MarketRate;
  ccl?: MarketRate;
  oficial?: MarketRate;
}