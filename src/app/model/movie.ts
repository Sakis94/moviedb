export default class Movie {
    vote_count: number;
    id: number;
    video: boolean;
    vote_average: number;
    title: string;
    popularity: number;
    poster_path: string;
    original_language: string;
    original_title: string;
    genre_ids: Array<number>;
    backdrop_path: string;
    adult: boolean;
    overview: string;
    release_date: string;
}

export class MovieResults {
    page: number;
    total_results: number;
    total_pages: number;
    results: Array<Movie>;
}

export class MovieDetails {
    title: string;
    overview: string;
    poster_path: string;
    budget: number;
    release_date: string;
    revenue: number;
    vote_average: number;
    vote_count: number;
    spoken_languages: Array<string>;
}