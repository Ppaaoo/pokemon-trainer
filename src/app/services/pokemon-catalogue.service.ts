import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, finalize, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Pokemon } from '../models/pokemon.model';

const { apiPokemon } = environment

@Injectable({
  providedIn: 'root'
})
export class PokemonCatalogueService {

  private _pokemon$: Pokemon[] = [];
  private _error: string = "";
  private _loading: boolean = false;

  public get pokemon(): Pokemon[] {
    return this._pokemon$;
  }

  public get error(): string {
    return this._error;
  }

  public get loading(): boolean {
    return this._loading;
  }

  constructor(
    private readonly http: HttpClient,
  ) { }

  public findAllPokemon(): void {
    this._loading = true;
    this.http.get<Pokemon[]>(apiPokemon)
    .pipe(
      finalize(() => {
        this._loading = false;
      }),
      /*map((pokemonResponse: PokemonResponse) => {
        pokemonResponse.results;
      })*/
    )
    .subscribe({
      next: (pokemon: Pokemon[]) => {
        this._pokemon$ = pokemon;
      },
      error: (error: HttpErrorResponse) => {
        this._error = error.message;
      }
    })
  }
}

interface PokemonResponse {
  results: Pokemon[]
}