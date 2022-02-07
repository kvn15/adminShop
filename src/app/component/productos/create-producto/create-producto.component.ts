import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProductoService } from '../../../services/producto.service';
import { AdminService } from '../../../services/admin.service';
import { Router } from '@angular/router';

declare var jQuery: any;
declare var $:any;
declare var iziToast:any;

@Component({
  selector: 'app-create-producto',
  templateUrl: './create-producto.component.html',
  styleUrls: ['./create-producto.component.css']
})
export class CreateProductoComponent implements OnInit {

  public producto: any = {
    categoria : ''
  }
  public file!: File | any;
  public imgSelect: any | ArrayBuffer = 'assets/img/01.jpg';
  public config: any = {}
  public token:any;
  public load_btn = false;
  public config_categoria:any = {};

  constructor(private _productoService: ProductoService, private _adminService: AdminService, private _route: Router) {
    this.config = {
      height: 500
    }
    this.token = this._adminService.getToken();
    this._adminService.obtener_config_public().subscribe(
      resp=>{
        this.config_categoria = resp.data;
      }
    )
   }

  ngOnInit(): void {

  }

  registro(registrarProducto: NgForm){
    if (registrarProducto.valid) {

      if (this.file == undefined) {
        iziToast.show({
          title: 'ERROR',
          titleColor: '#ff0000',
          color: '#fff',
          class: 'text-danger',
          position: 'topRight',
          message: 'Debe subir una Portada para registrar'
        })
      }else{
        this.load_btn = true;
        console.log(this.producto);
        console.log(this.file);

        this._productoService.registro_producto_admin(this.producto, this.file,this.token).subscribe(
          resp => {
            console.log(resp);
            iziToast.show({
              title: 'SUCCESS',
              titleColor: '#1DC74C',
              color: '#fff',
              class: 'text-success',
              position: 'topRight',
              message: 'Se registro correctamente el nuevo Producto'
            })

            this.load_btn = false;

            this._route.navigate(['/panel/productos'])

          }, err => {
            console.log(err);
            this.load_btn = false;
          }
        )
      }

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
