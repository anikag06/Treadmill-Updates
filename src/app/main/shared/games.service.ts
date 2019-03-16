import { Injectable } from '@angular/core';
import { Game } from './game.model';

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  games = [
    new Game("Mario", "https://via.placeholder.com/400x300?text=Mario", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel velit sed mauris rutrum laoreet quis non velit. Sed sed blandit lectus. Sed quis est a nulla viverra ullamcorper. Suspendisse accumsan, enim vitae semper bibendum, justo enim rhoncus nulla, sed porta urna nunc sed turpis. Nam malesuada hendrerit felis. Mauris suscipit turpis eget lacus sagittis lacinia. Nunc quis nibh efficitur, laoreet neque quis, maximus lectus."),
    new Game("NeedForSpeed", "https://via.placeholder.com/150", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel velit sed mauris rutrum laoreet quis non velit. Sed sed blandit lectus. Sed quis est a nulla viverra ullamcorper. Suspendisse accumsan, enim vitae semper bibendum, justo enim rhoncus nulla, sed porta urna nunc sed turpis. Nam malesuada hendrerit felis. Mauris suscipit turpis eget lacus sagittis lacinia. Nunc quis nibh efficitur, laoreet neque quis, maximus lectus."),
    
  ]

  constructor() { }
}
