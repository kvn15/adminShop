"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.VariedadProductoComponent = void 0;
var core_1 = require("@angular/core");
var global_1 = require("src/app/services/global");
var VariedadProductoComponent = /** @class */ (function () {
    function VariedadProductoComponent(_activatedRoute, _productoService) {
        this._activatedRoute = _activatedRoute;
        this._productoService = _productoService;
        this.producto = {};
        this.load_btn = false;
        this.nueva_variedad = '';
        this.token = localStorage.getItem('token');
        this.url = global_1.GLOBAL.url;
    }
    VariedadProductoComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._activatedRoute.params.subscribe(function (param) {
            _this.id = param['id'];
            _this._productoService.obtener_producto_admin(_this.id, _this.token).subscribe(function (resp) {
                if (resp.data == undefined) {
                    _this.producto = undefined;
                }
                else {
                    _this.producto = resp.data;
                }
            }, function (err) {
                console.log(err);
            });
        });
    };
    VariedadProductoComponent.prototype.agregar_variedad = function () {
        if (this.nueva_variedad) {
            this.producto.variedades.push({
                titulo: this.nueva_variedad
            });
            this.nueva_variedad = '';
        }
        else {
            iziToast.show({
                title: 'ERROR',
                titleColor: '#ff0000',
                color: '#fff',
                "class": 'text-danger',
                position: 'topRight',
                message: 'El campo de la variedad debe ser completada'
            });
        }
    };
    VariedadProductoComponent.prototype.eliminarVariedad = function (idx) {
        this.producto.variedades.splice(idx, 1);
    };
    VariedadProductoComponent.prototype.actualizar = function () {
        var _this = this;
        if (this.producto.titulo_variedad) {
            if (this.producto.variedades.length >= 1) {
                this.load_btn = true;
                this._productoService.actualizar_producto_variedades_admin(this.id, { titulo_variedad: this.producto.titulo_variedad, variedades: this.producto.variedades }, this.token).subscribe(function (resp) {
                    iziToast.show({
                        title: 'SUCCESS',
                        titleColor: '#1dc74c',
                        color: '#fff',
                        "class": 'text-danger',
                        position: 'topRight',
                        message: 'Se actualizo correctamente las variedades'
                    });
                    _this.load_btn = false;
                }, function (err) {
                });
            }
            else {
                iziToast.show({
                    title: 'ERROR',
                    titleColor: '#ff0000',
                    color: '#fff',
                    "class": 'text-danger',
                    position: 'topRight',
                    message: 'Se debe agregar almenos una variedad'
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
                message: 'Debe completar el titulo de la variedad'
            });
        }
    };
    VariedadProductoComponent = __decorate([
        core_1.Component({
            selector: 'app-variedad-producto',
            templateUrl: './variedad-producto.component.html',
            styleUrls: ['./variedad-producto.component.css']
        })
    ], VariedadProductoComponent);
    return VariedadProductoComponent;
}());
exports.VariedadProductoComponent = VariedadProductoComponent;
