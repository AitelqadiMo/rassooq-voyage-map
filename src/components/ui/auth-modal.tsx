import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AppContext";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";

export function AuthModal({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean)=>void }) {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const onLogin = () => {
    login({ id: "u-"+Date.now(), name: email.split('@')[0] || 'User', email, role: 'buyer' });
    onOpenChange(false);
  };
  const onRegister = () => {
    if (!email || !password || password !== confirm) return;
    login({ id: "u-"+Date.now(), name: email.split('@')[0] || 'User', email, role: 'buyer' });
    onOpenChange(false);
  };

  const social = (provider: string) => {
    login({ id: provider+Date.now(), name: provider+" user", email: provider+"@rassooq.com", role: 'buyer' });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Welcome to Rassooq</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="login" className="mt-2">
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>
          <TabsContent value="login" className="space-y-3 pt-4">
            <Input placeholder="Email" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
            <Input placeholder="Password" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
            <Button className="w-full" onClick={onLogin} data-testid="login-submit">Login</Button>
            <div className="flex items-center gap-2">
              <Button variant="outline" className="flex-1" onClick={()=>social('google')}><FcGoogle className="mr-2"/> Google</Button>
              <Button variant="outline" className="flex-1" onClick={()=>social('facebook')}><FaFacebook className="mr-2 text-blue-600"/> Facebook</Button>
            </div>
          </TabsContent>
          <TabsContent value="register" className="space-y-3 pt-4">
            <Input placeholder="Email" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
            <Input placeholder="Password" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
            <Input placeholder="Confirm Password" type="password" value={confirm} onChange={(e)=>setConfirm(e.target.value)} />
            <Button className="w-full" onClick={onRegister} disabled={!email || !password || password!==confirm} data-testid="register-submit">Create Account</Button>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}


