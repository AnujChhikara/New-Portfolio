import ContactMe from "@/components/ContactMe";
import Projects from "@/components/Projects";
import Tech from "@/components/Tech";


export default function Home() {
  return (
   <main className="flex flex-col space-y-32 h-screen  ">
    {/* main section */}
    <div className="bg-black pb-8 px-20 pt-20">
    <div className="flex flex-col justify-start space-y-4">
      {/* image */}
      <div className="w-20 h-20 rounded-full text-black text-center bg-white">
        img
      </div>
      <h1 className="font-bold text-xl mt-2">Hello!</h1>
      <div className="text-[#a3a3a3]">
        <h2 className="font-bold underline text-white  mb-2 text-xl">I&apos;m Anuj </h2>
        <p className="w-1/2">
          I&apos;m a Full Stack Web Developer. I&apos;ve been honing my coding skills for a couple of years now, diving deep into various technologies to craft seamless digital experiences. My toolkit primarily includes <span className="underline">React</span>, <span className="underline">Next.js</span>, and <span className="underline">Node.js</span>, with occasional adventures in <span className="underline">Python</span>. Whether it&apos;s crafting captivating front-end interfaces or architecting robust back-end systems, I thrive on making things work smoothly.
          . Whether it&apos;s bringing your vision to life or tackling complex technical challenges, I&apos;m here to make it happen. Let&apos;s collaborate and build some truly awesome stuff together! 🚀
          </p>
      </div>
      
    </div>
     <ContactMe/>
    </div>
   {/* Tech/framworks */}
   <div className="px-20">
  <h2 className="text-3xl font-semibold mb-8">{'<Languages & Frameworks>'}</h2>
  
  <Tech/>
</div>
  {/* Projects */}
    <Projects/>

  {/* footer */}

 <footer className=" w-full text-center py-4">
    <p className="text-[#a3a3a3]">&copy; 2024 Anuj Chhhikara. All rights reserved.</p>
</footer>
   </main>
  );
}
