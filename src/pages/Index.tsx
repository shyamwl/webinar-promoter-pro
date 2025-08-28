import { useState } from "react";
import WebinarWidget from "@/components/WebinarWidget";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [isLivePreview, setIsLivePreview] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Your App</h1>
        <p className="text-xl text-muted-foreground">Experience our powerful webinar platform!</p>
        <div className="mt-8 p-6 bg-card rounded-xl border border-border max-w-md mx-auto">
          <h2 className="text-lg font-semibold mb-2 text-card-foreground">Daily Webinars</h2>
          <p className="text-sm text-muted-foreground">
            Join our live sessions every weekday at 8:00 PM IST. 
            Get notified automatically when you visit our platform!
          </p>
          <div className="mt-4 pt-4 border-t border-border">
            <p className="text-xs text-muted-foreground mb-2">Preview Mode:</p>
            <Button
              onClick={() => setIsLivePreview(!isLivePreview)}
              variant={isLivePreview ? "destructive" : "secondary"}
              size="sm"
              className="w-full"
            >
              {isLivePreview ? "🔴 Stop Live Preview" : "👁️ Preview Live State"}
            </Button>
          </div>
        </div>
      </div>
      
      <WebinarWidget isLivePreview={isLivePreview} />
    </div>
  );
};

export default Index;
