import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { injectParams } from 'ngxtension/inject-params';

import { MovieService } from '../movie.service';
import { MovieListComponent } from '../movie-list/movie-list.component';

@Component({
  selector: 'movie-search-page',
  template: `
    @if (movieResource.hasValue()) {
      <movie-list [movies]="movieResource.value()" />
    }
    @if (movieResource.error()) {
      {{ movieResource.error() }}
    }
    @if (movieResource.isLoading()) {
      <div class="loader"></div>
    }
  `,
  imports: [MovieListComponent],
})
export class MovieSearchPageComponent {
  private movieService = inject(MovieService);

  idParam = injectParams<string>((params) => params.query);

  movieResource = rxResource({
    request: this.idParam,
    loader: (id) => {
      return this.movieService.searchMovies(id.request);
    },
  });
}
