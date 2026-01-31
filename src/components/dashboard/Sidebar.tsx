"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Search,
  Files,
  Users,
  Settings,
  BookOpen,
  PieChart,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  role: string;
}

export function Sidebar({ className, role }: SidebarProps) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(true);

  const navItems = [
    {
      title: "Overview",
      href: `/dashboard/${role}`,
      icon: LayoutDashboard,
    },
    {
      title: "Knowledge Base",
      href: `/dashboard/${role}/knowledge`,
      icon: BookOpen,
    },
    {
      title: "Documents",
      href: `/dashboard/${role}/documents`,
      icon: Files,
    },
    {
      title: "Search",
      href: `/dashboard/${role}/search`,
      icon: Search,
    },
    {
      title: "Analytics",
      href: `/dashboard/${role}/analytics`,
      icon: PieChart,
    },
    {
      title: "Team",
      href: `/dashboard/${role}/team`,
      icon: Users,
    },
    {
      title: "Settings",
      href: `/dashboard/${role}/settings`,
      icon: Settings,
    },
  ];

  return (
    <div
      className={cn(
        "relative flex flex-col border-r bg-sidebar text-sidebar-foreground transition-all duration-300",
        isCollapsed ? "w-16" : "w-64",
        className
      )}
    >
      <div className="flex items-center justify-between p-4">
        {!isCollapsed && (
          <h2 className="text-lg font-semibold tracking-tight text-sidebar-primary-foreground/90 whitespace-nowrap overflow-hidden">
            RRC Innovate
          </h2>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="ml-auto h-8 w-8"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      <div className="flex-1 space-y-4 py-4 overflow-y-auto overflow-x-hidden">
        <div className="px-3 py-2">
          <div className="space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center rounded-md py-2 text-sm font-medium hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors",
                  isCollapsed ? "justify-center px-2" : "px-3",
                  pathname === item.href || pathname?.startsWith(item.href + "/")
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-muted-foreground"
                )}
                title={isCollapsed ? item.title : undefined}
              >
                <item.icon className={cn("h-4 w-4", !isCollapsed && "mr-2")} />
                {!isCollapsed && <span>{item.title}</span>}
              </Link>
            ))}
          </div>
        </div>
        
        <div className="px-3 py-2">
          {!isCollapsed && (
            <h2 className="mb-2 px-4 text-xs font-semibold tracking-tight text-sidebar-primary-foreground/90 uppercase">
              Library
            </h2>
          )}
          <div className="space-y-1">
             <button 
                className={cn(
                  "w-full flex items-center rounded-md py-2 text-sm font-medium hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors text-muted-foreground",
                   isCollapsed ? "justify-center px-2" : "justify-start px-3"
                )}
                title={isCollapsed ? "Recent" : undefined}
             >
                <BookOpen className={cn("h-4 w-4", !isCollapsed && "mr-2")} />
                {!isCollapsed && "Recent"}
             </button>
             <button 
                className={cn(
                  "w-full flex items-center rounded-md py-2 text-sm font-medium hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors text-muted-foreground",
                  isCollapsed ? "justify-center px-2" : "justify-start px-3"
                )}
                title={isCollapsed ? "Favorites" : undefined}
             >
                <Files className={cn("h-4 w-4", !isCollapsed && "mr-2")} />
                {!isCollapsed && "Favorites"}
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}
