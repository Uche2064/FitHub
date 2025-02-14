import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UpdateUserInfo } from '../../components/users-info/models/UpdateUserInfo';
import { AddUserResponseSchema } from '../../components/register-user/models/AddUserResponseScheema';
import { AddUserSchema } from '../../components/register-user/models/AddUserSchema';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) { }
  apiUrl: string = 'http://localhost:8080';
  private readonly registerUrl = `http://localhost:8081/api/v1/user/register`;
  private readonly updateUserInfoUrl = 'http://localhost:8081/api/v1/user/update';
  private readonly getCurrentUserUrl = 'http://localhost:8081/api/v1/user/';
  private readonly deleteCurrentUserUrl = 'http://localhost:8081/api/v1/user/';


  updateUserInfo(updatedUser: UpdateUserInfo): Observable<any> {
    return this.http.put(`${this.updateUserInfoUrl}`, updatedUser);
  }

  getCurrentUser(): Observable<any> {
    return this.http.get<any>(this.getCurrentUserUrl);
  }

  saveUser(newUser: AddUserSchema): Observable<AddUserResponseSchema> {
    return this.http.post<AddUserResponseSchema>(this.registerUrl, newUser);

  }

  deleteAccount() {
    return this.http.delete(this.deleteCurrentUserUrl);
  }
}
