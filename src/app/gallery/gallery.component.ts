import { Component, OnInit } from '@angular/core';
import { MovideDetailsComponent } from '../movide-details/movide-details.component';
import { MovieListEntryResponse, MovieService } from '../movie.service';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

  public totalResults: number = 0;
  public pageSize: number = 0;
  public pageIndex: number = 0;
  public movieList: MovieListEntryResponse[] = [];
  constructor(public movieService: MovieService, private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.movieList = data['movieList'].results;
      this.totalResults = data['movieList'].total_results;
      this.pageIndex = data['movieList'].page - 1;
      this.pageSize = 20;
    })
  }

  onPageChange(event: PageEvent) {
    this.router.navigate([`../${event.pageIndex + 1}`], { relativeTo: this.route })
  }

  showMovieDetails(movie: MovieListEntryResponse): void {
    this.dialog.open(MovideDetailsComponent, {
      data: movie
    });
  }

}
