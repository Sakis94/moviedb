import { Component, OnInit, ViewChild } from '@angular/core';
import { CollectionsService } from 'src/app/services/collectiions.service';
import Movie, { MovieDetails } from 'src/app/model/movie';
import Collection, { CollectionMovie } from 'src/app/model/collection';
import { MovieService } from 'src/app/services/movie.service';
import { ActivatedRoute } from '@angular/router';
import { ModalDirective } from 'angular-bootstrap-md';
import { Location } from '@angular/common';

@Component({
	selector: 'app-collections',
	templateUrl: './collections.component.html',
	styleUrls: ['./collections.component.scss']
})

export class CollectionsComponent implements OnInit {

	private collectionForm: Collection = new Collection();
	private collections: Array<Collection>;
	private movieDetails: MovieDetails;

	@ViewChild('detailsModal') detailsModal: ModalDirective;
	@ViewChild('newCollectionModal') newCollectionModal: ModalDirective;

	constructor(
		private collectionsService: CollectionsService,
		private movieService: MovieService,
		private route: ActivatedRoute,
		private location: Location
		){}

	ngOnInit(){
		this.renderCollections();
	}

	createCollection(){
		this.collectionsService.create( this.collectionForm );
		this.renderCollections();
		this.newCollectionModal.hide();
	}

	deleteCollection( collectionId: number ){
		this.collectionsService.delete( collectionId );
		this.renderCollections();
	}

	renderCollections(){
		this.collections = this.collectionsService.getAll();
	}

	getPoster( id: string ): string {
		return this.movieService.getPoster( id );
	}

	removeMovie( collectionId: number, movieId: number ){
		this.collectionsService.removeMovie( collectionId, movieId );
		this.renderCollections();
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

}
