import { Routes } from '@angular/router';

export const routes: Routes = [

    {
        path: 'reservation',
        loadComponent: () => import('./pages/reservation/reservation.page').then(m => m.ReservationPage)
    },
    {
        path: '',
        redirectTo: 'reservation',
        pathMatch: 'full',
    },
];
