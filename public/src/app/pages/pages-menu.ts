import {NbMenuItem} from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'nb-home',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'FEATURES',
    group: true,
  },
  {
    title: 'Duyurular',
    icon: 'nb-compose',
    link: '/pages/news',
  },
  {
    title: 'Etkinlikler',
    icon: '<i class="material-icons md-24">done</i>',
    link: '/pages/events',
  },
  {
    title: 'Üyeler',
    icon: 'nb-person',
    link: '/pages/users',
  },
  {
    title: 'Bildirimler',
    icon: 'nb-notifications',
    link: '/pages/notifications',
  },
  {
    title: 'Şablonlar',
    icon: 'nb-person',
    link: '/pages/templates',
  },
  {
    title: 'Ayarlar',
    icon: 'nb-gear',
    link: '/pages/settings',
  },
];
