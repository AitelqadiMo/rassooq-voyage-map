import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";
import { useEffect, useState } from "react";

export const FlashSaleTicker = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 12,
    minutes: 34,
    seconds: 56
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { hours, minutes, seconds } = prev;
        
        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        }
        
        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-flash text-flash-foreground py-2 animate-flash">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center gap-3 text-sm font-semibold">
          <Clock className="h-4 w-4" />
          <span>Flash Sale Ends In:</span>
          <div className="flex items-center gap-1">
            <Badge variant="secondary" className="bg-flash-foreground text-flash font-bold px-2 py-1">
              {String(timeLeft.hours).padStart(2, '0')}
            </Badge>
            <span>:</span>
            <Badge variant="secondary" className="bg-flash-foreground text-flash font-bold px-2 py-1">
              {String(timeLeft.minutes).padStart(2, '0')}
            </Badge>
            <span>:</span>
            <Badge variant="secondary" className="bg-flash-foreground text-flash font-bold px-2 py-1">
              {String(timeLeft.seconds).padStart(2, '0')}
            </Badge>
          </div>
          <span>🔥 Up to 70% OFF!</span>
        </div>
      </div>
    </div>
  );
};