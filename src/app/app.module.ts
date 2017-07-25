import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { LogoComponent } from './app-shared/logo/logo.component';
import { SignUpComponent } from './intro/sign-up/sign-up.component';
import { NavBarComponent } from './program/nav-bar/nav-bar.component';
import { UserConnectionDetailsComponent } from './intro/user-connection-details/user-connection-details.component';
import { SignUpStepsComponent } from './intro/sign-up-steps/sign-up-steps.component';
import { MusicPlayerComponent } from './app-shared/music-player/music-player.component';
import { GenreRatingComponent } from './intro/genre-rating/genre-rating.component';
import { HeaderComponent } from './program/header/header.component';
import { PopularPlaylistsComponent } from './program/content-main/popular-playlists/popular-playlists.component';
import { PlaylistsContainerComponent } from './program/program-shared/playlists-container/playlists-container.component';
import { MusicSetComponent } from './program/music-set/music-set.component';
import { PopularItemComponent } from './program/content-main/popular-playlists/popular-item/popular-item.component';
import { AlbumService } from './app.AlbumService';
import { AlbumItemComponent } from './program/program-shared/playlists-container/album-item/album-item.component';
import { SignInService } from './app.signInService';
import { ArtistWallComponent } from './program/artist-wall/artist-wall.component';
import { FooterPlayerComponent } from './program/footer-player/footer-player.component';
import { IntroComponent } from './intro/intro.component';
import { ProgramComponent } from './program/program.component';
import { AlbumWallComponent } from './program/album-wall/album-wall.component';
import { ContentMainComponent } from './program/content-main/content-main.component';
import {Routes, RouterModule} from "@angular/router";
import { CommentsComponent } from './program/album-wall/comments/comments.component';
import { CommentComponent } from './program/album-wall/comments/comment/comment.component';
import { GetAlbumService } from './app.GetAlbumService'
import { GetArtistService } from './app.GetUserService';
import { RootComponent } from './intro/root/root.component';
import { SignUpStep1Component } from './intro/sign-up-step1/sign-up-step1.component'

const appRoutes : Routes = [
  { path : 'main/:ganre1/:ganre2' , component : ContentMainComponent },
  { path : 'album/:id' , component : AlbumWallComponent },
  { path : 'artist/:id' , component : ArtistWallComponent },
  { path : '' , component : RootComponent},
  { path : 'signUp' , component : SignUpStep1Component},
  { path : 'subGenreRating' , component : GenreRatingComponent}
];


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
    PopularItemComponent,
    AlbumItemComponent,
    ArtistWallComponent,
    FooterPlayerComponent,
    IntroComponent,
    ProgramComponent,
    AlbumWallComponent,
    ContentMainComponent,
    CommentsComponent,
    CommentComponent,
    RootComponent,
    SignUpStep1Component
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    FormsModule,
    HttpModule,
  ],
  exports:[
    RouterModule
  ],
  providers: [AlbumService,SignInService,GetAlbumService,GetArtistService],
  bootstrap: [AppComponent]
})
export class AppModule { }
