import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../../services/producto.service';
import { AdminService } from '../../../services/admin.service';
import { GLOBAL } from '../../../services/global';

import { Workbook } from "exceljs";
import * as fs from "file-saver";

declare var jQuery: any;
declare var $:any;
declare var iziToast:any;

@Component({
  selector: 'app-index-producto',
  templateUrl: './index-producto.component.html',
  styleUrls: ['./index-producto.component.css']
})
export class IndexProductoComponent implements OnInit {

  public load_data:boolean = true;
  public token:any;
  public filtro:any =  '';
  public productos: Array<any> = [];
  public arr_productos: Array<any> = [];
  public url;

  public page: any = 1;
  public pageSize: any = 10;

  public load_btn = false;

  constructor(private _productoService: ProductoService, private _adminService: AdminService) {
    this.token = localStorage.getItem('token');
    this.url = GLOBAL.url
   }

  ngOnInit(): void {
    this.init_data()
  }

  init_data(){
    this._productoService.listar_producto_admin(this.filtro, this.token).subscribe(
      resp => {
        console.log(resp);
        this.productos = resp.data
        this.productos.forEach(element => {
          this.arr_productos.push({
            titulo: element.titulo,
            stock: element.stock,
            precio: element.precio,
            categoria: element.categoria,
            nventas: element.nventas
          })
        });
        console.log(this.arr_productos);

        this.load_data = false;
      }, err => {
        console.log(err);
      }
    )
  }

  filtrar(){
    if (this.filtro) {

      this._productoService.listar_producto_admin(this.filtro, this.token).subscribe(
        resp => {
          console.log(resp);
          this.productos = resp.data
          this.load_data = false;
        }, err => {
          console.log(err);
        }
      )

    }else{
      iziToast.show({
        title: 'ERROR',
        titleColor: '#ff0000',
        color: '#fff',
        class: 'text-danger',
        position: 'topRight',
        message: 'Ingrese un filtro para buscar'
      })
    }
  }

  resetear(){
    this.filtro = '';
    this.init_data()
  }

  eliminar(id: any){

    this.load_btn = true;
    this._productoService.eliminar_producto_admin(id, this.token).subscribe(
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


  download_excel(){

    //Iniciarlizar el modulo de Workbook
    let workbook = new Workbook();
    //creamos u nuevo libro "EXCEL"
    let worsheet = workbook.addWorksheet("Reporte de productos");

    //iteramos nuestro array en cada columna del archivop excel
    worsheet.addRow(undefined);

    for (const x1 of this.arr_productos) {
      let x2= Object.keys(x1);

      let temp=[]
      for (const y of x2) {
        temp.push(x1[y])
      }
      worsheet.addRow(temp);
    }

    let fname = 'REP01-';

    //por cada llave colocaremos una colummna

    worsheet.columns = [
      {header: 'Producto', key: 'col1', width: 30},
      {header: 'Stock', key: 'col2', width: 15},
      {header: 'Precio', key: 'col3', width: 15},
      {header: 'Categoria', key: 'col4', width: 25},
      {header: 'NVentas', key: 'col5', width: 15},
    ] as any;

    //exportar a excel y descargar

    workbook.xlsx.writeBuffer().then( data => {
      let blob = new Blob([data], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
      fs.saveAs(blob, fname+'-'+new Date().valueOf()+'.xml');
    } )

  }

}
