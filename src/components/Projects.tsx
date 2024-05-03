import React from 'react'
import ProjectCard from './ProjectCard'

export default function Projects() {
  return (
    <div className='px-20 flex flex-col items-start space-y-4'>
        <h3 className=' text-2xl underline font-semibold'>Projects</h3>
        <div className='grid grid-cols-2 gap-8'>
        <ProjectCard ProjectName='Vidloom' 
        Brief='lore sejfl wejf wmefljf wjefwe'
        GithubLink='testingGithub Link'
        LiveLink='testing live link'
        Tech={["react","react","react","react","react"]}
        VideoUrl='notalf '
        />
       
        </div>
    </div>
  )
}
