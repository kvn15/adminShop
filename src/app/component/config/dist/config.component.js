"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ConfigComponent = void 0;
var core_1 = require("@angular/core");
var uuid_1 = require("uuid");
var global_1 = require("src/app/services/global");
var ConfigComponent = /** @class */ (function () {
    function ConfigComponent(_adminService) {
        var _this = this;
        this._adminService = _adminService;
        this.config = {};
        this.titulo_cat = '';
        this.icono_cat = '';
        this.file = undefined;
        this.token = localStorage.getItem('token');
        this.url = global_1.GLOBAL.url;
        this._adminService.obtener_config_admin(this.token).subscribe(function (resp) {
            _this.config = resp.data;
            _this.imgSelect = _this.url + 'obtener_logo/' + _this.config.logo;
        }, function (err) {
            console.log(err);
        });
    }
    ConfigComponent.prototype.ngOnInit = function () {
    };
    ConfigComponent.prototype.agregar_cat = function () {
        if (this.icono_cat && this.titulo_cat) {
            this.config.categorias.push({
                titulo: this.titulo_cat,
                icono: this.icono_cat,
                _id: uuid_1.v4()
            });
            this.titulo_cat = '';
            this.icono_cat = '';
        }
        else {
            iziToast.show({
                title: 'ERROR',
                titleColor: '#ff0000',
                color: '#fff',
                "class": 'text-danger',
                position: 'topRight',
                message: 'Debe ingresar un titulo e icono para la categoria'
            });
        }
    };
    ConfigComponent.prototype.actualizar = function (configForm) {
        if (configForm.valid) {
            var data = {
                titulo: configForm.value.titulo,
                serie: configForm.value.serie,
                correlativo: configForm.value.correlativo,
                categorias: this.config.categorias,
                logo: this.file
            };
            this._adminService.actualizar_config_admin("61f1831e158a4f120c288650", data, this.token).subscribe(function (resp) {
                iziToast.show({
                    title: 'SUCCESS',
                    titleColor: '#1DC74C',
                    color: '#fff',
                    "class": 'text-success',
                    position: 'topRight',
                    message: 'Se actualizo correctamente la Configuracion'
                });
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
                message: 'Complete correctamente el formulario'
            });
        }
    };
    ConfigComponent.prototype.fileChagneEvent = function (event) {
        var _this = this;
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
            $('#input-portada').text('Seleccionar imagen');
            this.imgSelect = 'assets/img/01.jpg';
            this.file = undefined;
        }
        if (file.size <= 4000000) {
            if (file.type === 'image/png' || file.type == 'image/web' || file.type == 'image/jpg' || file.type == 'image/gif' || file.type == 'image/jpeg') {
                var reader_1 = new FileReader();
                //guardaremos nuestra imagen en base 64 en una variable
                reader_1.onload = function (e) { return _this.imgSelect = reader_1.result; };
                $('.cs-file-drop-icon').addClass('cs-file-drop-preview img-thumbnail rounded');
                $('.cs-file-drop-icon').removeClass('cs-file-drop-icon cxi-upload');
                //
                reader_1.readAsDataURL(file);
                //guardar imagen
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
                $('#input-portada').text('Seleccionar imagen');
                this.imgSelect = 'assets/img/01.jpg';
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
            $('#input-portada').text('Seleccionar imagen');
            this.imgSelect = 'assets/img/01.jpg';
            this.file = undefined;
        }
    };
    ConfigComponent.prototype.ngDoCheck = function () {
        $('.cs-file-drop-preview').html("<img src=" + this.imgSelect + ">");
    };
    ConfigComponent.prototype.eliminarCategoria = function (idx) {
        this.config.categorias.splice(idx, 1);
    };
    ConfigComponent = __decorate([
        core_1.Component({
            selector: 'app-config',
            templateUrl: './config.component.html',
            styleUrls: ['./config.component.css']
        })
    ], ConfigComponent);
    return ConfigComponent;
}());
exports.ConfigComponent = ConfigComponent;
