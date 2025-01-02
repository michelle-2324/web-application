import { LucideIcon, House, TableProperties, ChartCandlestick } from 'lucide-react';

export interface SideBarItem { 
    page: string; 
    label: string; 
    icon: LucideIcon; 
}
    
export const sideBarItems: SideBarItem[] = [ 
    {
        page:'/', 
        label: 'Home',
        icon: House 
    }, 
    { 
        page: '/myRecords', 
        label: 'My Records',
        icon: TableProperties
    }, 
    { 
        page: '/myStocks', 
        label: 'My Stocks',
        icon: ChartCandlestick
    } 
] 