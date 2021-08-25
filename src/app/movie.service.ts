import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private genreListCache!: Observable<Genre[]>;

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) { }

  getGenres() {
    if (this.genreListCache !== undefined) {
      console.log('Returning cached value!')
      return this.genreListCache;
    }

    this.genreListCache = this.http.get<{ genres: Genre[] }>(API_URL + '/genre/movie/list')
      .pipe(map((r) => r.genres),
        shareReplay(1));
    return this.genreListCache;
  }

  getGenreLabels(ids: number[]) {
    return this.getGenres().pipe(
      map((list) => {
        list = list.filter((g) => ids.indexOf(g.id) > -1);
        const labels = list.map((g) => g.name);
        return labels;
      })
    );
  }

  searchMovies(term: string, page: number = 1) {
    return this.http.get<MovieListResponse>(API_URL + '/search/movie?query=' + encodeURIComponent(term) + '&page' + page);
  }

  getPlayingMovies(page: number = 1) {
    return this.http.get<MovieListResponse>(API_URL + '/movie/now_playing?page=' + page);
  }
  getPopularMovies(page: number = 1) {
    return this.http.get<MovieListResponse>(API_URL + '/movie/popular?page=' + page);
  }
  getTopMovies(page: number = 1) {
    return this.http.get<MovieListResponse>(API_URL + '/movie/top_rated?page=' + page);
  }

  getMovieTrailers(movieId: number) {
    return this.http.get<movieVideoResponse>(API_URL + '/movie/' + movieId + '/videos')
      .pipe(map(resp => {
        resp.results = resp.results.filter((entry) => entry.type === 'Trailer');
        return resp;
      }))
  }
}

export interface MovieListResponse {
  page: number;
  results: MovieListEntryResponse[];
  total_pages: number;
  total_results: number;
}

export interface MovieListEntryResponse {
  poster_path: string;
  adult: boolean;
  overview: string;
  release_date: string;
  genre_ids: number[];
  id: number;
  original_title: string;
  original_language: string;
  title: string;
  backdrop_path: string;
  popularity: number;
  vote_count: number;
  video: boolean;
  vote_average: number;
}

export interface movieVideoResponse {
  id: number;
  results: movieVideoEntryResponse[];
}

export interface movieVideoEntryResponse {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
}

export interface Genre {
  id: number;
  name: string;
}