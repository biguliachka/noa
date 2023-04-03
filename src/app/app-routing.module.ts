import { NgModule } from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {AuthGuard} from "./shared/guards/auth/auth.guard";

const routes: Routes = [
  { path: '',
  loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)
},
  { path: 'about',
    loadChildren: () => import('./pages/about/about.module').then(m => m.AboutModule)
  },
  { path: 'admin',
    canActivate: [AuthGuard],
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },
  { path: 'oferta',
    loadChildren: () => import('./pages/oferta/oferta.module').then(m => m.OfertaModule)
  },
  { path: 'oferta',
    loadChildren: () => import('./pages/oferta/oferta.module').then(m => m.OfertaModule)
  },
  { path: 'dostavka',
    loadChildren: () => import('./pages/dostavka/dostavka.module').then(m => m.DostavkaModule)
  },
  { path: 'contact',
    loadChildren: () => import('./pages/contact/contact.module').then(m => m.ContactModule)
  },
  { path: 'vacancies',
    loadChildren: () => import('./pages/vacancies/vacancies.module').then(m => m.VacanciesModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./components/admin-auth/admin-auth.module').then(m => m.AdminAuthModule)
  },
  {
    path: 'favorites',
    loadChildren: () => import('./pages/favorites/favorites.module').then(m => m.FavoritesModule)
  },
  {
    path: 'checkout',
    loadChildren: () => import('./pages/checkout/checkout.module').then(m => m.CheckoutModule)
  },
  {
    path: 'cabinet',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/cabinet/cabinet.module').then(m => m.CabinetModule)
  },
  {
    path: 'product/:category',
    loadChildren: () => import('./pages/product-category/product-category-routing.module').then(m => m.ProductCategoryRoutingModule)
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules,
    scrollPositionRestoration: 'enabled'
  })],

  exports: [RouterModule]
})
export class AppRoutingModule {

}
