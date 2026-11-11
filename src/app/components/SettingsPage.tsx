import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import { Separator } from "./ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Save, Key, Bell, Shield, Database, Brain, FileText, Mic, Upload, Video, File, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { aiModels } from "../lib/mockData";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export function SettingsPage() {
  const handleSave = () => {
    toast.success("Settings saved successfully!");
  };

  const [autoLoadBalancing, setAutoLoadBalancing] = useState(true);
  const [loadThreshold, setLoadThreshold] = useState(80);

  // Model selection by input type
  const [textModel, setTextModel] = useState("free-text-1");
  const [audioModel, setAudioModel] = useState("free-audio-1");
  const [recordedAudioModel, setRecordedAudioModel] = useState("free-audio-1");
  const [fileModel, setFileModel] = useState("free-file-1");
  const [videoModel, setVideoModel] = useState("paid-vision-1");

  const getInputTypeIcon = (type: string) => {
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
      default:
        return <Brain className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="api">
        <TabsList>
          <TabsTrigger value="api">API Settings</TabsTrigger>
          <TabsTrigger value="ai-models">AI Models</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="database">Database</TabsTrigger>
        </TabsList>

        {/* API Settings */}
        <TabsContent value="api" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Key className="w-5 h-5" />
                <CardTitle>API Configuration</CardTitle>
              </div>
              <CardDescription>
                Configure API endpoints and authentication for mobile app
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="api-url">API Base URL</Label>
                <Input
                  id="api-url"
                  placeholder="https://api.example.com"
                  defaultValue="https://api.example.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="api-key">API Key</Label>
                <Input
                  id="api-key"
                  type="password"
                  placeholder="YOUR_API_KEY_HERE"
                  defaultValue="sk_live_xxxxxxxxxxxxx"
                />
                <p className="text-sm text-gray-500">
                  This key is used by mobile apps to authenticate requests
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="webhook-url">Webhook URL</Label>
                <Input
                  id="webhook-url"
                  placeholder="https://yourapp.com/webhooks"
                />
                <p className="text-sm text-gray-500">
                  Receive notifications when notes are processed
                </p>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Enable API Access</p>
                  <p className="text-sm text-gray-500">
                    Allow mobile apps to connect to this admin panel
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Rate Limiting</p>
                  <p className="text-sm text-gray-500">
                    Limit API requests to 100 per minute per user
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <Button onClick={handleSave}>
                <Save className="w-4 h-4 mr-2" />
                Save API Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* AI Models */}
        <TabsContent value="ai-models" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Brain className="w-5 h-5" />
                <CardTitle>API Keys Configuration</CardTitle>
              </div>
              <CardDescription>
                Configure API keys for different AI providers
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="openai-key">OpenAI API Key</Label>
                <Input
                  id="openai-key"
                  type="password"
                  placeholder="sk-xxxxxxxxxxxxx"
                  defaultValue="sk-xxxxxxxxxxxxx"
                />
                <p className="text-sm text-gray-500">
                  Used for GPT-4, GPT-3.5, and Whisper models
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="anthropic-key">Anthropic API Key</Label>
                <Input
                  id="anthropic-key"
                  type="password"
                  placeholder="sk-ant-xxxxxxxxxxxxx"
                  defaultValue="sk-ant-xxxxxxxxxxxxx"
                />
                <p className="text-sm text-gray-500">
                  Used for Claude models
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="google-key">Google AI API Key</Label>
                <Input
                  id="google-key"
                  type="password"
                  placeholder="AIzaSyxxxxxxxxxxxxx"
                />
                <p className="text-sm text-gray-500">
                  Used for Gemini models
                </p>
              </div>

              <Button onClick={handleSave}>
                <Save className="w-4 h-4 mr-2" />
                Save API Keys
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Model Selection by Input Type</CardTitle>
              <CardDescription>
                Configure which AI model to use for each input type
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Text Input */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-600" />
                  <Label className="text-base">Text Input</Label>
                </div>
                <Select value={textModel} onValueChange={setTextModel}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="free-text-1">GPT-3.5 Turbo (Free)</SelectItem>
                    <SelectItem value="paid-text-1">GPT-4 Turbo (Premium)</SelectItem>
                    <SelectItem value="free-file-1">Claude Instant (Free)</SelectItem>
                    <SelectItem value="paid-file-1">Claude 3 Opus (Premium)</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-gray-500">
                  Current: {aiModels.find((m) => m.id === textModel)?.name}
                </p>
              </div>

              <Separator />

              {/* Recorded Audio */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Mic className="w-5 h-5 text-green-600" />
                  <Label className="text-base">Voice Recording</Label>
                </div>
                <Select value={recordedAudioModel} onValueChange={setRecordedAudioModel}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="free-audio-1">Whisper Base (Free)</SelectItem>
                    <SelectItem value="paid-audio-1">Whisper Large V3 (Premium)</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-gray-500">
                  Current: {aiModels.find((m) => m.id === recordedAudioModel)?.name}
                </p>
              </div>

              <Separator />

              {/* Audio Upload */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Upload className="w-5 h-5 text-purple-600" />
                  <Label className="text-base">Audio Upload</Label>
                </div>
                <Select value={audioModel} onValueChange={setAudioModel}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="free-audio-1">Whisper Base (Free)</SelectItem>
                    <SelectItem value="paid-audio-1">Whisper Large V3 (Premium)</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-gray-500">
                  Current: {aiModels.find((m) => m.id === audioModel)?.name}
                </p>
              </div>

              <Separator />

              {/* File Upload */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <File className="w-5 h-5 text-orange-600" />
                  <Label className="text-base">File Upload (PDF, Word, etc.)</Label>
                </div>
                <Select value={fileModel} onValueChange={setFileModel}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="free-file-1">Claude Instant (Free)</SelectItem>
                    <SelectItem value="paid-file-1">Claude 3 Opus (Premium)</SelectItem>
                    <SelectItem value="paid-multimodal-1">Gemini 1.5 Pro (Premium)</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-gray-500">
                  Current: {aiModels.find((m) => m.id === fileModel)?.name}
                </p>
              </div>

              <Separator />

              {/* Video Link */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Video className="w-5 h-5 text-red-600" />
                  <Label className="text-base">Video Link</Label>
                </div>
                <Select value={videoModel} onValueChange={setVideoModel}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="paid-vision-1">GPT-4 Vision (Premium)</SelectItem>
                    <SelectItem value="paid-multimodal-1">Gemini 1.5 Pro (Premium)</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-gray-500">
                  Current: {aiModels.find((m) => m.id === videoModel)?.name}
                </p>
              </div>

              <Button onClick={handleSave} className="w-full">
                <Save className="w-4 h-4 mr-2" />
                Save Model Configuration
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Intelligent Load Balancing</CardTitle>
              <CardDescription>
                Automatically shift to alternative models when load is too high
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Enable Auto Load Balancing</p>
                  <p className="text-sm text-gray-500">
                    Automatically switch to less loaded models when threshold is reached
                  </p>
                </div>
                <Switch
                  checked={autoLoadBalancing}
                  onCheckedChange={setAutoLoadBalancing}
                />
              </div>

              {autoLoadBalancing && (
                <>
                  <Separator />

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label>Load Threshold (%)</Label>
                      <span className="text-sm font-medium text-gray-900">
                        {loadThreshold}%
                      </span>
                    </div>
                    <Input
                      type="range"
                      min="50"
                      max="100"
                      value={loadThreshold}
                      onChange={(e) => setLoadThreshold(Number(e.target.value))}
                      className="w-full"
                    />
                    <p className="text-sm text-gray-500">
                      When a model reaches {loadThreshold}% load, requests will be routed to an alternative model
                    </p>
                  </div>

                  <Separator />

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-blue-900 text-sm">
                          Load Balancing Strategy
                        </p>
                        <p className="text-sm text-blue-800 mt-1">
                          When a model exceeds the threshold, the system will automatically select the next available model with similar capabilities and lower load for the same tier (Free/Premium).
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              )}

              <Button onClick={handleSave}>
                <Save className="w-4 h-4 mr-2" />
                Save Load Balancing Settings
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Processing Rules</CardTitle>
              <CardDescription>
                Configure AI processing behavior
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Auto-process new notes</p>
                  <p className="text-sm text-gray-500">
                    Automatically process notes with AI when uploaded
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Tier-based model selection</p>
                  <p className="text-sm text-gray-500">
                    Free users use basic models, paid users use premium models
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Retry failed processing</p>
                  <p className="text-sm text-gray-500">
                    Automatically retry with alternative model if processing fails
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <Button onClick={handleSave}>
                <Save className="w-4 h-4 mr-2" />
                Save Processing Rules
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Current Model Status</CardTitle>
              <CardDescription>
                Real-time load and availability of AI models
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {aiModels.map((model) => {
                  const isOverloaded = model.load >= loadThreshold;
                  return (
                    <div key={model.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold text-gray-900">{model.name}</h4>
                            {isOverloaded && autoLoadBalancing && (
                              <Badge variant="destructive" className="text-xs">
                                High Load
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-500">
                            {model.provider.toUpperCase()} • {model.inputTypes.join(", ")}
                          </p>
                        </div>
                        <Badge variant={model.tier === "paid" ? "default" : "secondary"}>
                          {model.tier === "paid" ? "Premium" : "Free"}
                        </Badge>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Current Load</span>
                          <span className={`font-medium ${isOverloaded ? "text-red-600" : "text-gray-900"}`}>
                            {model.load}%
                          </span>
                        </div>
                        <Progress 
                          value={model.load} 
                          className={`h-2 ${isOverloaded ? "[&>div]:bg-red-500" : ""}`}
                        />
                        {isOverloaded && autoLoadBalancing && (
                          <p className="text-xs text-red-600">
                            ⚠ Load balancing active - requests may be routed to alternative models
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                <CardTitle>Notification Preferences</CardTitle>
              </div>
              <CardDescription>
                Manage how you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Email Notifications</p>
                  <p className="text-sm text-gray-500">
                    Receive email updates about system events
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">New User Registration</p>
                  <p className="text-sm text-gray-500">
                    Get notified when new users sign up
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">AI Processing Complete</p>
                  <p className="text-sm text-gray-500">
                    Notify when AI processing jobs finish
                  </p>
                </div>
                <Switch />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">System Errors</p>
                  <p className="text-sm text-gray-500">
                    Alert for critical system errors
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="admin-email">Admin Email</Label>
                <Input
                  id="admin-email"
                  type="email"
                  defaultValue="admin@example.com"
                />
              </div>

              <Button onClick={handleSave}>
                <Save className="w-4 h-4 mr-2" />
                Save Notification Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security */}
        <TabsContent value="security" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                <CardTitle>Security Settings</CardTitle>
              </div>
              <CardDescription>
                Configure security and authentication options
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Two-Factor Authentication</p>
                  <p className="text-sm text-gray-500">
                    Add an extra layer of security to admin accounts
                  </p>
                </div>
                <Switch />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">IP Whitelisting</p>
                  <p className="text-sm text-gray-500">
                    Only allow access from specific IP addresses
                  </p>
                </div>
                <Switch />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Session Timeout</p>
                  <p className="text-sm text-gray-500">
                    Auto-logout after 30 minutes of inactivity
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input id="current-password" type="password" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input id="new-password" type="password" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input id="confirm-password" type="password" />
              </div>

              <Button onClick={handleSave}>
                <Save className="w-4 h-4 mr-2" />
                Update Password
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Database */}
        <TabsContent value="database" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Database className="w-5 h-5" />
                <CardTitle>Database Configuration</CardTitle>
              </div>
              <CardDescription>
                Manage database connection and backup settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="db-host">Database Host</Label>
                <Input
                  id="db-host"
                  placeholder="localhost"
                  defaultValue="localhost"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="db-name">Database Name</Label>
                <Input
                  id="db-name"
                  placeholder="ainotes_db"
                  defaultValue="ainotes_db"
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Automatic Backups</p>
                  <p className="text-sm text-gray-500">
                    Daily backups at 2:00 AM
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Backup Retention</p>
                  <p className="text-sm text-gray-500">
                    Keep backups for 30 days
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <Separator />

              <div className="space-y-2">
                <p className="font-medium">Database Status</p>
                <div className="flex items-center gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Total Size</p>
                    <p className="font-medium">2.4 GB</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Last Backup</p>
                    <p className="font-medium">2 hours ago</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Status</p>
                    <p className="font-medium text-green-600">Healthy</p>
                  </div>
                </div>
              </div>

              <Button onClick={handleSave}>
                <Save className="w-4 h-4 mr-2" />
                Save Database Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
