// export interface Pokemon {
//     id: string;
//     name: string;
//     height: number;
//     weight: number;
//     sprites: PokemonSprites
//     //Add type and other info later
// }

// export interface PokemonSprites {
//     back_default: string;
//     back_shiny: string;
//     front_default: string;
//     front_shiny: string;
// }


export interface Pokemon {
    count: number;
    next: string;
    previous: string | null;
    results: PokemonSprites;
    
    //Add type and other info later
}

export interface PokemonSprites {
    name: string;
    url: string;
}