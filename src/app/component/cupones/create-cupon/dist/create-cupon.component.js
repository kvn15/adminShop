"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CreateCuponComponent = void 0;
var core_1 = require("@angular/core");
var CreateCuponComponent = /** @class */ (function () {
    function CreateCuponComponent(_cuponService, _adminService, _route) {
        this._cuponService = _cuponService;
        this._adminService = _adminService;
        this._route = _route;
        this.cupon = {
            tipo: ''
        };
        this.load_btn = false;
        this.token = this._adminService.getToken();
    }
    CreateCuponComponent.prototype.ngOnInit = function () {
    };
    CreateCuponComponent.prototype.registro = function (registroForm) {
        var _this = this;
        if (registroForm.valid) {
            this.load_btn = true;
            this._cuponService.registro_cupon_admin(this.cupon, this.token).subscribe(function (resp) {
                iziToast.show({
                    title: 'SUCCESS',
                    titleColor: '#1DC74C',
                    color: '#fff',
                    "class": 'text-success',
                    position: 'topRight',
                    message: 'Se registro correctamente el nuevo cupon'
                });
                _this.load_btn = false;
                _this._route.navigate(['/panel/cupones']);
            }, function (err) {
                _this.load_btn = false;
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
    CreateCuponComponent = __decorate([
        core_1.Component({
            selector: 'app-create-cupon',
            templateUrl: './create-cupon.component.html',
            styleUrls: ['./create-cupon.component.css']
        })
    ], CreateCuponComponent);
    return CreateCuponComponent;
}());
exports.CreateCuponComponent = CreateCuponComponent;
