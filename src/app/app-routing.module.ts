import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RpiViewComponent } from './components/rpi-view/rpi-view.component';


import { GameComponent } from './components/game/game.component';
import { EditComponent } from './components/game/edit/edit.component';
import { AddComponent } from './components/game/add/add.component';

const routes: Routes = [
   {path: "", component: GameComponent},
  { path: "game/add", component: AddComponent},
  { path: "game/:id", component: EditComponent },
  { path: 'rpi', component:  RpiViewComponent},
  //{ path: '', component:  GameComponent},


  
  
];

export const appRouting = RouterModule.forRoot(routes);

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ],
  exports: [ RouterModule ],
  declarations: []
})
export class AppRoutingModule { }
