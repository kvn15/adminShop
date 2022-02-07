"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CreateClienteComponent = void 0;
var core_1 = require("@angular/core");
var CreateClienteComponent = /** @class */ (function () {
    function CreateClienteComponent(_clienteService, _adminService, _route) {
        this._clienteService = _clienteService;
        this._adminService = _adminService;
        this._route = _route;
        this.cliente = {
            genero: ''
        };
        this.load_btn = false;
        this.token = this._adminService.getToken();
    }
    CreateClienteComponent.prototype.ngOnInit = function () {
    };
    CreateClienteComponent.prototype.registro = function (registroForm) {
        var _this = this;
        if (registroForm.valid) {
            this.load_btn = true;
            this._clienteService.registro_cliente_admin(this.cliente, this.token).subscribe(function (resp) {
                iziToast.show({
                    title: 'SUCCESS',
                    titleColor: '#1DC74C',
                    color: '#fff',
                    "class": 'text-success',
                    position: 'topRight',
                    message: 'Se registro correctamente el nuevo cliente'
                });
                _this.cliente = {
                    genero: '',
                    nombres: '',
                    apellidos: '',
                    telefono: '',
                    email: '',
                    dni: '',
                    f_nacimiento: ''
                };
                _this.load_btn = false;
                _this._route.navigate(['/panel/clientes']);
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
    CreateClienteComponent = __decorate([
        core_1.Component({
            selector: 'app-create-cliente',
            templateUrl: './create-cliente.component.html',
            styleUrls: ['./create-cliente.component.css']
        })
    ], CreateClienteComponent);
    return CreateClienteComponent;
}());
exports.CreateClienteComponent = CreateClienteComponent;
