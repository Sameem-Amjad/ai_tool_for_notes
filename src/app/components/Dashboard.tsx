import { Users, FileText, Brain, TrendingUp, Activity, CreditCard, DollarSign } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { mockUsers, mockNotes, mockAIJobs } from "../lib/mockData";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export function Dashboard() {
  const activeUsers = mockUsers.filter((u) => u.status === "active").length;
  const totalNotes = mockNotes.length;
  const processingJobs = mockAIJobs.filter(
    (j) => j.status === "processing" || j.status === "pending"
  ).length;
  const completedToday = mockNotes.filter(
    (n) => n.status === "completed" && n.updatedAt.startsWith("2026-02-27")
  ).length;
  const activeSubscriptions = mockUsers.filter((u) => u.subscription === "paid").length;
  const monthlyRevenue = activeSubscriptions * 12.99; // Example pricing

  // Mock chart data
  const userGrowthData = [
    { name: "Jan", newUsers: 45, activeUsers: 120, retainedUsers: 110 },
    { name: "Feb", newUsers: 60, activeUsers: 180, retainedUsers: 165 },
    { name: "Mar", newUsers: 38, activeUsers: 150, retainedUsers: 140 },
    { name: "Apr", newUsers: 52, activeUsers: 200, retainedUsers: 185 },
    { name: "May", newUsers: 68, activeUsers: 250, retainedUsers: 230 },
    { name: "Jun", newUsers: 72, activeUsers: 300, retainedUsers: 280 },
  ];

  const notesActivityData = [
    { name: "Mon", notes: 45 },
    { name: "Tue", notes: 52 },
    { name: "Wed", notes: 38 },
    { name: "Thu", notes: 61 },
    { name: "Fri", notes: 48 },
    { name: "Sat", notes: 25 },
    { name: "Sun", notes: 30 },
  ];

  const stats = [
    {
      title: "Active Users",
      value: activeUsers.toString(),
      change: "+12.5%",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Active Subscriptions",
      value: activeSubscriptions.toString(),
      change: "+18.2%",
      icon: CreditCard,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      title: "Monthly Revenue",
      value: `$${monthlyRevenue.toFixed(0)}`,
      change: "+23.1%",
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Total Notes",
      value: totalNotes.toString(),
      change: "+8.3%",
      icon: FileText,
      color: "text-cyan-600",
      bgColor: "bg-cyan-100",
    },
    {
      title: "AI Processing",
      value: processingJobs.toString(),
      change: "active",
      icon: Brain,
      color: "text-indigo-600",
      bgColor: "bg-indigo-100",
    },
    {
      title: "Completed Today",
      value: completedToday.toString(),
      change: "+15.2%",
      icon: TrendingUp,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <div className={`${stat.bgColor} p-2 rounded-lg`}>
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900">
                  {stat.value}
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  <span className="text-green-600 font-medium">
                    {stat.change}
                  </span>{" "}
                  from last month
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>User Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={userGrowthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="newUsers"
                  stroke="#10b981"
                  strokeWidth={2}
                  name="New Users"
                />
                <Line
                  type="monotone"
                  dataKey="activeUsers"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  name="Active Users"
                />
                <Line
                  type="monotone"
                  dataKey="retainedUsers"
                  stroke="#8b5cf6"
                  strokeWidth={2}
                  name="Retained Users"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notes Activity (This Week)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={notesActivityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="notes" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockNotes.slice(0, 5).map((note) => (
                <div key={note.id} className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{note.title}</p>
                    <p className="text-sm text-gray-500">{note.userName}</p>
                  </div>
                  <Badge
                    variant={
                      note.status === "completed"
                        ? "default"
                        : note.status === "processing"
                        ? "secondary"
                        : "outline"
                    }
                  >
                    {note.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>AI Processing Queue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockAIJobs.map((job) => (
                <div key={job.id} className="space-y-2">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">
                        {job.noteTitle}
                      </p>
                      <p className="text-sm text-gray-500">
                        {job.userName} • {job.type}
                      </p>
                    </div>
                    <Badge
                      variant={
                        job.status === "completed"
                          ? "default"
                          : job.status === "processing"
                          ? "secondary"
                          : "outline"
                      }
                    >
                      {job.status}
                    </Badge>
                  </div>
                  {job.status === "processing" && (
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all"
                        style={{ width: `${job.progress}%` }}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5" />
            System Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">API Status</span>
                <Badge className="bg-green-500">Operational</Badge>
              </div>
              <p className="text-xs text-gray-500">All systems running normally</p>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">AI Models</span>
                <Badge className="bg-green-500">Active</Badge>
              </div>
              <p className="text-xs text-gray-500">3 models online</p>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Database</span>
                <Badge className="bg-green-500">Healthy</Badge>
              </div>
              <p className="text-xs text-gray-500">98.5% uptime this month</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}