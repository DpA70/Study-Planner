import { Routes } from '@angular/router';
import { HomeTab } from './home-tab/home-tab';
import { Events } from './events/events';
import { LoginPage } from './login-page/login-page';

export const routes: Routes = [
    {
        path: '',
        component: LoginPage
    },
    {
        path: 'home',
        component: HomeTab
    },
    {
        path: 'events',
        component: Events
    }
];
