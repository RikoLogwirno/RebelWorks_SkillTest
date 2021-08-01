import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import { ReactElement, useEffect, useState } from "react";
import Layout from "../../components/layout";
import { MovieCard } from "../../components/MovieCard";
import { getAllNowPlaying, getIDOnly, getMovieDetail, getSimilarMovie, MovieDetail, MovieResultItem, MovieTypes, tmdb_img_base_url } from "../../lib/movies";

interface props {
  similar_movies: MovieTypes;
  movie_detail: MovieDetail;
}

const loadMovies = async (movie_id: string, page: number): Promise<MovieTypes> => {
  let allMoviesData: MovieTypes;
  try {
    allMoviesData = await getSimilarMovie(movie_id, page);
  } catch (error) {
    alert(`error during fetching now playing movies \n ${alert}`);
  }
  return allMoviesData;
}

export default function Movies({ similar_movies, movie_detail }: props): ReactElement {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  if (router.isFallback) {
    return (
      <Layout>
        <div>Loading...</div>
      </Layout>
    )
  }

  const [movieDatas, setMovieDatas] = useState(similar_movies.results);

  
  const loadMore = (): void => {
    if ((window.innerHeight + document.documentElement.scrollTop >= (document.scrollingElement.scrollHeight - 200)) && !loading) {
      setLoading(true);
      setPage(page + 1);
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', loadMore);
    return () => window.removeEventListener('scroll', loadMore);
  });
  
  useEffect(() => {
    loadMovies(String(movie_detail.id), page).then(v => {
      setMovieDatas(movieDatas.concat(v.results));
      setLoading(false);
    });
  }, [page]);
  
  return (
    <Layout>
      <Head>
        <title>{movie_detail.title} | SkillTest RebelWorks Riko Logwirno</title>
      </Head>
      <section className="movie-detail">
        <div className="movie-backdrop">
          <img src={`${tmdb_img_base_url}/w1280/${movie_detail.backdrop_path}`} alt={movie_detail.title} />
        </div>
      </section>
      <section className="movie-desc-cont">
        <div className="movie-desc">
          <div className="movie-poster">
            <img src={`${tmdb_img_base_url}/w500/${movie_detail.poster_path}`} alt={`${movie_detail.title} poster`} />
          </div>
          <div>
            <h1>{movie_detail.title}</h1>
            <h4>{movie_detail.overview}</h4>
            <div className="movie-desc-bottom">
              <h4>{`Rating (${movie_detail.vote_average})`}</h4>
              <h4>{`Release Date (${movie_detail.release_date})`}</h4>
            </div>
          </div>
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
            movieDatas.map((v, k) => <MovieCard key={`${v.id} - ${k}`} tmdb_img_base_url={tmdb_img_base_url} movie_data={v} />)
          }
        </div>
        <div>
          LOADING...
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
    fallback: true,
  }
}

export async function getStaticProps({ params }) {
  let similar_movies: MovieTypes = await getSimilarMovie(params.movie_id, 1);
  let movie_detail: MovieDetail = await getMovieDetail(params.movie_id);
  return {
    props: {
      similar_movies,
      movie_detail
    }
  }
}