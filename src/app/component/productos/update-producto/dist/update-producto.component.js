"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UpdateProductoComponent = void 0;
var core_1 = require("@angular/core");
var global_1 = require("../../../services/global");
var UpdateProductoComponent = /** @class */ (function () {
    function UpdateProductoComponent(_productoService, _adminService, _route, _activatedRoute) {
        var _this = this;
        this._productoService = _productoService;
        this._adminService = _adminService;
        this._route = _route;
        this._activatedRoute = _activatedRoute;
        this.producto = {};
        this.file = undefined;
        this.config = {};
        this.load_btn = false;
        this.config_categoria = {};
        this.config = {
            height: 500
        };
        this.token = this._adminService.getToken();
        this.url = global_1.GLOBAL.url;
        this._adminService.obtener_config_public().subscribe(function (resp) {
            _this.config_categoria = resp.data;
        });
    }
    UpdateProductoComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._activatedRoute.params.subscribe(function (param) {
            _this.id = param['id'];
            console.log(_this.id);
            _this._productoService.obtener_producto_admin(_this.id, _this.token).subscribe(function (resp) {
                if (resp.data == undefined) {
                    _this.producto = undefined;
                }
                else {
                    console.log(resp);
                    _this.producto = resp.data;
                    _this.imgSelect = _this.url + 'obtener_portada/' + _this.producto.portada;
                }
            }, function (err) {
                console.log(err);
            });
        });
    };
    UpdateProductoComponent.prototype.update = function (updateProducto) {
        var _this = this;
        if (updateProducto.valid) {
            // console.log(this.producto);
            // console.log(this.file);
            var data = {};
            if (this.file != undefined) {
                data.portada = this.file;
            }
            data.titulo = this.producto.titulo;
            data.stock = this.producto.stock;
            data.precio = this.producto.precio;
            data.categoria = this.producto.categoria;
            data.descripcion = this.producto.descripcion;
            data.contenido = this.producto.contenido;
            this.load_btn = true;
            this._productoService.actualizar_producto_admin(data, this.id, this.token).subscribe(function (resp) {
                console.log(resp);
                iziToast.show({
                    title: 'SUCCESS',
                    titleColor: '#1DC74C',
                    color: '#fff',
                    "class": 'text-success',
                    position: 'topRight',
                    message: 'Se actualizo correctamente el nuevo Producto'
                });
                _this.load_btn = false;
                _this._route.navigate(['/panel/productos']);
            }, function (err) {
                console.log(err);
                _this.load_btn = false;
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
    UpdateProductoComponent.prototype.fileChagneEvent = function (event) {
        var _this = this;
        var file;
        if (event.target.files && event.target.files[0]) {
            file = event.target.files[0];
        }
        else {
            iziToast.show({
                title: 'ERROR',
                titleColor: '#ff0000',
                color: '#fff',
                "class": 'text-danger',
                position: 'topRight',
                message: 'No hay una Imagen de envio'
            });
            $('#input-portada').text('Seleccionar imagen');
            this.imgSelect = 'assets/img/01.jpg';
            this.file = undefined;
        }
        if (file.size <= 4000000) {
            if (file.type === 'image/png' || file.type == 'image/web' || file.type == 'image/jpg' || file.type == 'image/gif' || file.type == 'image/jpeg') {
                var reader_1 = new FileReader();
                //guardaremos nuestra imagen en base 64 en una variable
                reader_1.onload = function (e) { return _this.imgSelect = reader_1.result; };
                //
                reader_1.readAsDataURL(file);
                $('#input-portada').text(file.name);
                //guardar imagen
                this.file = file;
            }
            else {
                iziToast.show({
                    title: 'ERROR',
                    titleColor: '#ff0000',
                    color: '#fff',
                    "class": 'text-danger',
                    position: 'topRight',
                    message: 'El Archivo de ser una imagen'
                });
                $('#input-portada').text('Seleccionar imagen');
                this.imgSelect = 'assets/img/01.jpg';
                this.file = undefined;
            }
        }
        else {
            iziToast.show({
                title: 'ERROR',
                titleColor: '#ff0000',
                color: '#fff',
                "class": 'text-danger',
                position: 'topRight',
                message: 'La imagen no puede superar los 4MB'
            });
            $('#input-portada').text('Seleccionar imagen');
            this.imgSelect = 'assets/img/01.jpg';
            this.file = undefined;
        }
    };
    UpdateProductoComponent = __decorate([
        core_1.Component({
            selector: 'app-update-producto',
            templateUrl: './update-producto.component.html',
            styleUrls: ['./update-producto.component.css']
        })
    ], UpdateProductoComponent);
    return UpdateProductoComponent;
}());
exports.UpdateProductoComponent = UpdateProductoComponent;
