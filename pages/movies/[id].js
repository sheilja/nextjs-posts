import posts from "@/Data/post";

export async function getStaticPaths(){
    const res = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=7ab84983cc32ee9dab45755c032c59ab`);
  const data = await res.json();
    const paths=data.results.map(post=>({
        params:{id:post.id.toString()}
    }))
    return {
        paths,
        fallback:false
    }
}

export async function getStaticProps({params}){
    const res = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=7ab84983cc32ee9dab45755c032c59ab`);
  const data = await res.json();
  const movie = data.results.find(p => p.id === parseInt(params.id));
    return{
        props:{
            movie
        }
    }
}

export default function MoviePage({movie}){
    return (<div>
        <h1>{movie.title}</h1>
        <p>{movie.release_date}</p>
    </div>)
}