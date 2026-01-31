"use client";

import { motion } from "framer-motion";
import { Users, Database, Megaphone, ArrowRight } from "lucide-react";
import Link from "next/link";

const roles = [
  {
    id: "hr",
    title: "HR Manager",
    icon: Users,
    description: "Manage participant verify and team formations.",
    gradient: "from-chart-1 to-primary",
    shadow: "shadow-chart-1/20",
  },
  {
    id: "data-scientist",
    title: "Data Scientist",
    icon: Database,
    description: "Analyze hackathon metrics, submission data and trends.",
    gradient: "from-chart-5 to-chart-3",
    shadow: "shadow-chart-3/20",
  },
  {
    id: "marketing",
    title: "Marketing Manager",
    icon: Megaphone,
    description: "Drive engagement, manage campaigns and announcements.",
    gradient: "from-chart-4 to-chart-2",
    shadow: "shadow-chart-2/20",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-background text-foreground flex flex-col items-center justify-center p-4 relative overflow-hidden font-sans selection:bg-primary/20">
      {/* Abstract Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] bg-primary/20 rounded-full blur-[128px]" />
        <div className="absolute -bottom-[20%] -right-[10%] w-[70vw] h-[70vw] bg-secondary/20 rounded-full blur-[128px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('/grid.svg')] opacity-[0.03] bg-center [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="text-center mb-12 sm:mb-20 relative z-10"
      >
        <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-secondary/50 border border-border backdrop-blur-md">
          <span className="text-sm font-medium text-muted-foreground tracking-wide uppercase">RRC Innovate Hackathon</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/60">
          Select Your Role
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-lg mx-auto leading-relaxed">
          Welcome to the portal. Identify yourself to access the dashboard and manage your responsibilities.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl w-full px-4 relative z-10">
        {roles.map((role, index) => (
          <motion.div
            key={role.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 + index * 0.1, ease: "easeOut" }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="group relative"
          >
            {/* Hover Glow Effect */}
            <div className={`absolute inset-0 bg-gradient-to-br ${role.gradient} opacity-0 group-hover:opacity-40 blur-3xl transition-opacity duration-500 -z-10`} />
            
            <Link href={`/dashboard/${role.id}`} className="block h-full">
              {/* Card Content */}
              <div className="h-full bg-card/80 backdrop-blur-xl border border-border p-8 rounded-3xl hover:border-primary/50 transition-all duration-300 flex flex-col items-start gap-6 overflow-hidden relative">
                
                {/* Subtle Gradient Overlay on Card */}
                <div className={`absolute inset-0 bg-gradient-to-br ${role.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

                <div className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center border border-border group-hover:scale-110 group-hover:bg-secondary/80 transition-all duration-300">
                  <role.icon className="text-foreground" size={28} strokeWidth={1.5} />
                </div>

                <div>
                  <h3 className="text-2xl font-semibold text-card-foreground mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-foreground group-hover:to-muted-foreground transition-all duration-300">
                    {role.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {role.description}
                  </p>
                </div>

                <div className="mt-auto w-full pt-4">
                  <div className="w-full py-4 px-6 rounded-xl bg-secondary hover:bg-secondary/80 border border-border hover:border-primary/50 flex items-center justify-between text-muted-foreground hover:text-foreground transition-all group-hover:translate-x-1 duration-300">
                    <span className="font-medium">Enter Portal</span>
                    <ArrowRight size={18} className="opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
      
      <motion.footer 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-6 text-center w-full text-muted-foreground/60 text-sm"
      >
        &copy; 2026 RRC Innovate. All rights reserved.
      </motion.footer>
    </div>
  );
}
