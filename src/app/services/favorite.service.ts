import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Pokemon } from '../models/pokemon.model';
import { Trainer } from '../models/trainer.model';
import { PokemonCatalogueService } from './pokemon-catalogue.service';
import { TrainerService } from './trainer.service';

TrainerService
const {apiTrainers, apiKey} = environment
@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  
  constructor(
    private http: HttpClient,
    private readonly pokemonServices: PokemonCatalogueService,
    private readonly trainerService: TrainerService,
  ) { }

  // get the pokemon based on the name


  // patch request with user id and pokemon name
  public addToFavorites(pokemonID: string): void {
    if(!this.trainerService.trainer){
      throw new Error("addToFavorites: There is no trainer");
    }
    const trainer: Trainer = this.trainerService.trainer;
    const pokemon: Pokemon | undefined = this.pokemonServices.PokemonById(pokemonID)
    if(!pokemon) {
      throw new Error("addToFavorites : No pokemon with id: " + pokemonID)
    }

    if(this.trainerService.inFavorites(pokemonID)){
      throw new Error("Pokemon is already in favorites.")
    }

    
    this.http.patch(`${apiTrainers}/${trainer.id}`, {
      fa
    })
}}
