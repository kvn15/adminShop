import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CuponService } from '../../../services/cupon.service';
import { AdminService } from '../../../services/admin.service';
import { Router } from '@angular/router';

declare var iziToast:any;

@Component({
  selector: 'app-create-cupon',
  templateUrl: './create-cupon.component.html',
  styleUrls: ['./create-cupon.component.css']
})
export class CreateCuponComponent implements OnInit {

  public cupon:any = {
    tipo: ''
  }
  public load_btn:boolean = false;
  public token: any;

  constructor(private _cuponService: CuponService, private _adminService: AdminService, private _route: Router) {
    this.token = this._adminService.getToken();
  }

  ngOnInit(): void {
  }

  registro(registroForm: NgForm){
    if (registroForm.valid) {

      this.load_btn = true;

      this._cuponService.registro_cupon_admin(this.cupon, this.token).subscribe(
        resp =>{
          iziToast.show({
            title: 'SUCCESS',
            titleColor: '#1DC74C',
            color: '#fff',
            class: 'text-success',
            position: 'topRight',
            message: 'Se registro correctamente el nuevo cupon'
          })

          this.load_btn = false;

          this._route.navigate(['/panel/cupones'])

        }, err =>{
          this.load_btn = false;
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
        message: 'Los datos del formulario no son validos'
      })
    }
  }

}
