"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AdminService = void 0;
var core_1 = require("@angular/core");
var global_1 = require("./global");
var http_1 = require("@angular/common/http");
var angular_jwt_1 = require("@auth0/angular-jwt");
var AdminService = /** @class */ (function () {
    function AdminService(_http) {
        this._http = _http;
        this.url = global_1.GLOBAL.url;
    }
    AdminService.prototype.login_admin = function (data) {
        var header = new http_1.HttpHeaders().set('Content-Type', 'application/json');
        return this._http.post(this.url + 'login_admin', data, { headers: header });
    };
    AdminService.prototype.getToken = function () {
        return localStorage.getItem('token');
    };
    AdminService.prototype.isAuntenticate = function (allowRoles) {
        var token = localStorage.getItem('token');
        if (!token) {
            return false;
        }
        try {
            var helper = new angular_jwt_1.JwtHelperService();
            var decodedToken = helper.decodeToken(token);
            if (helper.isTokenExpired(token)) {
                localStorage.removeItem('token');
                return false;
            }
            if (!decodedToken) {
                console.log('no acceso');
                localStorage.removeItem('token');
                return false;
            }
        }
        catch (error) {
            localStorage.removeItem('token');
            return false;
        }
        return allowRoles.includes(decodedToken['rol']);
    };
    AdminService.prototype.actualizar_config_admin = function (id, data, token) {
        if (data.logo) {
            var header = new http_1.HttpHeaders({ 'Authorization': token });
            var fd = new FormData();
            fd.append('titulo', data.titulo);
            fd.append('serie', data.serie);
            fd.append('correlativo', data.correlativo);
            fd.append('categorias', JSON.stringify(data.categorias));
            fd.append('logo', data.logo);
            return this._http.put(this.url + 'actualizar_config_admin/' + id, fd, { headers: header });
        }
        else {
            var header = new http_1.HttpHeaders({
                'Content-Type': 'application/json', 'Authorization': token
            });
            return this._http.put(this.url + 'actualizar_config_admin/' + id, data, { headers: header });
        }
    };
    AdminService.prototype.obtener_config_admin = function (token) {
        var header = new http_1.HttpHeaders({
            'Content-Type': 'application/json', 'Authorization': token
        });
        return this._http.get(this.url + 'obtener_config_admin', { headers: header });
    };
    AdminService.prototype.obtener_config_public = function () {
        var header = new http_1.HttpHeaders({
            'Content-Type': 'application/json'
        });
        return this._http.get(this.url + 'obtener_config_public', { headers: header });
    };
    AdminService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], AdminService);
    return AdminService;
}());
exports.AdminService = AdminService;
