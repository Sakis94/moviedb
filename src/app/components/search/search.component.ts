import { Component, OnInit, ViewChild, Directive, ElementRef } from '@angular/core';
import Movie, { MovieResults, MovieDetails } from 'src/app/model/movie';
import { MovieService } from "src/app/services/movie.service";
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ModalDirective } from 'angular-bootstrap-md';
import { DetailsComponent } from '../details/details.component';
import { CollectionsService } from 'src/app/services/collectiions.service';
import Collection from 'src/app/model/collection';

@Component({
	selector: 'app-search',
	templateUrl: './search.component.html',
	styleUrls: ['./search.component.scss']
})

export class SearchComponent implements OnInit {

	private keyword: string = '';
	private movieResults: MovieResults;
	private movieDetails: MovieDetails;
	private collections: Array<Collection>;
	private favoriteMovie: Movie;

	@ViewChild('detailsModal') detailsModal: ModalDirective;
	@ViewChild('favoriteModal') favoriteModal: ModalDirective;
	@ViewChild('saveFavorite') loveItButton: ElementRef;

	constructor(
		private movieService: MovieService,
		private route: ActivatedRoute,
		private location: Location,
		private collectionsService: CollectionsService
		){}

	ngOnInit(){
		this.renderCollections();
	}

	counter( i: number ){
		return new Array(i);
	}

	getMovies( page: number = 1 ) {
		if( this.keyword.length < 3 ){
			return;
		}
		this.movieService.getMovies( this.keyword, page ).subscribe(res => {
			this.movieResults = res;
		});
	}

	getPoster( poster: string ): string {
		return this.movieService.getPoster( poster );
	}

	// Μικρο bug αν αλαχτει το keyword χωρις να πατηθει "search" και αλλαξει το pagination...
	setPagination( i: number ){
		if( i != this.movieResults.page ){
			this.getMovies(i);
		}
	}

	showDetails( id: number ){
		this.route.params.subscribe(params => {
			this.movieService.getDetails( id ).subscribe(res => {
				this.movieDetails = res;
				this.location.go('/details/' + id);
				this.detailsModal.show();
				this.detailsModal.onHidden
			});
		});
	}

	onCloseDetails(){
		this.location.replaceState('/');
	}

	openFavorites( movie: Movie ){
		this.favoriteModal.show();
		this.favoriteMovie = movie;
	}

	appendFavorite( collectionId: number ){
		this.favoriteModal.hide();
		this.collectionsService.addMovie( collectionId, this.favoriteMovie );
		this.renderCollections();
	}

	renderCollections(){
		this.collections = this.collectionsService.getAll();
	}

}
