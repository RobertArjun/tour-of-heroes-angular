import { Injectable } from '@angular/core';
import {Hero} from './hero';
import {HEROES} from './mock-heroes';
import {Observable,of} from 'rxjs';
import {MessagesService} from './messages.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { map, tap, catchError} from 'rxjs/operators';

@Injectable({
  providedIn:"root"
})
export class HeroService {
private heroesUrl = 'api/heroes';  // URL to web api
  constructor(private messageService: MessagesService,
  private http: HttpClient) { }

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
    .pipe(
      tap(_ => this.log('fetched heroes')),
      catchError(this.handleError<Hero[]>('getHeroes', [])));
  }

  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
   return this.http.get(url)
            .pipe(tap(_ => `fetched hero id: ${id}`), 
            catchError(this.handleError<Hero>(`getHero id=${id}`)));
  }

  private log(message: string) {
  this.messageService.add(`HeroService: ${message}`);
}

private handleError<T> (operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {
    this.log(`${operation} Failed: ${error.message}`);
    return of(result as T);
  }; 
}

updateHero(hero: Hero): Observable<Hero>{
return this.http.put( this.heroesUrl ,hero, this.httpOptions)
.pipe(tap(_ => `updated id: ${hero.id}`,
catchError(this.handleError<Hero>(`updateHero id: ${hero.id}`))))
}

httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

addHero(hero: Hero): Observable<Hero>{
   return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
    tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
    catchError(this.handleError<Hero>('addHero'))
  );
}


deleteHero (hero: Hero | number): Observable<Hero> {
  const id = typeof hero === 'number' ? hero : hero.id;
  const url = `${this.heroesUrl}/${id}`;

  return this.http.delete<Hero>(url, this.httpOptions).pipe(
    tap(_ => this.log(`deleted hero id=${id}`)),
    catchError(this.handleError<Hero>('deleteHero'))
  );
}

searchHeroes(term: string): Observable<Hero[]> {
  if (!term.trim()) {
    return of([]);
  }
  return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
    tap(_ => this.log(`found heroes matching "${term}"`)),
    catchError(this.handleError<Hero[]>('searchHeroes', []))
  );
}

}