import { LucideIcon, House, TableProperties, ChartCandlestick, Phone } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export interface SideBarItem { 
    page: string; 
    label: string; 
    icon: LucideIcon; 
}

export const SideBarItems = (): SideBarItem[] => {
  const { t } = useTranslation();

  const sideBarItems: SideBarItem[] = [ 
    {
        page:'/', 
        label: t('home'),
        icon: House 
    }, 
    { 
        page: '/myRecords', 
        label: t('myRecords'),
        icon: TableProperties
    }, 
    { 
        page: '/myStocks', 
        label: t('myStocks'),
        icon: ChartCandlestick
    },
    {
        page: '/contactUs',
        label: t('contactUs'),
        icon: Phone
    } 
  ];

  return sideBarItems;
};