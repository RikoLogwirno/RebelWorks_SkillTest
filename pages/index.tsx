import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { getSortedPostsData } from '../lib/posts'
import Link from 'next/link'
import Date from '../components/date'
import { ReactElement } from 'react'
import { getAllNowPlaying, MovieTypes, tmdb_img_base_url } from '../lib/movies'
import { MovieCard } from '../components/MovieCard'

interface props {
  allMoviesData: MovieTypes;
}

export default function Home({ allMoviesData }: props): ReactElement {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className="section-90">
        <h2 className={"headingLg"}>Now playing list</h2>
        <div className="movie-list">
          {
            allMoviesData.results.map((v, k) => <MovieCard key={`${v.id} - ${k}`} tmdb_img_base_url={tmdb_img_base_url} movie_data={v} />)
          }
        </div>
      </section>
    </Layout>
  )
}

export async function getStaticProps() {
  let allMoviesData: MovieTypes;
  try {
    allMoviesData = await getAllNowPlaying();
  } catch (error) {
    alert(`error during fetching now playing movies \n ${alert}`);
  }
  
  return {
    props: {
      allMoviesData
    }
  }
}
