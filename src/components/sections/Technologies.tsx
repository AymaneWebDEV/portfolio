"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Layout, Server, Brain, Rocket, Wrench, Database, Sparkles, Network, MessageSquare, Cloud, Cpu, Eye, Activity } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiAngular,
  SiHtml5, SiCss3, SiBootstrap,
  SiNodedotjs, SiExpress, SiLaravel, SiPython, SiFlask,
  SiPandas, SiNumpy, SiScikitlearn, SiPytorch, SiTensorflow, SiSpacy,
  SiOpencv, SiStreamlit, SiApachespark, SiApachekafka, SiNvidia,
  SiDocker, SiKubernetes, SiJenkins, SiTerraform, SiAnsible, SiProxmox, SiVmware,
  SiGit, SiGithub, SiJira, SiSonarqube, SiPostman,
  SiMongodb, SiMysql, SiSqlite, SiPostgresql, SiSupabase
} from "react-icons/si";
import { FaJava } from "react-icons/fa";
import { TbBrandFramerMotion } from "react-icons/tb";
import type { IconType } from "react-icons";

interface Skill {
  name: string;
  icon: IconType;
  color: string;
}

const skills: Record<string, Skill[]> = {
  "Data & AI": [
    { name: "PyTorch", icon: SiPytorch, color: "#EE4C2C" },
    { name: "OpenCV", icon: SiOpencv, color: "#5C3EE8" },
    { name: "CUDA & GPU", icon: SiNvidia, color: "#76B900" },
    { name: "Streamlit", icon: SiStreamlit, color: "#FF4B4B" },
    { name: "Scikit-learn", icon: SiScikitlearn, color: "#F7931E" },
    { name: "Deep Learning", icon: Network, color: "#EC4899" },
    { name: "Computer Vision", icon: Eye, color: "#3B82F6" },
    { name: "TensorFlow", icon: SiTensorflow, color: "#FF6F00" },
    { name: "Pandas", icon: SiPandas, color: "#150458" },
    { name: "NumPy", icon: SiNumpy, color: "#013243" },
    { name: "SpaCy", icon: SiSpacy, color: "#09A3D5" },
    { name: "Generative AI", icon: Sparkles, color: "#9333EA" },
  ],
  "Cloud & DevOps": [
    { name: "Docker", icon: SiDocker, color: "#2496ED" },
    { name: "Kubernetes", icon: SiKubernetes, color: "#326CE5" },
    { name: "Apache Spark", icon: SiApachespark, color: "#E25A1C" },
    { name: "Apache Kafka", icon: SiApachekafka, color: "#231F20" },
    { name: "Jenkins", icon: SiJenkins, color: "#D24939" },
    { name: "Terraform", icon: SiTerraform, color: "#7B42BC" },
    { name: "Ansible", icon: SiAnsible, color: "#EE0000" },
    { name: "Proxmox", icon: SiProxmox, color: "#E57000" },
    { name: "VMware", icon: SiVmware, color: "#607078" },
  ],
  Frontend: [
    { name: "React", icon: SiReact, color: "#61DAFB" },
    { name: "Next.js", icon: SiNextdotjs, color: "#ffffff" },
    { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
    { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
    { name: "Angular", icon: SiAngular, color: "#DD0031" },
    { name: "HTML5", icon: SiHtml5, color: "#E34F26" },
    { name: "CSS3", icon: SiCss3, color: "#1572B6" },
    { name: "Bootstrap", icon: SiBootstrap, color: "#7952B3" },
    { name: "Framer Motion", icon: TbBrandFramerMotion, color: "#0055FF" },
  ],
  Backend: [
    { name: "Python", icon: SiPython, color: "#3776AB" },
    { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
    { name: "Express", icon: SiExpress, color: "#ffffff" },
    { name: "Laravel", icon: SiLaravel, color: "#FF2D20" },
    { name: "Java", icon: FaJava, color: "#ED8B00" },
    { name: "Flask", icon: SiFlask, color: "#ffffff" },
  ],
  Tools: [
    { name: "Git", icon: SiGit, color: "#F05032" },
    { name: "GitHub", icon: SiGithub, color: "#ffffff" },
    { name: "Jira", icon: SiJira, color: "#0052CC" },
    { name: "SonarQube", icon: SiSonarqube, color: "#4E9BCD" },
    { name: "Postman", icon: SiPostman, color: "#FF6C37" },
  ],
  Databases: [
    { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
    { name: "Supabase", icon: SiSupabase, color: "#3ECF8E" },
    { name: "MySQL", icon: SiMysql, color: "#4479A1" },
    { name: "SQLite", icon: SiSqlite, color: "#003B57" },
    { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
  ],
};

const categories = Object.keys(skills);

const tabIcons: Record<string, LucideIcon> = {
  "Data & AI": Brain,
  "Cloud & DevOps": Cloud,
  Frontend: Layout,
  Backend: Server,
  Tools: Wrench,
  Databases: Database,
};

export function Technologies() {
  const [activeTab, setActiveTab] = useState(categories[0]);

  return (
    <section id="technologies" className="py-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(120,119,198,0.1),transparent)]" />

      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 space-y-4"
        >
          <span className="text-primary font-medium text-sm tracking-wider uppercase">Skills & Expertise</span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">Arsenal</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            A comprehensive toolkit for building scalable, modern applications — from pixel to production.
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-14">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveTab(category)}
              className={cn(
                "relative px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300",
                activeTab === category
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {activeTab === category && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-xl"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                {(() => { const TabIcon = tabIcons[category]; return TabIcon ? <TabIcon className="w-4 h-4" /> : null; })()}
                {category}
              </span>
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="min-h-[320px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35 }}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
            >
              {skills[activeTab].map((skill, index) => {
                const Icon = skill.icon;
                return (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.4 }}
                    whileHover={{ y: -8, transition: { duration: 0.2 } }}
                    className="group relative flex flex-col items-center justify-center gap-3 p-6 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm cursor-default overflow-hidden"
                  >
                    {/* Glow on hover */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background: `radial-gradient(circle at 50% 50%, ${skill.color}15 0%, transparent 70%)`,
                      }}
                    />

                    {/* Icon */}
                    <div className="relative z-10 transition-all duration-300 group-hover:scale-110">
                      <Icon
                        className="w-8 h-8 transition-colors duration-300"
                        style={{ color: "var(--muted-foreground)" }}
                        onMouseEnter={(e: React.MouseEvent<SVGElement>) => {
                          (e.target as SVGElement).style.color = skill.color;
                        }}
                        onMouseLeave={(e: React.MouseEvent<SVGElement>) => {
                          (e.target as SVGElement).style.color = "var(--muted-foreground)";
                        }}
                      />
                    </div>

                    {/* Name */}
                    <span className="relative z-10 text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors text-center">
                      {skill.name}
                    </span>

                    {/* Bottom bar accent */}
                    <div
                      className="absolute bottom-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ background: `linear-gradient(to right, transparent, ${skill.color}, transparent)` }}
                    />
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
