import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Pokemon } from '../models/pokemon.model';

const { apiPokemon } = environment

@Injectable({
  providedIn: 'root'
})
export class PokemonCatalogueService {

  private _pokemon: any[] = [];
  private _error: string = "";
  private _loading: boolean = false;
  
    //pagination
    private _page = 1;
    private _totalPokemon: number = 0;

  public get pokemon(): any[] {
    return this._pokemon;
  }

  public get error(): string {
    return this._error;
  }

  public get loading(): boolean {
    return this._loading;
  }

  public get page(): number {
    return this._page;
  }
  public set page(currentPage) {
    this._page = currentPage;
  }

  public get totalPokemon(): number {
    return this._totalPokemon;
  }

  public set totalPokemon(totalPokemon) {
    this._totalPokemon = totalPokemon;
  }

  constructor(
    private readonly http: HttpClient,
  ) { }

  public findPokemons(limit: number, offset: number) {
    // if(this._pokemon.length > 0 || this.loading){
    //   return
    // }
    this._loading =  true;
    this.http.get<Pokemon[]>(apiPokemon)
    .pipe(
      finalize(() => {
        this._loading = false
      })
    )
    .subscribe({
      next: (response: any) => {
        response.results.forEach((result: any) => {
          this.getMorePokemonData(result.name)
          .subscribe((uniqueResponse: any) => {
            // console.log("uniqueResponse ", uniqueResponse)
            this._pokemon.push(uniqueResponse);
          });
        })
      },
      error: (error: HttpErrorResponse) =>{
        this._error = error.message
      }
    })
    return this.http.get<any[]>(`${apiPokemon}?limit=${limit}&offset=${offset-1} + 0`)
  }

  public getMorePokemonData(name: string) {
    return this.http.get(`${apiPokemon}/${name}`);
  }

  public pokemonById(id: number): Pokemon | undefined {
    //console.log("this._pokemon$ ", this._pokemon)
    return this._pokemon.find((pokemon: Pokemon) => pokemon.id === id)
  }
}
