import Head from "next/head";
import Link from "next/link";
import { ReactElement } from "react";
import Layout from "../../components/layout";
import { MovieCard } from "../../components/MovieCard";
import { getAllNowPlaying, getIDOnly, getMovieDetail, getSimilarMovie, MovieDetail, MovieResultItem, MovieTypes, tmdb_img_base_url } from "../../lib/movies";

interface props {
  similar_movies: MovieTypes;
  movie_detail: MovieDetail;
}

export default function Movies({ similar_movies, movie_detail }: props): ReactElement {
  // console.log(movie_detail);
  
  return (
    <Layout>
      <Head>
        <title>{movie_detail.title}</title>
      </Head>
      <section className="movie-detail">
        <div className="movie-backdrop">
          <img src={`${tmdb_img_base_url}/w1280/${movie_detail.backdrop_path}`} alt={movie_detail.title} />
        </div>
      </section>
      <section className="movie-desc-cont">
        <div className="movie-desc">
          <h1>{movie_detail.title}</h1>
          <h4>{movie_detail.overview}</h4>
          <h4>{`Rating (${movie_detail.vote_average})`}</h4>
        </div>
      </section>
      <section className="section-90 similar_movies">
        <div className={"backToHome"}>
          <Link href="/">
            <a>← Back to home</a>
          </Link>
        </div>
        <h2 className={"headingLg"}>Similar Movies</h2>
        <div className="movie-list">
          {
            similar_movies.results.map((v, k) => <MovieCard key={`${v.id} - ${k}`} tmdb_img_base_url={tmdb_img_base_url} movie_data={v} />)
          }
        </div>
      </section>
    </Layout>
  );
}

export async function getStaticPaths(context) {
  const NowPlaying = await getAllNowPlaying();
  const paths = getIDOnly(NowPlaying);
  
  return {
    paths,
    fallback: true,
  }
}

export async function getStaticProps({ params }) {
  const similar_movies = await getSimilarMovie(params.movie_id);
  const movie_detail = await getMovieDetail(params.movie_id);
  return {
    props: {
      similar_movies,
      movie_detail
    }
  }
}