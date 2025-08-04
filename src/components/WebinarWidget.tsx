import { useState, useEffect } from "react";
import { MessageCircle, X, Calendar, Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const WebinarWidget = () => {
  const [showNotification, setShowNotification] = useState(false);
  const [autoTriggered, setAutoTriggered] = useState(false);

  const isWeekday = () => {
    const today = new Date();
    const day = today.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    return day >= 1 && day <= 5; // Monday to Friday
  };

  const getUserLocalTime = () => {
    return new Date();
  };

  const formatLocalTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true
    });
  };

  const getWebinarTimeInUserTimezone = () => {
    // Webinar is at 8 PM IST (UTC+5:30)
    const today = new Date();
    // Create a date object for 8 PM IST today
    const istOffset = 5.5 * 60; // IST is UTC+5:30 in minutes
    const utcTime = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 20, 0, 0); // 8 PM today in local time
    const istTime = new Date(utcTime.getTime() - (istOffset - today.getTimezoneOffset()) * 60000);
    return istTime;
  };

  const formatWebinarTime = () => {
    const webinarTime = getWebinarTimeInUserTimezone();
    const userTime = webinarTime.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true
    });
    return `${userTime} (8:00 PM IST)`;
  };

  useEffect(() => {
    if (!isWeekday()) return;

    const timer = setTimeout(() => {
      setShowNotification(true);
      setAutoTriggered(true);
    }, 5000); // 5 seconds

    return () => clearTimeout(timer);
  }, []);

  const handleJoinWebinar = () => {
    // Add your webinar link logic here
    window.open("https://your-webinar-link.com", "_blank");
    setShowNotification(false);
  };

  const handleCloseNotification = () => {
    setShowNotification(false);
  };

  const handleToggleNotification = () => {
    setShowNotification(!showNotification);
  };

  if (!isWeekday()) return null;

  return (
    <>
      {/* Chat Icon Widget */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={handleToggleNotification}
          className="h-14 w-14 rounded-full bg-gradient-webinar hover:bg-gradient-accent shadow-elegant animate-pulse-glow transition-all duration-300 hover:scale-110"
        >
          <MessageCircle className="h-6 w-6 text-white animate-float" />
        </Button>
      </div>

      {/* Webinar Notification Popup */}
      {showNotification && (
        <div className="fixed bottom-24 right-6 z-50 animate-slide-up">
          <div className="bg-card border border-border rounded-xl shadow-elegant p-6 max-w-sm relative overflow-hidden">
            {/* Background gradient overlay */}
            <div className="absolute inset-0 bg-gradient-webinar opacity-5 rounded-xl"></div>
            
            {/* Close button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCloseNotification}
              className="absolute top-2 right-2 h-6 w-6 rounded-full hover:bg-muted"
            >
              <X className="h-4 w-4" />
            </Button>

            {/* Content */}
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-full bg-gradient-webinar flex items-center justify-center animate-bounce-in">
                  <Calendar className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-card-foreground">Live Webinar Today!</h3>
                  <p className="text-sm text-muted-foreground">Don't miss out</p>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-card-foreground">
                  <Clock className="h-4 w-4 text-webinar-primary" />
                  <span>Today at {formatWebinarTime()}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-card-foreground">
                  <Users className="h-4 w-4 text-webinar-primary" />
                  <span>Join hundreds of participants</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={handleJoinWebinar}
                  className="flex-1 bg-gradient-webinar hover:bg-gradient-accent text-white font-medium"
                >
                  Join Now
                </Button>
                <Button
                  variant="outline"
                  onClick={handleCloseNotification}
                  className="px-3"
                >
                  Later
                </Button>
              </div>

              <p className="text-xs text-muted-foreground mt-3 text-center">
                Current time: {formatLocalTime(getUserLocalTime())}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default WebinarWidget;