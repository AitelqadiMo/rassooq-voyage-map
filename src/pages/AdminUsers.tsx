import React, { useMemo, useState } from "react";
import { useAdmin } from "@/contexts/AdminContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { Search, Users, Star } from "lucide-react";

const AdminUsers = () => {
  const { state, dispatch } = useAdmin();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [plus, setPlus] = useState('all');
  const [cod, setCod] = useState('all');

  const filtered = useMemo(() => state.users
    .filter(u => plus==='all' || (plus==='plus' ? u.plus : !u.plus))
    .filter(u => cod==='all' || (cod==='high' ? u.codSuccess >= 90 : u.codSuccess < 90))
    .filter(u => u.email.toLowerCase().includes(search.toLowerCase()) || u.name.toLowerCase().includes(search.toLowerCase()) || u.id.toLowerCase().includes(search.toLowerCase()))
  , [state.users, plus, cod, search]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          User Management
        </h1>
        <p className="text-muted-foreground mt-1">Monitor and manage user accounts, subscriptions, and activity</p>
      </div>

      <Card className="glass-panel border-primary/10">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Search className="h-5 w-5 text-primary" />
            User Search & Filters
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Input 
            placeholder="Search by email, phone, ID, or name..." 
            value={search} 
            onChange={(e)=>setSearch(e.target.value)}
            className="rounded-xl"
          />
          <Select value={plus} onValueChange={setPlus}>
            <SelectTrigger className="rounded-xl">
              <SelectValue placeholder="Rassooq+ Status"/>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Users</SelectItem>
              <SelectItem value="plus">Rassooq+ Members</SelectItem>
              <SelectItem value="non">Regular Users</SelectItem>
            </SelectContent>
          </Select>
          <Select value={cod} onValueChange={setCod}>
            <SelectTrigger className="rounded-xl">
              <SelectValue placeholder="COD Performance"/>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Performance Levels</SelectItem>
              <SelectItem value="high">High Success (≥90%)</SelectItem>
              <SelectItem value="low">Low Success (&lt;90%)</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={()=>{ setSearch(''); setPlus('all'); setCod('all'); }}
              className="rounded-xl"
            >
              Reset Filters
            </Button>
          </div>
          </CardContent>
        </Card>

      <Card className="glass-panel border-secondary/10">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-semibold flex items-center gap-2">
            <Users className="h-5 w-5 text-secondary" />
            User Directory
            <Badge variant="secondary" className="ml-auto rounded-full">
              {filtered.length} users
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-xl border border-border/20 overflow-hidden">
            <div className="overflow-auto">
              <table className="w-full">
                <thead className="bg-muted/30">
                  <tr className="text-left text-muted-foreground text-sm">
                    <th className="p-4 font-medium">User</th>
                    <th className="p-4 font-medium">Activity</th>
                    <th className="p-4 font-medium">COD Success</th>
                    <th className="p-4 font-medium">Membership</th>
                    <th className="p-4 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-card">
                  {filtered.map(u => (
                    <tr key={u.id} className="border-t border-border/10 hover:bg-muted/20 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground font-semibold">
                            {u.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="font-medium">{u.name}</p>
                            <p className="text-sm text-muted-foreground">{u.email}</p>
                            <p className="text-xs text-muted-foreground">ID: {u.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="space-y-1">
                          <p className="font-medium">{u.ordersCount} orders</p>
                          <p className="text-sm text-muted-foreground">Last active: 2h ago</p>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <div className={`h-2 w-2 rounded-full ${u.codSuccess >= 90 ? 'bg-emerald-500' : u.codSuccess >= 70 ? 'bg-amber-500' : 'bg-destructive'}`} />
                          <span className="font-medium">{u.codSuccess}%</span>
                        </div>
                      </td>
                      <td className="p-4">
                        {u.plus ? (
                          <Badge className="rounded-full bg-gradient-primary">
                            <Star className="h-3 w-3 mr-1" />
                            Rassooq+
                          </Badge>
                        ) : (
                          <Badge variant="secondary" className="rounded-full">
                            Regular
                          </Badge>
                        )}
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button 
                            size="sm" 
                            variant="outline" 
                            onClick={()=>{ navigate('/'); }}
                            className="rounded-xl"
                          >
                            Impersonate
                          </Button>
                          <Button 
                            size="sm" 
                            variant={u.suspended ? "default" : "outline"}
                            onClick={()=>dispatch({ type:'USER_UPDATE', payload: { id: u.id, suspended: !u.suspended } })}
                            className="rounded-xl"
                          >
                            {u.suspended ? 'Unsuspend':'Suspend'}
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filtered.length === 0 && (
                <div className="text-center py-12">
                  <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No users found</h3>
                  <p className="text-muted-foreground">Try adjusting your search criteria.</p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminUsers;

