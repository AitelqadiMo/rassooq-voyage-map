import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShieldAlert } from "lucide-react";

const NotAuthorized = () => {
  const location = useLocation();
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <Card className="max-w-md w-full">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center text-center">
            <ShieldAlert className="h-12 w-12 text-destructive mb-3" />
            <h1 className="text-2xl font-bold mb-2">403 — Not Authorized</h1>
            <p className="text-muted-foreground mb-4">
              You don’t have access to this area. Switch role to continue.
            </p>
            <div className="flex gap-2">
              <Link to="/">
                <Button variant="outline">Home</Button>
              </Link>
              <Link to={`/?returnTo=${encodeURIComponent(location.pathname + location.search)}`}>
                <Button>Switch Role</Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotAuthorized;


