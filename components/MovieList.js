import Link from 'next/link';
import { useSelector } from "react-redux";

export default function MovieList(/*{ movies }*/) {
    const movies = useSelector((state) => state.movie.movies);
    return (<>
        {/* <img src="/OIP.jpg" alt="Your Name" /> */}
        <ul>
            {movies.map(p => (
                <li key={p.id}>
                    <Link href={`/movies/${p.id}`}>{p.title}</Link></li>
            ))}
        </ul></>)
}
