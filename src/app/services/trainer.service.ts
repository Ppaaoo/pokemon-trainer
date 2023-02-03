import { Injectable } from '@angular/core';
import { StorageKeys } from '../enums/storagekeys.enum';
import { Pokemon } from '../models/pokemon.model';
import { Trainer } from '../models/trainer.model';
import { StorageUtil } from '../utils/storage.util';
import { FavoriteService } from './favorite.service';

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

  public inFavorites(pokemonId: number): boolean {
    if(this._trainer){
      return Boolean(this.trainer?.pokemon.find((pokemon: Pokemon) => {
        console.log(typeof pokemon.id)
        parseInt(pokemon.id) === pokemonId
      }))
    }
    return false
  }
}
