import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useAppContext, UserRole } from "@/contexts/AppContext";

export function ProtectedRoute({ allowed }: { allowed: UserRole[] }) {
  const { state, dispatch } = useAppContext();
  const location = useLocation();

  // Compute effective role synchronously from URL param if present
  const params = new URLSearchParams(location.search);
  const overrideRole = params.get("role") as UserRole | null;
  const effectiveRole: UserRole = overrideRole && ["guest","buyer","seller","admin"].includes(overrideRole)
    ? overrideRole
    : state.currentRole;

  // Honor URL role override before enforcing access, e.g. /admin/overview?role=admin
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const role = params.get("role") as UserRole | null;
    if (role && ["guest", "buyer", "seller", "admin"].includes(role)) {
      dispatch({ type: "SET_ROLE", payload: role });
      params.delete("role");
      window.history.replaceState(null, "", location.pathname + (params.toString() ? `?${params.toString()}` : ""));
    }
  }, [location.search, location.pathname, dispatch]);

  if (!allowed.includes(effectiveRole)) {
    return <Navigate to="/403" state={{ from: location }} replace />;
  }

  return <Outlet />;
}


