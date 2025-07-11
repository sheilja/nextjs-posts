// components/Layout.js
import Slidebar from './Slidebar';

export default function Layout({ children }) {
    return (
        <div style={{ display: 'flex' }}>
            <Slidebar />
            <main style={{ padding: '20px', flex: 1 }}>
                {children}
            </main>
        </div>
    );
}
