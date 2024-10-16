import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss'],
})
export class MovieDetailsComponent implements OnInit {
  getMovieDetailResult?: any;
  getMovieVideoResult?: any;
  getMovieCastResult?: any;

  constructor(
    private moviesService: MoviesService,
    private router: ActivatedRoute,
    private title: Title,
    private meta: Meta
  ) {}

  ngOnInit(): void {
    let getParamId = this.router.snapshot.paramMap.get('id');
    console.log(getParamId, 'getparamid#');

    this.getMovie(getParamId);
    this.getVideo(getParamId);
    this.getMovieCast(getParamId);
  }

  /**
   * La función `getMovie` recupera detalles de la película y actualiza metaetiquetas para SEO y redes sociales intercambio.
   * obtiene los detalles de una película basado en el parámetro `id` que se le recibe.
   * Opciones de mejora:
   * -  Refactorizar Suscripciones
   * -  Mejorar Manipulación de Meta Datos
   */
  getMovie(id: any) {
    this.moviesService.getMovieDetails(id).subscribe(async (result) => {
      console.log(result, 'getmoviedetails#');
      this.getMovieDetailResult = await result;

      // updatetags
      this.title.setTitle(
        `${this.getMovieDetailResult.original_title} | ${this.getMovieDetailResult.tagline}`
      );
      this.meta.updateTag({
        name: 'title',
        content: this.getMovieDetailResult.original_title,
      });
      this.meta.updateTag({
        name: 'description',
        content: this.getMovieDetailResult.overview,
      });

      // facebook
      this.meta.updateTag({ property: 'og:type', content: 'website' });
      this.meta.updateTag({ property: 'og:url', content: `` });
      this.meta.updateTag({
        property: 'og:title',
        content: this.getMovieDetailResult.original_title,
      });
      this.meta.updateTag({
        property: 'og:description',
        content: this.getMovieDetailResult.overview,
      });
      this.meta.updateTag({
        property: 'og:image',
        content: `https://image.tmdb.org/t/p/original/${this.getMovieDetailResult.backdrop_path}`,
      });
    });
  }

  /**
   * La función `getVideo` recupera la clave del avance de un video de película según su ID.
   */
  getVideo(id: any) {
    this.moviesService.getMovieVideo(id).subscribe((result) => {
      console.log(result, 'getMovieVideo#');
      result.results.forEach((element: any) => {
        if (element.type == 'Trailer') {
          this.getMovieVideoResult = element.key;
        }
      });
    });
  }

  /**
   * La función `getMovieCast` recupera el elenco de una película utilizando el ID de la película.
   * Mejora en la legibilidad del codigo usando async y await
   */
  async getMovieCast(id: any) {
    try {
      this.moviesService.getMovieCast(id).subscribe((result) => {
        console.log(result, 'movieCast#');
        this.getMovieCastResult = result.cast;
      });
    } catch (error) {
      console.log(error);
    }
  }
}
