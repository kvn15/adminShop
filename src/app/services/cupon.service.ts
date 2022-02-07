import { Injectable } from '@angular/core';
import { GLOBAL } from "./global";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CuponService {

  public url: any;

  constructor(private _http: HttpClient) {
    this.url = GLOBAL.url
  }

  registro_cupon_admin(data:any,token: any): Observable<any> {
    let header = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization': token
    });
    return this._http.post<any>(this.url + 'registro_cupon_admin',data, { headers: header });
  }

  listar_cupones_admin(filtro:any,token: any): Observable<any> {
    let header = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization': token
    });
    return this._http.get<any>(this.url + 'listar_cupones_admin/'+filtro, { headers: header });
  }

  obtener_cupon_admin(id:any,token: any): Observable<any> {
    let header = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization': token
    });
    return this._http.get<any>(this.url + 'obtener_cupon_admin/'+id, { headers: header });
  }

  update_cupon_admin(id:any,data:any,token: any): Observable<any> {
    let header = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization': token
    });
    return this._http.put<any>(this.url + 'update_cupon_admin/'+id,data, { headers: header });
  }

  eliminar_cupon_admin(id:any,token: any): Observable<any> {
    let header = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization': token
    });
    return this._http.delete<any>(this.url + 'eliminar_cupon_admin/'+id, { headers: header });
  }

}
