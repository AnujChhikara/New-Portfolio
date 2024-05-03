import React from 'react'
import ProjectCard from './ProjectCard'

export default function Projects() {
  return (
    <div className='px-20 flex flex-col items-start space-y-4'>
        <h3 className=' text-2xl  font-semibold'>{'<Projects>'}</h3>
        <div className='grid grid-cols-2 gap-8'>

        <ProjectCard ProjectName='Vidloom' 
        Brief='The objective of this project is to develop a video sharing platform similar to YouTube, where users can upload their videos and watch videos uploaded by other users. '
        GithubLink='https://github.com/AnujChhikara/frontend-yt'
        LiveLink='https://vidloom.vercel.app/'
        Tech={["React","Redux","Shadcn Ui","Express","MongoDB"]}
        VideoUrl='https://res.cloudinary.com/dlahahicg/video/upload/v1714749400/video_20240418_212221_edit_d57rms.mp4'
        />

         <ProjectCard ProjectName='Speedexx' 
        Brief='The objective of this project is to develop an engaging and user-friendly e-commerce website. '
        GithubLink='https://github.com/AnujChhikara/speedexClone'
        LiveLink='https://speedex-clone.vercel.app/'
        Tech={["React","Redux","Tailwind CSS"]}
        VideoUrl='notalf '
        />

         <ProjectCard ProjectName='Chess' 
        Brief='The aim of this project is to create an immersive and user-centric online chess platform.'
        GithubLink='https://github.com/AnujChhikara/Chess'
        LiveLink='/'
        Tech={["React","Redux","Socket.io","Express","MongoDB"]}
        VideoUrl='notalf '
        />

         <ProjectCard ProjectName='DevVault' 
        Brief=' Your go-to platform for accessing and sharing reusable code snippets effortlessly. Join now and streamline your development process!'
        GithubLink='https://github.com/AnujChhikara/DevVault'
        LiveLink='/'
        Tech={["NextJS","Redux","Aceternity UI","MongoDB"]}
        VideoUrl='notalf '
        />
       
        </div>
    </div>
  )
}
