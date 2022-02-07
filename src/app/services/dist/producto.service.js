"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ProductoService = void 0;
var core_1 = require("@angular/core");
var global_1 = require("./global");
var http_1 = require("@angular/common/http");
var ProductoService = /** @class */ (function () {
    function ProductoService(_http) {
        this._http = _http;
        this.url = global_1.GLOBAL.url;
    }
    ProductoService.prototype.registro_producto_admin = function (data, file, token) {
        var header = new http_1.HttpHeaders({ 'Authorization': token });
        var fd = new FormData();
        fd.append('titulo', data.titulo);
        fd.append('stock', data.stock);
        fd.append('precio', data.precio);
        fd.append('descripcion', data.descripcion);
        fd.append('contenido', data.contenido);
        fd.append('categoria', data.categoria);
        fd.append('portada', file);
        return this._http.post(this.url + 'registro_producto_admin', fd, { headers: header });
    };
    ProductoService.prototype.listar_producto_admin = function (filtro, token) {
        var header = new http_1.HttpHeaders({
            'Content-Type': 'application/json', 'Authorization': token
        });
        return this._http.get(this.url + 'listar_producto_admin/' + filtro, { headers: header });
    };
    ProductoService.prototype.obtener_producto_admin = function (id, token) {
        var header = new http_1.HttpHeaders({
            'Content-Type': 'application/json', 'Authorization': token
        });
        return this._http.get(this.url + 'obtener_producto_admin/' + id, { headers: header });
    };
    ProductoService.prototype.actualizar_producto_admin = function (data, id, token) {
        if (data.portada) {
            var header = new http_1.HttpHeaders({ 'Authorization': token });
            var fd = new FormData();
            fd.append('titulo', data.titulo);
            fd.append('stock', data.stock);
            fd.append('precio', data.precio);
            fd.append('descripcion', data.descripcion);
            fd.append('contenido', data.contenido);
            fd.append('categoria', data.categoria);
            fd.append('portada', data.portada);
            return this._http.put(this.url + 'actualizar_producto_admin/' + id, fd, { headers: header });
        }
        else {
            var header = new http_1.HttpHeaders({
                'Content-Type': 'application/json', 'Authorization': token
            });
            return this._http.put(this.url + 'actualizar_producto_admin/' + id, data, { headers: header });
        }
    };
    ProductoService.prototype.eliminar_producto_admin = function (id, token) {
        var header = new http_1.HttpHeaders({
            'Content-Type': 'application/json', 'Authorization': token
        });
        return this._http["delete"](this.url + 'eliminar_producto_admin/' + id, { headers: header });
    };
    ProductoService.prototype.listar_inventario_producto_admin = function (id, token) {
        var header = new http_1.HttpHeaders({
            'Content-Type': 'application/json', 'Authorization': token
        });
        return this._http.get(this.url + 'listar_inventario_producto_admin/' + id, { headers: header });
    };
    ProductoService.prototype.eliminar_inventario_producto_admin = function (id, token) {
        var header = new http_1.HttpHeaders({
            'Content-Type': 'application/json', 'Authorization': token
        });
        return this._http["delete"](this.url + 'eliminar_inventario_producto_admin/' + id, { headers: header });
    };
    ProductoService.prototype.registro_inventario_producto_admin = function (data, token) {
        var header = new http_1.HttpHeaders({
            'Content-Type': 'application/json', 'Authorization': token
        });
        return this._http.post(this.url + 'registro_inventario_producto_admin', data, { headers: header });
    };
    ProductoService.prototype.actualizar_producto_variedades_admin = function (id, data, token) {
        var header = new http_1.HttpHeaders({
            'Content-Type': 'application/json', 'Authorization': token
        });
        return this._http.put(this.url + 'actualizar_producto_variedades_admin/' + id, data, { headers: header });
    };
    ProductoService.prototype.agregar_imagen_galeria_admin = function (id, data, token) {
        var header = new http_1.HttpHeaders({ 'Authorization': token });
        var fd = new FormData();
        fd.append('_id', data._id);
        fd.append('imagen', data.imagen);
        return this._http.put(this.url + 'agregar_imagen_galeria_admin/' + id, fd, { headers: header });
    };
    ProductoService.prototype.eliminar_imagen_galeria_admin = function (id, data, token) {
        var header = new http_1.HttpHeaders({
            'Content-Type': 'application/json', 'Authorization': token
        });
        return this._http.put(this.url + 'eliminar_imagen_galeria_admin/' + id, data, { headers: header });
    };
    ProductoService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], ProductoService);
    return ProductoService;
}());
exports.ProductoService = ProductoService;
