import { Injectable } from '@angular/core';
import { StorageKeys } from '../enums/storagekeys.enum';
import { Pokemon } from '../models/pokemon.model';
import { Trainer } from '../models/trainer.model';
import { StorageUtil } from '../utils/storage.util';

@Injectable({
  providedIn: 'root'
})
export class TrainerService {

  private _trainer?: Trainer;

  public get trainer(): Trainer | undefined {
    return this._trainer;
  }
  public set trainer(trainer: Trainer | undefined) {
    StorageUtil.storageSave<Trainer>(StorageKeys.Trainer, trainer!); //! meaning that trainer will never be undefined
    this._trainer = trainer;
  }

  constructor() { 
    this._trainer = StorageUtil.storageRead<Trainer>(StorageKeys.Trainer);
  }

  public inFavourite(pokemonId: number): boolean{
    if(this._trainer){
      console.log("this.trainer?.pokemon " ,this.trainer?.pokemon)
      return Boolean(this._trainer?.pokemon.find((pokemon: Pokemon) => pokemon.id === pokemonId));
    }
    return false;
  }


  public addTofavourite(pokemon: any): void{
    if(this._trainer){
      this._trainer.pokemon.push(pokemon);
    }
  }
  public removeFromFavourite(pokemonId: number): void{
    if(this._trainer){
      this._trainer.pokemon = this._trainer.pokemon.filter((pokemon, Pokemon) => pokemon.id !== pokemonId);
    }
  }
}
