import {Routes} from '@angular/router';
import {NotFound} from '../pages/NotFound';
import {Techradar} from '../pages/techradar/techradar';
import {TechOverview} from '../pages/techmanagement/tech-overview.component';
import {TechEditComponent} from '../pages/techmanagement/tech-edit.component';
import {TechAddComponent} from '../pages/techmanagement/tech-add.component';

export const routes: Routes = [
  {
    path: '',
    title: 'Techradar',
    component: Techradar,
  },
  {
    path: 'technologies',
    title: 'Technology Management',
    component: TechOverview
  },
  {
    path: 'technologies/edit/:id',
    title: 'Edit Technology',
    component: TechEditComponent
  },
  {
    path: 'technologies/add',
    title: 'Add Technology',
    component: TechAddComponent
  },
  {
    path: '**',
    title: '404 - Page not found',
    component: NotFound,
  },
];
