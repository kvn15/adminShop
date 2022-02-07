import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductoService } from '../../../services/producto.service';
import { GLOBAL } from '../../../services/global';
import { v4 as uuidv4 } from 'uuid';

declare var jQuery: any;
declare var $:any;
declare var iziToast:any;

@Component({
  selector: 'app-galeria-producto',
  templateUrl: './galeria-producto.component.html',
  styleUrls: ['./galeria-producto.component.css']
})
export class GaleriaProductoComponent implements OnInit {

  public producto:any = {};
  public id:any;
  public token:any;
  public load_btn:boolean = false;
  public url:any;

  public load_btn_eliminar:boolean = false;

  public file: File | any = undefined;

  constructor(private _activatedRoute : ActivatedRoute, private _productoService: ProductoService) {
    this.token = localStorage.getItem('token');
    this.url = GLOBAL.url;
  }

  ngOnInit(): void {
    this._activatedRoute.params.subscribe(
      param => {
        this.id = param['id']
        this.init_data();
      })
  }

  init_data(){
    this._productoService.obtener_producto_admin(this.id, this.token).subscribe(
      resp =>{
        if (resp.data == undefined) {
          this.producto = undefined;
        }else{
          this.producto = resp.data;
        }
      }, err=> {
        console.log(err);
      })
  }

  subir_imagen(){
    if (this.file != undefined) {

      let data = {
        imagen: this.file,
        _id: uuidv4()
      }

      console.log(data);
      this._productoService.agregar_imagen_galeria_admin(this.id, data, this.token).subscribe(
        resp=>{
          this.init_data();
          $('#input-img').val('');
        }
      )


    }else{
      iziToast.show({
        title: 'ERROR',
        titleColor: '#ff0000',
        color: '#fff',
        class: 'text-danger',
        position: 'topRight',
        message: 'Debe Seleccionar una Imagen para subir'
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
      this.file  = undefined;
    }

    if (file.size <= 4000000) {

      if (file.type === 'image/png' || file.type == 'image/web' || file.type == 'image/jpg' || file.type == 'image/gif' || file.type == 'image/jpeg') {

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
        $('#input-img').val('');
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
      $('#input-img').val('');
      this.file  = undefined;

    }

  }

  eliminar(id: any){

    this.load_btn_eliminar = true;
    this._productoService.eliminar_imagen_galeria_admin(this.id,{_id: id}, this.token).subscribe(
      resp => {
        iziToast.show({
          title: 'SUCCESS',
          titleColor: '#1DC74C',
          color: '#fff',
          class: 'text-success',
          position: 'topRight',
          message: 'Se Eliminó correctamente la Imagen'
        })

        $('#delete-'+id).modal('hide');
        $('modal-backdrop').removeClass('show');

        this.load_btn_eliminar = false;

        this.init_data();

      },err=> {
        console.log(err);
        iziToast.show({
          title: 'ERROR',
          titleColor: '#ff0000',
          color: '#fff',
          class: 'text-success',
          position: 'topRight',
          message: 'Ocurrio un error en el servidor'
        })
        this.load_btn_eliminar = false;
      }
    )
  }

}
