import { Component, OnInit, Directive, Input } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';
import { MovieDetails } from 'src/app/model/movie';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDirective } from 'angular-bootstrap-md';
import { Location } from '@angular/common';

@Component({
	selector: 'app-details',
	templateUrl: './details.component.html',
	styleUrls: ['./details.component.scss']
})
   
export class DetailsComponent implements OnInit {

	@Input() public movieDetails: MovieDetails;

	constructor(
		private movieService: MovieService,
		private route: ActivatedRoute,
		private location: Location
		){}

	ngOnInit(){
		this.route.params.subscribe(params => {
			if( params['id'] ){
				this.movieService.getDetails( params['id'] ).subscribe(res => {
					this.movieDetails = res;
					console.log( res.spoken_languages );
				});
			}
		});
	}

	getPoster( poster: string ): string {
		return this.movieService.getPoster( poster );
	}

}