import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  signup(data: any) {
    return this.httpClient.post(this.url +
      "/appUser/signup", data, {
      headers: new HttpHeaders().set('Content-Type', "application/json")
    }
    )
  }

  login(data: any) {
    return this.httpClient.post(this.url +
      "/appUser/login", data, {
      headers: new HttpHeaders().set('Content-Type', "application/json")
    }
    )
  }

  addNewAppuser(data: any) {
    return this.httpClient.post(this.url +
      "/appUser/addNewAppuser", data, {
      headers: new HttpHeaders().set('Content-Type', "application/json")
    }
    )
  }

  getAllAppUser() {
    return this.httpClient.get(this.url +
      "/appUser/getAllAppUser"
    )
  }

  updateUserStatus(data: any) {
    return this.httpClient.patch(this.url +
      "/appUser/updateUserStatus", data, {
      headers: new HttpHeaders().set('Content-Type', "application/json")
    }
    )
  }

  checkToken() {
    return this.httpClient.get(this.url +
      "/appUser/checkToken"
    )
  }

  changePassword(data: any) {
    return this.httpClient.post(this.url +
      "/appUser/changePassword", data, {
      headers: new HttpHeaders().set('Content-Type', "application/json")
    }
    )
  }

}
