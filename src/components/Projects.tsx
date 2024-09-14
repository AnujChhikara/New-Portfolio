import React from "react";
import ProjectCard from "./ProjectCard";

export default function Projects() {
  return (
    <div className='md:px-20 sm:px-4 bg-[#18181b]  flex flex-col items-center md:py-16 sm:pb-8  space-y-4'>
      <h3 className='md:text-6xl sm:text-4xl font-semibold mb-6'>Projects</h3>
      <div className='md:grid md:grid-cols-1 lg:grid-cols-2 sm:grid sm:grid-cols-1 gap-8'>
        <ProjectCard
          ProjectName='Vidloom'
          Brief='The objective of this project is to develop a video sharing platform similar to YouTube, where users can upload their videos and watch videos uploaded by other users. '
          GithubLink='https://github.com/AnujChhikara/frontend-yt'
          LiveLink='https://vidloom.vercel.app/'
          Tech={["React", "Redux", "Shadcn Ui", "Express", "MongoDB"]}
          VideoUrl='https://res.cloudinary.com/dlahahicg/video/upload/v1714749400/video_20240418_212221_edit_d57rms.mp4'
        />

        <ProjectCard
          ProjectName='DevVault'
          Brief=' Your go-to platform for accessing and sharing reusable code snippets effortlessly. Join now and streamline your development process!'
          GithubLink='https://github.com/AnujChhikara/Vault'
          LiveLink='https://www.devvault.xyz/'
          Tech={["NextJS", "Redux", "Aceternity UI", "MongoDB"]}
          VideoUrl='https://res.cloudinary.com/dlahahicg/video/upload/v1719840437/Untitled__Jun_24_2024_08_12_AM_dyefph.webm'
        />
        <ProjectCard
          ProjectName='Speedexx'
          Brief='The objective of this project is to develop an engaging and user-friendly e-commerce website. '
          GithubLink='https://github.com/AnujChhikara/speedexClone'
          LiveLink='https://speedex-clone.vercel.app/'
          Tech={["React", "Redux", "Tailwind CSS"]}
          VideoUrl='https://res.cloudinary.com/dlahahicg/video/upload/v1719840308/speedex_ayeqh6.mp4'
        />

        <ProjectCard
          ProjectName='Chess'
          Brief='The aim of this project is to create an immersive and user-centric online chess platform.'
          GithubLink='https://github.com/AnujChhikara/Chess'
          LiveLink='/'
          Tech={["React", "Redux", "Socket.io", "Express", "MongoDB"]}
          VideoUrl='/'
        />
      </div>
    </div>
  );
}
