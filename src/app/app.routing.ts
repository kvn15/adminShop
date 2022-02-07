import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from "@angular/core";
import { InicioComponent } from './component/inicio/inicio.component';
import { LoginComponent } from './component/login/login.component';

import { AdminGuard } from './guards/admin.guard';
import { IndexClienteComponent } from './component/clientes/index-cliente/index-cliente.component';
import { CreateClienteComponent } from './component/clientes/create-cliente/create-cliente.component';
import { EditClienteComponent } from './component/clientes/edit-cliente/edit-cliente.component';
import { CreateProductoComponent } from './component/productos/create-producto/create-producto.component';
import { IndexProductoComponent } from './component/productos/index-producto/index-producto.component';
import { UpdateProductoComponent } from './component/productos/update-producto/update-producto.component';
import { InventarioProductoComponent } from './component/productos/inventario-producto/inventario-producto.component';
import { CreateCuponComponent } from './component/cupones/create-cupon/create-cupon.component';
import { IndexCuponComponent } from './component/cupones/index-cupon/index-cupon.component';
import { UpdateCuponComponent } from './component/cupones/update-cupon/update-cupon.component';
import { ConfigComponent } from './component/config/config.component';
import { VariedadProductoComponent } from './component/productos/variedad-producto/variedad-producto.component';
import { GaleriaProductoComponent } from './component/productos/galeria-producto/galeria-producto.component';

const appRoute : Routes = [
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full'
  },
  {
    path: 'inicio',
    component: InicioComponent, canActivate: [AdminGuard]
  },
  {
    path: 'panel',
    children: [
      {
        path: 'clientes',
        component: IndexClienteComponent,
        canActivate: [AdminGuard]
      },
      {
        path: 'clientes/registro',
        component: CreateClienteComponent,
        canActivate: [AdminGuard]
      },
      {
        path: 'clientes/:id',
        component: EditClienteComponent,
        canActivate: [AdminGuard]
      },

      { path: 'productos', component: IndexProductoComponent, canActivate: [AdminGuard] },
      { path: 'productos/registro', component: CreateProductoComponent, canActivate: [AdminGuard] },
      { path: 'productos/:id', component: UpdateProductoComponent, canActivate: [AdminGuard] },
      { path: 'productos/inventario/:id', component: InventarioProductoComponent, canActivate: [AdminGuard] },
      { path: 'productos/variedades/:id', component: VariedadProductoComponent, canActivate: [AdminGuard] },
      { path: 'productos/galeria/:id', component: GaleriaProductoComponent, canActivate: [AdminGuard] },

      { path: 'cupones', component: IndexCuponComponent, canActivate: [AdminGuard] },
      { path: 'cupones/registro', component: CreateCuponComponent, canActivate: [AdminGuard] },
      { path: 'cupones/:id', component: UpdateCuponComponent, canActivate: [AdminGuard] },

      { path: 'configuraciones', component: ConfigComponent, canActivate: [AdminGuard] }

    ]
  },
  {
    path: 'login',
    component: LoginComponent
  }
]

export const appRoutingProvider : any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoute);
