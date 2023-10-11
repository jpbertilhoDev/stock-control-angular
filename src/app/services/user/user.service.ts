import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environments';
import { SignupUserRequest } from 'src/models/interfaces/user/SignupUserRequest';
import { SignupUserResponse } from 'src/models/interfaces/user/SignupUserResponse';
import { AuthRequest } from 'src/models/interfaces/user/auth/AuthRequest';
import { AuthResponse } from 'src/models/interfaces/user/auth/AuthResponse';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private API_URL = environment.API_URL;

  constructor(private http: HttpClient) { }

  signupUser(requestDatas: SignupUserRequest): Observable<SignupUserResponse>{
    return this.http.post<SignupUserResponse>(
      `${this.API_URL}/user`, requestDatas
    )

  }

  authUser(requestDatas: AuthRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(
      `${this.API_URL}/auth`, requestDatas);

  }
}
