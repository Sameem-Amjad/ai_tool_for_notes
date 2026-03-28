import { useState } from "react";
import { mockNotes, Note, aiModels } from "../lib/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Textarea } from "./ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Search, Eye, Sparkles, Filter, FileText, Mic, Upload, Video, Crown, File, Clock } from "lucide-react";
import { toast } from "sonner";

export function NotesPage() {
  const [notes, setNotes] = useState<Note[]>(mockNotes);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [inputTypeFilter, setInputTypeFilter] = useState<string>("all");
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  const filteredNotes = notes.filter((note) => {
    const matchesSearch =
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.userName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || note.status === statusFilter;

    const matchesInputType =
      inputTypeFilter === "all" || note.inputType === inputTypeFilter;

    return matchesSearch && matchesStatus && matchesInputType;
  });

  const handleProcessNote = (noteId: string) => {
    const note = notes.find((n) => n.id === noteId);
    if (!note) return;

    // Select appropriate AI model based on user subscription and input type
    const availableModels = aiModels.filter(
      (model) =>
        model.tier === note.userSubscription &&
        model.inputTypes.includes(note.inputType)
    );

    const selectedModel =
      availableModels.length > 0 ? availableModels[0] : aiModels[0];

    setNotes(
      notes.map((n) =>
        n.id === noteId
          ? {
              ...n,
              status: "processing" as const,
              aiModel: selectedModel.name,
            }
          : n
      )
    );

    // Simulate AI processing
    setTimeout(() => {
      setNotes((prevNotes) =>
        prevNotes.map((n) =>
          n.id === noteId
            ? {
                ...n,
                status: "completed" as const,
                aiProcessed: true,
                aiResult: `AI processed with ${selectedModel.name}: ${n.content.substring(0, 100)}...`,
              }
            : n
        )
      );
      toast.success(`Note processed successfully with ${selectedModel.name}!`);
    }, 3000);

    toast.info(`Processing note with ${selectedModel.name}...`);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getInputTypeIcon = (type: Note["inputType"]) => {
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

  const getInputTypeLabel = (type: Note["inputType"]) => {
    switch (type) {
      case "text":
        return "Text";
      case "audio":
        return "Audio Upload";
      case "recorded_audio":
        return "Voice Recording";
      case "file":
        return "File Upload";
      case "video_link":
        return "Video Link";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {[
          {
            label: "Total Notes",
            value: notes.length,
            color: "text-blue-600",
          },
          {
            label: "Pending",
            value: notes.filter((n) => n.status === "pending").length,
            color: "text-yellow-600",
          },
          {
            label: "Processing",
            value: notes.filter((n) => n.status === "processing").length,
            color: "text-purple-600",
          },
          {
            label: "Completed",
            value: notes.filter((n) => n.status === "completed").length,
            color: "text-green-600",
          },
          {
            label: "Premium Users",
            value: notes.filter((n) => n.userSubscription === "paid").length,
            color: "text-orange-600",
          },
        ].map((stat) => (
          <Card key={stat.label}>
            <CardContent className="pt-6">
              <p className="text-sm text-gray-600">{stat.label}</p>
              <p className={`text-3xl font-bold ${stat.color} mt-2`}>
                {stat.value}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search notes by title, content, or user..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={inputTypeFilter} onValueChange={setInputTypeFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Input Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="text">Text</SelectItem>
                <SelectItem value="recorded_audio">Voice Recording</SelectItem>
                <SelectItem value="audio">Audio Upload</SelectItem>
                <SelectItem value="file">File Upload</SelectItem>
                <SelectItem value="video_link">Video Link</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Notes Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredNotes.map((note) => (
          <Card key={note.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    {getInputTypeIcon(note.inputType)}
                    <Badge variant="outline" className="text-xs">
                      {getInputTypeLabel(note.inputType)}
                    </Badge>
                    {note.userSubscription === "paid" && (
                      <Crown className="w-4 h-4 text-yellow-500" />
                    )}
                  </div>
                  <CardTitle className="text-lg">{note.title}</CardTitle>
                  <p className="text-sm text-gray-500 mt-1">
                    By {note.userName} • {note.userSubscription === "paid" ? "Premium" : "Free"}
                  </p>
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
            </CardHeader>
            <CardContent className="space-y-4">
              {/* File/Audio Info */}
              {(note.inputType === "audio" ||
                note.inputType === "file" ||
                note.inputType === "recorded_audio") &&
                note.fileName && (
                  <div className="bg-gray-50 rounded-lg p-3 text-sm">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-700">
                          {note.fileName}
                        </p>
                        <p className="text-gray-500 text-xs">
                          {note.fileSize}
                          {note.duration && ` • ${note.duration}`}
                        </p>
                      </div>
                      {note.duration && (
                        <Clock className="w-4 h-4 text-gray-400" />
                      )}
                    </div>
                  </div>
                )}

              {note.aiProcessed && note.aiModel && (
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-purple-600" />
                    <span className="text-sm font-medium text-purple-900">
                      Processed with {note.aiModel}
                    </span>
                    <Badge variant="outline" className="ml-auto text-xs">
                      {note.userSubscription === "paid" ? "Premium" : "Basic"}
                    </Badge>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                <div className="text-xs text-gray-500">
                  {formatDate(note.updatedAt)}
                </div>
                <div className="flex gap-2">
                  {!note.aiProcessed && (
                    <Button
                      size="sm"
                      onClick={() => handleProcessNote(note.id)}
                      disabled={note.status === "processing"}
                    >
                      <Sparkles className="w-4 h-4 mr-2" />
                      Process AI
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredNotes.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center text-gray-500">
            No notes found matching your filters
          </CardContent>
        </Card>
      )}

      {/* Note Details Dialog */}
      <Dialog
        open={selectedNote !== null}
        onOpenChange={(open) => !open && setSelectedNote(null)}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <div className="flex items-center gap-2">
              {selectedNote && getInputTypeIcon(selectedNote.inputType)}
              <DialogTitle>{selectedNote?.title}</DialogTitle>
            </div>
            <DialogDescription>
              By {selectedNote?.userName} ({selectedNote?.userSubscription === "paid" ? "Premium" : "Free"}) •{" "}
              {selectedNote && formatDate(selectedNote.createdAt)}
            </DialogDescription>
          </DialogHeader>
          {selectedNote && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Badge variant="outline">
                  {getInputTypeLabel(selectedNote.inputType)}
                </Badge>
                <Badge
                  variant={
                    selectedNote.status === "completed"
                      ? "default"
                      : selectedNote.status === "processing"
                      ? "secondary"
                      : "outline"
                  }
                >
                  {selectedNote.status}
                </Badge>
                {selectedNote.userSubscription === "paid" && (
                  <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500">
                    <Crown className="w-3 h-3 mr-1" />
                    Premium User
                  </Badge>
                )}
              </div>

              {/* File/Audio Info */}
              {(selectedNote.inputType === "audio" ||
                selectedNote.inputType === "file" ||
                selectedNote.inputType === "recorded_audio") &&
                selectedNote.fileName && (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <label className="text-sm font-medium text-gray-700">
                      File Information
                    </label>
                    <div className="mt-2 space-y-1">
                      <p className="text-sm text-gray-900">
                        {selectedNote.fileName}
                      </p>
                      <p className="text-sm text-gray-500">
                        Size: {selectedNote.fileSize}
                        {selectedNote.duration && ` • Duration: ${selectedNote.duration}`}
                      </p>
                      {selectedNote.fileUrl && (
                        <p className="text-xs text-blue-600 truncate">
                          {selectedNote.fileUrl}
                        </p>
                      )}
                    </div>
                  </div>
                )}

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Content
                </label>
                <Textarea
                  value={selectedNote.content}
                  readOnly
                  className="mt-2 min-h-[150px]"
                />
              </div>

              {selectedNote.aiProcessed && selectedNote.aiResult && (
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    AI Processing Result
                  </label>
                  <div className="mt-2 bg-purple-50 border border-purple-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Sparkles className="w-5 h-5 text-purple-600" />
                      <span className="font-medium text-purple-900">
                        {selectedNote.aiModel || "AI Analysis"}
                      </span>
                      <Badge variant="outline" className="ml-auto text-xs">
                        {selectedNote.userSubscription === "paid" ? "Premium Model" : "Basic Model"}
                      </Badge>
                    </div>
                    <p className="text-purple-800">{selectedNote.aiResult}</p>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="text-sm text-gray-500">
                  AI Model: {selectedNote.aiModel || "Not processed"}
                </div>
                {!selectedNote.aiProcessed && (
                  <Button onClick={() => handleProcessNote(selectedNote.id)}>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Process with AI
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}