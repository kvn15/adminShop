"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.GaleriaProductoComponent = void 0;
var core_1 = require("@angular/core");
var global_1 = require("../../../services/global");
var uuid_1 = require("uuid");
var GaleriaProductoComponent = /** @class */ (function () {
    function GaleriaProductoComponent(_activatedRoute, _productoService) {
        this._activatedRoute = _activatedRoute;
        this._productoService = _productoService;
        this.producto = {};
        this.load_btn = false;
        this.load_btn_eliminar = false;
        this.file = undefined;
        this.token = localStorage.getItem('token');
        this.url = global_1.GLOBAL.url;
    }
    GaleriaProductoComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._activatedRoute.params.subscribe(function (param) {
            _this.id = param['id'];
            _this.init_data();
        });
    };
    GaleriaProductoComponent.prototype.init_data = function () {
        var _this = this;
        this._productoService.obtener_producto_admin(this.id, this.token).subscribe(function (resp) {
            if (resp.data == undefined) {
                _this.producto = undefined;
            }
            else {
                _this.producto = resp.data;
            }
        }, function (err) {
            console.log(err);
        });
    };
    GaleriaProductoComponent.prototype.subir_imagen = function () {
        var _this = this;
        if (this.file != undefined) {
            var data = {
                imagen: this.file,
                _id: uuid_1.v4()
            };
            console.log(data);
            this._productoService.agregar_imagen_galeria_admin(this.id, data, this.token).subscribe(function (resp) {
                _this.init_data();
                $('#input-img').val('');
            });
        }
        else {
            iziToast.show({
                title: 'ERROR',
                titleColor: '#ff0000',
                color: '#fff',
                "class": 'text-danger',
                position: 'topRight',
                message: 'Debe Seleccionar una Imagen para subir'
            });
        }
    };
    GaleriaProductoComponent.prototype.fileChagneEvent = function (event) {
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
            this.file = undefined;
        }
        if (file.size <= 4000000) {
            if (file.type === 'image/png' || file.type == 'image/web' || file.type == 'image/jpg' || file.type == 'image/gif' || file.type == 'image/jpeg') {
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
                $('#input-img').val('');
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
            $('#input-img').val('');
            this.file = undefined;
        }
    };
    GaleriaProductoComponent.prototype.eliminar = function (id) {
        var _this = this;
        this.load_btn_eliminar = true;
        this._productoService.eliminar_imagen_galeria_admin(this.id, { _id: id }, this.token).subscribe(function (resp) {
            iziToast.show({
                title: 'SUCCESS',
                titleColor: '#1DC74C',
                color: '#fff',
                "class": 'text-success',
                position: 'topRight',
                message: 'Se Eliminó correctamente la Imagen'
            });
            $('#delete-' + id).modal('hide');
            $('modal-backdrop').removeClass('show');
            _this.load_btn_eliminar = false;
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
            _this.load_btn_eliminar = false;
        });
    };
    GaleriaProductoComponent = __decorate([
        core_1.Component({
            selector: 'app-galeria-producto',
            templateUrl: './galeria-producto.component.html',
            styleUrls: ['./galeria-producto.component.css']
        })
    ], GaleriaProductoComponent);
    return GaleriaProductoComponent;
}());
exports.GaleriaProductoComponent = GaleriaProductoComponent;
