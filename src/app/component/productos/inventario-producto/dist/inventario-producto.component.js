"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.InventarioProductoComponent = void 0;
var core_1 = require("@angular/core");
var global_1 = require("../../../services/global");
var InventarioProductoComponent = /** @class */ (function () {
    function InventarioProductoComponent(_productoService, _adminService, _route, _activatedRoute) {
        this._productoService = _productoService;
        this._adminService = _adminService;
        this._route = _route;
        this._activatedRoute = _activatedRoute;
        this.producto = {};
        this.config = {};
        this.load_btn = false;
        this.inventarios = [];
        this.inventario = {};
        this.config = {
            height: 500
        };
        this.token = this._adminService.getToken();
        this._iduser = localStorage.getItem('_id');
        this.url = global_1.GLOBAL.url;
    }
    InventarioProductoComponent.prototype.ngOnInit = function () {
        this.init_data();
    };
    InventarioProductoComponent.prototype.init_data = function () {
        var _this = this;
        this._activatedRoute.params.subscribe(function (param) {
            _this.id = param['id'];
            _this._productoService.obtener_producto_admin(_this.id, _this.token).subscribe(function (resp) {
                if (resp.data == undefined) {
                    _this.producto = undefined;
                }
                else {
                    _this.producto = resp.data;
                    _this._productoService.listar_inventario_producto_admin(_this.producto._id, _this.token).subscribe(function (resp) {
                        _this.inventarios = resp.data;
                    }, function (err) {
                        console.log(err);
                    });
                }
            }, function (err) {
                console.log(err);
            });
        });
    };
    InventarioProductoComponent.prototype.eliminar = function (id) {
        var _this = this;
        this.load_btn = true;
        this._productoService.eliminar_inventario_producto_admin(id, this.token).subscribe(function (resp) {
            iziToast.show({
                title: 'SUCCESS',
                titleColor: '#1DC74C',
                color: '#fff',
                "class": 'text-success',
                position: 'topRight',
                message: 'Se Eliminó correctamente el Producto'
            });
            $('#delete-' + id).modal('hide');
            $('modal-backdrop').removeClass('show');
            _this.load_btn = false;
            _this.init_data();
        }, function (err) {
            console.log(err);
            iziToast.show({
                title: 'ERROR',
                titleColor: '#ff0000',
                color: '#fff',
                "class": 'text-success',
                position: 'topRight',
                message: 'Ocurrio un error en el servidor'
            });
            _this.load_btn = false;
        });
    };
    InventarioProductoComponent.prototype.registro_inventario = function (inventarioForm) {
        var _this = this;
        if (inventarioForm.valid) {
            var data = {
                producto: this.producto._id,
                cantidad: inventarioForm.value.cantidad,
                admin: this._iduser,
                proveedor: inventarioForm.value.proveedor
            };
            this._productoService.registro_inventario_producto_admin(data, this.token).subscribe(function (resp) {
                iziToast.show({
                    title: 'SUCCESS',
                    titleColor: '#1DC74C',
                    color: '#fff',
                    "class": 'text-danger',
                    position: 'topRight',
                    message: 'Se agrego el nuevo Stock al Producto'
                });
                _this.init_data();
            }, function (err) {
                console.log(err);
            });
        }
        else {
            iziToast.show({
                title: 'ERROR',
                titleColor: '#ff0000',
                color: '#fff',
                "class": 'text-danger',
                position: 'topRight',
                message: 'Los datos del formulario no son validos'
            });
        }
    };
    InventarioProductoComponent = __decorate([
        core_1.Component({
            selector: 'app-inventario-producto',
            templateUrl: './inventario-producto.component.html',
            styleUrls: ['./inventario-producto.component.css']
        })
    ], InventarioProductoComponent);
    return InventarioProductoComponent;
}());
exports.InventarioProductoComponent = InventarioProductoComponent;
