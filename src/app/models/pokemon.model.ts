export interface Pokemon {
    id: string;
    name: string;
    height: number;
    weight: number;
    sprites: PokemonSprites
    //Add type and other info later
}

export interface PokemonSprites {
    back_default: string;
    back_shiny: string;
    front_default: string;
    front_shiny: string;
}