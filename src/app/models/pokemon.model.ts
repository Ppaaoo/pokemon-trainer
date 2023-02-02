export interface Pokemon {
    name: string;
    id: number;
    height: number;
    sprites: PokemonSprites[]
}

type PokemonSprites = {
    back_default: string;
    back_female: string;
    back_shiny: string;
    front_default: string;
    front_shiny: string;
}