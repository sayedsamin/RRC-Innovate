import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { NewsCard, NewsItem } from "@/components/dashboard/NewsCard";
import aiNewsData from "@/data/ai-news.json";

export default async function FeedPage({ params }: { params: Promise<{ role: string }> }) {
    const { role } = await params;
    const roleKey = role as keyof typeof aiNewsData;
    const newsItems = (aiNewsData[roleKey] || []) as NewsItem[];
    
    // Capitalize role for display
    const displayRole = role.charAt(0).toUpperCase() + role.slice(1).replace('-', ' ');

    return (
        <div className="flex min-h-screen bg-background text-foreground font-sans">
            <Sidebar role={role} className="min-h-screen border-r bg-sidebar" />
            
            <div className="flex flex-col flex-1">
                <Header title={`${displayRole} Intelligence Feed`} />
                
                <main className="flex flex-1 flex-col gap-6 p-4 md:p-8 overflow-y-auto max-w-5xl mx-auto w-full">
                    
                    <div className="flex flex-col gap-2">
                        <h2 className="text-2xl font-bold tracking-tight">Global AI Scout</h2>
                        <p className="text-muted-foreground">
                            Real-time intelligence gathered by your autonomous agents from the web, curated for the {displayRole} team.
                        </p>
                    </div>

                    <div className="grid gap-4">
                        {newsItems.length > 0 ? (
                            newsItems.map((item) => (
                                <NewsCard key={item.id} item={item} />
                            ))
                        ) : (
                            <div className="p-12 text-center border-2 border-dashed rounded-xl text-muted-foreground">
                                No active intelligence found for this role yet.
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
}
