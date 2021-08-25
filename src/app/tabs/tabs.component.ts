import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, tap } from 'rxjs/operators';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements OnInit {

  public tabList: { route: string, label: string }[] = [];
  private searchTerms = new Subject<string>();
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.tabList = [
      {
        route: '/movies/nowplaying',
        label: 'Now Playing'
      },
      {
        route: '/movies/popular',
        label: 'Popular'
      },
      {
        route: '/movies/top',
        label: 'Top Rated'
      }
    ];
    this.searchTerms.pipe(
      debounceTime(500),
      filter((term) => term.length > 2),
      tap((term: string) => this.router.navigate(['/', 'movies', 'search', term]))
    ).subscribe();
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }

}
