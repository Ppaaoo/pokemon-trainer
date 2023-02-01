import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize } from 'rxjs';
import { environment } from 'src/environments/environment';
const { apiPokemon } = environment
import { Pokemon } from '../models/pokemon.model';


@Injectable({
  providedIn: 'root'
})
export class PokemonCatalogueService {
  private _pokemons: Pokemon[] = []
  private _error: string = "";
  private _loading: boolean = false

  get pokemons(): Pokemon[] {
    return this._pokemons;
  }
  get error(): string {
    return this._error;
  }

  get loading(): boolean {
    return this._loading;
  }
  constructor(private readonly http: HttpClient) { }

  public findAllPokemons(): void{
    this.http.get<Pokemon[]>(apiPokemon)
    .pipe(
      finalize(() => {
        this._loading = false;
      })
    )
      .subscribe({
        next: (pokemons: Pokemon[]) => {
          console.log("pokemons  ---> " + pokemons.keys)
          this._pokemons = pokemons
        },
        error: (error: HttpErrorResponse) => {
          this._error = error.message;
        }
      })
  }
}
