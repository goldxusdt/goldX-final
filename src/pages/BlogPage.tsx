import { Calendar, Clock, ArrowRight, User } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { SocialShare } from '@/components/SocialShare';

export default function BlogPage() {
  const blogs = [
    {
      id: 1,
      title: "The Future of Gold-Backed Digital Assets",
      excerpt: "Explore how Gold X Usdt is revolutionizing the intersection of traditional wealth and blockchain technology.",
      author: "Admin",
      date: "Oct 15, 2026",
      readTime: "5 min read",
      category: "Insight"
    },
    {
      id: 2,
      title: "Maximizing Your ROI: Strategies for Investors",
      excerpt: "Learn the best practices for managing your portfolio and leveraging our multi-level referral system.",
      author: "Admin",
      date: "Oct 12, 2026",
      readTime: "8 min read",
      category: "Education"
    },
    {
      id: 3,
      title: "Platform Security: Protecting Your Digital Gold",
      excerpt: "A deep dive into the security protocols that keep your investments safe with Gold X Usdt.",
      author: "Security Team",
      date: "Oct 08, 2026",
      readTime: "6 min read",
      category: "Security"
    }
  ];

  return (
    <div className="min-h-screen p-6 relative">
      <div className="container max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <Badge className="bg-primary/20 text-primary hover:bg-primary/30 premium-border">The Gold Journal</Badge>
          <h1 className="text-4xl sm:text-6xl font-black v56-gradient-text tracking-tighter">
            Market <span className="text-foreground">Insights</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto italic">
            Stay informed with the latest updates, investment strategies, and platform news from the Gold X Usdt team.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <Card key={blog.id} className="v56-glass premium-border flex flex-col group hover:scale-[1.02] transition-all duration-300">
              <CardHeader>
                <div className="flex justify-between items-center mb-4">
                  <Badge variant="outline" className="text-[10px] uppercase tracking-widest border-primary/20 text-primary/80">
                    {blog.category}
                  </Badge>
                  <div className="flex items-center text-[10px] text-muted-foreground uppercase tracking-widest">
                    <Calendar className="h-3 w-3 mr-1" />
                    {blog.date}
                  </div>
                </div>
                <CardTitle className="text-xl group-hover:text-primary transition-colors leading-snug">
                  {blog.title}
                </CardTitle>
                <CardDescription className="line-clamp-3 italic mt-2">
                  {blog.excerpt}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1" />
              <CardFooter className="pt-4 border-t border-white/5 flex justify-between items-center">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <User className="h-3 w-3" />
                  {blog.author}
                  <span className="mx-1">•</span>
                  <Clock className="h-3 w-3" />
                  {blog.readTime}
                </div>
                <Button variant="ghost" size="sm" className="text-primary hover:text-primary hover:bg-primary/10 font-bold uppercase tracking-widest text-[10px]">
                  Read <ArrowRight className="h-3 w-3 ml-1" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="flex justify-center pt-8">
          <Button variant="outline" className="border-primary/20 hover:bg-primary/5 font-bold uppercase tracking-widest">
            Load More Articles
          </Button>
        </div>
      </div>
      <SocialShare title="Gold X Usdt Blog - Market Insights & Investment Strategies" />
    </div>
  );
}
