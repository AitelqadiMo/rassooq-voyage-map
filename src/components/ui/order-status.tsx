import { Badge } from "@/components/ui/badge";
import { 
  Package, 
  Truck, 
  CheckCircle, 
  Clock, 
  X, 
  RotateCcw,
  AlertTriangle 
} from "lucide-react";

export type OrderStatus = 
  | "pending" 
  | "confirmed" 
  | "processing" 
  | "shipped" 
  | "delivered" 
  | "cancelled" 
  | "returned";

interface OrderStatusProps {
  status: OrderStatus;
  size?: "sm" | "default" | "lg";
}

export const OrderStatusBadge = ({ status, size = "default" }: OrderStatusProps) => {
  const getStatusConfig = (status: OrderStatus) => {
    switch (status) {
      case "pending":
        return {
          label: "Pending",
          variant: "secondary" as const,
          icon: Clock,
          color: "text-yellow-600"
        };
      case "confirmed":
        return {
          label: "Confirmed",
          variant: "default" as const,
          icon: CheckCircle,
          color: "text-blue-600"
        };
      case "processing":
        return {
          label: "Processing",
          variant: "default" as const,
          icon: Package,
          color: "text-blue-600"
        };
      case "shipped":
        return {
          label: "Shipped",
          variant: "default" as const,
          icon: Truck,
          color: "text-primary"
        };
      case "delivered":
        return {
          label: "Delivered",
          variant: "default" as const,
          icon: CheckCircle,
          color: "text-green-600"
        };
      case "cancelled":
        return {
          label: "Cancelled",
          variant: "destructive" as const,
          icon: X,
          color: "text-destructive"
        };
      case "returned":
        return {
          label: "Returned",
          variant: "secondary" as const,
          icon: RotateCcw,
          color: "text-muted-foreground"
        };
      default:
        return {
          label: "Unknown",
          variant: "secondary" as const,
          icon: AlertTriangle,
          color: "text-muted-foreground"
        };
    }
  };

  const { label, variant, icon: Icon, color } = getStatusConfig(status);
  const iconSize = size === "sm" ? "h-3 w-3" : size === "lg" ? "h-5 w-5" : "h-4 w-4";

  return (
    <Badge variant={variant} className="flex items-center gap-1">
      <Icon className={`${iconSize} ${color}`} />
      {label}
    </Badge>
  );
};

export const OrderStatusTracker = ({ status }: { status: OrderStatus }) => {
  const steps = [
    { key: "confirmed", label: "Confirmed", icon: CheckCircle },
    { key: "processing", label: "Processing", icon: Package },
    { key: "shipped", label: "Shipped", icon: Truck },
    { key: "delivered", label: "Delivered", icon: CheckCircle },
  ];

  const statusOrder = ["pending", "confirmed", "processing", "shipped", "delivered"];
  const currentIndex = statusOrder.indexOf(status);
  
  if (status === "cancelled" || status === "returned") {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <OrderStatusBadge status={status} size="lg" />
          <p className="text-sm text-muted-foreground mt-2">
            {status === "cancelled" ? "Order was cancelled" : "Order was returned"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isCompleted = index < currentIndex;
          const isCurrent = index === currentIndex - 1;
          const isUpcoming = index >= currentIndex;

          return (
            <div key={step.key} className="flex flex-col items-center flex-1">
              <div className={`
                flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors
                ${isCompleted ? 'bg-primary border-primary text-primary-foreground' : ''}
                ${isCurrent ? 'bg-primary border-primary text-primary-foreground animate-pulse' : ''}
                ${isUpcoming ? 'bg-background border-muted-foreground text-muted-foreground' : ''}
              `}>
                <step.icon className="h-5 w-5" />
              </div>
              <span className={`
                text-xs mt-2 text-center font-medium
                ${isCompleted || isCurrent ? 'text-foreground' : 'text-muted-foreground'}
              `}>
                {step.label}
              </span>
              {index < steps.length - 1 && (
                <div className={`
                  absolute h-0.5 w-full mt-5 -ml-1/2 transition-colors
                  ${isCompleted ? 'bg-primary' : 'bg-border'}
                `} style={{ 
                  left: `${(100 / (steps.length - 1)) * index + (100 / (steps.length - 1)) / 2}%`,
                  width: `${100 / (steps.length - 1)}%`,
                  zIndex: -1
                }} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};