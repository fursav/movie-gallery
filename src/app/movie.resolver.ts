import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { MovieListResponse, MovieService } from './movie.service';

@Injectable({
  providedIn: 'root'
})
export class MovieResolver implements Resolve<MovieListResponse> {
  constructor(private movieService: MovieService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<MovieListResponse> {
    switch (route.params.type) {
      case 'popular':
        return this.movieService.getPopularMovies(route.params.pagenum);
      case 'top':
        return this.movieService.getTopMovies(route.params.pagenum);
      default:
        return this.movieService.getPlayingMovies(route.params.pagenum);
    }
  }
}
