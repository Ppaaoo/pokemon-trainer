import { Component, OnInit, Input } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon.model';
import { PokemonCatalogueService } from 'src/app/services/pokemon-catalogue.service';


@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit{
  // @Input() pokemons: Pokemon[] = [];

  pokemons: any[] = []
  constructor (private pokemonCatalogueService: PokemonCatalogueService) {}
  
  ngOnInit(): void {
    // this.pokemonCatalogueService.findAllPokemons()
    // .subscribe((response: any) => {
    //   response.results.forEach(result => {
    //     this.pokemonCatalogueService.getMorePokemonData(result.name)
    //     .subscribe((uniqResponse: any) => {
    //       this.pokemons.push(uniqResponse)
    //       console.log(this.pokemons)
    //     })
        
    //   });
    // })
    
  }
}
