import { 
  Wrench, Shield, MessageSquare, Smile, Server, 
  Image, Zap, Settings, LucideIcon 
} from "lucide-react";
import { createElement } from "react";

export interface Command {
  name: string;
  description: string;
  requiresAdmin: boolean;
  availableInClientMode: boolean;
}

export interface CommandCategory {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  count: number;
  commands: Command[];
}

export const COMMAND_CATEGORIES: CommandCategory[] = [
  {
    id: "utility",
    name: "Utility",
    description: "Essential bot utilities and information commands",
    icon: Wrench,
    count: 50,
    commands: [
      { name: "userinfo", description: "Display detailed user information", requiresAdmin: false, availableInClientMode: true },
      { name: "serverinfo", description: "Show server statistics and details", requiresAdmin: false, availableInClientMode: true },
      { name: "ping", description: "Check bot latency and response time", requiresAdmin: false, availableInClientMode: true },
      { name: "uptime", description: "Display bot uptime", requiresAdmin: false, availableInClientMode: true },
      { name: "roles", description: "List all server roles", requiresAdmin: false, availableInClientMode: true },
      { name: "channels", description: "List all server channels", requiresAdmin: false, availableInClientMode: true },
      { name: "membercount", description: "Show total member count", requiresAdmin: false, availableInClientMode: true },
      { name: "avatar", description: "Get user's avatar URL", requiresAdmin: false, availableInClientMode: true },
      { name: "roleinfo", description: "Display role information", requiresAdmin: false, availableInClientMode: true },
      { name: "channelinfo", description: "Display channel information", requiresAdmin: false, availableInClientMode: true },
      // ... +40 more utility commands
    ],
  },
  {
    id: "moderation",
    name: "Moderation",
    description: "Server moderation and management tools",
    icon: Shield,
    count: 50,
    commands: [
      { name: "ban", description: "Ban a member from the server", requiresAdmin: true, availableInClientMode: true },
      { name: "kick", description: "Kick a member from the server", requiresAdmin: true, availableInClientMode: true },
      { name: "softban", description: "Softban (kick + delete messages)", requiresAdmin: true, availableInClientMode: true },
      { name: "mute", description: "Mute a member", requiresAdmin: true, availableInClientMode: true },
      { name: "unmute", description: "Unmute a member", requiresAdmin: true, availableInClientMode: true },
      { name: "purge", description: "Bulk delete messages", requiresAdmin: true, availableInClientMode: true },
      { name: "warn", description: "Warn a member", requiresAdmin: true, availableInClientMode: true },
      { name: "roleadd", description: "Add role to member", requiresAdmin: true, availableInClientMode: true },
      { name: "roleremove", description: "Remove role from member", requiresAdmin: true, availableInClientMode: true },
      { name: "timeout", description: "Timeout a member", requiresAdmin: true, availableInClientMode: true },
      // ... +40 more moderation commands
    ],
  },
  {
    id: "automation",
    name: "Message Automation",
    description: "Automated messaging and scheduling",
    icon: MessageSquare,
    count: 40,
    commands: [
      { name: "snipe", description: "Retrieve last deleted message", requiresAdmin: false, availableInClientMode: true },
      { name: "editsnipe", description: "Retrieve last edited message", requiresAdmin: false, availableInClientMode: true },
      { name: "autoreply", description: "Set up automatic replies", requiresAdmin: true, availableInClientMode: false },
      { name: "scheduler", description: "Schedule messages", requiresAdmin: true, availableInClientMode: false },
      { name: "autodelete", description: "Auto-delete messages after time", requiresAdmin: true, availableInClientMode: false },
      { name: "massping", description: "Ping multiple users", requiresAdmin: true, availableInClientMode: true },
      { name: "announce", description: "Send announcement", requiresAdmin: true, availableInClientMode: true },
      { name: "dm", description: "Send DM to user", requiresAdmin: false, availableInClientMode: true },
      { name: "massdm", description: "Send DM to multiple users", requiresAdmin: true, availableInClientMode: true },
      { name: "react", description: "Add reaction to message", requiresAdmin: false, availableInClientMode: true },
      // ... +30 more automation commands
    ],
  },
  {
    id: "fun",
    name: "Fun & Social",
    description: "Entertainment and social features",
    icon: Smile,
    count: 40,
    commands: [
      { name: "meme", description: "Generate random meme", requiresAdmin: false, availableInClientMode: true },
      { name: "gif", description: "Search and post GIF", requiresAdmin: false, availableInClientMode: true },
      { name: "poll", description: "Create a poll", requiresAdmin: false, availableInClientMode: true },
      { name: "trivia", description: "Start trivia game", requiresAdmin: false, availableInClientMode: true },
      { name: "roulette", description: "Play roulette game", requiresAdmin: false, availableInClientMode: true },
      { name: "level", description: "Check user level", requiresAdmin: false, availableInClientMode: true },
      { name: "leaderboard", description: "Show server leaderboard", requiresAdmin: false, availableInClientMode: true },
      { name: "8ball", description: "Ask the magic 8-ball", requiresAdmin: false, availableInClientMode: true },
      { name: "coinflip", description: "Flip a coin", requiresAdmin: false, availableInClientMode: true },
      { name: "joke", description: "Tell a random joke", requiresAdmin: false, availableInClientMode: true },
      // ... +30 more fun commands
    ],
  },
  {
    id: "server",
    name: "Server Management",
    description: "Advanced server configuration tools",
    icon: Server,
    count: 40,
    commands: [
      { name: "backup_server", description: "Create full server backup", requiresAdmin: true, availableInClientMode: false },
      { name: "restore_server", description: "Restore from backup", requiresAdmin: true, availableInClientMode: false },
      { name: "clone_roles", description: "Clone all roles", requiresAdmin: true, availableInClientMode: true },
      { name: "mass_role_assign", description: "Assign role to all members", requiresAdmin: true, availableInClientMode: true },
      { name: "mass_channel_create", description: "Create multiple channels", requiresAdmin: true, availableInClientMode: true },
      { name: "nuke_channel", description: "Delete and recreate channel", requiresAdmin: true, availableInClientMode: true },
      { name: "lock_server", description: "Lock all channels", requiresAdmin: true, availableInClientMode: true },
      { name: "unlock_server", description: "Unlock all channels", requiresAdmin: true, availableInClientMode: true },
      { name: "mass_delete_channels", description: "Delete multiple channels", requiresAdmin: true, availableInClientMode: true },
      { name: "mass_delete_roles", description: "Delete multiple roles", requiresAdmin: true, availableInClientMode: true },
      // ... +30 more server management commands
    ],
  },
  {
    id: "media",
    name: "Media & Links",
    description: "Media handling and link management",
    icon: Image,
    count: 30,
    commands: [
      { name: "embed_post", description: "Create custom embed", requiresAdmin: false, availableInClientMode: true },
      { name: "image_upload", description: "Upload image to channel", requiresAdmin: false, availableInClientMode: true },
      { name: "sticker_post", description: "Post sticker", requiresAdmin: false, availableInClientMode: true },
      { name: "audio_play", description: "Play audio in voice", requiresAdmin: false, availableInClientMode: false },
      { name: "link_shortener", description: "Shorten URL", requiresAdmin: false, availableInClientMode: true },
      { name: "qr_code", description: "Generate QR code", requiresAdmin: false, availableInClientMode: true },
      { name: "screenshot", description: "Take website screenshot", requiresAdmin: false, availableInClientMode: true },
      { name: "imgur_upload", description: "Upload to Imgur", requiresAdmin: false, availableInClientMode: true },
      { name: "youtube_search", description: "Search YouTube videos", requiresAdmin: false, availableInClientMode: true },
      { name: "twitter_fetch", description: "Fetch Twitter post", requiresAdmin: false, availableInClientMode: true },
      // ... +20 more media commands
    ],
  },
  {
    id: "advanced",
    name: "Advanced Features",
    description: "High-level automation and system controls",
    icon: Zap,
    count: 40,
    commands: [
      { name: "set_speed", description: "Configure execution speed", requiresAdmin: true, availableInClientMode: true },
      { name: "set_threading", description: "Adjust concurrency", requiresAdmin: true, availableInClientMode: true },
      { name: "command_profile", description: "Create command profile", requiresAdmin: true, availableInClientMode: true },
      { name: "rate_estimate", description: "Estimate rate limits", requiresAdmin: false, availableInClientMode: true },
      { name: "schedule_task", description: "Schedule task execution", requiresAdmin: true, availableInClientMode: false },
      { name: "api_connector", description: "Connect external API", requiresAdmin: true, availableInClientMode: false },
      { name: "webhook_create", description: "Create webhook", requiresAdmin: true, availableInClientMode: true },
      { name: "webhook_send", description: "Send via webhook", requiresAdmin: true, availableInClientMode: true },
      { name: "regex_search", description: "Search with regex", requiresAdmin: false, availableInClientMode: true },
      { name: "bulk_operation", description: "Execute bulk operations", requiresAdmin: true, availableInClientMode: true },
      // ... +30 more advanced commands
    ],
  },
  {
    id: "dashboard",
    name: "Dashboard Controls",
    description: "Dashboard-specific utilities",
    icon: Settings,
    count: 10,
    commands: [
      { name: "import_json", description: "Import settings from JSON", requiresAdmin: true, availableInClientMode: true },
      { name: "export_json", description: "Export settings to JSON", requiresAdmin: true, availableInClientMode: true },
      { name: "toggle_mode", description: "Switch bot/client mode", requiresAdmin: true, availableInClientMode: true },
      { name: "view_audit_log", description: "View command history", requiresAdmin: true, availableInClientMode: true },
      { name: "run_dry_run", description: "Test without execution", requiresAdmin: true, availableInClientMode: true },
      { name: "save_preset", description: "Save command preset", requiresAdmin: true, availableInClientMode: true },
      { name: "load_preset", description: "Load command preset", requiresAdmin: true, availableInClientMode: true },
      { name: "clear_logs", description: "Clear audit logs", requiresAdmin: true, availableInClientMode: true },
      { name: "export_logs", description: "Export logs to file", requiresAdmin: true, availableInClientMode: true },
      { name: "system_status", description: "Check system status", requiresAdmin: false, availableInClientMode: true },
    ],
  },
];
