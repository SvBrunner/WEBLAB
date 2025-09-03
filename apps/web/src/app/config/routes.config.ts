import {Routes} from '@angular/router';
import {Home} from '../pages/home/home';
import {NotFound} from '../pages/NotFound';
import {Techradar} from '../pages/techradar/techradar';

export const routes: Routes = [
  {
    path: '',
    title: 'Home Page',
    component: Home,
  },
  {
    path: 'techradar',
    title: 'Techradar',
    component: Techradar,
  },
  {
    path: '**',
    title: '404 - Page not found',
    component: NotFound,
  },
];
