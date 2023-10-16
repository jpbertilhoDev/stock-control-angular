import { Injectable } from '@angular/core';
import { UserService } from '../services/user/user.service';
import { Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(private userService: UserService, private router: Router) {}

  canActivate():

    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {

      const isLoggedIn = this.userService.isLoggedIn();
      console.log('IS LOGGED IN:', isLoggedIn);

    if (!isLoggedIn) {
      debugger
      this.router.navigate(['/home']);
      return false;
    }

    return isLoggedIn;
  }
}
