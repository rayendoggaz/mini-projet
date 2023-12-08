import { Injectable } from '@angular/core';
import { Concert } from '../model/concert.model';
import { Genre } from '../model/genre.model';
import { Observable, catchError, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';


const httpOptions = {
  headers: new HttpHeaders( {'Content-Type': 'application/json'} )
};



@Injectable({
  providedIn: 'root'
})
export class concertService {

  apiURL = 'http://localhost:8080/concerts/api';

  concerts! : Concert[];
  // concert! : concert;
  genres: Genre[] = [];


  constructor(private http : HttpClient) { 
  }

  listeconcert(): Observable<Concert[]> {
    return this.http.get<Concert[]>(this.apiURL).pipe(
      tap(data => console.log('API Response:', data)),
      catchError(error => {
        console.error('Error fetching concerts:', error);
        throw error;
      })
    );
  }  
  
  
  ajouterconcert(cons : Concert):Observable<Concert>{
    return this.http.post<Concert>(this.apiURL, cons, httpOptions);
  }
      
  supprimerconcert(id : number) {
    const url = `${this.apiURL}/${id}`;
    return this.http.delete(url, httpOptions);
  }


  consulterconcert(id: number): Observable<Concert> {
    const url = `${this.apiURL}/${id}`;
    return this.http.get<Concert>(url);
  }

  updateconcert(cons: Concert): Observable<Concert> {
    const url = `${this.apiURL}/${cons.idConcert}`;
    return this.http.put<Concert>(url, cons, httpOptions);
  }
  

  listegenres():Observable<Genre[]>{
    return this.http.get<Genre[]>(this.apiURL+"/genre");
  }
  
  trierconcerts() {
    this.concerts = this.concerts.sort((n1, n2) => n1.idConcert - n2.idConcert);
  }
  

  rechercherParGenre(idGenre: number):Observable< Concert[]> {
    const url = `${this.apiURL}/Concertgenre/${idGenre}`;
    return this.http.get<Concert[]>(url);
  }

  rechercherParNom(nom: string):Observable< Concert[]> {
    const url = `${this.apiURL}/concertsByName/${nom}`;
    return this.http.get<Concert[]>(url);
  }
    
}