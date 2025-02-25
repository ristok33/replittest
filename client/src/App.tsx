import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { MobileNav } from "@/components/mobile-nav";
import NotFound from "@/pages/not-found";
import AuthPage from "@/pages/auth";
import DashboardPage from "@/pages/dashboard";
import ScorePage from "@/pages/score";
import PaymentsPage from "@/pages/payments";
import OffersPage from "@/pages/offers";
import ApplyPage from "@/pages/apply";
import SharePage from "@/pages/share";
import ProfilePage from "@/pages/profile";

function Router() {
  return (
    <div className="pb-20 md:pb-0"> {/* Add padding for mobile nav */}
      <Switch>
        <Route path="/" component={AuthPage} />
        <Route path="/dashboard" component={DashboardPage} />
        <Route path="/score" component={ScorePage} />
        <Route path="/payments" component={PaymentsPage} />
        <Route path="/offers" component={OffersPage} />
        <Route path="/apply" component={ApplyPage} />
        <Route path="/share" component={SharePage} />
        <Route path="/profile" component={ProfilePage} />
        <Route component={NotFound} />
      </Switch>
      <MobileNav />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;