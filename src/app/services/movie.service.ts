import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError as observableThrowError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MovieResults, MovieDetails } from '../model/movie';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})

export class MovieService {

	public searchUrl: string = environment.api_url + '/search/movie?api_key=' + environment.api_key;
	public posterUrl: string = 'http://image.tmdb.org/t/p/w185';

	constructor( private http: HttpClient ){}

	getMovies( keyword: string, page: number = 1 ): Observable<MovieResults> {
		var url = `${this.searchUrl}&query=${keyword}&page=${page}`;
		return this.http.get<MovieResults>(url).pipe(catchError(this.errorHandler));
	}

	getPoster( poster: string ): string {
		return this.posterUrl + poster;
	}

	getDetails( id: number ): Observable<MovieDetails> {
		var url = `${environment.api_url}/movie/${id}?api_key=${environment.api_key}`;
		return this.http.get<MovieDetails>(url).pipe(catchError(this.errorHandler));
	}

	errorHandler(error: HttpErrorResponse) {
		return observableThrowError(error || 'Server Error');
	}

}
