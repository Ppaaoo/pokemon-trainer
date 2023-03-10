import { Component, Input } from '@angular/core';
import { PokemonCataloguePage } from 'src/app/pages/pokemon-catalogue/pokemon-catalogue.page';
import { PokemonCatalogueService } from 'src/app/services/pokemon-catalogue.service';
import { TrainerService } from 'src/app/services/trainer.service';

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
    private readonly trainerService: TrainerService
  ) { }

  ngOnInit(): void {
    this.totalPokemon = this.pokemonCatalogueService.totalPokemon;
    // this.pokemons = this.pokemonCataloguePage.pokemons;
  }

  getPokemon(){
    this.pokemonCataloguePage.getPokemon();
  }

  renderPage(event: number) {
    this.pokemonCatalogueService.page = event;
    this.page = this.pokemonCatalogueService.page;
    this.getPokemon();
  }
}
