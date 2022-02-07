import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { NgbPaginationModule } from "@ng-bootstrap/ng-bootstrap";
import { NgxTinymceModule } from 'ngx-tinymce';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { routing } from "./app.routing";
import { SidebarComponent } from './component/sidebar/sidebar.component';
import { InicioComponent } from './component/inicio/inicio.component';
import { LoginComponent } from './component/login/login.component';
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


@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    SidebarComponent,
    LoginComponent,
    IndexClienteComponent,
    CreateClienteComponent,
    EditClienteComponent,
    CreateProductoComponent,
    IndexProductoComponent,
    UpdateProductoComponent,
    InventarioProductoComponent,
    CreateCuponComponent,
    IndexCuponComponent,
    UpdateCuponComponent,
    ConfigComponent,
    VariedadProductoComponent,
    GaleriaProductoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    routing,
    NgbPaginationModule,
    NgxTinymceModule.forRoot({
      baseURL: '../../../assets/tinymce/'
    })
  ],
  bootstrap: [AppComponent],
  exports: [
    AppComponent,
    InicioComponent,
    SidebarComponent
  ]
})
export class AppModule { }
