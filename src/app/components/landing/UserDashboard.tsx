import { useState } from "react";
import { Link } from "react-router";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Progress } from "../ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Brain,
  Mic,
  FileText,
  Video,
  Upload,
  Sparkles,
  Settings,
  LogOut,
  Menu,
  Bell,
  Crown,
  Search,
  Filter,
  Clock,
  CheckCircle,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";

interface Note {
  id: string;
  title: string;
  type: "text" | "audio" | "file" | "video";
  status: "processing" | "completed" | "pending";
  createdAt: string;
  aiSummary?: string;
}

export function UserDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [isRecording, setIsRecording] = useState(false);

  const [notes, setNotes] = useState<Note[]>([
    {
      id: "1",
      title: "Team Meeting Notes",
      type: "audio",
      status: "completed",
      createdAt: "2026-03-03T10:30:00Z",
      aiSummary:
        "Discussed Q2 goals, marketing strategy, and budget allocation...",
    },
    {
      id: "2",
      title: "Research Paper Summary",
      type: "file",
      status: "completed",
      createdAt: "2026-03-02T15:45:00Z",
      aiSummary:
        "Key findings from the research on AI applications in healthcare...",
    },
    {
      id: "3",
      title: "Video Tutorial Notes",
      type: "video",
      status: "processing",
      createdAt: "2026-03-03T08:20:00Z",
    },
    {
      id: "4",
      title: "Project Ideas",
      type: "text",
      status: "completed",
      createdAt: "2026-03-01T12:00:00Z",
      aiSummary: "Brainstormed several innovative project concepts...",
    },
  ]);

  const stats = {
    notesProcessed: 48,
    hoursaved: 12.5,
    storageUsed: 35,
    subscription: "Premium",
  };

  const handleStartRecording = () => {
    setIsRecording(true);
    toast.success("Recording started");
    setTimeout(() => {
      setIsRecording(false);
      toast.success("Recording saved and processing started!");
    }, 3000);
  };

  const handleFileUpload = () => {
    toast.success("File uploaded and processing started!");
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "audio":
        return <Mic className="w-4 h-4" />;
      case "file":
        return <Upload className="w-4 h-4" />;
      case "video":
        return <Video className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-700";
      case "processing":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`bg-white border-r border-gray-200 transition-all duration-300 ${
          sidebarOpen ? "w-64" : "w-20"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              {sidebarOpen && (
                <div>
                  <h1 className="font-semibold text-gray-900">AI Notes</h1>
                  <Badge variant="outline" className="text-xs mt-1">
                    <Crown className="w-3 h-3 mr-1" />
                    {stats.subscription}
                  </Badge>
                </div>
              )}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="h-8 w-8 p-0"
            >
              <Menu className="w-4 h-4" />
            </Button>
          </div>

          {/* Quick Actions */}
          <div className="p-4 space-y-2">
            <Button
              className="w-full justify-start gap-3"
              onClick={handleStartRecording}
              disabled={isRecording}
            >
              {isRecording ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Mic className="w-4 h-4" />
              )}
              {sidebarOpen && (isRecording ? "Recording..." : "Record Audio")}
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start gap-3"
              onClick={handleFileUpload}
            >
              <Upload className="w-4 h-4" />
              {sidebarOpen && "Upload File"}
            </Button>
            <Button variant="outline" className="w-full justify-start gap-3">
              <Video className="w-4 h-4" />
              {sidebarOpen && "Add Video Link"}
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1">
            <div
              className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg cursor-pointer"
              onClick={() => setActiveTab("all")}
            >
              <FileText className="w-5 h-5" />
              {sidebarOpen && <span className="font-medium">All Notes</span>}
            </div>
            <div className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg cursor-pointer">
              <Settings className="w-5 h-5" />
              {sidebarOpen && <span className="font-medium">Settings</span>}
            </div>
          </nav>

          {/* User Section */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center gap-3 px-4 py-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-white">JD</span>
              </div>
              {sidebarOpen && (
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">John Doe</p>
                  <p className="text-xs text-gray-500">john@example.com</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-200 px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">
                My Notes
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Process and manage your AI-powered notes
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="w-5 h-5" />
                <Badge className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 text-xs bg-red-500">
                  2
                </Badge>
              </Button>
              <Link to="/">
                <Button variant="ghost" size="sm">
                  <LogOut className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-8">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">
                      Notes Processed
                    </p>
                    <p className="text-3xl font-bold text-gray-900">
                      {stats.notesProcessed}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Hours Saved</p>
                    <p className="text-3xl font-bold text-gray-900">
                      {stats.hoursaved}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Clock className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Storage Used</p>
                    <p className="text-3xl font-bold text-gray-900">
                      {stats.storageUsed}%
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Upload className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
                <Progress value={stats.storageUsed} className="mt-2 h-1" />
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Subscription</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {stats.subscription}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <Crown className="w-6 h-6 text-yellow-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Notes Section */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Recent Notes</CardTitle>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Search className="w-4 h-4 mr-2" />
                    Search
                  </Button>
                  <Button variant="outline" size="sm">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="completed">Completed</TabsTrigger>
                  <TabsTrigger value="processing">Processing</TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="space-y-4 mt-6">
                  {notes.map((note) => (
                    <div
                      key={note.id}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-start gap-3 flex-1">
                          <div
                            className={`w-10 h-10 ${
                              note.type === "audio"
                                ? "bg-green-100"
                                : note.type === "file"
                                ? "bg-orange-100"
                                : note.type === "video"
                                ? "bg-red-100"
                                : "bg-blue-100"
                            } rounded-lg flex items-center justify-center`}
                          >
                            {getTypeIcon(note.type)}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 mb-1">
                              {note.title}
                            </h3>
                            <p className="text-sm text-gray-500">
                              {formatDate(note.createdAt)}
                            </p>
                          </div>
                        </div>
                        <Badge className={getStatusColor(note.status)}>
                          {note.status === "processing" && (
                            <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                          )}
                          {note.status === "completed" && (
                            <CheckCircle className="w-3 h-3 mr-1" />
                          )}
                          {note.status}
                        </Badge>
                      </div>

                      {note.aiSummary && (
                        <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 mb-3">
                          <div className="flex items-center gap-2 mb-2">
                            <Sparkles className="w-4 h-4 text-purple-600" />
                            <span className="text-sm font-medium text-purple-900">
                              AI Summary
                            </span>
                          </div>
                          <p className="text-sm text-purple-800">
                            {note.aiSummary}
                          </p>
                        </div>
                      )}

                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                        {note.status === "completed" && (
                          <>
                            <Button size="sm" variant="outline">
                              Download
                            </Button>
                            <Button size="sm" variant="outline">
                              Share
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </TabsContent>

                <TabsContent value="completed" className="space-y-4 mt-6">
                  {notes
                    .filter((n) => n.status === "completed")
                    .map((note) => (
                      <div
                        key={note.id}
                        className="border border-gray-200 rounded-lg p-4"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            {getTypeIcon(note.type)}
                            <div>
                              <h3 className="font-semibold text-gray-900">
                                {note.title}
                              </h3>
                              <p className="text-sm text-gray-500">
                                {formatDate(note.createdAt)}
                              </p>
                            </div>
                          </div>
                          <Badge className={getStatusColor(note.status)}>
                            <CheckCircle className="w-3 h-3 mr-1" />
                            {note.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                </TabsContent>

                <TabsContent value="processing" className="space-y-4 mt-6">
                  {notes
                    .filter((n) => n.status === "processing")
                    .map((note) => (
                      <div
                        key={note.id}
                        className="border border-gray-200 rounded-lg p-4"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            {getTypeIcon(note.type)}
                            <div>
                              <h3 className="font-semibold text-gray-900">
                                {note.title}
                              </h3>
                              <p className="text-sm text-gray-500">
                                {formatDate(note.createdAt)}
                              </p>
                            </div>
                          </div>
                          <Badge className={getStatusColor(note.status)}>
                            <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                            {note.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
