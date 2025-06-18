import Link from 'next/link';

export default function PostList({posts}){
    return(<><img src="/OIP.jpg" alt="Your Name" /><ul>
        {posts.map(p=>(
             <li key={p.id}>
                <Link href={`/posts/${p.id}`}>{p.title}</Link></li>
        ))}
    </ul></>)
}
