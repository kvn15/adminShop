import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GLOBAL } from 'src/app/services/global';
import { ProductoService } from '../../../services/producto.service';

declare var jQuery: any;
declare var $:any;
declare var iziToast:any;

@Component({
  selector: 'app-variedad-producto',
  templateUrl: './variedad-producto.component.html',
  styleUrls: ['./variedad-producto.component.css']
})
export class VariedadProductoComponent implements OnInit {

  public producto:any = {};
  public id:any;
  public token:any;
  public load_btn:boolean = false;
  public url:any;

  public nueva_variedad: any = '';

  constructor(private _activatedRoute : ActivatedRoute, private _productoService: ProductoService) {
    this.token = localStorage.getItem('token');
    this.url = GLOBAL.url;
  }

  ngOnInit(): void {
    this._activatedRoute.params.subscribe(
      param => {
        this.id = param['id']
        this._productoService.obtener_producto_admin(this.id, this.token).subscribe(
          resp =>{
            if (resp.data == undefined) {
              this.producto = undefined;
            }else{
              this.producto = resp.data;
            }
          }, err=> {
            console.log(err);
          }
        )
      }
    )
  }

  agregar_variedad(){
    if (this.nueva_variedad) {
      this.producto.variedades.push({
        titulo: this.nueva_variedad
      })
      this.nueva_variedad = '';
    }else{
      iziToast.show({
        title: 'ERROR',
        titleColor: '#ff0000',
        color: '#fff',
        class: 'text-danger',
        position: 'topRight',
        message: 'El campo de la variedad debe ser completada'
      })
    }
  }

  eliminarVariedad(idx:any){
    this.producto.variedades.splice(idx,1);
  }

  actualizar(){
    if (this.producto.titulo_variedad) {
      if (this.producto.variedades.length >= 1) {
        this.load_btn = true;
        this._productoService.actualizar_producto_variedades_admin(this.id, {titulo_variedad: this.producto.titulo_variedad, variedades: this.producto.variedades}, this.token).subscribe(
          resp=>{
            iziToast.show({
              title: 'SUCCESS',
              titleColor: '#1dc74c',
              color: '#fff',
              class: 'text-danger',
              position: 'topRight',
              message: 'Se actualizo correctamente las variedades'
            })
            this.load_btn = false;
          },err=>{

          }
        )
      }else{
        iziToast.show({
          title: 'ERROR',
          titleColor: '#ff0000',
          color: '#fff',
          class: 'text-danger',
          position: 'topRight',
          message: 'Se debe agregar almenos una variedad'
        })
      }
    }else{
      iziToast.show({
        title: 'ERROR',
        titleColor: '#ff0000',
        color: '#fff',
        class: 'text-danger',
        position: 'topRight',
        message: 'Debe completar el titulo de la variedad'
      })
    }
  }

}
