import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CuponService } from '../../../services/cupon.service';

declare var iziToast:any;

@Component({
  selector: 'app-update-cupon',
  templateUrl: './update-cupon.component.html',
  styleUrls: ['./update-cupon.component.css']
})
export class UpdateCuponComponent implements OnInit {

  public cupon:any = {}
  public load_btn:boolean = false;
  public token: any;
  public load_data:boolean = true;
  public id:any;

  constructor(private _cuponService: CuponService, private _router: Router, private _route: ActivatedRoute) {
    this.token = localStorage.getItem('token');
  }

  ngOnInit(): void {
    this._route.params
    .subscribe(
      param => {
        this.id = param.id;
        this._cuponService.obtener_cupon_admin(param.id, this.token).subscribe(
          resp => {
            if (resp.data == undefined) {
              this.cupon = undefined
              this.load_data = true;
            }else{
              this.cupon = resp.data
              this.load_data = false;
            }
          }
        )
      }
    )
  }

  update(updateForm: NgForm){

    if (updateForm.valid) {

      this.load_btn = true;
      this._cuponService.update_cupon_admin(this.id, this.cupon, this.token).subscribe(
        resp=>{
          iziToast.show({
            title: 'SUCCESS',
            titleColor: '#1DC74C',
            color: '#fff',
            class: 'text-success',
            position: 'topRight',
            message: 'Se actualizo correctamente el cupón'
          })

          this.load_btn = false;

          this._router.navigate(['/panel/cupones'])
        },err=>{
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

}
