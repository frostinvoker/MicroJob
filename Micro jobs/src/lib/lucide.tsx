import * as React from "react";

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  color?: string;
  strokeWidth?: number;
}

const BaseIcon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ size = 20, color = "currentColor", strokeWidth = 1.5, className, fill, ...props }, ref) => (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={fill ?? "none"}
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <rect x="3" y="3" width="18" height="18" rx="4" />
      <path d="M8 12h8" />
      <path d="M12 8v8" />
    </svg>
  ),
);

BaseIcon.displayName = "LucideIcon";

const createIcon = (name: string) => {
  const Icon = React.forwardRef<SVGSVGElement, IconProps>((props, ref) => (
    <BaseIcon ref={ref} {...props} />
  ));
  Icon.displayName = name;
  return Icon;
};

export const AlertCircle = createIcon("AlertCircle");
export const ArrowDownLeft = createIcon("ArrowDownLeft");
export const ArrowLeft = createIcon("ArrowLeft");
export const ArrowRight = createIcon("ArrowRight");
export const ArrowUpRight = createIcon("ArrowUpRight");
export const Award = createIcon("Award");
export const Bell = React.forwardRef<SVGSVGElement, IconProps>(
  ({ size = 20, color = "currentColor", strokeWidth = 1.5, className, fill, ...props }, ref) => (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={fill ?? "none"}
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  ),
);
Bell.displayName = "Bell";
export const Bold = createIcon("Bold");
export const Book = createIcon("Book");
export const Bookmark = createIcon("Bookmark");
export const Briefcase = createIcon("Briefcase");
export const Building2 = createIcon("Building2");
export const Calendar = createIcon("Calendar");
export const CalendarDays = createIcon("CalendarDays");
export const Check = createIcon("Check");
export const CheckCheck = createIcon("CheckCheck");
export const CheckCircle = createIcon("CheckCircle");
export const CheckCircle2 = createIcon("CheckCircle2");
export const CheckIcon = createIcon("CheckIcon");
export const ChevronDown = createIcon("ChevronDown");
export const ChevronDownIcon = createIcon("ChevronDownIcon");
export const ChevronLeft = createIcon("ChevronLeft");
export const ChevronLeftIcon = createIcon("ChevronLeftIcon");
export const ChevronRight = React.forwardRef<SVGSVGElement, IconProps>(
  ({ size = 20, color = "currentColor", strokeWidth = 1.5, className, fill, ...props }, ref) => (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={fill ?? "none"}
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M9 18l6-6-6-6" />
    </svg>
  ),
);
ChevronRight.displayName = "ChevronRight";

export const ChevronRightIcon = ChevronRight;
export const ChevronUp = createIcon("ChevronUp");
export const ChevronUpIcon = createIcon("ChevronUpIcon");
export const Circle = createIcon("Circle");
export const CircleIcon = createIcon("CircleIcon");
export const Clock = createIcon("Clock");
export const CreditCard = createIcon("CreditCard");
export const DollarSign = createIcon("DollarSign");
export const Download = createIcon("Download");
export const Edit = createIcon("Edit");
export const ExternalLink = createIcon("ExternalLink");
export const Eye = createIcon("Eye");
export const EyeOff = createIcon("EyeOff");
export const FileText = createIcon("FileText");
export const Filter = createIcon("Filter");
export const Globe = createIcon("Globe");
export const GripVerticalIcon = createIcon("GripVerticalIcon");
export const Handshake = createIcon("Handshake");
export const Heart = createIcon("Heart");
export const HelpCircle = createIcon("HelpCircle");
export const Italic = createIcon("Italic");
export const LayoutDashboard = createIcon("LayoutDashboard");
export const Link = createIcon("Link");
export const Linkedin = createIcon("Linkedin");
export const List = createIcon("List");
export const Lock = createIcon("Lock");
export const Mail = createIcon("Mail");
export const MapPin = createIcon("MapPin");
export const Maximize2 = createIcon("Maximize2");
export const MessageSquare = createIcon("MessageSquare");
export const MinusIcon = createIcon("MinusIcon");
export const MoreHorizontal = createIcon("MoreHorizontal");
export const MoreHorizontalIcon = createIcon("MoreHorizontalIcon");
export const MoreVertical = createIcon("MoreVertical");
export const PanelLeftIcon = createIcon("PanelLeftIcon");
export const Paperclip = createIcon("Paperclip");
export const Phone = createIcon("Phone");
export const Plus = createIcon("Plus");
export const RefreshCw = createIcon("RefreshCw");
export const RotateCcw = createIcon("RotateCcw");
export const Search = createIcon("Search");
export const SearchIcon = createIcon("SearchIcon");
export const Send = createIcon("Send");
export const Settings = createIcon("Settings");
export const Share2 = createIcon("Share2");
export const Shield = createIcon("Shield");
export const ShieldCheck = createIcon("ShieldCheck");
export const SlidersHorizontal = createIcon("SlidersHorizontal");
export const Sparkles = createIcon("Sparkles");
export const Star = createIcon("Star");
export const Trash2 = createIcon("Trash2");
export const TrendingUp = createIcon("TrendingUp");
export const Underline = createIcon("Underline");
export const Upload = createIcon("Upload");
export const User = createIcon("User");
export const UserCheck = createIcon("UserCheck");
export const UserPlus = createIcon("UserPlus");
export const UserX = createIcon("UserX");
export const Users = createIcon("Users");
export const Video = createIcon("Video");
export const Wallet = createIcon("Wallet");
export const X = createIcon("X");
export const XCircle = createIcon("XCircle");
export const XIcon = createIcon("XIcon");
