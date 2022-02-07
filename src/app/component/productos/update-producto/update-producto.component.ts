import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProductoService } from '../../../services/producto.service';
import { AdminService } from '../../../services/admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GLOBAL } from '../../../services/global';

declare var jQuery: any;
declare var $:any;
declare var iziToast:any;

@Component({
  selector: 'app-update-producto',
  templateUrl: './update-producto.component.html',
  styleUrls: ['./update-producto.component.css']
})
export class UpdateProductoComponent implements OnInit {

  public producto: any = {}
  public file: File | any = undefined;
  public imgSelect: any | ArrayBuffer;
  public config: any = {}
  public token:any;
  public load_btn = false;
  public id:any;
  public url: any;
  public config_categoria:any = {};

  constructor(private _productoService: ProductoService, private _adminService: AdminService, private _route: Router, public _activatedRoute: ActivatedRoute) {
    this.config = {
      height: 500
    }
    this.token = this._adminService.getToken();
    this.url = GLOBAL.url
    this._adminService.obtener_config_public().subscribe(
      resp=>{
        this.config_categoria = resp.data;
      }
    )
  }

  ngOnInit(): void {
    this._activatedRoute.params.subscribe(
      param => {
        this.id = param['id']
        console.log(this.id);
        this._productoService.obtener_producto_admin(this.id, this.token).subscribe(
          resp =>{
            if (resp.data == undefined) {
              this.producto = undefined;
            }else{
              console.log(resp);
              this.producto = resp.data
              this.imgSelect = this.url +'obtener_portada/'+this.producto.portada
            }
          }, err=> {
            console.log(err);
          }
        )
      }
    )
  }

  update(updateProducto: NgForm){

    if (updateProducto.valid) {
      // console.log(this.producto);
      // console.log(this.file);
      var data :any = {};

      if (this.file != undefined) {
        data.portada = this.file;
      }

      data.titulo = this.producto.titulo;
      data.stock = this.producto.stock;
      data.precio = this.producto.precio;
      data.categoria = this.producto.categoria;
      data.descripcion = this.producto.descripcion;
      data.contenido = this.producto.contenido;

      this.load_btn = true;

      this._productoService.actualizar_producto_admin(data, this.id, this.token).subscribe(
        resp => {
          console.log(resp);
          iziToast.show({
            title: 'SUCCESS',
            titleColor: '#1DC74C',
            color: '#fff',
            class: 'text-success',
            position: 'topRight',
            message: 'Se actualizo correctamente el nuevo Producto'
          })

          this.load_btn = false;

          this._route.navigate(['/panel/productos'])

        }, err => {
          console.log(err);
          this.load_btn = false;
        }
      )
    }else{
      iziToast.show({
        title: 'ERROR',
        titleColor: '#ff0000',
        color: '#fff',
        class: 'text-danger',
        position: 'topRight',
        message: 'Los datos del formulario no son validos'
      })
    }

  }

  fileChagneEvent(event:any): void{

    var file;
    if (event.target.files && event.target.files[0]) {
      file = event.target.files[0]
    }else{
      iziToast.show({
        title: 'ERROR',
        titleColor: '#ff0000',
        color: '#fff',
        class: 'text-danger',
        position: 'topRight',
        message: 'No hay una Imagen de envio'
      })
      $('#input-portada').text('Seleccionar imagen')
      this.imgSelect = 'assets/img/01.jpg';
      this.file  = undefined;
    }

    if (file.size <= 4000000) {

      if (file.type === 'image/png' || file.type == 'image/web' || file.type == 'image/jpg' || file.type == 'image/gif' || file.type == 'image/jpeg') {

        const reader = new FileReader();
        //guardaremos nuestra imagen en base 64 en una variable
        reader.onload = e => this.imgSelect = reader.result;
        //
        reader.readAsDataURL(file);

        $('#input-portada').text(file.name)

        //guardar imagen
        this.file = file;

      }else{
        iziToast.show({
          title: 'ERROR',
          titleColor: '#ff0000',
          color: '#fff',
          class: 'text-danger',
          position: 'topRight',
          message: 'El Archivo de ser una imagen'
        })

        $('#input-portada').text('Seleccionar imagen')
        this.imgSelect = 'assets/img/01.jpg';
        this.file = undefined;

      }

    }else{
      iziToast.show({
        title: 'ERROR',
        titleColor: '#ff0000',
        color: '#fff',
        class: 'text-danger',
        position: 'topRight',
        message: 'La imagen no puede superar los 4MB'
      })

      $('#input-portada').text('Seleccionar imagen')
      this.imgSelect = 'assets/img/01.jpg';
      this.file  = undefined;

    }

  }

}
