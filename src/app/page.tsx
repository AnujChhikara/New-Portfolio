"use client";
import ContactMe from "@/components/ContactMe";
import { MacOSDock } from "@/components/dock";
import Footer from "@/components/Footer";
import Projects from "@/components/Projects";
import RecentContributions from "@/components/RecentContributions";
import Tech from "@/components/Tech";
import WorkExperience from "@/components/WorkExperience";
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
      <div className="md:min-h-screen w-full bg-black relative">
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

        <MacOSDock />
        <section
          id="home"
          className="pb-8 md:px-20 flex  md:min-h-screen sm:mb-20 md:mb-0 flex-col space-y-4 items-center md:justify-start sm:px-2 text-center md:pt-20 sm:pt-8 "
        >
          <motion.div
            className="max-w-2xl flex ml-6 md:ml-0 pt-20 pb-10 flex-col mr-8  justify-start items-start space-y-2"
            initial={{ opacity: 0, filter: "blur(20px)", y: 0 }}
            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <motion.h1
              className="text-4xl rounded-lg items-center font-bold"
              initial={{ opacity: 0, filter: "blur(15px)", y: 0 }}
              animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Anuj Kumar
            </motion.h1>

            <motion.p
              className="text-lg text-neutral-300"
              initial={{ opacity: 0, filter: "blur(12px)", y: 0 }}
              animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              Full Stack Developer
            </motion.p>

            <motion.h2
              className="text-md sm:w-80 md:w-full text-neutral-300 text-left"
              initial={{ opacity: 0, filter: "blur(10px)", y: 0 }}
              animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              Passionate about building modern, user-friendly web apps that
              combine great design with high performance.
            </motion.h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, filter: "blur(8px)", y: 0 }}
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
          <h2 className="md:text-6xl sm:text-3xl font-semibold mb-2">
            Technologies and Tools
          </h2>
          <p className={`text-[#a3a3a3] text-sm font-semibold text-center`}>
            Technologies and Tools I Use to Bring Products to Life.
          </p>

          <Tech />
        </section>

        {/* Work Experience */}
        <WorkExperience />
        <section id="contributions" className="hidden md:block">
          <RecentContributions />
        </section>
        {/* Recent Contributions */}

        {/* Footer */}
        <Footer />
      </div>
    </main>
  );
}
