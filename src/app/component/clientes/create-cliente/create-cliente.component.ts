import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ClienteService } from '../../../services/cliente.service';
import { AdminService } from '../../../services/admin.service';
import { Router } from '@angular/router';

declare var iziToast:any;

@Component({
  selector: 'app-create-cliente',
  templateUrl: './create-cliente.component.html',
  styleUrls: ['./create-cliente.component.css']
})
export class CreateClienteComponent implements OnInit {

  public cliente: any = {
    genero: ''
  }
  public load_btn = false;

  public token: any;

  constructor(private _clienteService: ClienteService, private _adminService: AdminService, private _route: Router) {
    this.token = this._adminService.getToken();
  }

  ngOnInit(): void {
  }

  registro(registroForm: NgForm){

    if (registroForm.valid) {

      this.load_btn = true;

      this._clienteService.registro_cliente_admin(this.cliente, this.token).subscribe(
        resp => {
          iziToast.show({
            title: 'SUCCESS',
            titleColor: '#1DC74C',
            color: '#fff',
            class: 'text-success',
            position: 'topRight',
            message: 'Se registro correctamente el nuevo cliente'
          })

          this.cliente = {
            genero: '',
            nombres: '',
            apellidos: '',
            telefono: '',
            email: '',
            dni: '',
            f_nacimiento: ''
          }

          this.load_btn = false;

          this._route.navigate(['/panel/clientes'])

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
        message: 'Los datos del formulario no son validos'
      })
    }

  }

}
