import React from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Twitter } from "lucide-react";

export default function Footer() {
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const socialIconVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
    hover: {
      scale: 1.1,
      transition: {
        duration: 0.2,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.footer
      className="relative z-10  bg-gradient-to-b from-transparent to-black/20 backdrop-blur-sm"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="max-w-7xl mx-auto px-6 py-16 pt-28">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-12">
          <motion.div className="space-y-4 max-w-md" variants={itemVariants}>
            <h3 className="text-2xl font-bold text-white text-left">
              Anuj Kumar
            </h3>
            <p className="text-zinc-400 text-sm leading-relaxed text-left">
              Full-stack developer passionate about creating innovative web
              solutions and contributing to the developer community.
            </p>
            <div className="flex space-x-4">
              <motion.a
                href="https://github.com/AnujChhikara"
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300 group"
                target="_blank"
                rel="noopener noreferrer"
                variants={socialIconVariants}
                whileHover="hover"
              >
                <Github className="w-5 h-5 text-zinc-400 group-hover:text-white transition-colors" />
              </motion.a>
              <motion.a
                href="https://twitter.com/AnujChhikara07"
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300 group"
                target="_blank"
                rel="noopener noreferrer"
                variants={socialIconVariants}
                whileHover="hover"
              >
                <Twitter className="w-5 h-5 text-zinc-400 group-hover:text-white transition-colors" />
              </motion.a>
              <motion.a
                href="https://in.linkedin.com/in/anujchhhikara20"
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300 group"
                target="_blank"
                rel="noopener noreferrer"
                variants={socialIconVariants}
                whileHover="hover"
              >
                <Linkedin className="w-5 h-5 text-zinc-400 group-hover:text-white transition-colors" />
              </motion.a>
            </div>
          </motion.div>

          <motion.div className="space-y-4  text-left" variants={itemVariants}>
            <h4 className="text-lg font-semibold text-white">
              Let&apos;s Connect
            </h4>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Ready to collaborate on your next project? Let&apos;s build
              something amazing together! 🚀
            </p>
            <motion.a
              href="mailto:anujchhikara07@gmail.com"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-neutral-600 to-neutral-900 text-white font-medium rounded-full hover:from-neutral-700 hover:to-neutral-900 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get In Touch
            </motion.a>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          className="pt-8 border-t border-white/10"
          variants={itemVariants}
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-zinc-500 text-sm text-left">
              © 2025 Anuj Kumar. All rights reserved.
            </p>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
}
