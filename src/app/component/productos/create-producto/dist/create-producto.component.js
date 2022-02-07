"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CreateProductoComponent = void 0;
var core_1 = require("@angular/core");
var CreateProductoComponent = /** @class */ (function () {
    function CreateProductoComponent(_productoService, _adminService, _route) {
        var _this = this;
        this._productoService = _productoService;
        this._adminService = _adminService;
        this._route = _route;
        this.producto = {
            categoria: ''
        };
        this.imgSelect = 'assets/img/01.jpg';
        this.config = {};
        this.load_btn = false;
        this.config_categoria = {};
        this.config = {
            height: 500
        };
        this.token = this._adminService.getToken();
        this._adminService.obtener_config_public().subscribe(function (resp) {
            _this.config_categoria = resp.data;
        });
    }
    CreateProductoComponent.prototype.ngOnInit = function () {
    };
    CreateProductoComponent.prototype.registro = function (registrarProducto) {
        var _this = this;
        if (registrarProducto.valid) {
            if (this.file == undefined) {
                iziToast.show({
                    title: 'ERROR',
                    titleColor: '#ff0000',
                    color: '#fff',
                    "class": 'text-danger',
                    position: 'topRight',
                    message: 'Debe subir una Portada para registrar'
                });
            }
            else {
                this.load_btn = true;
                console.log(this.producto);
                console.log(this.file);
                this._productoService.registro_producto_admin(this.producto, this.file, this.token).subscribe(function (resp) {
                    console.log(resp);
                    iziToast.show({
                        title: 'SUCCESS',
                        titleColor: '#1DC74C',
                        color: '#fff',
                        "class": 'text-success',
                        position: 'topRight',
                        message: 'Se registro correctamente el nuevo Producto'
                    });
                    _this.load_btn = false;
                    _this._route.navigate(['/panel/productos']);
                }, function (err) {
                    console.log(err);
                    _this.load_btn = false;
                });
            }
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
    CreateProductoComponent.prototype.fileChagneEvent = function (event) {
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
    CreateProductoComponent = __decorate([
        core_1.Component({
            selector: 'app-create-producto',
            templateUrl: './create-producto.component.html',
            styleUrls: ['./create-producto.component.css']
        })
    ], CreateProductoComponent);
    return CreateProductoComponent;
}());
exports.CreateProductoComponent = CreateProductoComponent;
