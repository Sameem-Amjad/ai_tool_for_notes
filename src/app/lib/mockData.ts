export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  status: "active" | "inactive" | "suspended";
  subscription: "free" | "paid";
  subscriptionExpiry?: string;
  notesCount: number;
  createdAt: string;
  lastActive: string;
}

export interface Note {
  id: string;
  userId: string;
  userName: string;
  userSubscription: "free" | "paid";
  title: string;
  content: string;
  inputType: "text" | "audio" | "recorded_audio" | "file" | "video_link";
  fileUrl?: string;
  fileName?: string;
  fileSize?: string;
  duration?: string; // for audio/video
  aiProcessed: boolean;
  aiResult?: string;
  aiModel?: string;
  category?: string;
  createdAt: string;
  updatedAt: string;
  status: "pending" | "processing" | "completed" | "failed";
}

export interface AIJob {
  id: string;
  noteId: string;
  noteTitle: string;
  userName: string;
  userSubscription: "free" | "paid";
  inputType: "text" | "audio" | "recorded_audio" | "file" | "video_link";
  type: "summarize" | "translate" | "analyze" | "extract" | "transcribe";
  aiModel: string;
  status: "pending" | "processing" | "completed" | "failed";
  progress: number;
  startedAt: string;
  completedAt?: string;
}

export interface AIModelConfig {
  id: string;
  name: string;
  provider: "openai" | "anthropic" | "google" | "huggingface";
  modelId: string;
  tier: "free" | "paid";
  inputTypes: string[];
  costPerRequest: number;
  load: number;
}

export const aiModels: AIModelConfig[] = [
  // Free Tier Models
  {
    id: "free-text-1",
    name: "GPT-3.5 Turbo",
    provider: "openai",
    modelId: "gpt-3.5-turbo",
    tier: "free",
    inputTypes: ["text"],
    costPerRequest: 0.002,
    load: 45,
  },
  {
    id: "free-audio-1",
    name: "Whisper Base",
    provider: "openai",
    modelId: "whisper-1",
    tier: "free",
    inputTypes: ["audio", "recorded_audio"],
    costPerRequest: 0.006,
    load: 32,
  },
  {
    id: "free-file-1",
    name: "Claude Instant",
    provider: "anthropic",
    modelId: "claude-instant-1.2",
    tier: "free",
    inputTypes: ["file", "text"],
    costPerRequest: 0.003,
    load: 28,
  },
  // Paid Tier Models
  {
    id: "paid-text-1",
    name: "GPT-4 Turbo",
    provider: "openai",
    modelId: "gpt-4-turbo-preview",
    tier: "paid",
    inputTypes: ["text"],
    costPerRequest: 0.03,
    load: 68,
  },
  {
    id: "paid-audio-1",
    name: "Whisper Large V3",
    provider: "openai",
    modelId: "whisper-large-v3",
    tier: "paid",
    inputTypes: ["audio", "recorded_audio"],
    costPerRequest: 0.012,
    load: 52,
  },
  {
    id: "paid-file-1",
    name: "Claude 3 Opus",
    provider: "anthropic",
    modelId: "claude-3-opus-20240229",
    tier: "paid",
    inputTypes: ["file", "text"],
    costPerRequest: 0.075,
    load: 71,
  },
  {
    id: "paid-vision-1",
    name: "GPT-4 Vision",
    provider: "openai",
    modelId: "gpt-4-vision-preview",
    tier: "paid",
    inputTypes: ["file", "video_link"],
    costPerRequest: 0.04,
    load: 39,
  },
  {
    id: "paid-multimodal-1",
    name: "Gemini 1.5 Pro",
    provider: "google",
    modelId: "gemini-1.5-pro",
    tier: "paid",
    inputTypes: ["text", "audio", "file", "video_link"],
    costPerRequest: 0.05,
    load: 58,
  },
];

export const mockUsers: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    status: "active",
    subscription: "paid",
    subscriptionExpiry: "2026-12-31T23:59:59Z",
    notesCount: 45,
    createdAt: "2025-01-15T10:30:00Z",
    lastActive: "2026-02-27T08:15:00Z",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    status: "active",
    subscription: "free",
    notesCount: 32,
    createdAt: "2025-02-20T14:22:00Z",
    lastActive: "2026-02-26T16:45:00Z",
  },
  {
    id: "3",
    name: "Michael Chen",
    email: "michael.chen@example.com",
    status: "active",
    subscription: "paid",
    subscriptionExpiry: "2026-06-15T23:59:59Z",
    notesCount: 78,
    createdAt: "2024-12-10T09:00:00Z",
    lastActive: "2026-02-27T07:30:00Z",
  },
  {
    id: "4",
    name: "Sarah Williams",
    email: "sarah.w@example.com",
    status: "inactive",
    subscription: "free",
    notesCount: 12,
    createdAt: "2025-03-05T11:15:00Z",
    lastActive: "2026-02-15T14:20:00Z",
  },
  {
    id: "5",
    name: "David Brown",
    email: "david.brown@example.com",
    status: "active",
    subscription: "free",
    notesCount: 56,
    createdAt: "2025-01-08T13:45:00Z",
    lastActive: "2026-02-27T09:00:00Z",
  },
  {
    id: "6",
    name: "Emily Davis",
    email: "emily.d@example.com",
    status: "active",
    subscription: "paid",
    subscriptionExpiry: "2027-01-20T23:59:59Z",
    notesCount: 92,
    createdAt: "2024-11-22T08:00:00Z",
    lastActive: "2026-02-27T10:00:00Z",
  },
];

export const mockNotes: Note[] = [
  {
    id: "n1",
    userId: "1",
    userName: "John Doe",
    userSubscription: "paid",
    title: "Meeting Notes - Q1 Planning",
    content: "Discussed quarterly goals and objectives. Key points: increase user engagement by 25%, launch new features, improve AI accuracy...",
    inputType: "text",
    aiProcessed: true,
    aiResult: "Summary: Q1 focuses on user engagement (25% target) and feature launches. Priority on AI improvements.",
    aiModel: "GPT-4 Turbo",
    category: "meetings",
    createdAt: "2026-02-25T10:30:00Z",
    updatedAt: "2026-02-25T10:35:00Z",
    status: "completed",
  },
  {
    id: "n2",
    userId: "2",
    userName: "Jane Smith",
    userSubscription: "free",
    title: "Voice Note - Daily Journal",
    content: "[Audio transcription] Today was a productive day. I completed three major tasks and had a great meeting with the team...",
    inputType: "recorded_audio",
    duration: "2:45",
    aiProcessed: true,
    aiResult: "Transcribed and summarized: Productive day with 3 tasks completed. Positive team meeting outcome.",
    aiModel: "Whisper Base",
    category: "personal",
    createdAt: "2026-02-26T14:20:00Z",
    updatedAt: "2026-02-26T14:22:00Z",
    status: "completed",
  },
  {
    id: "n3",
    userId: "3",
    userName: "Michael Chen",
    userSubscription: "paid",
    title: "Project Requirements Document",
    content: "[PDF Document] Contains detailed project specifications, timelines, and resource allocation...",
    inputType: "file",
    fileUrl: "https://example.com/files/requirements.pdf",
    fileName: "project-requirements.pdf",
    fileSize: "2.4 MB",
    aiProcessed: true,
    aiResult: "Document analysis: 6-week project timeline, 5 key milestones, budget allocation of $250K. Main risks identified in resource availability.",
    aiModel: "Claude 3 Opus",
    category: "work",
    createdAt: "2026-02-24T11:15:00Z",
    updatedAt: "2026-02-24T11:20:00Z",
    status: "completed",
  },
  {
    id: "n4",
    userId: "2",
    userName: "Jane Smith",
    userSubscription: "free",
    title: "Shopping List",
    content: "Groceries: milk, eggs, bread, chicken, vegetables, fruits. Also need to pick up laundry detergent and paper towels.",
    inputType: "text",
    aiProcessed: true,
    aiResult: "Categorized: Groceries (6 items), Household supplies (2 items). Total: 8 items.",
    aiModel: "GPT-3.5 Turbo",
    category: "personal",
    createdAt: "2026-02-27T08:00:00Z",
    updatedAt: "2026-02-27T08:02:00Z",
    status: "completed",
  },
  {
    id: "n5",
    userId: "5",
    userName: "David Brown",
    userSubscription: "free",
    title: "Podcast Audio Notes",
    content: "[Audio file uploaded] Interview discussion about AI trends in 2026...",
    inputType: "audio",
    fileUrl: "https://example.com/audio/podcast-episode.mp3",
    fileName: "podcast-ep-142.mp3",
    fileSize: "45.2 MB",
    duration: "32:15",
    aiProcessed: false,
    aiModel: "Whisper Base",
    category: "learning",
    createdAt: "2026-02-27T09:30:00Z",
    updatedAt: "2026-02-27T09:30:00Z",
    status: "processing",
  },
  {
    id: "n6",
    userId: "1",
    userName: "John Doe",
    userSubscription: "paid",
    title: "YouTube Tutorial Analysis",
    content: "https://youtube.com/watch?v=example123 - React Advanced Patterns tutorial",
    inputType: "video_link",
    duration: "18:42",
    aiProcessed: true,
    aiResult: "Video analysis: Tutorial covers 5 advanced React patterns including Compound Components, Render Props, and Custom Hooks. Code examples provided. Suitable for intermediate developers.",
    aiModel: "GPT-4 Vision",
    category: "learning",
    createdAt: "2026-02-23T16:45:00Z",
    updatedAt: "2026-02-23T16:52:00Z",
    status: "completed",
  },
  {
    id: "n7",
    userId: "6",
    userName: "Emily Davis",
    userSubscription: "paid",
    title: "Research Paper - AI Ethics",
    content: "[Word Document] Comprehensive research on AI ethics and responsible AI development practices...",
    inputType: "file",
    fileUrl: "https://example.com/files/ai-ethics-paper.docx",
    fileName: "ai-ethics-research.docx",
    fileSize: "1.8 MB",
    aiProcessed: false,
    category: "research",
    createdAt: "2026-02-27T10:15:00Z",
    updatedAt: "2026-02-27T10:15:00Z",
    status: "pending",
  },
  {
    id: "n8",
    userId: "5",
    userName: "David Brown",
    userSubscription: "free",
    title: "Quick Voice Memo",
    content: "[Voice recording] Remember to call dentist tomorrow at 2 PM and pick up dry cleaning.",
    inputType: "recorded_audio",
    duration: "0:15",
    aiProcessed: true,
    aiResult: "Action items: 1) Call dentist tomorrow 2PM, 2) Pick up dry cleaning",
    aiModel: "Whisper Base",
    category: "personal",
    createdAt: "2026-02-26T18:30:00Z",
    updatedAt: "2026-02-26T18:31:00Z",
    status: "completed",
  },
];

export const mockAIJobs: AIJob[] = [
  {
    id: "j1",
    noteId: "n7",
    noteTitle: "Research Paper - AI Ethics",
    userName: "Emily Davis",
    userSubscription: "paid",
    inputType: "file",
    type: "analyze",
    aiModel: "Claude 3 Opus",
    status: "pending",
    progress: 0,
    startedAt: "2026-02-27T10:15:00Z",
  },
  {
    id: "j2",
    noteId: "n5",
    noteTitle: "Podcast Audio Notes",
    userName: "David Brown",
    userSubscription: "free",
    inputType: "audio",
    type: "transcribe",
    aiModel: "Whisper Base",
    status: "processing",
    progress: 65,
    startedAt: "2026-02-27T09:35:00Z",
  },
  {
    id: "j3",
    noteId: "n4",
    noteTitle: "Shopping List",
    userName: "Jane Smith",
    userSubscription: "free",
    inputType: "text",
    type: "extract",
    aiModel: "GPT-3.5 Turbo",
    status: "completed",
    progress: 100,
    startedAt: "2026-02-27T08:00:00Z",
    completedAt: "2026-02-27T08:02:00Z",
  },
  {
    id: "j4",
    noteId: "n6",
    noteTitle: "YouTube Tutorial Analysis",
    userName: "John Doe",
    userSubscription: "paid",
    inputType: "video_link",
    type: "analyze",
    aiModel: "GPT-4 Vision",
    status: "completed",
    progress: 100,
    startedAt: "2026-02-23T16:45:00Z",
    completedAt: "2026-02-23T16:52:00Z",
  },
];