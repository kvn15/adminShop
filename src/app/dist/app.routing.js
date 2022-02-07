"use strict";
exports.__esModule = true;
exports.routing = exports.appRoutingProvider = void 0;
var router_1 = require("@angular/router");
var inicio_component_1 = require("./component/inicio/inicio.component");
var login_component_1 = require("./component/login/login.component");
var admin_guard_1 = require("./guards/admin.guard");
var index_cliente_component_1 = require("./component/clientes/index-cliente/index-cliente.component");
var create_cliente_component_1 = require("./component/clientes/create-cliente/create-cliente.component");
var edit_cliente_component_1 = require("./component/clientes/edit-cliente/edit-cliente.component");
var create_producto_component_1 = require("./component/productos/create-producto/create-producto.component");
var index_producto_component_1 = require("./component/productos/index-producto/index-producto.component");
var update_producto_component_1 = require("./component/productos/update-producto/update-producto.component");
var inventario_producto_component_1 = require("./component/productos/inventario-producto/inventario-producto.component");
var create_cupon_component_1 = require("./component/cupones/create-cupon/create-cupon.component");
var index_cupon_component_1 = require("./component/cupones/index-cupon/index-cupon.component");
var update_cupon_component_1 = require("./component/cupones/update-cupon/update-cupon.component");
var config_component_1 = require("./component/config/config.component");
var variedad_producto_component_1 = require("./component/productos/variedad-producto/variedad-producto.component");
var galeria_producto_component_1 = require("./component/productos/galeria-producto/galeria-producto.component");
var appRoute = [
    {
        path: '',
        redirectTo: 'inicio',
        pathMatch: 'full'
    },
    {
        path: 'inicio',
        component: inicio_component_1.InicioComponent, canActivate: [admin_guard_1.AdminGuard]
    },
    {
        path: 'panel',
        children: [
            {
                path: 'clientes',
                component: index_cliente_component_1.IndexClienteComponent,
                canActivate: [admin_guard_1.AdminGuard]
            },
            {
                path: 'clientes/registro',
                component: create_cliente_component_1.CreateClienteComponent,
                canActivate: [admin_guard_1.AdminGuard]
            },
            {
                path: 'clientes/:id',
                component: edit_cliente_component_1.EditClienteComponent,
                canActivate: [admin_guard_1.AdminGuard]
            },
            { path: 'productos', component: index_producto_component_1.IndexProductoComponent, canActivate: [admin_guard_1.AdminGuard] },
            { path: 'productos/registro', component: create_producto_component_1.CreateProductoComponent, canActivate: [admin_guard_1.AdminGuard] },
            { path: 'productos/:id', component: update_producto_component_1.UpdateProductoComponent, canActivate: [admin_guard_1.AdminGuard] },
            { path: 'productos/inventario/:id', component: inventario_producto_component_1.InventarioProductoComponent, canActivate: [admin_guard_1.AdminGuard] },
            { path: 'productos/variedades/:id', component: variedad_producto_component_1.VariedadProductoComponent, canActivate: [admin_guard_1.AdminGuard] },
            { path: 'productos/galeria/:id', component: galeria_producto_component_1.GaleriaProductoComponent, canActivate: [admin_guard_1.AdminGuard] },
            { path: 'cupones', component: index_cupon_component_1.IndexCuponComponent, canActivate: [admin_guard_1.AdminGuard] },
            { path: 'cupones/registro', component: create_cupon_component_1.CreateCuponComponent, canActivate: [admin_guard_1.AdminGuard] },
            { path: 'cupones/:id', component: update_cupon_component_1.UpdateCuponComponent, canActivate: [admin_guard_1.AdminGuard] },
            { path: 'configuraciones', component: config_component_1.ConfigComponent, canActivate: [admin_guard_1.AdminGuard] }
        ]
    },
    {
        path: 'login',
        component: login_component_1.LoginComponent
    }
];
exports.appRoutingProvider = [];
exports.routing = router_1.RouterModule.forRoot(appRoute);
