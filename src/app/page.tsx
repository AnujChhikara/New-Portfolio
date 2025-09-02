"use client";
import ContactMe from "@/components/ContactMe";
import { MacOSDock } from "@/components/dock";
import Projects from "@/components/Projects";
import Tech from "@/components/Tech";
import { Github, Linkedin, Twitter } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main
      className={`flex flex-col text-white h-screen transition-colors duration-500 ease-in-out
      }`}
    >
      <div className="blob-cont">
        <div className="yellow blob"></div>
        <div className="red blob"></div>
        <div className="green blob"></div>
      </div>
      <div className="min-h-screen w-full bg-black relative">
        {/* Dark Noise Colored Background */}
        <div
          className="absolute inset-0 z-0"
          style={{
            background: "#000000",
            backgroundImage: `
        radial-gradient(circle at 1px 1px, rgba(139, 92, 246, 0.2) 1px, transparent 0),
        radial-gradient(circle at 1px 1px, rgba(59, 130, 246, 0.18) 1px, transparent 0),
        radial-gradient(circle at 1px 1px, rgba(236, 72, 153, 0.15) 1px, transparent 0)
      `,
            backgroundSize: "20px 20px, 30px 30px, 25px 25px",
            backgroundPosition: "0 0, 10px 10px, 15px 5px",
          }}
        />
        {/* Your Content/Components */}

        {/* main section */}
        <MacOSDock />
        <section
          id="home"
          className="pb-8 md:px-20 flex min-h-screen flex-col space-y-4 items-center justify-start sm:px-2 text-center md:pt-20 sm:pt-8 "
        >
          <motion.div
            className="max-w-2xl flex pt-20 pb-10 flex-col mr-8  justify-start items-start space-y-2"
            initial={{ opacity: 0, filter: "blur(20px)", y: 30 }}
            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <motion.h1
              className="text-4xl rounded-lg items-center font-bold"
              initial={{ opacity: 0, filter: "blur(15px)", y: 20 }}
              animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Anuj Kumar
            </motion.h1>

            <motion.p
              className="text-lg text-neutral-300"
              initial={{ opacity: 0, filter: "blur(12px)", y: 15 }}
              animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              Full Stack Developer
            </motion.p>

            <motion.h2
              className="text-md text-neutral-300 text-left"
              initial={{ opacity: 0, filter: "blur(10px)", y: 15 }}
              animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              Passionate about building modern, user-friendly web apps that
              combine great design with high performance.
            </motion.h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, filter: "blur(8px)", y: 20 }}
            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <ContactMe />
          </motion.div>
        </section>

        {/* Projects */}
        <section id="projects">
          <Projects />
        </section>

        {/* Tech/frameworks */}
        <section
          id="skills"
          className="md:px-20 bg-inherit text-inherit sm:px-4 flex flex-col items-center justify-center py-20"
        >
          <h2 className="md:text-6xl sm:text-4xl font-semibold mb-2">
            Skills and Tools
          </h2>
          <p className={`text-[#a3a3a3] text-sm font-semibold text-center`}>
            Skills, Tools, and Technologies I Use to Bring Products to Life.
          </p>

          <Tech />
        </section>

        {/* footer */}

        <footer className="flex flex-col bg-inherit text-inherit space-y-2 pt-8 sm:px-4 md:px-0 justify-center items-center">
          <p className={`text-3xl  font-bold text-zinc-300`}>
            Let&lsquo;s Collaborate
          </p>
          <p className={`pb-10 text-center text-zinc-400`}>
            Hey there! Want to collaborate with me? Let&lsquo;s join forces and
            make magic happen! 💫
          </p>
          <a
            href="mailTo:anujchhikara07@gmail.com"
            className=" p-2 rounded-lg shadow-inner text-white hover:opacity-80  duration-500 shadow-white font-semibold bg-gradient-to-r from-stone-500 via-stone-600 to-stone-900 "
          >
            Contact Me
          </a>
          <div className="mt-10 w-auto flex flex-row justify-center">
            <div>
              <hr className={`my-3 `} />
              <div className="flex h-5 items-center md:space-x-4   text-sm">
                <a
                  className={`flex items-center space-x-1  hover:text-gray-300
                duration-500 hover:underline-offset-2 hover:underline`}
                  href="https://twitter.com/AnujChhikara07"
                >
                  <Twitter />
                  <p>Twitter</p>
                </a>
                <hr
                  className={`rotate-90 w-5 bg-white
                `}
                />
                <a
                  className={`flex items-center space-x-1  hover:text-gray-300  duration-500 hover:underline-offset-2 hover:underline`}
                  href="https://github.com/AnujChhikara"
                >
                  <Github />
                  <p>Github</p>
                </a>
                <hr className={`rotate-90 w-5 bg-white `} />
                <a
                  className={`flex items-end space-x-1 hover:text-gray-300  duration-500 hover:underline-offset-2 hover:underline`}
                  href="https://in.linkedin.com/in/anuj-chhikara-webdeveloper"
                >
                  <Linkedin />
                  <p>LinkedIn</p>
                </a>
              </div>
            </div>
          </div>

          <div
            className={`text-sm  pt-4 pb-4
           text-zinc-400`}
          >
            All Rights Reserved &copy; 2025
          </div>
        </footer>
      </div>
    </main>
  );
}
