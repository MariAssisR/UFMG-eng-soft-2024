import axios from 'axios';

//TMDb
const API_KEY = '388e867bfe3949f9a5da43072969cdb5';
const BASE_URL = 'https://api.themoviedb.org/3';

/*
* It has requests for movie api:
*	getNetflixOriginals,
*	getTrendingMovies,
*	getTopRatedMovies,
*	getMoviesByGenre,
*	getMovieDetails,
*	searchMoviesByName,
*/


/**
 * Creates an Axios instance with the TMDB API base URL.
 */
const api = axios.create({
	baseURL: BASE_URL,
	params: {
		api_key: API_KEY,
	},
});

export const getNetflixOriginals = async () => {
	try {
		const response = await api.get('/discover/tv', {
			params: {
				with_networks: 213, // Netflix ID
			},
		});
		return response.data.results;
	} catch (error) {
		console.error('Error when searching for Netflix originals:', error);
		throw error;
	}
};

export const getTrendingMovies = async () => {
	try {
		const response = await api.get('/trending/all/week');
		return response.data.results;
	} catch (error) {
		console.error('Error when searching for recommended movies:', error);
		throw error;
	}
};

export const getTopRatedMovies = async () => {
	try {
		const response = await api.get('/movie/top_rated');
		return response.data.results;
	} catch (error) {
		console.error('Error when searching for films with the best reviews:', error);
		throw error;
	}
};

export const getMoviesByGenre = async (genreId) => {
	try {
		const response = await api.get('/discover/movie', {
			params: {
				with_genres: genreId,
			},
		});
		return response.data.results;
	} catch (error) {
		console.error(`Error when searching for films of this genre ${genreId}:`, error);
		throw error;
	}
};

export const getMovieDetails = async (movieId) => {
	try {
		const response = await api.get(`/movie/${movieId}`);
		return response.data;
	} catch (error) {
		console.error(`Error when searching for movie details (ID: ${movieId}):`, error);
		throw error;
	}
};

export const searchMoviesByName = async (query) => {
	try {
		const response = await api.get('/search/movie', {
			params: {
				query,
			},
		});
		return response.data.results;
	} catch (error) {
		console.error(`Error when searching for movies with name "${query}":`, error);
		throw error;
	}
};

const tmdbAPI =  {
	getNetflixOriginals,
	getTrendingMovies,
	getTopRatedMovies,
	getMoviesByGenre,
	getMovieDetails,
	searchMoviesByName,
};

export default tmdbAPI;