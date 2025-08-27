import React, { useMemo, useState } from "react";
import { useAdmin } from "@/contexts/AdminContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Pencil, Trash2, ChevronDown, ChevronRight, Package, CheckCircle2, AlertTriangle, User, Boxes, Star } from "lucide-react";

const AdminCatalog = () => {
  const { state, dispatch } = useAdmin();
  const [tab, setTab] = useState("approvals");

  // Approvals
  const [selected, setSelected] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [reasonOpen, setReasonOpen] = useState(false);
  const [reason, setReason] = useState("");
  const [reasonTarget, setReasonTarget] = useState<{ id: string; action: 'Approved'|'Rejected' }|null>(null);

  const filteredApprovals = useMemo(() => state.approvals.filter(a =>
    a.title.toLowerCase().includes(search.toLowerCase()) || a.seller.toLowerCase().includes(search.toLowerCase())
  ), [state.approvals, search]);

  const toggleSelect = (id: string) => setSelected(prev => prev.includes(id) ? prev.filter(x=>x!==id) : [...prev, id]);
  const toggleAll = () => setSelected(prev => prev.length===filteredApprovals.length ? [] : filteredApprovals.map(a=>a.id));
  const bulkUpdate = (action: 'Approved'|'Rejected') => {
    selected.forEach(id => dispatch({ type: 'APPROVAL_UPDATE', payload: { id, status: action } }));
    setSelected([]);
  };

  const submitReason = () => {
    if (reasonTarget) {
      dispatch({ type: 'APPROVAL_UPDATE', payload: { id: reasonTarget.id, status: reasonTarget.action } });
    }
    setReason(""); setReasonOpen(false); setReasonTarget(null);
  };

  // Categories tree
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [newName, setNewName] = useState("");
  const [renameTarget, setRenameTarget] = useState<string|undefined>();

  const toggleExpand = (id: string) => setExpanded(p => ({ ...p, [id]: !p[id] }));

  const renderNode = (node: any, level = 0) => (
    <div key={node.id} className="pl-" style={{ paddingLeft: level * 16 }}>
      <div className="flex items-center gap-2 py-1">
        {node.children?.length ? (
          <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => toggleExpand(node.id)}>
            {expanded[node.id] ? <ChevronDown className="h-4 w-4"/> : <ChevronRight className="h-4 w-4"/>}
          </Button>
        ) : <span className="w-6" />}
        <span className="text-sm flex-1">{renameTarget===node.id ? (
          <span className="flex items-center gap-2">
            <Input value={newName} onChange={(e)=>setNewName(e.target.value)} className="h-7" />
            <Button size="sm" onClick={()=>{dispatch({ type:'CATEGORY_RENAME', payload: { id: node.id, name: newName || node.name } }); setRenameTarget(undefined);}}>Save</Button>
          </span>
        ) : node.name}</span>
        <Button variant="ghost" size="icon" onClick={()=>{ setRenameTarget(node.id); setNewName(node.name); }}><Pencil className="h-4 w-4"/></Button>
        <Button variant="ghost" size="icon" onClick={()=>dispatch({ type:'CATEGORY_DELETE', payload: { id: node.id } })}><Trash2 className="h-4 w-4"/></Button>
        <Button variant="ghost" size="icon" onClick={()=>dispatch({ type:'CATEGORY_ADD', payload: { parentId: node.id, name: 'New Category' } })}><Plus className="h-4 w-4"/></Button>
      </div>
      {node.children && expanded[node.id] && (
        <div>
          {node.children.map((child: any)=> renderNode(child, level+1))}
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Catalog Management
          </h1>
          <p className="text-muted-foreground mt-1">Manage products, categories, and brand approvals</p>
        </div>
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList className="grid w-full grid-cols-3 rounded-xl">
            <TabsTrigger value="approvals" className="rounded-xl">
              Approvals
              {state.approvals.filter(a => a.status === 'Pending').length > 0 && (
                <Badge className="ml-2 h-5 w-5 rounded-full p-0 text-xs">
                  {state.approvals.filter(a => a.status === 'Pending').length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="categories" className="rounded-xl">Categories</TabsTrigger>
            <TabsTrigger value="brands" className="rounded-xl">Brands</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsContent value="approvals" className="space-y-6">
          <Card className="glass-panel border-primary/10">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-semibold flex items-center gap-2">
                <Package className="h-5 w-5 text-primary" />
                Product Approvals
                <Badge variant="secondary" className="ml-auto rounded-full">
                  {filteredApprovals.length} items
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <Checkbox 
                    checked={selected.length===filteredApprovals.length && filteredApprovals.length>0} 
                    onCheckedChange={toggleAll as any}
                    className="rounded-md"
                  />
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={()=>bulkUpdate('Approved')} 
                    disabled={!selected.length}
                    className="rounded-xl hover:bg-emerald-50 hover:border-emerald-200"
                  >
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    Bulk Approve ({selected.length})
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={()=>bulkUpdate('Rejected')} 
                    disabled={!selected.length}
                    className="rounded-xl hover:bg-destructive/10 hover:border-destructive/20"
                  >
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    Bulk Reject ({selected.length})
                  </Button>
                </div>
                <Input 
                  placeholder="Search title or seller..." 
                  value={search} 
                  onChange={(e)=>setSearch(e.target.value)} 
                  className="max-w-sm rounded-xl"
                />
              </div>
              <div className="rounded-xl border border-border/20 overflow-hidden">
                <div className="overflow-auto">
                  <table className="w-full">
                    <thead className="bg-muted/30">
                      <tr className="text-left text-muted-foreground text-sm">
                        <th className="w-12 p-4"></th>
                        <th className="p-4 font-medium">Product</th>
                        <th className="p-4 font-medium">Seller</th>
                        <th className="p-4 font-medium">Category</th>
                        <th className="p-4 font-medium">Status</th>
                        <th className="p-4 font-medium text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-card">
                      {filteredApprovals.map(row => (
                        <tr key={row.id} className="border-t border-border/10 hover:bg-muted/20 transition-colors">
                          <td className="p-4">
                            <Checkbox 
                              checked={selected.includes(row.id)} 
                              onCheckedChange={()=>toggleSelect(row.id)}
                              className="rounded-md"
                            />
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <img 
                                src={row.image} 
                                alt="" 
                                className="w-12 h-12 rounded-lg object-cover border border-border/20"
                              />
                              <div className="min-w-0 flex-1">
                                <p className="font-medium truncate">{row.title}</p>
                                <p className="text-sm text-muted-foreground">ID: {row.id}</p>
                              </div>
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                                <User className="h-4 w-4 text-primary" />
                              </div>
                              <span className="font-medium">{row.seller}</span>
                            </div>
                          </td>
                          <td className="p-4">
                            <Badge variant="outline" className="rounded-full">
                              {row.category}
                            </Badge>
                          </td>
                          <td className="p-4">
                            <Badge 
                              variant={row.status==='Pending'?'secondary':row.status==='Approved'?'default':'destructive'}
                              className="rounded-full"
                            >
                              {row.status}
                            </Badge>
                          </td>
                          <td className="p-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <Button 
                                size="sm" 
                                onClick={()=>dispatch({ type:'APPROVAL_UPDATE', payload: { id: row.id, status: 'Approved' } })}
                                className="rounded-xl"
                              >
                                <CheckCircle2 className="h-4 w-4 mr-1" />
                                Approve
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline" 
                                onClick={()=>{ setReasonTarget({ id: row.id, action: 'Rejected' }); setReasonOpen(true); }}
                                className="rounded-xl hover:bg-destructive/10"
                              >
                                Reject
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {filteredApprovals.length === 0 && (
                    <div className="text-center py-12">
                      <CheckCircle2 className="h-12 w-12 text-emerald-500 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">All caught up!</h3>
                      <p className="text-muted-foreground mb-4">No pending approvals at this time.</p>
                      <Button variant="outline" className="rounded-xl">
                        <Plus className="h-4 w-4 mr-2" />
                        Refresh List
                      </Button>
                    </div>
                  )}
                </div>
              </div>
              </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="categories" className="space-y-6">
          <Card className="glass-panel border-secondary/10">
            <CardHeader className="pb-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <CardTitle className="text-xl font-semibold flex items-center gap-2">
                  <Boxes className="h-5 w-5 text-secondary" />
                  Category Manager
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Input 
                    placeholder="New category name" 
                    value={newName} 
                    onChange={(e)=>setNewName(e.target.value)} 
                    className="rounded-xl"
                  />
                  <Button 
                    size="sm" 
                    onClick={()=>{ if (newName) { dispatch({ type:'CATEGORY_ADD', payload: { name: newName } }); setNewName(""); } }}
                    className="rounded-xl"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Root
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {state.categories.map((n)=> renderNode(n))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="brands" className="space-y-6">
          <Card className="glass-panel border-accent/10">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-semibold flex items-center gap-2">
                <Star className="h-5 w-5 text-accent" />
                Brand Verification
                <Badge variant="secondary" className="ml-auto rounded-full">
                  {state.brands.length} requests
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-xl border border-border/20 overflow-hidden">
                <div className="overflow-auto">
                  <table className="w-full">
                    <thead className="bg-muted/30">
                      <tr className="text-left text-muted-foreground text-sm">
                        <th className="p-4 font-medium">Brand</th>
                        <th className="p-4 font-medium">Seller</th>
                        <th className="p-4 font-medium">Documentation</th>
                        <th className="p-4 font-medium">Status</th>
                        <th className="p-4 font-medium text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-card">
                      {state.brands.map(b => (
                        <tr key={b.id} className="border-t border-border/10 hover:bg-muted/20 transition-colors">
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center">
                                <Star className="h-5 w-5 text-accent" />
                              </div>
                              <span className="font-medium">{b.brand}</span>
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                                <User className="h-4 w-4 text-primary" />
                              </div>
                              <span>{b.seller}</span>
                            </div>
                          </td>
                          <td className="p-4">
                            <Button variant="outline" size="sm" asChild className="rounded-xl">
                              <a href={b.docUrl} target="_blank" rel="noopener noreferrer">
                                View Documents
                              </a>
                            </Button>
                          </td>
                          <td className="p-4">
                            <Badge 
                              variant={b.status==='Pending'?'secondary':b.status==='Approved'?'default':'destructive'}
                              className="rounded-full"
                            >
                              {b.status}
                            </Badge>
                          </td>
                          <td className="p-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <Button 
                                size="sm" 
                                onClick={()=>dispatch({ type:'BRAND_UPDATE', payload: { id: b.id, status: 'Approved' } })}
                                className="rounded-xl"
                              >
                                Approve
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline" 
                                onClick={()=>dispatch({ type:'BRAND_UPDATE', payload: { id: b.id, status: 'Rejected' } })}
                                className="rounded-xl hover:bg-destructive/10"
                              >
                                Reject
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {state.brands.length === 0 && (
                    <div className="text-center py-12">
                      <Star className="h-12 w-12 text-accent mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">No brand requests</h3>
                      <p className="text-muted-foreground">Brand verification requests will appear here.</p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={reasonOpen} onOpenChange={setReasonOpen}>
        <DialogContent className="rounded-xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              Reject Product
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Please provide a clear reason for rejection to help the seller improve their submission.
            </p>
            <Textarea 
              value={reason} 
              onChange={(e)=>setReason(e.target.value)} 
              placeholder="Enter rejection reason..."
              className="rounded-xl min-h-[100px]"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={()=>setReasonOpen(false)} className="rounded-xl">
              Cancel
            </Button>
            <Button onClick={submitReason} disabled={!reason} className="rounded-xl">
              Submit Rejection
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminCatalog;

