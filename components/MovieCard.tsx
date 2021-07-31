import Link from "next/link";
import { ReactElement } from "react";
import { MovieResultItem } from "../lib/movies";

interface props {
  tmdb_img_base_url: string;
  movie_data: MovieResultItem;
}

export function MovieCard({ tmdb_img_base_url, movie_data }: props): ReactElement {
  return (
    <Link href={`/movies/${movie_data.id}`}>
      <a className="movie-item-cont">
        <div className="movie-poster">
          <img src={`${tmdb_img_base_url}/w500${movie_data.poster_path}`} alt={movie_data.title} />
        </div>
        <div className="movie-desc">
          <div className="movie-title">
            <p>
              {movie_data.title}
            </p>
          </div>
          <div className="movie-overview">
            <p>
              {movie_data.overview}
            </p>
          </div>
        </div>
      </a>
    </Link>
  )
}