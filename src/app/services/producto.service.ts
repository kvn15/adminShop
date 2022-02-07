import { Injectable } from '@angular/core';
import { GLOBAL } from "./global";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  public url: any;

  constructor(private _http: HttpClient) {
    this.url = GLOBAL.url
  }

  registro_producto_admin(data:any,file:any,token: any): Observable<any> {
    let header = new HttpHeaders({'Authorization': token});

    const fd = new FormData();
    fd.append('titulo', data.titulo);
    fd.append('stock', data.stock);
    fd.append('precio', data.precio);
    fd.append('descripcion', data.descripcion);
    fd.append('contenido', data.contenido);
    fd.append('categoria', data.categoria);
    fd.append('portada', file);

    return this._http.post<any>(this.url + 'registro_producto_admin',fd, { headers: header });
  }

  listar_producto_admin(filtro:any, token: any): Observable<any> {
    let header = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization': token
    });
    return this._http.get<any>(this.url + 'listar_producto_admin/'+filtro, { headers: header });
  }

  obtener_producto_admin(id:any, token: any): Observable<any> {
    let header = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization': token
    });
    return this._http.get<any>(this.url + 'obtener_producto_admin/'+id, { headers: header });
  }


  actualizar_producto_admin(data:any,id:any,token: any): Observable<any> {
    if (data.portada) {
      let header = new HttpHeaders({'Authorization': token});

      const fd = new FormData();
      fd.append('titulo', data.titulo);
      fd.append('stock', data.stock);
      fd.append('precio', data.precio);
      fd.append('descripcion', data.descripcion);
      fd.append('contenido', data.contenido);
      fd.append('categoria', data.categoria);
      fd.append('portada', data.portada);

      return this._http.put<any>(this.url + 'actualizar_producto_admin/'+id,fd, { headers: header });
    }else{
      let header = new HttpHeaders({
        'Content-Type': 'application/json', 'Authorization': token
      });
      return this._http.put<any>(this.url + 'actualizar_producto_admin/'+id,data, { headers: header });
    }
  }

  eliminar_producto_admin(id:any, token: any): Observable<any> {
    let header = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization': token
    });
    return this._http.delete<any>(this.url + 'eliminar_producto_admin/'+id, { headers: header });
  }

  listar_inventario_producto_admin(id:any, token: any): Observable<any> {
    let header = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization': token
    });
    return this._http.get<any>(this.url + 'listar_inventario_producto_admin/'+id, { headers: header });
  }

  eliminar_inventario_producto_admin(id:any, token: any): Observable<any> {
    let header = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization': token
    });
    return this._http.delete<any>(this.url + 'eliminar_inventario_producto_admin/'+id, { headers: header });
  }

  registro_inventario_producto_admin(data:any, token: any): Observable<any> {
    let header = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization': token
    });
    return this._http.post<any>(this.url + 'registro_inventario_producto_admin',data, { headers: header });
  }

  actualizar_producto_variedades_admin(id:any,data:any, token: any): Observable<any> {
    let header = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization': token
    });
    return this._http.put<any>(this.url + 'actualizar_producto_variedades_admin/'+id,data, { headers: header });
  }

  agregar_imagen_galeria_admin(id:any,data:any,token: any): Observable<any> {
    let header = new HttpHeaders({'Authorization': token});

    const fd = new FormData();
    fd.append('_id', data._id);
    fd.append('imagen', data.imagen);

    return this._http.put<any>(this.url + 'agregar_imagen_galeria_admin/'+id,fd, { headers: header });
  }

  eliminar_imagen_galeria_admin(id:any,data:any, token: any): Observable<any> {
    let header = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization': token
    });
    return this._http.put<any>(this.url + 'eliminar_imagen_galeria_admin/'+id,data, { headers: header });
  }

}
