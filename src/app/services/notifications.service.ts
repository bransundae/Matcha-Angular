import { Injectable } from '@angular/core';
import {Socket} from 'ngx-socket-io';
import { map , take} from 'rxjs/operators';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import {Notification} from '../models/notification.model';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  headers : HttpHeaders;

  constructor(private socket : Socket, private http : HttpClient) {

    // this.headers = new HttpHeaders().set("auth-token", tokenService.jwtToken);
    this.headers = new HttpHeaders().set("auth-token", 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjIzLCJpYXQiOjE1OTg1MjI1MzR9.tYa0OB9dm0gLwABXofuMRIW45e8G06GbW1IH0kBeCes');
  }
  
  getNotificationsFromSocket = () => {
    return this.socket
             .fromEvent("notification")
             .pipe(map((data) => data));
  }

  getLikes(date = null){
    if (date != null && date != undefined){
      let params = new HttpParams().set('date', date);
      return this.http.get<any>('/like', {params, headers : this.headers});
    }else{
      return this.http.get<any>('/like', {headers : this.headers});
    }
  }

  getVisits(date = null){
    if (date != null && date != undefined){
      let params = new HttpParams().set('date', date);
      return this.http.get<any>('/visit', {params, headers : this.headers});
    }else{
      return this.http.get<any>('/visit', {headers : this.headers});
    }
  }

  getMatches(date = null){
    if (date != null && date != undefined){
      let params = new HttpParams().set('date', date);
      return this.http.get<any>('/match', {params, headers : this.headers});
    }else{
      return this.http.get<any>('/match', {headers : this.headers});
    }
  }

  getBlocked(date = null){
    if (date != null && date != undefined){
      let params = new HttpParams().set('date', date);
      return this.http.get<any>('/block', {params, headers : this.headers});
    }else{
      return this.http.get<any>('/block', {headers : this.headers});
    }
  }

  getMessages(date = null){
    if (date != null && date != undefined){
      let params = new HttpParams().set('date', date);
      return this.http.get<any>('/message', {params, headers : this.headers});
    }else{
      return this.http.get<any>('/message', {headers : this.headers});
    }
  }
  
}
