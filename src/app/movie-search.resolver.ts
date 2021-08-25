import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MovieListResponse, MovieService } from './movie.service';

@Injectable({
  providedIn: 'root'
})
export class MovieSearchResolver implements Resolve<MovieListResponse> {
  constructor(private movieService: MovieService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.movieService.searchMovies(route.params.term, route.params.page).pipe(catchError(err => {
      // this.router.navigate(["/404"]);
      return EMPTY;
    }));
  }
}
