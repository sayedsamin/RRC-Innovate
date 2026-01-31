"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { Search, Bell, User } from "lucide-react";

export function Header({ title }: { title: string }) {
  const params = useParams();
  const role = params?.role as string;

  return (
    <header className="flex h-16 items-center justify-between border-b bg-background px-6">
      <h1 className="text-xl font-semibold text-foreground">{title}</h1>
      
      <div className="flex items-center gap-4">
        {/* ... search ... */}
        
        {/* ... bell button ... */}
        
        <div className="flex items-center gap-2">
            <Link href={`/dashboard/${role}/feed`} className="text-sm font-medium hover:text-primary transition-colors px-3 py-2 rounded-md hover:bg-accent flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                Live Feed
            </Link>
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="h-5 w-5 text-primary" />
            </div>
        </div>
      </div>
    </header>
  );
}
