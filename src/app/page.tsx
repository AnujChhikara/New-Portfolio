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
        <div className=' flex flex-row-reverse  space-x-4 pb-20 pt-12'>
          <Image
            width={150}
            className=' bg-[#5f5f5f] p-0.5  w-36'
            height={150}
            src='https://res.cloudinary.com/dlahahicg/image/upload/v1712917455/zman4v8yaqtvixmnthmi.jpg'
            alt='avatar img'
          />
          <div className='w-96 flex flex-col  justify-center space-y-4'>
            <p className='text-lg text-left underline-offset-8 underline '>
              Anuj | Full Stack Developer
            </p>
            <p className='text-md text-gray-300 text-left'>
              I love building websites and programming. Bridging design and
              functionality, I create robust, user-focused sites that meet
              modern standards.
            </p>
          </div>
        </div>

        <ContactMe />
      </div>

      {/* Projects */}
      <Projects />

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

      {/* footer */}

      <div className='flex flex-col bg-[#18181b] space-y-2 pt-8 sm:px-4 md:px-0 justify-center items-center'>
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
            <div className='flex h-5 items-center md:space-x-4  text-sm'>
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
