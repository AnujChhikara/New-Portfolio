import React from "react";
import ProjectCard from "./ProjectCard";
import { motion } from "framer-motion";

export default function Projects() {
  return (
    <motion.div
      className={`md:px-20 sm:px-4 flex flex-col items-center md:pb-16 sm:pb-8 space-y-4 text-inherit bg-inherit`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <motion.h3
        className="md:text-6xl sm:text-4xl font-semibold mb-6"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.2 }}
      >
        Projects
      </motion.h3>

      <motion.div
        className="md:grid-cols-2 sm:grid sm:grid-cols-1 gap-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.2 }}
      >
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.2 }}
        >
          <ProjectCard
            ProjectName="Vidloom"
            Brief="The objective of this project is to develop a video sharing platform similar to YouTube, where users can upload their videos and watch videos uploaded by other users. "
            GithubLink="https://github.com/AnujChhikara/frontend-yt"
            LiveLink="https://vidloom.vercel.app/"
            Tech={["React", "Redux", "Shadcn Ui", "Express", "MongoDB"]}
            VideoUrl="https://res.cloudinary.com/dlahahicg/video/upload/v1714749400/video_20240418_212221_edit_d57rms.mp4"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.2 }}
        >
          <ProjectCard
            ProjectName="DevVault"
            Brief=" Your go-to platform for accessing and sharing reusable code snippets effortlessly. Join now and streamline your development process!"
            GithubLink="https://github.com/AnujChhikara/Vault"
            LiveLink="https://devvault.vercel.app/"
            Tech={["NextJS", "Redux", "Aceternity UI", "MongoDB"]}
            VideoUrl="https://res.cloudinary.com/dlahahicg/video/upload/v1719840437/Untitled__Jun_24_2024_08_12_AM_dyefph.webm"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.2 }}
        >
          <ProjectCard
            ProjectName="Speedexx"
            Brief="The objective of this project is to develop an engaging and user-friendly e-commerce website. "
            GithubLink="https://github.com/AnujChhikara/speedexClone"
            LiveLink="https://speedex-clone.vercel.app/"
            Tech={["React", "Redux", "Tailwind CSS"]}
            VideoUrl="https://res.cloudinary.com/dlahahicg/video/upload/v1719840308/speedex_ayeqh6.mp4"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.2 }}
        >
          <ProjectCard
            ProjectName="Extensionhub"
            Brief="Marketplace for niche browser extension requests, enabling users to submit ideas and developers to build them."
            GithubLink="https://github.com/AnujChhikara/Extensionhub"
            LiveLink="https://extensionhub-lilac.vercel.app/"
            Tech={["NextJS", "Appwrite"]}
            VideoUrl="https://res.cloudinary.com/dlahahicg/video/upload/v1756836113/Screen_Recording_2025-09-02_at_11.28.57_PM_yjedfx.mov"
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
