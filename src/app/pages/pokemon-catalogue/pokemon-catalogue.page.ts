import { Component, OnInit } from '@angular/core';
import { PokemonCatalogueService } from 'src/app/services/pokemon-catalogue.service';

@Component({
  selector: 'app-pokemon-catalogue',
  templateUrl: './pokemon-catalogue.page.html',
  styleUrls: ['./pokemon-catalogue.page.css']
})
export class PokemonCataloguePage implements OnInit {
  pokemons: any[] = [];

  get pokemon(): any[] {
    return this.pokemonCatalogueService.pokemon;
  }

  get loading(): boolean {
    return this.pokemonCatalogueService.loading;
  }

  get error(): string {
    return this.pokemonCatalogueService.error;
  }
  
  constructor(
    private readonly pokemonCatalogueService: PokemonCatalogueService,
  ){ }

  ngOnInit(): void {
    this.getPokemon();
  }

  getPokemon() {
    this.pokemonCatalogueService.findPokemons(10, this.pokemonCatalogueService.page + 0)
    .subscribe((response: any) => {
      
      this.pokemonCatalogueService.totalPokemon = response.count;
      
      console.log(`${this.pokemonCatalogueService.totalPokemon} and ${this.pokemonCatalogueService.page}`)
      response.results.forEach((result: any) => {
        this.pokemonCatalogueService.getMorePokemonData(result.name)
        .subscribe((uniqueResponse: any) => {
          this.pokemons.push(uniqueResponse);
        });
      });
    });
  }
}
