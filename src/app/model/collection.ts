import Movie from './movie';
import Entity from './entity';

export default class Collection {
    id: number;
    title: string;
    description: string;
    movies: Array<CollectionMovie>;
}

export class CollectionMovie {
    id: number;
    title: string;
    overview: string;
    poster_path: string;
}