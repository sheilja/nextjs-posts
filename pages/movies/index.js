import MovieList from "@/components/MovieList";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMovies } from "@/store/movieSlice"; // make sure this is correct
import MovieTable from "@/components/MovieTable";
import { exportMoviesToExcel } from "@/utils/exportToExcel";

export default function Movies({ movies }) {
  const dispatch = useDispatch();
  const movies1 = useSelector((state) => state.movie.movies);

  useEffect(() => {
    if (movies && movies.length > 0) {
      dispatch(setMovies(movies));
    }
  }, [dispatch, movies]);
  const handleExport = () => {
    exportMoviesToExcel(movies1);
  };
  return (
    <div>
      Hello...
      <h1>Simple Blog1</h1>
      {/* <MovieList movies={movies} /> */}
      <MovieTable />
      <button
        onClick={handleExport}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: "#0070f3",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        Export to Excel
      </button>
    </div>
  );
}

// ✅ This will run at **build time**
export async function getStaticProps() {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=7ab84983cc32ee9dab45755c032c59ab`
  );
  const data = await res.json();

  return {
    props: {
      movies: data.results,
    },
  };
}
