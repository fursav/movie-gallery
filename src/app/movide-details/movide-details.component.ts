import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Genre, MovieListEntryResponse, MovieService, movieVideoEntryResponse } from '../movie.service';

@Component({
  selector: 'app-movide-details',
  templateUrl: './movide-details.component.html',
  styleUrls: ['./movide-details.component.css']
})
export class MovideDetailsComponent implements OnInit {

  public trailerList: movieVideoEntryResponse[] = [];
  public genreList: string[] = [];
  public trailerIndex: number = 0;
  constructor(@Inject(MAT_DIALOG_DATA) public data: MovieListEntryResponse,
    private movieService: MovieService) { }

  ngOnInit(): void {
    this.movieService.getMovieTrailers(this.data.id).subscribe((result) => {
      this.trailerList = result.results;
    });
    this.movieService.getGenreLabels(this.data.genre_ids).subscribe((labels) => {
      this.genreList = labels;
    });
  }

  nextTrailer(): void {
    this.trailerIndex++;
    if (this.trailerIndex >= this.trailerList.length) {
      this.trailerIndex = 0;
    }
  }

  previousTrailer(): void {
    this.trailerIndex--;
    if (this.trailerIndex < 0) {
      this.trailerIndex = this.trailerList.length - 1;
    }
  }

}
