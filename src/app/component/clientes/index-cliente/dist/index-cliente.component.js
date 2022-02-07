"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.IndexClienteComponent = void 0;
var core_1 = require("@angular/core");
var IndexClienteComponent = /** @class */ (function () {
    function IndexClienteComponent(_clienteServices, _adminServices) {
        this._clienteServices = _clienteServices;
        this._adminServices = _adminServices;
        this.clientes = [];
        this.filtro_apellidos = '';
        this.filtro_correo = '';
        this.page = 1;
        this.pageSize = 10;
        this.load_data = true;
        this.token = this._adminServices.getToken();
        console.log(this.token);
    }
    IndexClienteComponent.prototype.ngOnInit = function () {
        this.initData();
    };
    IndexClienteComponent.prototype.initData = function () {
        var _this = this;
        this._clienteServices.listar_clientes_filtro_admin(null, null, this.token).subscribe(function (resp) {
            _this.clientes = resp.data;
            // setTimeout(() => {
            // }, 3000);
            _this.load_data = false;
        }, function (err) {
            console.log(err);
        });
    };
    IndexClienteComponent.prototype.filtro = function (tipo) {
        var _this = this;
        var filtro;
        if (tipo === 'apellidos') {
            this.load_data = true;
            if (this.filtro_apellidos) {
                filtro = this.filtro_apellidos;
            }
            else {
                return this.initData();
            }
        }
        else if (tipo === 'email') {
            this.load_data = true;
            if (this.filtro_correo) {
                filtro = this.filtro_correo;
            }
            else {
                return this.initData();
            }
        }
        this._clienteServices.listar_clientes_filtro_admin(tipo, filtro, this.token).subscribe(function (resp) {
            _this.clientes = resp.data;
            _this.load_data = false;
        }, function (err) {
            console.log(err);
        });
    };
    IndexClienteComponent.prototype.eliminar = function (id) {
        var _this = this;
        this._clienteServices.eliminar_cliente_admin(id, this.token).subscribe(function (resp) {
            iziToast.show({
                title: 'SUCCESS',
                titleColor: '#1DC74C',
                color: '#fff',
                "class": 'text-success',
                position: 'topRight',
                message: 'Se Eliminó correctamente el nuevo cliente'
            });
            $('#delete-' + id).modal('hide');
            $('modal-backdrop').removeClass('show');
            _this.initData();
        }, function (err) {
            console.log(err);
        });
    };
    IndexClienteComponent = __decorate([
        core_1.Component({
            selector: 'app-index-cliente',
            templateUrl: './index-cliente.component.html',
            styleUrls: ['./index-cliente.component.css']
        })
    ], IndexClienteComponent);
    return IndexClienteComponent;
}());
exports.IndexClienteComponent = IndexClienteComponent;
