import Link from 'next/link';

export default function Slidebar() {
    return (
        <div style={{ width: '200px', padding: '20px', backgroundColor: '#f5f5f5' }}>
            <ul style={{ listStyle: 'none', padding: 0 }}>
                <li><Link href="/">Home</Link></li>
                <li><Link href="/movies">Movies</Link></li>
                <li><Link href="/favourites">Favourites</Link></li>
            </ul>
        </div>
    );
}