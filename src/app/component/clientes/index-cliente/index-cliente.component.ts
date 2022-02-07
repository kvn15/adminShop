import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../../services/cliente.service';
import { AdminService } from '../../../services/admin.service';

declare var jQuery: any;
declare var $:any;
declare var iziToast:any;

@Component({
  selector: 'app-index-cliente',
  templateUrl: './index-cliente.component.html',
  styleUrls: ['./index-cliente.component.css']
})
export class IndexClienteComponent implements OnInit {

  public clientes: Array<any> = [];
  public filtro_apellidos: string = '';
  public filtro_correo: string = '';
  public page: any = 1;
  public pageSize: any = 10;
  public token: any;
  public load_data: boolean = true

  constructor(private _clienteServices: ClienteService,
    private _adminServices: AdminService) {
      this.token = this._adminServices.getToken()
      console.log(this.token);

    }

  ngOnInit(): void {
    this.initData()
  }

  initData(){
    this._clienteServices.listar_clientes_filtro_admin(null,null,this.token).subscribe( resp => {

      this.clientes = resp.data

      // setTimeout(() => {

      // }, 3000);

      this.load_data = false;

    },err => {
      console.log(err);

    })
  }

  filtro(tipo: any){
    var filtro;
    if (tipo === 'apellidos') {
      this.load_data = true;
      if (this.filtro_apellidos) {
        filtro = this.filtro_apellidos;
      }else{
        return this.initData()
      }
    }else if(tipo === 'email') {
      this.load_data= true;
      if (this.filtro_correo) {
        filtro = this.filtro_correo;
      }else{
        return this.initData();
      }
    }

    this._clienteServices.listar_clientes_filtro_admin(tipo,filtro,this.token).subscribe( resp => {
      this.clientes = resp.data
      this.load_data = false;
    },err => {
      console.log(err);
    })
  }


  eliminar(id: any){

    this._clienteServices.eliminar_cliente_admin(id, this.token).subscribe(
      resp => {
        iziToast.show({
          title: 'SUCCESS',
          titleColor: '#1DC74C',
          color: '#fff',
          class: 'text-success',
          position: 'topRight',
          message: 'Se Eliminó correctamente el nuevo cliente'
        })

        $('#delete-'+id).modal('hide');
        $('modal-backdrop').removeClass('show');

        this.initData();

      },err=> {
        console.log(err);

      }
    )

  }

}
