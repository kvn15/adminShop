import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { v4 as uuidv4 } from 'uuid';
import { NgForm } from '@angular/forms';
import { GLOBAL } from 'src/app/services/global';

declare var jQuery: any;
declare var $:any;
declare var iziToast:any;

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {

  public token:any;
  public config:any = {
  };

  public titulo_cat:any = '';
  public icono_cat:any = '';
  public imgSelect: any | ArrayBuffer;
  public file: File | any = undefined;

  public url:any;

  constructor(private _adminService: AdminService) {
    this.token = localStorage.getItem('token');
    this.url = GLOBAL.url;
    this._adminService.obtener_config_admin(this.token).subscribe(
      resp=>{
        this.config = resp.data
        this.imgSelect = this.url+'obtener_logo/'+this.config.logo

      },err=>{
        console.log(err)
      }
    )
  }

  ngOnInit(): void {
  }

  agregar_cat(){
    if (this.icono_cat && this.titulo_cat) {

      this.config.categorias.push({
        titulo: this.titulo_cat,
        icono: this.icono_cat,
        _id: uuidv4()
      });

      this.titulo_cat = '';
      this.icono_cat = '';

    }else{
      iziToast.show({
        title: 'ERROR',
        titleColor: '#ff0000',
        color: '#fff',
        class: 'text-danger',
        position: 'topRight',
        message: 'Debe ingresar un titulo e icono para la categoria'
      })
    }

  }

  actualizar(configForm: NgForm){

    if (configForm.valid) {

      let data = {
        titulo: configForm.value.titulo,
        serie: configForm.value.serie,
        correlativo: configForm.value.correlativo,
        categorias: this.config.categorias,
        logo: this.file
      }

      this._adminService.actualizar_config_admin("61f1831e158a4f120c288650",data,this.token).subscribe(
        resp=>{
          iziToast.show({
            title: 'SUCCESS',
            titleColor: '#1DC74C',
            color: '#fff',
            class: 'text-success',
            position: 'topRight',
            message: 'Se actualizo correctamente la Configuracion'
          })
        },err=>{
          console.log(err)
        }
      )

    }else{
      iziToast.show({
        title: 'ERROR',
        titleColor: '#ff0000',
        color: '#fff',
        class: 'text-danger',
        position: 'topRight',
        message: 'Complete correctamente el formulario'
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

        $('.cs-file-drop-icon').addClass('cs-file-drop-preview img-thumbnail rounded');
        $('.cs-file-drop-icon').removeClass('cs-file-drop-icon cxi-upload');
        //
        reader.readAsDataURL(file);

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

  ngDoCheck(): void {

    $('.cs-file-drop-preview').html("<img src="+this.imgSelect+">");

  }

  eliminarCategoria(idx:any){
    this.config.categorias.splice(idx,1);
  }
}
