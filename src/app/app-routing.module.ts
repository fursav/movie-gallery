import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GalleryComponent } from './gallery/gallery.component';
import { MovieSearchResolver } from './movie-search.resolver';
import { MovieResolver } from './movie.resolver';

const routes: Routes = [
  { path: '', redirectTo: '/movies/nowplaying/page/1', pathMatch: 'full' },
  { path: 'movies/search/:term', redirectTo: '/movies/search/:term/page/1', pathMatch: 'full' },
  {
    path: 'movies/search/:term/page/:pagenum', component: GalleryComponent,
    resolve: {
      movieList: MovieSearchResolver
    }
  },
  { path: 'movies/nowplaying', redirectTo: '/movies/nowplaying/page/1', pathMatch: 'full' },
  { path: 'movies/popular', redirectTo: '/movies/popular/page/1', pathMatch: 'full' },
  { path: 'movies/top', redirectTo: '/movies/top/page/1', pathMatch: 'full' },
  {
    path: 'movies/:type/page/:pagenum', component: GalleryComponent,
    resolve: {
      movieList: MovieResolver
    }
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
