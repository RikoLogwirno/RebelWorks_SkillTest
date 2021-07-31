import Head from "next/head";
import { ReactElement } from "react";
import Layout from "../../components/layout";
import { MovieCard } from "../../components/MovieCard";
import { getAllNowPlaying, getIDOnly, getSimilarMovie, MovieResultItem, MovieTypes, tmdb_img_base_url } from "../../lib/movies";

interface props {
  similar_movies: MovieTypes;
  movies_detail: MovieResultItem;
}

export default function Movies({ similar_movies, movies_detail }: props): ReactElement {
  console.log(similar_movies);
  
  return (
    <Layout>
      <Head>
        <title>{movies_detail.title}</title>
      </Head>
      <section>
        <h2 className={"headingLg"}>Similar Movies</h2>
        <div className="movie-list">
          {
            similar_movies.results.map((v, k) => <MovieCard key={k} tmdb_img_base_url={tmdb_img_base_url} movie_data={v} />)
          }
        </div>
      </section>
    </Layout>
  );
}

export async function getStaticPaths() {
  const NowPlaying = await getAllNowPlaying();
  const paths = getIDOnly(NowPlaying);
  
  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  console.log(params);
  
  const similar_movies = await getSimilarMovie(params.movie_id);
  const movies_detail = params;
  return {
    props: {
      similar_movies,
      movies_detail
    }
  }
}