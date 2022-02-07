"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.IndexProductoComponent = void 0;
var core_1 = require("@angular/core");
var global_1 = require("../../../services/global");
var exceljs_1 = require("exceljs");
var fs = require("file-saver");
var IndexProductoComponent = /** @class */ (function () {
    function IndexProductoComponent(_productoService, _adminService) {
        this._productoService = _productoService;
        this._adminService = _adminService;
        this.load_data = true;
        this.filtro = '';
        this.productos = [];
        this.arr_productos = [];
        this.page = 1;
        this.pageSize = 10;
        this.load_btn = false;
        this.token = localStorage.getItem('token');
        this.url = global_1.GLOBAL.url;
    }
    IndexProductoComponent.prototype.ngOnInit = function () {
        this.init_data();
    };
    IndexProductoComponent.prototype.init_data = function () {
        var _this = this;
        this._productoService.listar_producto_admin(this.filtro, this.token).subscribe(function (resp) {
            console.log(resp);
            _this.productos = resp.data;
            _this.productos.forEach(function (element) {
                _this.arr_productos.push({
                    titulo: element.titulo,
                    stock: element.stock,
                    precio: element.precio,
                    categoria: element.categoria,
                    nventas: element.nventas
                });
            });
            console.log(_this.arr_productos);
            _this.load_data = false;
        }, function (err) {
            console.log(err);
        });
    };
    IndexProductoComponent.prototype.filtrar = function () {
        var _this = this;
        if (this.filtro) {
            this._productoService.listar_producto_admin(this.filtro, this.token).subscribe(function (resp) {
                console.log(resp);
                _this.productos = resp.data;
                _this.load_data = false;
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
                message: 'Ingrese un filtro para buscar'
            });
        }
    };
    IndexProductoComponent.prototype.resetear = function () {
        this.filtro = '';
        this.init_data();
    };
    IndexProductoComponent.prototype.eliminar = function (id) {
        var _this = this;
        this.load_btn = true;
        this._productoService.eliminar_producto_admin(id, this.token).subscribe(function (resp) {
            iziToast.show({
                title: 'SUCCESS',
                titleColor: '#1DC74C',
                color: '#fff',
                "class": 'text-success',
                position: 'topRight',
                message: 'Se Eliminó correctamente el Producto'
            });
            $('#delete-' + id).modal('hide');
            $('modal-backdrop').removeClass('show');
            _this.load_btn = false;
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
            _this.load_btn = false;
        });
    };
    IndexProductoComponent.prototype.download_excel = function () {
        //Iniciarlizar el modulo de Workbook
        var workbook = new exceljs_1.Workbook();
        //creamos u nuevo libro "EXCEL"
        var worsheet = workbook.addWorksheet("Reporte de productos");
        //iteramos nuestro array en cada columna del archivop excel
        worsheet.addRow(undefined);
        for (var _i = 0, _a = this.arr_productos; _i < _a.length; _i++) {
            var x1 = _a[_i];
            var x2 = Object.keys(x1);
            var temp = [];
            for (var _b = 0, x2_1 = x2; _b < x2_1.length; _b++) {
                var y = x2_1[_b];
                temp.push(x1[y]);
            }
            worsheet.addRow(temp);
        }
        var fname = 'REP01-';
        //por cada llave colocaremos una colummna
        worsheet.columns = [
            { header: 'Producto', key: 'col1', width: 30 },
            { header: 'Stock', key: 'col2', width: 15 },
            { header: 'Precio', key: 'col3', width: 15 },
            { header: 'Categoria', key: 'col4', width: 25 },
            { header: 'NVentas', key: 'col5', width: 15 },
        ];
        //exportar a excel y descargar
        workbook.xlsx.writeBuffer().then(function (data) {
            var blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            fs.saveAs(blob, fname + '-' + new Date().valueOf() + '.xml');
        });
    };
    IndexProductoComponent = __decorate([
        core_1.Component({
            selector: 'app-index-producto',
            templateUrl: './index-producto.component.html',
            styleUrls: ['./index-producto.component.css']
        })
    ], IndexProductoComponent);
    return IndexProductoComponent;
}());
exports.IndexProductoComponent = IndexProductoComponent;
