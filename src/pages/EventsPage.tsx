import { Calendar, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SocialShare } from '@/components/SocialShare';

export default function EventsPage() {
  return (
    <div className="min-h-screen p-6 relative">
      <div className="container max-w-4xl mx-auto">
        <Card className="border-primary/20 card-glow">
          <CardHeader className="text-center">
            <Calendar className="h-16 w-16 text-primary mx-auto mb-4" />
            <CardTitle className="text-3xl v56-gradient-text">Events</CardTitle>
          </CardHeader>
          <CardContent className="text-center py-12">
            <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Coming Soon</h2>
            <p className="text-muted-foreground">
              Exciting events and promotions will be announced here. Stay tuned!
            </p>
          </CardContent>
        </Card>
      </div>
      <SocialShare title="Gold X Usdt Events - Premium Crypto Investment Platform" />
    </div>
  );
}
