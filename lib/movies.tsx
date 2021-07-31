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

export const tmdb_base_url: string = "https://api.themoviedb.org";
export const tmdb_img_base_url: string = "https://image.tmdb.org/t/p";

export function AuthHeaders(headers?: Headers): Headers {
  if (headers === undefined) {
    headers = new Headers();
  }
  headers.append('Content-Type', 'application/json');
  headers.append('Authorization', `bearer ${process.env.API_TOKEN}`);
  return headers;
}

/**
 * Get all now playing movie from TMDB
 * @author Riko Logwirno
 * @export
 * @returns {MovieTypes}
 */
export async function getAllNowPlaying(): Promise<MovieTypes> {
  let data: MovieTypes;
  try {
    let response = await fetch(`${tmdb_base_url}/3/movie/now_playing`, {
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
 * @param {Number} movie_id
 * @returns {MovieTypes}
 */
export async function getSimilarMovie(movie_id: Number): Promise<MovieTypes> {
  let data: MovieTypes;
  try {
    let response = await fetch(`${tmdb_base_url}/3/movie/${movie_id}/similar`, {
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