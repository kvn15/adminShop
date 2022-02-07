import { Component, OnInit } from '@angular/core';
import { CuponService } from '../../../services/cupon.service';

declare var jQuery: any;
declare var $:any;
declare var iziToast:any;

@Component({
  selector: 'app-index-cupon',
  templateUrl: './index-cupon.component.html',
  styleUrls: ['./index-cupon.component.css']
})
export class IndexCuponComponent implements OnInit {

  public load_data:boolean = true;
  public page: any = 1;
  public pageSize: any = 10;
  public cupones:Array<any> = [];
  public filtro:any = '';
  public token:any;

  constructor(private _cuponServices: CuponService) {
    this.token = localStorage.getItem('token');
  }

  ngOnInit(): void {
    this._cuponServices.listar_cupones_admin(this.filtro, this.token).subscribe(
      resp=>{
        this.cupones = resp.data;
        this.load_data = false;
      }
    )
  }

  filtrar(){
    this._cuponServices.listar_cupones_admin(this.filtro, this.token).subscribe(
      resp=>{
        this.cupones = resp.data;
        this.load_data = false;
      }
    )
  }

  eliminar(id: any){

    this._cuponServices.eliminar_cupon_admin(id, this.token).subscribe(
      resp=>{
        iziToast.show({
          title: 'SUCCESS',
          titleColor: '#1DC74C',
          color: '#fff',
          class: 'text-success',
          position: 'topRight',
          message: 'Se Eliminó correctamente el Cupón'
        })

        $('#delete-'+id).modal('hide');
        $('modal-backdrop').removeClass('show');

        this.filtrar();

      },err=> {
        console.log(err);

      }
    )

  }

}
