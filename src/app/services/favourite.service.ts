import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, Observable , tap} from 'rxjs';
import { environment } from 'src/environments/environment';
import { Pokemon } from '../models/pokemon.model';
import { Trainer } from '../models/trainer.model';
import { PokemonCatalogueService } from './pokemon-catalogue.service';
import { TrainerService } from './trainer.service';


const {apiTrainers, apiKey} = environment
@Injectable({
  providedIn: 'root'
})
export class FavouriteService {
  private _loading: boolean = false

  get loading(): boolean {
    return this._loading
  }
  constructor(
    private http: HttpClient,
    private readonly pokemonService: PokemonCatalogueService,
    private readonly trainerService: TrainerService
  ) { }


  public addToFavourite(pokemonId: number): Observable<Trainer> {
    if(!this.trainerService.trainer){
      throw new Error("From addToFavourite : There is no user")
    }
    const trainer: Trainer = this.trainerService.trainer;
    const pokemon: any | undefined =  this.pokemonService.pokemonById(pokemonId);

    if(!pokemon){
      throw new Error("From addToFavourite : No pokemon ith Id: " + pokemonId);
    }

    if(this.trainerService.inFavourite(pokemonId)){
      this.trainerService.removeFromFavourite(pokemonId);
    } else {
      this.trainerService.addTofavourite(pokemon)
    }

    const headers = new HttpHeaders({
      "content-type": 'application/json',
      'x-api-key': apiKey
    })
    this._loading =  true
    // const favouritePokemon = {
    //   pokemonName: pokemon.name,
    //   pokemonImage: pokemon.sprites.front_default,
    //   id: pokemon.id
    // }
    return this.http.patch<Trainer>(`${apiTrainers}/${trainer.id}`, {
      pokemon: [...trainer.pokemon]
    },{
      headers
    })
    .pipe(
      tap((updatedTrainer: Trainer) => {
        this.trainerService.trainer = updatedTrainer
      }),
      finalize(() =>{
        this._loading =  false
      })
    )
  }


}
