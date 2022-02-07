import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from '../../../services/cliente.service';
import { AdminService } from '../../../services/admin.service';

declare var iziToast:any;

@Component({
  selector: 'app-edit-cliente',
  templateUrl: './edit-cliente.component.html',
  styleUrls: ['./edit-cliente.component.css']
})
export class EditClienteComponent implements OnInit {

  public cliente: any = {

  }
  public id:any;
  public token:any;
  public load_btn = false;
  public load_data = true;

  constructor( private _route: ActivatedRoute, private _clienteService: ClienteService, private _adminService: AdminService, private _routes: Router) {
    this.token = this._adminService.getToken();
   }

  ngOnInit(): void {
    this._route.params.subscribe(
      param => {
        this.id = param['id'];
        console.log(this.id);
        this._clienteService.obtener_cliente_admin(this.id,this.token).subscribe(
          resp => {

            if (resp.data === undefined) {
              this.cliente = undefined;
              this.load_data = true;
           }else{
            this.cliente = resp.data
            this.load_data = false;
           }
          }, err => {

          }
        )
      }
    )
  }

  actualizar(updateForm: NgForm){

    if (updateForm.valid) {

      this.load_btn = true;

      this._clienteService.actualizar_cliente_admin(this.id, this.cliente, this.token).subscribe(
        resp => {
          iziToast.show({
            title: 'SUCCESS',
            titleColor: '#1DC74C',
            color: '#fff',
            class: 'text-success',
            position: 'topRight',
            message: 'Se actualizo correctamente el nuevo cliente'
          })

          this.load_btn = false;

          this._routes.navigate(['/panel/clientes'])

        },err => {
          console.log(err);

        }
      )

    }else {
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
