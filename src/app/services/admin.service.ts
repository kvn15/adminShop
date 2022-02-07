import { Injectable } from '@angular/core';
import { GLOBAL } from "./global";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  public url:any;

  constructor(private _http: HttpClient) {
    this.url = GLOBAL.url
  }

  login_admin(data: any): Observable<any>{
    let header = new HttpHeaders().set('Content-Type','application/json');
    return this._http.post<any>(this.url+'login_admin',data,{headers: header});
  }

  getToken(){
    return localStorage.getItem('token');
  }

  public isAuntenticate(allowRoles: string[]):boolean{

    const token = localStorage.getItem('token');

    if (!token) {
      return false;
    }

    try {
      const helper = new JwtHelperService();
      var decodedToken = helper.decodeToken(token!);

      if (helper.isTokenExpired(token)) {
        localStorage.removeItem('token');
        return false;
      }

      if (!decodedToken) {
        console.log('no acceso');
        localStorage.removeItem('token')
        return false;
      }
    } catch (error) {
      localStorage.removeItem('token')
      return false;
    }

    return allowRoles.includes(decodedToken['rol']);
  }

  actualizar_config_admin(id:any,data:any, token: any): Observable<any> {

    if (data.logo) {
      let header = new HttpHeaders({'Authorization': token});

      const fd = new FormData();
      fd.append('titulo', data.titulo);
      fd.append('serie', data.serie);
      fd.append('correlativo', data.correlativo);
      fd.append('categorias',JSON.stringify(data.categorias));
      fd.append('logo', data.logo);

      return this._http.put<any>(this.url + 'actualizar_config_admin/'+id,fd, { headers: header });
    }else{
      let header = new HttpHeaders({
        'Content-Type': 'application/json', 'Authorization': token
      });
      return this._http.put<any>(this.url + 'actualizar_config_admin/'+id,data, { headers: header });
    }

  }

  obtener_config_admin(token: any): Observable<any> {
    let header = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization': token
    });
    return this._http.get<any>(this.url + 'obtener_config_admin', { headers: header });
  }

  obtener_config_public(): Observable<any> {
    let header = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this._http.get<any>(this.url + 'obtener_config_public', { headers: header });
  }

}
