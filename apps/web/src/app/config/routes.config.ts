import {Routes} from '@angular/router';
import {NotFound} from '../pages/NotFound';
import {Techradar} from '../pages/techradar/techradar';
import {TechOverview} from '../pages/techmanagement/tech-overview.component';
import {TechEditComponent} from '../pages/techmanagement/tech-edit.component';
import {TechAddComponent} from '../pages/techmanagement/tech-add.component';
import {LoginComponent} from '../pages/auth/login.component';
import {TechDetailComponent} from '../pages/techmanagement/tech-detail.component';
import {authenticatedGuard} from '../authenticated-guard';
import {adminGuard} from '../admin-guard';
import {TechDraftComponent} from '../pages/techmanagement/tech-draft.component';

export const routes: Routes = [
  {
    path: '',
    title: 'Techradar',
    component: Techradar,
  },
  {
    path: 'technologies',
    title: 'Technology Management',
    component: TechOverview,
    canActivate: [authenticatedGuard, adminGuard]
  },
  {
    path: 'technologies/edit/:id',
    title: 'Edit Technology',
    component: TechEditComponent,
    canActivate: [authenticatedGuard, adminGuard]

  },
  {
    path: 'technologies/detail/:id',
    title: 'Details',
    component: TechDetailComponent,
    canActivate: [authenticatedGuard]

  },
  {
    path: 'technologies/add',
    title: 'Add Technology',
    component: TechAddComponent,
    canActivate: [authenticatedGuard, adminGuard]

  },
  {
    path: 'technologies/draft',
    title: 'Add Technology Draft',
    component: TechDraftComponent,
    canActivate: [authenticatedGuard, adminGuard]
  },
  {
    path: 'login',
    title: 'Login',
    component: LoginComponent
  },
  {
    path: '**',
    title: '404 - Page not found',
    component: NotFound,
  },
];
