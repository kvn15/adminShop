import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../../services/admin.service';

declare var jQuery: any;
declare var $:any;
declare var iziToast:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user: any = {}
  public usuario: any = {}
  public token: any = ''

  constructor(private _adminService: AdminService, private _router: Router) {
    this.token = this._adminService.getToken();
   }

  ngOnInit(): void {

    console.log(this.token);
    if (this.token) {
      this._router.navigate(['/inicio'])
    }else{
      //MANTENER EN EL COMPONENTE
    }

  }

  login(loginForm: NgForm){

    if (loginForm.valid) {

      let data = {
        email: this.user.email,
        password: this.user.password
      }

      this._adminService.login_admin(data).subscribe(
        resp => {
          if (resp.data === undefined) {
            iziToast.show({
              title: 'ERROR',
              titleColor: '#ff0000',
              color: '#fff',
              class: 'text-danger',
              position: 'topRight',
              message: resp.message
            })
          }else{
            this.usuario = resp.data

            localStorage.setItem('token', resp.token);
            localStorage.setItem('_id', resp.data._id)

            this._router.navigate(['/inicio']);
          }
        },err => {
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
