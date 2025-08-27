import { cn } from "@/lib/utils";
import React from "react";

interface RassooqLogoProps {
  className?: string;
  variant?: "full" | "icon";
  size?: "sm" | "md" | "lg";
  imageSrc?: string; // optional brand image from /public
}

export const RassooqLogo = ({ 
  className, 
  variant = "full",
  size = "md",
  imageSrc = "/rassooq-logo.png"
}: RassooqLogoProps) => {
  const sizeClasses = {
    sm: "w-6 h-6 text-xs",
    md: "w-8 h-8 text-sm", 
    lg: "w-12 h-12 text-base"
  };
  
  const textSizes = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl"
  };

  const [imageOk, setImageOk] = React.useState(true);

  if (variant === "icon") {
    return (
      <div className={cn("flex items-center justify-center", className)}>
        {imageOk ? (
          <img
            src={imageSrc}
            alt="Rassooq"
            className={cn("object-contain", sizeClasses[size])}
            onError={() => setImageOk(false)}
          />
        ) : (
          <div className={cn(
            "bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center",
            sizeClasses[size]
          )}>
            <span className="text-white font-bold">R</span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {imageOk ? (
        <img
          src={imageSrc}
          alt="Rassooq"
          className={cn("object-contain", sizeClasses[size])}
          onError={() => setImageOk(false)}
        />
      ) : (
        <div className={cn(
          "bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center",
          sizeClasses[size]
        )}>
          <span className="text-white font-bold">R</span>
        </div>
      )}
      <span className={cn(
        "font-reem-kufi font-bold text-foreground tracking-wide",
        textSizes[size]
      )}>
        RASSOOQ
      </span>
    </div>
  );
};

// Legacy export for compatibility  
export const SouqLogo = RassooqLogo;