import { Injectable, ViewChild, ElementRef } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import Collection, { CollectionMovie } from '../model/collection';
import Movie from '../model/movie';

@Injectable({
	providedIn: 'root'
})

export class CollectionsService {
    
    private storageKey: string = 'movie_collections';

    constructor( private http: HttpClient ){}

    create( data: Collection ): boolean {
        if(!data.title || !data.description ){
            return false;
        }
        var collections = this.getAll();
        collections.push( data );
        collections[ collections.length-1 ].id = collections.length;
        localStorage.setItem(this.storageKey, JSON.stringify(collections));
        return true;
    }

    getAll(): Array<Collection> {
        var collection = JSON.parse( localStorage.getItem(this.storageKey) || '{}' );
        return this.getLiterals( collection );
    }

    delete( collectionId: number ){
        var filtered = [];
        var collections = this.getAll().forEach(collection => {
            if( collection.id != collectionId ){
                filtered.push( collection );
            }
        });
        localStorage.setItem(this.storageKey, JSON.stringify(filtered));
    }

    addMovie( collectionId: number, movie: Movie ){
        var collectionMovie = new CollectionMovie;
            collectionMovie.id = movie.id;
            collectionMovie.title = movie.title;
            collectionMovie.poster_path = movie.poster_path;
            collectionMovie.overview = movie.overview;
        
        var collections = this.getAll();

        collections.forEach(collection => {
            if( collectionId == collection.id ){
                if(!collection.movies ){
                    collection.movies = [];
                }
                var exists = false;
                collection.movies.forEach(movie => {
                    if( movie.id == collectionMovie.id ){
                        exists = true;
                    }
                });
                if(!exists ){
                    collection.movies.push( collectionMovie );
                }
            }
        });

        localStorage.setItem(this.storageKey, JSON.stringify(collections));
    }

    removeMovie( collectionId: number, movieId: number ){
        var collections = this.getAll();
        collections.forEach(collection => {
            if( collectionId == collection.id ){
                var filtered = [];
                collection.movies.forEach(movie => {
                    if( movieId != movie.id ){
                        filtered.push( movie );
                    }
                });
                collection.movies = filtered;
            }
        });
        localStorage.setItem(this.storageKey, JSON.stringify(collections));
    }

    private getLiterals( obj: object ): Array<Collection> {
        var literals = [], i = 0;
        for( var key in obj ){
            literals[i] = obj[ key ];
            i++;
        }
        return literals;
    }

}