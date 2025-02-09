import { Link, useLocation } from "wouter";
import { Home, Star, User } from "lucide-react";
import { useStore } from "@/lib/store";

export function MobileNav() {
  const [location] = useLocation();
  const { user } = useStore();

  // Don't show nav if user is not logged in or on auth page
  if (!user || location === '/') {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 border-t bg-white md:hidden">
      <nav className="flex justify-around p-2">
        <Link href="/dashboard" className="flex flex-col items-center p-2">
          <Home 
            className={`h-6 w-6 ${location === '/dashboard' ? 'text-black' : 'text-gray-500'}`} 
          />
          <span className={`text-xs mt-1 ${location === '/dashboard' ? 'text-black' : 'text-gray-500'}`}>
            Dash
          </span>
        </Link>
        <Link href="/score" className="flex flex-col items-center p-2">
          <Star 
            className={`h-6 w-6 ${location === '/score' ? 'text-black' : 'text-gray-500'}`} 
          />
          <span className={`text-xs mt-1 ${location === '/score' ? 'text-black' : 'text-gray-500'}`}>
            Score
          </span>
        </Link>
        <Link href="/profile" className="flex flex-col items-center p-2">
          <User 
            className={`h-6 w-6 ${location === '/profile' ? 'text-black' : 'text-gray-500'}`} 
          />
          <span className={`text-xs mt-1 ${location === '/profile' ? 'text-black' : 'text-gray-500'}`}>
            Profile
          </span>
        </Link>
      </nav>
    </div>
  );
}