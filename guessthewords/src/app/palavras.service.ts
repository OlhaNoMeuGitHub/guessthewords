import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Word } from './word';
import { WORDS } from './mock-words';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})

export class PalavrasService {
  private dataUrl = "src/palavras.json";
  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }
    private mywords: Word[] = [];
    private wordsURL = 'api/words';  // URL to web api
    httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

//o proximo passo é fazer isso consumindo a api

  getData(): Observable<Word[]> {

    const words = of(WORDS);
    this.mywords = WORDS
    return words;
    // console.log("Cheguei no service"); // log to console instead
    // return this.http.get<Word[]>(this.wordsURL)
    //   .pipe(
    //     tap(_ => this.log('fetched heroes')),
    //     catchError(this.handleError<Word[]>('getWords', []))
    //   );
  }

  getMyWord(categoria: string): Word[] {
    //if mywords is empty, get data from json
    if (this.mywords.length == 0) {
      this.getData().subscribe(data => {
        //if category is empity, return all data
        if (categoria == "" || categoria == "all") {
          this.mywords = data;
        }
        else {
          this.mywords = data.filter(a => a.Category == categoria);
        }
      });
    }
    return this.mywords;
  }

  //replace mywords
  setMyWord(word: Word[]) {
    this.mywords = word;
  }
  


  /** Log a HeroService message with the MessageService */
private log(message: string) {
  this.messageService.add(`HeroService: ${message}`);
}

/**
 * Handle Http operation that failed.
 * Let the app continue.
 *
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
private handleError<T>(operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    this.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}
}
