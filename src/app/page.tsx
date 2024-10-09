"use client";
import ContactMe from "@/components/ContactMe";
import Projects from "@/components/Projects";
import Tech from "@/components/Tech";
import { Github, Linkedin, Moon, Sun, Twitter } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [isDark, setIsDark] = useState(true);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };
  return (
    <main
      className={`flex flex-col h-screen transition-colors duration-500 ease-in-out ${
        isDark ? "bg-[#18181b] text-white" : "bg-[#c4c4c4] text-zinc-900"
      }`}
    >
      <div className='flex items-center justify-end p-4 pb-0'>
        <button
          onClick={toggleTheme}
          className={`relative w-12 h-7 rounded-full p-1 transition-colors duration-300 ease-in-out ${
            isDark ? "bg-zinc-800 text-white" : "bg-zinc-400 text-black"
          }`}
          aria-label='Toggle theme'
        >
          <span
            className={`absolute inset-0.5 w-6 h-6 rounded-full flex items-center justify-center transition-transform duration-300 ease-in-out ${
              isDark ? "bg-zinc-900 translate-x-5" : "bg-yellow-400"
            }`}
          >
            {isDark ? (
              <Moon className='w-3 h-3 text-white' />
            ) : (
              <Sun className='w-3 h-3 text-white' />
            )}
          </span>
        </button>
      </div>
      {/* main section */}
      <section className='pb-8 md:px-20 flex flex-col space-y-4 items-center justify-center sm:px-2 text-center md:pt-20 sm:pt-8 '>
        {/* image */}
        <div className=' flex sm:flex-col md:flex-row-reverse sm:space-y-6 md:space-y-0   sm:pb-4 sm:pt-4  md:pb-12 md:pt-12'>
          <Image
            width={150}
            className=' bg-[#5f5f5f] p-0.5 hover:bg-zinc-400 duration-1000 md:mx-12 rounded-2xl shadow-md shadow-white w-24  md:w-36'
            height={150}
            src='https://res.cloudinary.com/dlahahicg/image/upload/v1712917455/zman4v8yaqtvixmnthmi.jpg'
            alt='avatar img'
          />
          <div className='md:w-96 sm:w-80 flex flex-col  justify-center space-y-2'>
            <h1 className=' text-left  rounded-lg items-center font-bold '>
              Anuj | Full Stack Developer
            </h1>
            <hr className=' w-64 border-gray-500' />
            <h2
              className={`text-md ${
                isDark ? "text-gray-300" : "text-zinc-800"
              } text-left`}
            >
              I love building websites and programming. My goal is to create
              efficient, user-centric web solutions that excel in both design
              and performance.
            </h2>
          </div>
        </div>

        <ContactMe />
      </section>

      {/* Projects */}
      <Projects isDark={isDark} />

      {/* Tech/framworks */}
      <section className='md:px-20 bg-inherit text-inherit sm:px-4 flex flex-col items-center justify-center py-20'>
        <h2 className='md:text-6xl sm:text-4xl font-semibold mb-2'>
          Skills and Tools
        </h2>
        <p
          className={`${
            isDark ? "text-[#a3a3a3]" : "text-zinc-600"
          }text-sm font-semibold text-center`}
        >
          Skills, Tools, and Technologies I Use to Bring Products to Life.
        </p>

        <Tech />
      </section>

      {/* footer */}

      <footer className='flex flex-col bg-inherit text-inherit space-y-2 pt-8 sm:px-4 md:px-0 justify-center items-center'>
        <p
          className={`text-3xl  font-bold ${
            isDark ? "text-zinc-300" : "text-zinc-800"
          }`}
        >
          Let&lsquo;s Collaborate
        </p>
        <p
          className={`pb-10 text-center ${
            isDark ? "text-zinc-400" : "text-zinc-700"
          }`}
        >
          Hey there! Want to collaborate with me? Let&lsquo;s join forces and
          make magic happen! 💫
        </p>
        <a
          href='mailTo:anujchhikara07@gmail.com'
          className=' p-2 rounded-lg shadow-inner text-white hover:opacity-80  duration-500 shadow-white font-semibold bg-gradient-to-r from-stone-500 via-stone-600 to-stone-900 '
        >
          Contact Me
        </a>
        <div className='mt-10 w-auto flex flex-row justify-center'>
          <div>
            <hr className={`my-3 ${isDark ? "" : "border border-zinc-600"}`} />
            <div className='flex h-5 items-center md:space-x-4   text-sm'>
              <a
                className={`flex items-center space-x-1 ${
                  isDark ? "hover:text-gray-300" : "hover:text-gray-700"
                } duration-500 hover:underline-offset-2 hover:underline`}
                href='https://twitter.com/AnujChhikara07'
              >
                <Twitter />
                <p>Twitter</p>
              </a>
              <hr
                className={`rotate-90 w-5 ${
                  isDark ? "bg-white" : "bg-zinc-900 border-zinc-600"
                }`}
              />
              <a
                className={`flex items-center space-x-1 ${
                  isDark ? "hover:text-gray-300" : "hover:text-gray-700"
                } duration-500 hover:underline-offset-2 hover:underline`}
                href='https://github.com/AnujChhikara'
              >
                {" "}
                <Github />
                <p>Github</p>{" "}
              </a>
              <hr
                className={`rotate-90 w-5 ${
                  isDark ? "bg-white" : "bg-zinc-900 border-zinc-600"
                }`}
              />
              <a
                className={`flex items-end space-x-1 ${
                  isDark ? "hover:text-gray-300" : "hover:text-gray-700"
                } duration-500 hover:underline-offset-2 hover:underline`}
                href='https://in.linkedin.com/in/anuj-chhikara-webdeveloper'
              >
                <Linkedin />
                <p>LinkedIn</p>
              </a>
            </div>
          </div>
        </div>

        <div
          className={`text-sm  pt-4 pb-4 ${
            isDark ? "text-zinc-400" : "text-zinc-700"
          }`}
        >
          All Rights Reserved &copy; 2024
        </div>
      </footer>
    </main>
  );
}
