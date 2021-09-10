export interface Video {
    id: number;
    title: string;
    grade: number;
}

export interface MovieInfo {
    poster_path: string,
    adult: boolean,
    overview: string,
    release_date: string,
    genre_ids: number[],
    id: number
    original_title: string,
    original_language: string,
    title: string,
    backdrop_path: string,
    popularity: number,
    vote_count: number,
    video: boolean,
    vote_average: number
}

export interface TmdbSearchResult {
    page: number,
    results: MovieInfo[],
    total_pages: number,
    total_results: number
}