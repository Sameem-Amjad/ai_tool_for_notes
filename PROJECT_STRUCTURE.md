# AI Notes - Project Structure

This project contains both a **product landing page** (user-facing website) and an **admin dashboard** (backend management panel).

## Routes

### Product Website (User-Facing)
- **`/`** - Landing page with features, pricing, and testimonials
- **`/login`** - User login page
- **`/signup`** - User signup page
- **`/app`** - User dashboard for processing AI notes

### Admin Panel (Management)
- **`/admin`** - Admin dashboard with analytics
- **`/admin/users`** - User management
- **`/admin/notes`** - Notes management
- **`/admin/ai-processing`** - AI job processing status
- **`/admin/subscriptions`** - Subscription plans and revenue analytics
- **`/admin/settings`** - System settings and AI model configuration

## Features

### Product Website
- Modern landing page with hero section
- Feature showcase (Voice, Text, Files, Video support)
- Three-tier pricing plans (Basic, Premium, Platinum)
- Customer testimonials
- Login/Signup pages
- User dashboard with note processing

### Admin Dashboard
- User analytics and management
- Subscription revenue tracking
- AI model configuration per input type
- Intelligent load balancing
- Privacy-focused note management (titles only)
- Real-time processing status
- Multi-model AI integration

## Navigation

Users can navigate between:
- Landing page → Admin panel via "Admin" link in navigation
- Any page → Landing page via logo
- Login/Signup → User dashboard (`/app`)

## Technology Stack
- React with React Router
- TypeScript
- Tailwind CSS v4
- Recharts for analytics
- Lucide icons
- Sonner for notifications
