"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.IndexCuponComponent = void 0;
var core_1 = require("@angular/core");
var IndexCuponComponent = /** @class */ (function () {
    function IndexCuponComponent(_cuponServices) {
        this._cuponServices = _cuponServices;
        this.load_data = true;
        this.page = 1;
        this.pageSize = 10;
        this.cupones = [];
        this.filtro = '';
        this.token = localStorage.getItem('token');
    }
    IndexCuponComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._cuponServices.listar_cupones_admin(this.filtro, this.token).subscribe(function (resp) {
            _this.cupones = resp.data;
            _this.load_data = false;
        });
    };
    IndexCuponComponent.prototype.filtrar = function () {
        var _this = this;
        this._cuponServices.listar_cupones_admin(this.filtro, this.token).subscribe(function (resp) {
            _this.cupones = resp.data;
            _this.load_data = false;
        });
    };
    IndexCuponComponent.prototype.eliminar = function (id) {
        var _this = this;
        this._cuponServices.eliminar_cupon_admin(id, this.token).subscribe(function (resp) {
            iziToast.show({
                title: 'SUCCESS',
                titleColor: '#1DC74C',
                color: '#fff',
                "class": 'text-success',
                position: 'topRight',
                message: 'Se Eliminó correctamente el Cupón'
            });
            $('#delete-' + id).modal('hide');
            $('modal-backdrop').removeClass('show');
            _this.filtrar();
        }, function (err) {
            console.log(err);
        });
    };
    IndexCuponComponent = __decorate([
        core_1.Component({
            selector: 'app-index-cupon',
            templateUrl: './index-cupon.component.html',
            styleUrls: ['./index-cupon.component.css']
        })
    ], IndexCuponComponent);
    return IndexCuponComponent;
}());
exports.IndexCuponComponent = IndexCuponComponent;
