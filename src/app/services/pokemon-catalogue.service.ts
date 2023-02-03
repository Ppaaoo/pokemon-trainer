import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize } from 'rxjs';
import { environment } from 'src/environments/environment';

const { apiPokemon } = environment

@Injectable({
  providedIn: 'root'
})
export class PokemonCatalogueService {

  private _pokemon$: any[] = [];
  private _error: string = "";
  private _loading: boolean = false;

    //pagination
    private _page = 0;
    private _totalPokemon: number = 0;

  public get pokemon(): any[] {
    return this._pokemon$;
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
    this._loading = true;
    console.log(offset);
    return this.http.get<any[]>(`${apiPokemon}?limit=${limit}&offset=${offset * 10}`)
    .pipe(
      finalize(() => {
        this._loading = false;
      }),
    )
  }

  public getMorePokemonData(name: string) {
    return this.http.get(`${apiPokemon}/${name}`);
  }
}
