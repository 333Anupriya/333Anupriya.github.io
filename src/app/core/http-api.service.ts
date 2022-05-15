import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpAPIService {

  constructor(private http: HttpClient) { }

  public get(url: string, options?:any){
    return this.http.get(environment.baseUrl+url,options)
  }

  public post(url: string, reqBody:any, options?:any ){
    return this.http.post(environment.baseUrl+url,reqBody, options)
  }

  public put(url: string,reqBody:any, options?:any){
    return this.http.put(environment.baseUrl+url,reqBody, options)
  }

  public delete(url: string, options?:any){
    return this.http.delete(environment.baseUrl+url,options)
  }
}
