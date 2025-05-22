import { Routes } from '@angular/router';
import { AuthAdminGuard } from './common/guards/authAdminGuard';
import { AuthUserGuard } from './common/guards/authUserGuard';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./core/home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'mainmenu',
    loadComponent: () => import('./modules/user/mainmenu/mainmenu.component').then((m) => m.MainmenuComponent),
    canActivate: [AuthUserGuard]
  },
  {
    path: 'login',
    loadComponent: () => import('./modules/user/login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'register',
    loadComponent: () => import('./modules/user/register/register.page').then( m => m.RegisterPage)
  },
  {
    path: 'admin-login',
    loadComponent: () => import('./modules/admin/login-admin/login.page').then(m => m.LoginPage)
  },
  {
    path: 'products_admin',
    loadComponent: () => import('./modules/admin/products-admin/products-admin.page').then( m => m.ProductsAdminPage),
    canActivate: [AuthAdminGuard]
  },
  {
    path: 'home-admin',
    loadComponent: () => import('./modules/admin/home-admin/home-admin.component').then((m) => m.HomeAdminComponent),
    canActivate: [AuthAdminGuard]
  },
  {
    path: 'usuarios-admin',
    loadComponent: () => import('./modules/admin/usuarios-admin/usuarios-admin.page').then( m => m.UsuariosAdminPage),
    canActivate: [AuthAdminGuard]
  },
  {
    path: 'profile',
    loadComponent: () => import('./modules/user/profile/profile.page').then( m => m.ProfilePage),
    canActivate: [AuthUserGuard]
  },
  {
    path: 'profile-admin',
    loadComponent: () => import('./modules/admin/profile-admin/profile-admin.page').then( m => m.ProfileAdminPage),
    canActivate: [AuthAdminGuard]
  },
  {
    path: 'cart',
    loadComponent: () => import('./modules/user/cart/cart.page').then( m => m.CartPage),
    canActivate: [AuthUserGuard]
  },
  {
    path: 'mainmenu-guest',
    loadComponent: () => import('./modules/guest/mainmenu-guest/mainmenu-guest.page').then( m => m.MainmenuGuestPage)
  },
  {
    path: 'reservations',
    loadComponent: () => import('./modules/user/reservations/reservations.page').then( m => m.ReservationsPage),
    canActivate: [AuthUserGuard]
  },
  {
    path: 'admin-reservations',
    loadComponent: () => import('./modules/admin/admin-reservations/admin-reservations.page').then( m => m.AdminReservationsPage),
    canActivate: [AuthAdminGuard]
  },
  {
    path: 'pay-admin',
    loadComponent: () => import('./modules/admin/pay-admin/pay-admin.page').then( m => m.PayAdminPage),
    canActivate: [AuthAdminGuard]
  },
  {
    path: 'pay-r-admin',
    loadComponent: () => import('./modules/admin/pay-r-admin/pay-r-admin.page').then( m => m.PayRAdminPage),
    canActivate: [AuthAdminGuard]
  },
  {
    path: 'facturation-admin',
    loadComponent: () => import('./modules/admin/facturation-admin/facturation-admin.page').then( m => m.FacturationAdminPage),
    canActivate: [AuthAdminGuard]
  },
  {
    path: 'invoice-r-admin/:pagoId',
    loadComponent: () => import('./modules/admin/invoice-r-admin/invoice-r-admin.page').then( m => m.InvoiceRAdminPage),
    canActivate: [AuthAdminGuard]
  },
  {
    path: 'invoice-admin',
    loadComponent: () => import('./modules/admin/invoice-admin/invoice-admin.page').then( m => m.InvoiceAdminPage),
    canActivate: [AuthAdminGuard]
  },
  {
    path: 'detail-order',
    loadComponent: () => import('./modules/user/detail-order/detail-order.page').then( m => m.DetailOrderPage),
    canActivate: [AuthUserGuard]
  },
  {
    path: 'my-reservations',
    loadComponent: () => import('./modules/user/my-reservations/my-reservations.page').then( m => m.MyReservationsPage),
    canActivate: [AuthUserGuard]
  },
  {
    path: 'payment-admin',
    loadComponent: () => import('./modules/admin/payment-admin/payment-admin.page').then( m => m.PaymentAdminPage),
    canActivate: [AuthAdminGuard]
  },





];
