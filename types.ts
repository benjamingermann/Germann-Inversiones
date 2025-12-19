
export type Screen = 'WELCOME' | 'SETUP' | 'DASHBOARD' | 'DETAIL';

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
  name: string;
  buy: number;
  sell: number;
  change?: number;
  icon: string;
  color: string;
}
