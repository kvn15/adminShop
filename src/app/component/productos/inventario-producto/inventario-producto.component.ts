import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../../services/producto.service';
import { AdminService } from '../../../services/admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GLOBAL } from '../../../services/global';
import { NgForm } from '@angular/forms';

declare var jQuery: any;
declare var $:any;
declare var iziToast:any;

@Component({
  selector: 'app-inventario-producto',
  templateUrl: './inventario-producto.component.html',
  styleUrls: ['./inventario-producto.component.css']
})
export class InventarioProductoComponent implements OnInit {

  public producto: any = {}
  public id:any;
  public config: any = {}
  public token:any;
  public _iduser:any;
  public url: any;
  public load_btn: boolean = false;
  public inventarios: Array<any> = [];

  public inventario: any = {}

  constructor(private _productoService: ProductoService, private _adminService: AdminService, private _route: Router, public _activatedRoute: ActivatedRoute) {
    this.config = {
      height: 500
    }
    this.token = this._adminService.getToken();
    this._iduser = localStorage.getItem('_id');
    this.url = GLOBAL.url
   }

  ngOnInit(): void {
    this.init_data();
  }

  init_data(){
    this._activatedRoute.params.subscribe(
      param => {
        this.id = param['id']
        this._productoService.obtener_producto_admin(this.id, this.token).subscribe(
          resp =>{
            if (resp.data == undefined) {
              this.producto = undefined;
            }else{
              this.producto = resp.data;

              this._productoService.listar_inventario_producto_admin(this.producto._id, this.token).subscribe(
                resp=> {
                  this.inventarios = resp.data
                }, err=> {
                  console.log(err);
                }
              )
            }
          }, err=> {
            console.log(err);
          }
        )
      }
    )
  }

  eliminar(id: any){

    this.load_btn = true;
    this._productoService.eliminar_inventario_producto_admin(id, this.token).subscribe(
      resp => {
        iziToast.show({
          title: 'SUCCESS',
          titleColor: '#1DC74C',
          color: '#fff',
          class: 'text-success',
          position: 'topRight',
          message: 'Se Eliminó correctamente el Producto'
        })

        $('#delete-'+id).modal('hide');
        $('modal-backdrop').removeClass('show');

        this.load_btn = false;

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
        this.load_btn = false;
      }
    )


  }


  registro_inventario(inventarioForm: NgForm){

    if (inventarioForm.valid) {

      let data = {
        producto: this.producto._id,
        cantidad: inventarioForm.value.cantidad,
        admin: this._iduser,
        proveedor: inventarioForm.value.proveedor
      }

      this._productoService.registro_inventario_producto_admin(data, this.token).subscribe(
        resp => {
          iziToast.show({
            title: 'SUCCESS',
            titleColor: '#1DC74C',
            color: '#fff',
            class: 'text-danger',
            position: 'topRight',
            message: 'Se agrego el nuevo Stock al Producto'
          });

          this.init_data();

        }, err=> {
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
        message: 'Los datos del formulario no son validos'
      })
    }

  }

}
