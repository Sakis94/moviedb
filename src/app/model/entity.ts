export default class Entity {

    constructor( data: object ){
        console.log( "this---", self );
        console.log( 'binding', data );
        if( data ){
            for( var key in data ){
                console.log( key );
                if( this.hasOwnProperty( key ) ){
                    this[ key ] = data[ key ];
                    console.log(true);
                }
            }
        }
    }

}