import {
  BookOpen,
  Briefcase,
  CalendarDays,
  Compass,
  FileText,
  FolderOpen,
  GraduationCap,
  Landmark,
  type LucideIcon,
  IdCard,
  MessageCircle,
  Plane,
  PoundSterling,
  ShieldCheck,
  Star,
} from "lucide-react";

/**
 * The route's icon vocabulary, kept small on purpose: fifteen items across
 * three phases share nine glyphs, so a shield always means "a rule you have
 * to satisfy" and a coin always means money, wherever the reader meets it.
 *
 * `data/journey/route.ts` types its `icon` fields against `RouteIconName`, so
 * a name that is not in this table fails the build rather than rendering a
 * blank square.
 */
export const routeIcons = {
  compass: Compass,
  folder: FolderOpen,
  plane: Plane,
  landmark: Landmark,
  file: FileText,
  book: BookOpen,
  shield: ShieldCheck,
  coin: PoundSterling,
  cap: GraduationCap,
  chat: MessageCircle,
  briefcase: Briefcase,
  star: Star,
  passport: IdCard,
  calendar: CalendarDays,
} satisfies Record<string, LucideIcon>;

export type RouteIconName = keyof typeof routeIcons;
