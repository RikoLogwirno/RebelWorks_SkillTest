export interface MovieResultItem {
  poster_path: string | null;
  id: number;
  title: string;
  overview: string;
  release_date: string;
}

export interface MovieTypes {
  page: number;
  total_pages: number;
  total_results: number;
  dates: {
    maximum: string;
    minimum: string;
  } | undefined;
  results: Array<MovieResultItem>;
}

export interface MovieParamID {
  params: {
    movie_id: string
  };
};

export interface MovieDetail {
  id: number;
  backdrop_path: string;
  overview: string;
  title: string;
  vote_average: number;
}

export const tmdb_base_url: string = "https://api.themoviedb.org";
export const tmdb_img_base_url: string = "https://image.tmdb.org/t/p";

export function AuthHeaders(headers?: Headers): Headers {
  if (headers === undefined) {
    headers = new Headers();
  }
  headers.append('Content-Type', 'application/json');
  headers.append('Authorization', `bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`);
  return headers;
}

/**
 * Get all now playing movie from TMDB
 * @author Riko Logwirno
 * @export
 * @returns {MovieTypes}
 */
export async function getAllNowPlaying(page?: number): Promise<MovieTypes> {
  let data: MovieTypes;
  let url: string = `${tmdb_base_url}/3/movie/now_playing`;
  if (page) url += `?page=${page}`;
  try {
    let response = await fetch(url, {
      method: "get",
      headers: AuthHeaders()
    });
    data = await response.json();
  } catch (error) {
    throw error;
  }
  
  return data;
}

/**
 * Get similar movies by movie id from TMDB
 * @author Riko Logwirno
 * @export
 * @param {string} movie_id
 * @returns {MovieTypes}
 */
export async function getSimilarMovie(movie_id: string, page?: number): Promise<MovieTypes> {
  let data: MovieTypes;
  let url: string = `${tmdb_base_url}/3/movie/${movie_id}/similar`;
  if (page) url += `?page=${page}`;
  try {
    let response = await fetch(url, {
      method: "get",
      headers: AuthHeaders()
    });
    data = await response.json();
  } catch (error) {
    throw error;
  }
  
  return data;
}

/**
 * Get Movie detail by movie id from TMDB
 * @author Riko Logwirno
 * @export
 * @param {string} movie_id
 * @returns {MovieDetail}
 */
 export async function getMovieDetail(movie_id: string): Promise<MovieDetail> {
  let data: MovieDetail;
  try {
    let response = await fetch(`${tmdb_base_url}/3/movie/${movie_id}`, {
      method: "get",
      headers: AuthHeaders()
    });
    data = await response.json();
  } catch (error) {
    throw error;
  }
  
  return data;
}

/**
 * Filter Movies to get only param with ID
 * @author Riko Logwirno
 * @export
 * @param {MovieTypes} movieDatas
 * @returns {Array<MovieParamID>}
 */
export function getIDOnly(movieDatas: MovieTypes): Array<MovieParamID> {
  return movieDatas.results.map(v => ({
    params: {
      movie_id: String(v.id)
    },
  }));
}