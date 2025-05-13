import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { NavigationRootComponent } from './pages/navigation-root/navigation-root.component';
import { authGuard } from './guard/auth.guard';

export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: '',
        component: NavigationRootComponent,
        canActivate: [authGuard],
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'home',
            },
            {
                path: 'home',
                loadComponent: () =>
                    import('./pages/home/home.component').then(m => m.HomeComponent),
            },
            {
                path: 'ambientes/:id',
                loadComponent: () =>
                    import('./pages/ambientes/ambientes.component').then(m => m.AmbientesComponent),
            },
            {
                path: 'recursos/:id',
                loadComponent: () =>
                    import('./pages/recursos/recursos.component').then(m => m.RecursosComponent),
            }
        ]
    }
];
