import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Nota } from '../models/nota.model';
import { NotasService } from '../service/notas.service';

@Injectable({
  providedIn: 'root'
})
export class AccessGuard implements CanActivate {

  chores: Nota[] = [];
  constructor(
    public notasService: NotasService,
    private router: Router
  ){

  }
  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.chores = this.notasService.getChores();
    if(this.chores.length == 0){
      this.router.navigate(['/'])
      return false
    }
    return true;
  }

}
