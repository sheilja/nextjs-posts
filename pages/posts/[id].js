import posts from "@/Data/post";

export async function getStaticPaths(){
    const paths=posts.map(post=>({
        params:{id:post.id}
    }))
    return {
        paths,
        fallback:false
    }
}

export async function getStaticProps({params}){
    const post=posts.find(p=>p.id===params.id);
    return{
        props:{
            post
        }
    }
}

export default function PostPage({post}){
    return (<div>
        <h1>{post.title}</h1>
        <p>{post.content}</p>
    </div>)
}