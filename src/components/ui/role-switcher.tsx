import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useAppContext, UserRole } from "@/contexts/AppContext";
import { User, Store, Settings } from "lucide-react";

export function RoleSwitcher() {
  const { state, dispatch } = useAppContext();
  const [isOpen, setIsOpen] = useState(false);
  
  const roles: Array<{ 
    value: UserRole; 
    label: string; 
    icon: React.ReactNode;
    description: string;
  }> = [
    { 
      value: 'buyer', 
      label: 'Buyer', 
      icon: <User className="h-4 w-4" />,
      description: 'Shop and browse products'
    },
    { 
      value: 'seller', 
      label: 'Seller', 
      icon: <Store className="h-4 w-4" />,
      description: 'Manage your store'
    },
    { 
      value: 'admin', 
      label: 'Admin', 
      icon: <Settings className="h-4 w-4" />,
      description: 'Platform administration'
    }
  ];

  const currentRoleData = roles.find(role => role.value === state.currentRole);

  const handleRoleChange = (newRole: UserRole) => {
    dispatch({ type: 'SET_ROLE', payload: newRole });
    setIsOpen(false);
  };

  return (
    <div className="flex items-center gap-2">
      <Select 
        value={state.currentRole} 
        onValueChange={handleRoleChange}
        open={isOpen}
        onOpenChange={setIsOpen}
      >
        <SelectTrigger className="w-auto min-w-32">
          <div className="flex items-center gap-2">
            {currentRoleData?.icon}
            <SelectValue />
          </div>
        </SelectTrigger>
        <SelectContent>
          {roles.map((role) => (
            <SelectItem key={role.value} value={role.value}>
              <div className="flex items-center gap-3 w-full">
                {role.icon}
                <div className="flex flex-col">
                  <span className="font-medium">{role.label}</span>
                  <span className="text-xs text-muted-foreground">
                    {role.description}
                  </span>
                </div>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      
      {state.user && (
        <Badge variant={state.currentRole === 'admin' ? 'destructive' : 'default'}>
          {currentRoleData?.label}
        </Badge>
      )}
    </div>
  );
}