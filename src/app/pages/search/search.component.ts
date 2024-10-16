import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  constructor(
    private moviesService: MoviesService,
    private title: Title,
    private meta: Meta
  ) {}

  ngOnInit(): void {}

  searchResult: any;
  searchForm = new FormGroup({
    movieName: new FormControl(null),
  });

  /**
   * La función onSubmit envía una consulta de búsqueda al servicio de películas y muestra los resultados en el
   * variable resultado de búsqueda.
   */
  onSubmit() {
    this.moviesService
      .getSearchMovie(this.searchForm.value)
      .subscribe((result) => {
        this.searchResult = result.results;
        this.searchForm.reset();
      });
  }
}
