import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, switchMap, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Trainer } from '../models/trainer.model';

const {apiTrainers, apiKey} = environment;

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    //Dependency Injection
    private readonly http: HttpClient,
  ) { }

  //Login
  public login(username: string): Observable<Trainer> {
    return this.checkUsername(username)
    .pipe(
      switchMap((user: Trainer | undefined) => {
        if(user === undefined) {
          return this.createUser(username);
        }
        return of(user);
      })
    )
  }

  //Check if user exists
  private checkUsername(username: string): Observable<Trainer | undefined> {
    return this.http.get<Trainer[]>(`${apiTrainers}?username=${username}`)
    .pipe(
      map((response: Trainer[]) => response.pop()) //.pop() Take last item in array and return it
    )
  }

  //Create user
  private createUser(username: string): Observable<Trainer> {
    const user = {
      username,
      favorites: []
    };

    const headers = new HttpHeaders({
      "content-type": "application/json",
      "x-api-key": apiKey,
    });

    return this.http.post<Trainer>(apiTrainers, user, {
      headers
    })
  }
}
