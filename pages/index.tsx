import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { getSortedPostsData } from '../lib/posts'
import Link from 'next/link'
import Date from '../components/date'
import { ReactElement, useEffect, useState } from 'react'
import { getAllNowPlaying, MovieTypes, tmdb_img_base_url } from '../lib/movies'
import { MovieCard } from '../components/MovieCard'

interface props {
  allMoviesData: MovieTypes;
}

const loadMovies = async (page: number): Promise<MovieTypes> => {
  let allMoviesData: MovieTypes;
  try {
    allMoviesData = await getAllNowPlaying(page);
  } catch (error) {
    alert(`error during fetching now playing movies \n ${alert}`);
  }
  return allMoviesData;
}

export default function Home({ allMoviesData }: props): ReactElement {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [movieDatas, setMovieDatas] = useState(allMoviesData.results);
  
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
    loadMovies(page).then(v => {
      setMovieDatas(movieDatas.concat(v.results));
      setLoading(false);
    });
  }, [page]);

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className="section-90">
        <h2 className={"headingLg"}>Now playing list</h2>
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
  )
}

export async function getStaticProps() {
  let allMoviesData: MovieTypes = await loadMovies(1);
  return {
    props: {
      allMoviesData
    }
  }
}
