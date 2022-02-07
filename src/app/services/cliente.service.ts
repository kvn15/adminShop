import { Injectable } from '@angular/core';
import { GLOBAL } from "./global";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  public url: any;

  constructor(private _http: HttpClient) {
    this.url = GLOBAL.url
  }

  listar_clientes_filtro_admin(tipo:any, filtro:any, token: any): Observable<any> {
    let header = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization': token
    });
    return this._http.get<any>(this.url + 'listar_clientes_filtro_admin/'+tipo+'/'+filtro, { headers: header });
  }

  registro_cliente_admin(data:any,token: any): Observable<any> {
    let header = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization': token
    });
    return this._http.post<any>(this.url + 'registro_cliente_admin',data, { headers: header });
  }

  obtener_cliente_admin(id:any,token: any): Observable<any>{
    let header = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization': token
    });
    return this._http.get<any>(this.url + 'obtener_cliente_admin/'+id, { headers: header });
  }

  actualizar_cliente_admin(id:any,data:any,token: any): Observable<any> {
    let header = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization': token
    });
    return this._http.put<any>(this.url + 'actualizar_cliente_admin/'+id,data, { headers: header });
  }

  eliminar_cliente_admin(id:any,token: any): Observable<any> {
    let header = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization': token
    });
    return this._http.delete<any>(this.url + 'eliminar_cliente_admin/'+id, { headers: header });
  }

}
