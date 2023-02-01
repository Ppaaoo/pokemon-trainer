import { Component, OnInit } from '@angular/core';
import { PokemonCatalogueService } from 'src/app/services/pokemon-catalogue.service';
import { Pokemon } from 'src/app/models/pokemon.model';
@Component({
  selector: 'app-pokemon-catalogue',
  templateUrl: './pokemon-catalogue.page.html',
  styleUrls: ['./pokemon-catalogue.page.css']
})
export class PokemonCataloguePage implements OnInit{
  get pokemons(): Pokemon[]{
    return this.pokemonCatalogueServices.pokemons;
  }

  get loading(): boolean{
    return this.pokemonCatalogueServices.loading;
  }
  get error(): string{
    return this.pokemonCatalogueServices.error;
  }

  constructor(
    private readonly pokemonCatalogueServices: PokemonCatalogueService
  ) {}

  ngOnInit(): void {
    this.pokemonCatalogueServices.findAllPokemons();
  }
}
