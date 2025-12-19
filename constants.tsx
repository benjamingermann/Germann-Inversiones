
import { Asset, MarketRate, NewsItem } from './types';

export const INITIAL_ASSETS: Asset[] = [
  {
    id: '1',
    symbol: 'AAPL',
    name: 'Apple Inc.',
    market: 'US',
    quantity: 15.0,
    price: 189.45,
    change: 1.24,
    logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDJ4Iv-PJTDUU9naOThNcRim0jULfeR8OIB9XmEAQkJFFqayUpNNOFqDS6Udd1Kun1xpyID1qV-ffz873Rnt0MnxuXmUJI-pSv7lJOWifzxoAEpxYQ0F8ce0ztm4rDbJmkML6HP9leBI-uyEMtpocHt_bmAfO5dP1jWObScAGe2i49Uu9q_TF2zRSja_NvkfWllnsQ93asXw_PfuTY7CIRy508WRWt-WjkB5NSUhUaqN3iCQAd9mh2cDlZcF8tK5HktnxaqOOCCxPA',
    type: 'Stock'
  },
  {
    id: '2',
    symbol: 'YPFD',
    name: 'YPF S.A.',
    market: 'ARG',
    quantity: 450.0,
    price: 24540.50,
    change: 4.15,
    type: 'Merval'
  },
  {
    id: '3',
    symbol: 'KO',
    name: 'Coca-Cola',
    market: 'US',
    quantity: 50,
    price: 12350.00,
    change: -0.32,
    type: 'CEDEAR'
  },
  {
    id: '4',
    symbol: 'NVDA',
    name: 'NVIDIA Corp.',
    market: 'US',
    quantity: 10.0,
    price: 460.15,
    change: 3.12,
    logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDN0LIibMe6jL5Jf_ec_SJRDa3CMxr53WUPusCbKdwHyyzQK1a8gQt6MhZLAu0V0O-9FBiugyoGqE7kfaRui7zIF4VO5cl06DHdCG6pBx3vCSTo2WLnWdElVuJOt2I4ZGheEViTpGg8VJbGhTvjtMs39zwcFyBJYek1lQsiMgLq8tEkast3oBfXFiTu5kKKR01uQ1emln3HJv-0oqU-GkXB-Tft4Vk4rMnSPoREqC6fG70Yh_R3mwO9DLQdyB5Qgi83dBcuwqbyBMA',
    type: 'Stock'
  },
  {
    id: '5',
    symbol: 'GGAL',
    name: 'Grupo Galicia',
    market: 'ARG',
    quantity: 1200,
    price: 3120.50,
    change: 1.80,
    type: 'Merval'
  }
];

export const MARKET_RATES: MarketRate[] = [
  { name: 'Dólar Blue', buy: 985, sell: 1005, icon: 'currency_exchange', color: 'text-blue-400' },
  { name: 'Dólar MEP', buy: 1042, sell: 1042, change: 1.2, icon: 'trending_up', color: 'text-primary' },
  { name: 'Dólar CCL', buy: 1089, sell: 1089, change: -0.5, icon: 'account_balance', color: 'text-purple-400' }
];

export const NEWS_ITEMS: NewsItem[] = [
  {
    id: 'n1',
    source: 'Investing.com',
    time: 'Ahora',
    title: 'Wall Street abre mixto mientras los inversores asimilan datos de inflación',
    imageUrl: 'https://images.investing.com/news/LYNXMPEH2L086_L.jpg'
  },
  {
    id: 'n2',
    source: 'Investing.com',
    time: 'Hace 15m',
    title: 'Merval hoy: Las acciones argentinas suben con fuerza tras nuevos anuncios económicos',
    imageUrl: 'https://images.investing.com/news/world_news_2_1603991269_L.jpg'
  },
  {
    id: 'n3',
    source: 'Investing.com',
    time: 'Hace 1h',
    title: 'Bitcoin supera los 90.000 USD impulsado por la demanda institucional',
    imageUrl: 'https://images.investing.com/news/moved_f8540d58525b3997d81977755b76c8c4_L.jpg'
  }
];
