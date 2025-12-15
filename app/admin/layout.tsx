import Sidebar from '@/components/layout/Sidebar';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-[var(--bg-primary)]">
            <Sidebar isAdmin />
            <main className="ml-64 p-8">
                {children}
            </main>
        </div>
    );
}
