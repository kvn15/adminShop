"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UpdateCuponComponent = void 0;
var core_1 = require("@angular/core");
var UpdateCuponComponent = /** @class */ (function () {
    function UpdateCuponComponent(_cuponService, _router, _route) {
        this._cuponService = _cuponService;
        this._router = _router;
        this._route = _route;
        this.cupon = {};
        this.load_btn = false;
        this.load_data = true;
        this.token = localStorage.getItem('token');
    }
    UpdateCuponComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._route.params
            .subscribe(function (param) {
            _this.id = param.id;
            _this._cuponService.obtener_cupon_admin(param.id, _this.token).subscribe(function (resp) {
                if (resp.data == undefined) {
                    _this.cupon = undefined;
                    _this.load_data = true;
                }
                else {
                    _this.cupon = resp.data;
                    _this.load_data = false;
                }
            });
        });
    };
    UpdateCuponComponent.prototype.update = function (updateForm) {
        var _this = this;
        if (updateForm.valid) {
            this.load_btn = true;
            this._cuponService.update_cupon_admin(this.id, this.cupon, this.token).subscribe(function (resp) {
                iziToast.show({
                    title: 'SUCCESS',
                    titleColor: '#1DC74C',
                    color: '#fff',
                    "class": 'text-success',
                    position: 'topRight',
                    message: 'Se actualizo correctamente el cupón'
                });
                _this.load_btn = false;
                _this._router.navigate(['/panel/cupones']);
            }, function (err) {
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
    UpdateCuponComponent = __decorate([
        core_1.Component({
            selector: 'app-update-cupon',
            templateUrl: './update-cupon.component.html',
            styleUrls: ['./update-cupon.component.css']
        })
    ], UpdateCuponComponent);
    return UpdateCuponComponent;
}());
exports.UpdateCuponComponent = UpdateCuponComponent;
