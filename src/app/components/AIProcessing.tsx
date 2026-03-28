import { useState, useEffect } from "react";
import { mockAIJobs, AIJob, aiModels } from "../lib/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  Brain,
  PlayCircle,
  PauseCircle,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  Clock,
  Crown,
  FileText,
  Mic,
  Upload,
  Video,
  File,
} from "lucide-react";

export function AIProcessing() {
  const [jobs, setJobs] = useState<AIJob[]>(mockAIJobs);
  const [isProcessing, setIsProcessing] = useState(true);

  // Simulate processing updates
  useEffect(() => {
    if (!isProcessing) return;

    const interval = setInterval(() => {
      setJobs((prevJobs) =>
        prevJobs.map((job) => {
          if (job.status === "processing" && job.progress < 100) {
            const newProgress = Math.min(job.progress + 5, 100);
            return {
              ...job,
              progress: newProgress,
              status: newProgress === 100 ? "completed" : "processing",
              completedAt:
                newProgress === 100 ? new Date().toISOString() : undefined,
            };
          }
          return job;
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [isProcessing]);

  const stats = {
    total: jobs.length,
    processing: jobs.filter((j) => j.status === "processing").length,
    completed: jobs.filter((j) => j.status === "completed").length,
    pending: jobs.filter((j) => j.status === "pending").length,
    failed: jobs.filter((j) => j.status === "failed").length,
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getJobIcon = (status: AIJob["status"]) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="w-5 h-5 text-green-600" />;
      case "processing":
        return <RefreshCw className="w-5 h-5 text-blue-600 animate-spin" />;
      case "failed":
        return <AlertCircle className="w-5 h-5 text-red-600" />;
      default:
        return <Clock className="w-5 h-5 text-gray-400" />;
    }
  };

  const getInputTypeIcon = (type: AIJob["inputType"]) => {
    switch (type) {
      case "text":
        return <FileText className="w-4 h-4" />;
      case "audio":
        return <Upload className="w-4 h-4" />;
      case "recorded_audio":
        return <Mic className="w-4 h-4" />;
      case "file":
        return <File className="w-4 h-4" />;
      case "video_link":
        return <Video className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium text-gray-900">
            AI Processing Queue
          </h3>
          <p className="text-sm text-gray-500">
            {stats.processing} active jobs • {stats.pending} pending
          </p>
        </div>
        <Button
          variant={isProcessing ? "destructive" : "default"}
          onClick={() => setIsProcessing(!isProcessing)}
        >
          {isProcessing ? (
            <>
              <PauseCircle className="w-4 h-4 mr-2" />
              Pause Processing
            </>
          ) : (
            <>
              <PlayCircle className="w-4 h-4 mr-2" />
              Start Processing
            </>
          )}
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          {
            label: "Total Jobs",
            value: stats.total,
            icon: Brain,
            color: "text-gray-600",
          },
          {
            label: "Processing",
            value: stats.processing,
            icon: RefreshCw,
            color: "text-blue-600",
          },
          {
            label: "Completed",
            value: stats.completed,
            icon: CheckCircle2,
            color: "text-green-600",
          },
          {
            label: "Pending",
            value: stats.pending,
            icon: Clock,
            color: "text-yellow-600",
          },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                    <p className={`text-3xl font-bold ${stat.color} mt-2`}>
                      {stat.value}
                    </p>
                  </div>
                  <Icon className={`w-8 h-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Processing Queue */}
      <Card>
        <CardHeader>
          <CardTitle>Processing Queue</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value="all">All ({stats.total})</TabsTrigger>
              <TabsTrigger value="processing">
                Processing ({stats.processing})
              </TabsTrigger>
              <TabsTrigger value="pending">
                Pending ({stats.pending})
              </TabsTrigger>
              <TabsTrigger value="completed">
                Completed ({stats.completed})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4 mt-6">
              {jobs.map((job) => (
                <JobCard key={job.id} job={job} formatTime={formatTime} getJobIcon={getJobIcon} getInputTypeIcon={getInputTypeIcon} />
              ))}
            </TabsContent>

            <TabsContent value="processing" className="space-y-4 mt-6">
              {jobs
                .filter((j) => j.status === "processing")
                .map((job) => (
                  <JobCard key={job.id} job={job} formatTime={formatTime} getJobIcon={getJobIcon} getInputTypeIcon={getInputTypeIcon} />
                ))}
            </TabsContent>

            <TabsContent value="pending" className="space-y-4 mt-6">
              {jobs
                .filter((j) => j.status === "pending")
                .map((job) => (
                  <JobCard key={job.id} job={job} formatTime={formatTime} getJobIcon={getJobIcon} getInputTypeIcon={getInputTypeIcon} />
                ))}
            </TabsContent>

            <TabsContent value="completed" className="space-y-4 mt-6">
              {jobs
                .filter((j) => j.status === "completed")
                .map((job) => (
                  <JobCard key={job.id} job={job} formatTime={formatTime} getJobIcon={getJobIcon} getInputTypeIcon={getInputTypeIcon} />
                ))}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* AI Models Status */}
      <Card>
        <CardHeader>
          <CardTitle>AI Models Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {aiModels.map((model) => (
              <div key={model.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Brain className="w-5 h-5 text-purple-600" />
                    <div>
                      <p className="font-medium text-gray-900">{model.name}</p>
                      <p className="text-sm text-gray-500">
                        Load: {model.load}%
                      </p>
                    </div>
                  </div>
                  <Badge className="bg-green-500">Active</Badge>
                </div>
                <Progress value={model.load} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function JobCard({
  job,
  formatTime,
  getJobIcon,
  getInputTypeIcon,
}: {
  job: AIJob;
  formatTime: (date: string) => string;
  getJobIcon: (status: AIJob["status"]) => JSX.Element;
  getInputTypeIcon: (type: AIJob["inputType"]) => JSX.Element;
}) {
  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-start gap-3 flex-1">
          {getJobIcon(job.status)}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              {getInputTypeIcon(job.inputType)}
              <h4 className="font-medium text-gray-900">{job.noteTitle}</h4>
              {job.userSubscription === "paid" && (
                <Crown className="w-4 h-4 text-yellow-500" />
              )}
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>{job.userName}</span>
              <span>•</span>
              <span>{job.type}</span>
              <span>•</span>
              <Badge
                variant="outline"
                className={`text-xs ${job.userSubscription === "paid" ? "border-yellow-500 text-yellow-700" : ""}`}
              >
                {job.userSubscription === "paid" ? "Premium" : "Free"}
              </Badge>
            </div>
            <div className="mt-1 text-xs text-gray-500">
              AI Model: <span className="font-medium text-gray-700">{job.aiModel}</span>
            </div>
          </div>
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
        <div className="space-y-2 mt-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Progress</span>
            <span className="font-medium text-gray-900">{job.progress}%</span>
          </div>
          <Progress value={job.progress} className="h-2" />
        </div>
      )}

      <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100 text-sm text-gray-500">
        <span>Started: {formatTime(job.startedAt)}</span>
        {job.completedAt && (
          <span className="text-green-600">Completed: {formatTime(job.completedAt)}</span>
        )}
      </div>
    </div>
  );
}