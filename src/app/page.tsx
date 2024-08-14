import ContactMe from "@/components/ContactMe";
import Projects from "@/components/Projects";
import Tech from "@/components/Tech";
import { Github, Linkedin, Twitter } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <main className='flex flex-col bg-[#18181b] h-screen'>
      {/* main section */}
      <div className=' pb-8 md:px-20 flex flex-col space-y-4 items-center justify-center sm:px-2 text-center md:pt-20 sm:pt-12 '>
        {/* image */}
        <div className=' flex flex-col space-y-4 justify-center items-center'>
          <div className='flex flex-col items-center justify-center'>
            <Image
              width={128}
              className='rounded-full bg-[#5f5f5f] p-0.5  w-32'
              height={128}
              src='https://res.cloudinary.com/dlahahicg/image/upload/v1712917455/zman4v8yaqtvixmnthmi.jpg'
              alt='avatar img'
            />
            <h2 className='font-semibold text-3xl  text-white tracking-widest'>
              I&apos;m Anuj{" "}
            </h2>
          </div>

          <div className='text-[#c7c7c7]'>
            <div className='brushBg'>
              <p className=''>I&apos;m a Full Stack Web Developer</p>
            </div>

            <p className='md:w-[800px] sm:text-sm md:text-base'>
              I&apos;ve been honing my coding skills for a couple of years now,
              diving deep into various technologies to craft seamless digital
              experiences. My toolkit primarily includes{" "}
              <span className='underline'>React</span>,{" "}
              <span className='underline'>Next.js</span>, and{" "}
              <span className='underline'>Node.js</span>, with occasional
              adventures in <span className='underline'>Python</span>. Whether
              it&apos;s crafting captivating front-end interfaces or
              architecting robust back-end systems, I thrive on making things
              work smoothly. . Whether it&apos;s bringing your vision to life or
              tackling complex technical challenges, I&apos;m here to make it
              happen. Let&apos;s collaborate and build some truly awesome stuff
              together! 🚀
            </p>
          </div>
        </div>
        <ContactMe />
      </div>
      {/* Tech/framworks */}
      <div className='md:px-20 bg-[#18181b] sm:px-4 flex flex-col items-center justify-center py-20'>
        <h2 className='md:text-6xl sm:text-4xl font-semibold mb-2'>
          Skills and Tools
        </h2>
        <p className='text-[#a3a3a3] text-sm font-semibold text-center'>
          Skills, Tools, and Technologies I Use to Bring Products to Life.
        </p>

        <Tech />
      </div>
      {/* Projects */}
      <Projects />

      {/* footer */}

      <div className='flex flex-col space-y-2 pt-8 sm:px-4 md:px-0 justify-center items-center'>
        <p className='text-3xl text-zinc-300 font-bold'>
          Let&lsquo;s Collaborate
        </p>
        <p className='text-zinc-400 pb-10 text-center'>
          Hey there! Want to collaborate with me? Let&lsquo;s join forces and
          make magic happen! 💫
        </p>
        <button className=' p-2 rounded-lg shadow-inner shadow-white font-semibold bg-gradient-to-r from-stone-500 via-stone-600 to-stone-900 '>
          <a href='mailTo:anujchhikara07@gmail.com'>Contact Me</a>
        </button>
        <div className='mt-10 w-auto flex flex-row justify-center'>
          <div>
            <hr className='my-3' />
            <div className='flex h-5 items-center md:space-x-4 sm:space-x-1.5 text-sm'>
              <a href='https://anujchhikara.vercel.app/'>Portfolio</a>
              <hr className='rotate-90 w-5 bg-white' />
              <a
                className='flex items-center space-x-1'
                href='https://twitter.com/AnujChhikara07'
              >
                <Twitter />
                <p>Twitter</p>
              </a>
              <hr className='rotate-90 w-5 bg-white' />
              <a
                className='flex items-center space-x-1'
                href='https://github.com/AnujChhikara'
              >
                {" "}
                <Github />
                <p>Github</p>{" "}
              </a>
              <hr className='rotate-90 w-5 bg-white' />
              <a
                className='flex items-end space-x-1'
                href='https://in.linkedin.com/in/anuj-chhikara-webdeveloper'
              >
                <Linkedin />
                <p>LinkedIn</p>
              </a>
            </div>
          </div>
        </div>

        <div className='text-sm text-zinc-400 pt-4 pb-4'>
          All Rights Reserved &copy; 2024
        </div>
      </div>
    </main>
  );
}
