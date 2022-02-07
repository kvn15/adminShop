import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AdminService } from "src/app/services/admin.service";

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private _adminService: AdminService, private _router: Router){}

  canActivate(): any {
    if (!this._adminService.isAuntenticate(['admin'])) {
      this._router.navigate(['/login']);
      return false;
    }else{
      return true;
    }
  }

}
