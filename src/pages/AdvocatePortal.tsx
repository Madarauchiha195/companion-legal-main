
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/contexts/AuthContext";
import Logo from "@/components/Logo";
import UserAvatar from "@/components/UserAvatar";
import { 
  Users, 
  Calendar, 
  Clock, 
  FileText, 
  ChevronRight, 
  Briefcase, 
  Search,
  LogOut,
  Settings,
  Home,
  LayoutDashboard,
  Inbox,
  User
} from "lucide-react";

// Mock case data
const mockCases = [
  {
    id: 'case1',
    title: 'Property Dispute - Singh vs. Mehta',
    domain: 'Property Law',
    status: 'New',
    clientName: 'Raj Singh',
    date: '2023-07-15',
    penalty: '₹50,000',
    severity: 'Medium',
  },
  {
    id: 'case2',
    title: 'Consumer Complaint - Faulty Electronics',
    domain: 'Consumer Rights',
    status: 'Active',
    clientName: 'Priya Sharma',
    date: '2023-08-02',
    penalty: '₹15,000',
    severity: 'Low',
  },
  {
    id: 'case3',
    title: 'Workplace Harassment Claim',
    domain: 'Employment Law',
    status: 'Urgent',
    clientName: 'Ankit Patel',
    date: '2023-06-28',
    penalty: '₹100,000',
    severity: 'High',
  },
];

const AdvocatePortal = () => {
  const { user, isLoading, signOut } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCases, setFilteredCases] = useState(mockCases);

  useEffect(() => {
    // Redirect if not authenticated
    if (!isLoading && !user) {
      navigate('/');
    }
  }, [user, isLoading, navigate]);

  useEffect(() => {
    if (searchQuery) {
      const filtered = mockCases.filter(
        (c) => 
          c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.domain.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredCases(filtered);
    } else {
      setFilteredCases(mockCases);
    }
  }, [searchQuery]);

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  if (isLoading || !user) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-t-2 border-brand-500 rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Logo size="md" />
              <span className="ml-2 text-sm text-muted-foreground">
                | Advocate Portal
              </span>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative md:w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search cases..." 
                  className="pl-8"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
              </div>
              <UserAvatar showName />
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left Sidebar */}
          <nav className="w-full md:w-64 space-y-2">
            <Card>
              <CardContent className="p-3">
                <div className="space-y-1">
                  <Button 
                    variant={activeTab === "dashboard" ? "default" : "ghost"} 
                    className="w-full justify-start"
                    onClick={() => setActiveTab("dashboard")}
                  >
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    Dashboard
                  </Button>
                  <Button 
                    variant={activeTab === "cases" ? "default" : "ghost"} 
                    className="w-full justify-start"
                    onClick={() => setActiveTab("cases")}
                  >
                    <Briefcase className="mr-2 h-4 w-4" />
                    Cases
                  </Button>
                  <Button 
                    variant={activeTab === "messages" ? "default" : "ghost"} 
                    className="w-full justify-start"
                    onClick={() => setActiveTab("messages")}
                  >
                    <Inbox className="mr-2 h-4 w-4" />
                    Messages
                  </Button>
                  <Button 
                    variant={activeTab === "profile" ? "default" : "ghost"} 
                    className="w-full justify-start"
                    onClick={() => setActiveTab("profile")}
                  >
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Button>
                  <Button 
                    variant={activeTab === "settings" ? "default" : "ghost"} 
                    className="w-full justify-start"
                    onClick={() => setActiveTab("settings")}
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-sm font-medium">Statistics</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Active Cases</span>
                    <span className="text-sm font-medium">12</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Pending Approvals</span>
                    <span className="text-sm font-medium">3</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Completed Cases</span>
                    <span className="text-sm font-medium">27</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </nav>

          {/* Main Content */}
          <div className="flex-1">
            <Tabs defaultValue="all" className="w-full">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold">Case Dashboard</h1>
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="new">New</TabsTrigger>
                  <TabsTrigger value="active">Active</TabsTrigger>
                  <TabsTrigger value="urgent">Urgent</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="all" className="space-y-4">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="hover-scale">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Total Clients</p>
                          <h3 className="text-2xl font-bold mt-1">42</h3>
                        </div>
                        <div className="h-12 w-12 bg-brand-100 rounded-full flex items-center justify-center">
                          <Users className="h-6 w-6 text-brand-600" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="hover-scale">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">This Month</p>
                          <h3 className="text-2xl font-bold mt-1">₹82,400</h3>
                        </div>
                        <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                          <Calendar className="h-6 w-6 text-green-600" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="hover-scale">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Avg. Resolution Time</p>
                          <h3 className="text-2xl font-bold mt-1">23 Days</h3>
                        </div>
                        <div className="h-12 w-12 bg-orange-100 rounded-full flex items-center justify-center">
                          <Clock className="h-6 w-6 text-orange-600" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Recent Cases */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Recent Cases</CardTitle>
                    <CardDescription>
                      Your latest case assignments and updates
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {filteredCases.map((caseItem) => (
                        <div key={caseItem.id} className="hover-scale">
                          <div className="border rounded-lg p-4 hover:bg-blue-50 transition-colors cursor-pointer">
                            <div className="flex justify-between">
                              <div>
                                <div className="flex items-center gap-2 mb-1">
                                  <h3 className="font-medium">{caseItem.title}</h3>
                                  <Badge
                                    className={`${
                                      caseItem.status === 'Urgent'
                                        ? 'bg-red-100 text-red-800 hover:bg-red-100'
                                        : caseItem.status === 'Active'
                                        ? 'bg-green-100 text-green-800 hover:bg-green-100'
                                        : 'bg-blue-100 text-blue-800 hover:bg-blue-100'
                                    }`}
                                  >
                                    {caseItem.status}
                                  </Badge>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                  <div className="flex items-center gap-1">
                                    <FileText className="h-3 w-3" />
                                    <span>{caseItem.domain}</span>
                                  </div>
                                  <span>•</span>
                                  <div className="flex items-center gap-1">
                                    <Users className="h-3 w-3" />
                                    <span>{caseItem.clientName}</span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex flex-col items-end">
                                <span className="text-sm font-medium">{caseItem.penalty}</span>
                                <span className="text-xs text-muted-foreground">Penalty Value</span>
                              </div>
                            </div>
                            <Separator className="my-3" />
                            <div className="flex justify-between items-center">
                              <div className="flex items-center gap-1 text-sm">
                                <Calendar className="h-3 w-3 text-muted-foreground" />
                                <span className="text-muted-foreground">Received: {new Date(caseItem.date).toLocaleDateString()}</span>
                              </div>
                              <Button variant="ghost" size="sm" className="text-brand-600 flex items-center gap-1 h-8">
                                View Details
                                <ChevronRight className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="new">
                <Card>
                  <CardHeader>
                    <CardTitle>New Cases</CardTitle>
                    <CardDescription>
                      Review and accept new case assignments
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {filteredCases
                      .filter(c => c.status === 'New')
                      .map((caseItem) => (
                        <div key={caseItem.id} className="hover-scale mb-4">
                          <div className="border rounded-lg p-4 hover:bg-blue-50 transition-colors cursor-pointer">
                            <div className="flex justify-between">
                              <div>
                                <div className="flex items-center gap-2 mb-1">
                                  <h3 className="font-medium">{caseItem.title}</h3>
                                  <Badge
                                    className="bg-blue-100 text-blue-800 hover:bg-blue-100"
                                  >
                                    New
                                  </Badge>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                  <div className="flex items-center gap-1">
                                    <FileText className="h-3 w-3" />
                                    <span>{caseItem.domain}</span>
                                  </div>
                                  <span>•</span>
                                  <div className="flex items-center gap-1">
                                    <Users className="h-3 w-3" />
                                    <span>{caseItem.clientName}</span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex flex-col items-end">
                                <span className="text-sm font-medium">{caseItem.penalty}</span>
                                <span className="text-xs text-muted-foreground">Penalty Value</span>
                              </div>
                            </div>
                            <Separator className="my-3" />
                            <div className="flex justify-between items-center">
                              <div className="flex items-center gap-1 text-sm">
                                <Calendar className="h-3 w-3 text-muted-foreground" />
                                <span className="text-muted-foreground">Received: {new Date(caseItem.date).toLocaleDateString()}</span>
                              </div>
                              <div className="flex gap-2">
                                <Button variant="outline" size="sm" className="h-8">
                                  Decline
                                </Button>
                                <Button size="sm" className="h-8">
                                  Accept Case
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    {filteredCases.filter(c => c.status === 'New').length === 0 && (
                      <div className="text-center py-8 text-muted-foreground">
                        No new cases available at the moment
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="active">
                <Card>
                  <CardHeader>
                    <CardTitle>Active Cases</CardTitle>
                    <CardDescription>
                      Cases you are currently working on
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {filteredCases
                      .filter(c => c.status === 'Active')
                      .map((caseItem) => (
                        <div key={caseItem.id} className="hover-scale mb-4">
                          <div className="border rounded-lg p-4 hover:bg-blue-50 transition-colors cursor-pointer">
                            <div className="flex justify-between">
                              <div>
                                <div className="flex items-center gap-2 mb-1">
                                  <h3 className="font-medium">{caseItem.title}</h3>
                                  <Badge
                                    className="bg-green-100 text-green-800 hover:bg-green-100"
                                  >
                                    Active
                                  </Badge>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                  <div className="flex items-center gap-1">
                                    <FileText className="h-3 w-3" />
                                    <span>{caseItem.domain}</span>
                                  </div>
                                  <span>•</span>
                                  <div className="flex items-center gap-1">
                                    <Users className="h-3 w-3" />
                                    <span>{caseItem.clientName}</span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex flex-col items-end">
                                <span className="text-sm font-medium">{caseItem.penalty}</span>
                                <span className="text-xs text-muted-foreground">Penalty Value</span>
                              </div>
                            </div>
                            <Separator className="my-3" />
                            <div className="flex justify-between items-center">
                              <div className="flex items-center gap-1 text-sm">
                                <Calendar className="h-3 w-3 text-muted-foreground" />
                                <span className="text-muted-foreground">Started: {new Date(caseItem.date).toLocaleDateString()}</span>
                              </div>
                              <Button variant="ghost" size="sm" className="text-brand-600 flex items-center gap-1 h-8">
                                Continue Working
                                <ChevronRight className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    {filteredCases.filter(c => c.status === 'Active').length === 0 && (
                      <div className="text-center py-8 text-muted-foreground">
                        No active cases at the moment
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="urgent">
                <Card>
                  <CardHeader>
                    <CardTitle>Urgent Cases</CardTitle>
                    <CardDescription>
                      Cases requiring immediate attention
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {filteredCases
                      .filter(c => c.status === 'Urgent')
                      .map((caseItem) => (
                        <div key={caseItem.id} className="hover-scale mb-4">
                          <div className="border rounded-lg p-4 hover:bg-blue-50 transition-colors cursor-pointer">
                            <div className="flex justify-between">
                              <div>
                                <div className="flex items-center gap-2 mb-1">
                                  <h3 className="font-medium">{caseItem.title}</h3>
                                  <Badge
                                    className="bg-red-100 text-red-800 hover:bg-red-100"
                                  >
                                    Urgent
                                  </Badge>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                  <div className="flex items-center gap-1">
                                    <FileText className="h-3 w-3" />
                                    <span>{caseItem.domain}</span>
                                  </div>
                                  <span>•</span>
                                  <div className="flex items-center gap-1">
                                    <Users className="h-3 w-3" />
                                    <span>{caseItem.clientName}</span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex flex-col items-end">
                                <span className="text-sm font-medium">{caseItem.penalty}</span>
                                <span className="text-xs text-muted-foreground">Penalty Value</span>
                              </div>
                            </div>
                            <Separator className="my-3" />
                            <div className="flex justify-between items-center">
                              <div className="flex items-center gap-1 text-sm">
                                <Calendar className="h-3 w-3 text-muted-foreground" />
                                <span className="text-muted-foreground">Deadline: {new Date(caseItem.date).toLocaleDateString()}</span>
                              </div>
                              <Button size="sm" className="flex items-center gap-1 h-8 bg-red-600 hover:bg-red-700 text-white">
                                Review Immediately
                                <ChevronRight className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    {filteredCases.filter(c => c.status === 'Urgent').length === 0 && (
                      <div className="text-center py-8 text-muted-foreground">
                        No urgent cases at the moment
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvocatePortal;
