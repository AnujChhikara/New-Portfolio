import ContactMe from "@/components/ContactMe";
import Projects from "@/components/Projects";
import Tech from "@/components/Tech";
import Image from "next/image";

export default function Home() {
  return (
    <main className='flex flex-col bg-gradient-to-b from-zinc-800 to-black  h-screen'>
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
            <p className='md:w-[800px] sm:text-sm md:text-base'>
              I&apos;m a Full Stack Web Developer. I&apos;ve been honing my
              coding skills for a couple of years now, diving deep into various
              technologies to craft seamless digital experiences. My toolkit
              primarily includes <span className='underline'>React</span>,{" "}
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
      <div className='md:px-20 sm:px-4 flex flex-col items-center justify-center py-20'>
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

      <footer className=' w-full text-center pt-16 pb-4 '>
        <p className='text-[#a3a3a3]'>
          &copy; 2024 Anuj Chhhikara. All rights reserved.
        </p>
      </footer>
    </main>
  );
}
