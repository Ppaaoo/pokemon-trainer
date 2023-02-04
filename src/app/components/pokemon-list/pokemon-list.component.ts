import { Component, Input } from '@angular/core';
import { PokemonCataloguePage } from 'src/app/pages/pokemon-catalogue/pokemon-catalogue.page';
import { PokemonCatalogueService } from 'src/app/services/pokemon-catalogue.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent {

  public page: number = this.pokemonCatalogueService.page;
  public totalPokemon: number = this.pokemonCatalogueService.totalPokemon;

  @Input() pokemons: any[] = [];

  constructor(
    private readonly pokemonCatalogueService: PokemonCatalogueService,
    private readonly pokemonCataloguePage: PokemonCataloguePage,
  ) { }

  getPokemon(){
    this.pokemonCataloguePage.getPokemon();
    //console.log(`Pokemon-list page:${this.page} totalPokemon:${this.totalPokemon}`)
  }

  renderPage(event: number) {
    this.pokemonCatalogueService.page = event;
    this.pokemons = [];
    this.getPokemon();
  }
}
