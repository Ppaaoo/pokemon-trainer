import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, finalize, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PokemonListComponent } from '../components/pokemon-list/pokemon-list.component';
const { apiPokemon } = environment
import { Pokemon } from '../models/pokemon.model';


@Injectable({
  providedIn: 'root'
})
export class PokemonCatalogueService {
  private _pokemons: Pokemon[] = []
  private _error: string = "";
  private _loading: boolean = false

  // private readonly _pokemons$: BehaviorSubject<Pokemon[]> = new BehaviorSubject<Pokemon>([]);
  get pokemons(): Pokemon[] {
    return this._pokemons;
  }

  set thePokemons(poke: any){
    this._pokemons = poke
  }
  get error(): string {
    return this._error;
  }

  get loading(): boolean {
    return this._loading;
  }

  // get pokemons$(): Observable<Pokemon[]>{
  //   return this._pokemons$.asObservable()
  // }
  constructor(private readonly http: HttpClient) { }

  public findAllPokemons(){
    return this.http.get(apiPokemon)
    .subscribe((response: any) => {
      response.results.forEach(result => {
        this.getMorePokemonData(result.name)
        .subscribe((uniqResponse: any) => {
          this._pokemons.push(uniqResponse)
          console.log("mmm ", this._pokemons)
        })
        
      });
    })
    
  }

  public getMorePokemonData(name: string) {
    return this.http.get(`${apiPokemon}/${name}`)
  }
  public PokemonById(id: number): Pokemon | undefined {
    console.log("this._pokemons", this._pokemons)
    return this._pokemons.find((pokemon: Pokemon) => parseInt(pokemon.id) === id)
  }

  // ngOnInit(): void {
  //   this.findAllPokemons()
  //   .subscribe((response: any) => {
  //     response.results.forEach(result => {
  //       this.getMorePokemonData(result.name)
  //       .subscribe((uniqResponse: any) => {
  //         this._pokemons.push(uniqResponse)
  //         console.log(this.pokemons)
  //       })
        
  //     });
  //   })
    
  // }
}
