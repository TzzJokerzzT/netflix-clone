import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-movies-slider',
  templateUrl: './movies-slider.component.html',
  styleUrls: ['./movies-slider.component.scss'],
})
export class MoviesSliderComponent implements OnInit {
  bannerResult?: any = [];

  constructor(private moviesService: MoviesService) {}

  ngOnInit(): void {
    this.bannerData();
  }

  /**
   * La función `bannerData` recupera datos de películas del `moviesService` y asigna el
   * resultados a `bannerResult`.
   */
  bannerData() {
    this.moviesService.sliderMovies().subscribe((result) => {
      this.bannerResult = result.results;
    });
  }
}
