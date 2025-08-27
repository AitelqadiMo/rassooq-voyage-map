import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";

type Staff = { id: string; name: string; email: string; role: string; active: boolean };

const SellerStaff = () => {
  const [staff, setStaff] = useState<Staff[]>([
    { id: 's1', name: 'Mona Ali', email: 'mona@store.com', role: 'Manager', active: true },
    { id: 's2', name: 'Omar Saleh', email: 'omar@store.com', role: 'Support', active: true },
  ]);
  const [inviteName, setInviteName] = useState("");
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("Manager");

  const invite = () => {
    if (!inviteEmail) return;
    setStaff(s => [...s, { id: 's'+Date.now(), name: inviteName || inviteEmail.split('@')[0], email: inviteEmail, role: inviteRole, active: true }]);
    setInviteName(""); setInviteEmail("");
  };

  const toggleActive = (id: string) => setStaff(s => s.map(u => u.id===id ? { ...u, active: !u.active } : u));
  const changeRole = (id: string, role: string) => setStaff(s => s.map(u => u.id===id ? { ...u, role } : u));
  const remove = (id: string) => setStaff(s => s.filter(u => u.id!==id));

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8 space-y-4">
        <Card>
          <CardHeader><CardTitle>Staff Management</CardTitle></CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-2">
            <Input placeholder="Full name" value={inviteName} onChange={(e)=>setInviteName(e.target.value)} />
            <Input placeholder="Email" type="email" value={inviteEmail} onChange={(e)=>setInviteEmail(e.target.value)} />
            <Select value={inviteRole} onValueChange={setInviteRole}>
              <SelectTrigger><SelectValue placeholder="Role"/></SelectTrigger>
              <SelectContent>
                <SelectItem value="Manager">Manager</SelectItem>
                <SelectItem value="Support">Support</SelectItem>
                <SelectItem value="Picker">Picker/Packer</SelectItem>
              </SelectContent>
            </Select>
            <div className="md:col-span-3"><Button onClick={invite}>Invite</Button></div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Team</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {staff.map(u => (
              <div key={u.id} className="grid grid-cols-1 md:grid-cols-5 items-center gap-2 border rounded p-2 text-sm">
                <div className="font-medium">{u.name}</div>
                <div className="text-muted-foreground">{u.email}</div>
                <div>
                  <Select value={u.role} onValueChange={(v)=>changeRole(u.id, v)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Manager">Manager</SelectItem>
                      <SelectItem value="Support">Support</SelectItem>
                      <SelectItem value="Picker">Picker/Packer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center gap-2"><Switch checked={u.active} onCheckedChange={()=>toggleActive(u.id)} /> <span>{u.active?'Active':'Disabled'}</span></div>
                <div className="text-right"><Button size="sm" variant="outline" onClick={()=>remove(u.id)}>Remove</Button></div>
              </div>
            ))}
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default SellerStaff;


