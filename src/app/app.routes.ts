import { Routes } from '@angular/router';
import { AuthLayout } from './core/layouts/auth-layout/auth-layout';
import { BlankLayout } from './core/layouts/blank-layout/blank-layout';
import { Login } from './core/auth/login/login';
import { Notfound } from './features/notfound/notfound';
import { authGuard } from './core/guards/auth-guard';
import { blankGuard } from './core/guards/blank-guard';

export const routes: Routes = [
  {
    path: '',
    component: AuthLayout,
    canActivate: [blankGuard],
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: Login, title: 'Login' },
      {
        path: 'register',
        loadComponent: () =>
          import('./core/auth/register/register').then((c) => c.Register),
        title: 'Register',
      },
      {
        path: 'forgotPassword',
        loadComponent: () =>
          import('./core/auth/forgot-password/forgot-password').then(
            (c) => c.ForgotPassword
          ),
        title: 'Forgot Password',
      },
    ],
  },
  {
    path: '',
    component: BlankLayout,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'home',
        loadComponent: () => import('./features/home/home').then((c) => c.Home),
        title: 'Home',
      },
      {
        path: 'brands',
        loadComponent: () =>
          import('./features/brands/brands').then((c) => c.Brands),
        title: 'Brands',
      },
      {
        path: 'cart',
        loadComponent: () => import('./features/cart/cart').then((c) => c.Cart),
        title: 'Cart',
      },
      {
        path: 'categories',
        loadComponent: () =>
          import('./features/categories/categories').then((c) => c.Categories),
        title: 'Categories',
      },
      {
        path: 'checkout/:id',
        loadComponent: () =>
          import('./features/checkout/checkout').then((c) => c.Checkout),
        title: 'Checkout',
      },
      {
        path: 'details/:slug/:id',
        loadComponent: () =>
          import('./features/details/details').then((c) => c.Details),
        title: 'Details',
      },
      {
        path: 'products',
        loadComponent: () =>
          import('./features/products/products').then((c) => c.Products),
        title: 'Products',
      },
      {
        path: 'allorders',
        loadComponent: () =>
          import('./features/allorders/allorders').then((c) => c.Allorders),
        title: 'All Orders',
      },
    ],
  },
  { path: '**', component: Notfound, title: 'Page Not Found' },
];
