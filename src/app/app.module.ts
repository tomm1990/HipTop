import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { LogoComponent } from './logo/logo.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { UserConnectionDetailsComponent } from './user-connection-details/user-connection-details.component';
import { SignUpStepsComponent } from './sign-up-steps/sign-up-steps.component';
import { MusicPlayerComponent } from './music-player/music-player.component';
import { GenreRatingComponent } from './genre-rating/genre-rating.component';
import { HeaderComponent } from './header/header.component';
import { PopularPlaylistsComponent } from './popular-playlists/popular-playlists.component';
import { PlaylistsContainerComponent } from './playlists-container/playlists-container.component';
import { MusicSetComponent } from './music-set/music-set.component';
import { PopularItemComponent } from './popular-playlists/popular-item/popular-item.component';

@NgModule({
  declarations: [
    AppComponent,
    LogoComponent,
    SignUpComponent,
    NavBarComponent,
    UserConnectionDetailsComponent,
    SignUpStepsComponent,
    MusicPlayerComponent,
    GenreRatingComponent,
    HeaderComponent,
    PopularPlaylistsComponent,
    PlaylistsContainerComponent,
    MusicSetComponent,
    PopularItemComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
