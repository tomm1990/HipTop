import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlaylistsContainerComponent } from './playlists-container/playlists-container.component';
import { PopularPlaylistsComponent } from './popular-playlists/popular-playlists.component';

const appRouts: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: PlaylistsContainerComponent}
];

@NgModule({
  imports:[RouterModule.forRoot(appRouts)],
  exports:[RouterModule]
})

export class AppRautingModule{
  
}
