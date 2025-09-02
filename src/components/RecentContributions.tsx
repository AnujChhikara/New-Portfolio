import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { useState } from "react";

interface Contribution {
  name: string;
  description: string;
  role: string;
  technologies: string[];
  impact: string;
  link: string;
}

const contributions: Contribution[] = [
  {
    name: "Real Dev Squad todo-frontend",
    description: "feat: implement team management features and UI components",
    role: "Feature Developer",
    technologies: ["React", "TypeScript", "Team Management", "UI Components"],
    impact:
      "Implemented team management features and UI components for better project collaboration",
    link: "https://github.com/Real-Dev-Squad/todo-frontend/pull/102",
  },
  {
    name: "Real Dev Squad todo-frontend",
    description:
      "feat: Add landing page and secure workflow with real API integration",
    role: "Frontend Developer",
    technologies: [
      "React",
      "TypeScript",
      "API Integration",
      "Security",
      "Landing Page",
    ],
    impact:
      "Built landing page with secure workflow and real API integration for enhanced user experience",
    link: "https://github.com/Real-Dev-Squad/todo-frontend/pull/79",
  },
  {
    name: "Real Dev Squad todo-backend",
    description:
      "feat(database): Add unified MongoDB and PostgreSQL dual-write mechanism",
    role: "Backend Developer",
    technologies: [
      "Node.js",
      "Express",
      "MongoDB",
      "PostgreSQL",
      "Database Architecture",
    ],
    impact:
      "Implemented dual-write mechanism for MongoDB and PostgreSQL, improving database flexibility and reliability",
    link: "https://github.com/Real-Dev-Squad/todo-backend/pull/258",
  },
];

// Text rendering component
const TypingText = ({
  text,
  className,
  delay = 0,
}: {
  text: string;
  className: string;
  delay?: number;
}) => {
  return (
    <motion.span
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.02,
            delayChildren: delay,
          },
        },
      }}
    >
      {text.split("").map((char: string, i: number) => (
        <motion.span
          key={i}
          variants={{
            hidden: {
              opacity: 0,
              y: 10,
              filter: "blur(4px)",
            },
            visible: {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              transition: {
                duration: 0.3,
                ease: "easeOut",
              },
            },
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.span>
  );
};

export default function RecentContributions() {
  const [visibleItems, setVisibleItems] = useState(new Set());

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      filter: "blur(4px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
    hover: {
      y: -2,
      transition: {
        duration: 0.2,
        ease: "easeOut",
      },
    },
  };

  const buttonVariants = {
    hidden: {
      opacity: 0,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
    hover: {
      scale: 1.02,
      transition: {
        duration: 0.2,
        ease: "easeOut",
      },
    },
    tap: {
      scale: 0.98,
    },
  };

  const techVariants = {
    hidden: {
      opacity: 0,
      x: -10,
    },
    visible: (index: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
        delay: index * 0.05,
      },
    }),
    hover: {
      scale: 1.03,
      backgroundColor: "rgb(39 39 42)",
      transition: {
        duration: 0.2,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.section
      id="contributions"
      className="md:px-20 sm:px-4 flex flex-col items-center justify-center py-20 bg-black"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      <motion.div
        className="text-center mb-16"
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" },
          },
        }}
      >
        <TypingText
          text="Recent Contributions"
          className="md:text-6xl sm:text-4xl font-semibold mb-6 text-white block"
          delay={0.3}
        />
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <TypingText
            text="Open source work and contributions to the developer community"
            className="text-zinc-400 text-lg max-w-2xl mx-auto block"
            delay={1.2}
          />
        </motion.div>

        <motion.a
          href="https://tiny.realdevsquad.com/220e8"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-white font-medium rounded-lg transition-colors duration-300 group"
          variants={buttonVariants}
          initial="hidden"
          whileInView="visible"
          whileHover="hover"
          whileTap="tap"
          viewport={{ once: true }}
          style={{
            transitionDelay: "1.8s",
          }}
        >
          <Github className="w-5 h-5" />
          View All on GitHub
          <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
        </motion.a>
      </motion.div>

      <div className="max-w-5xl w-full space-y-6">
        <AnimatePresence>
          {contributions.map((contribution, index) => (
            <motion.div
              key={`${contribution.name}-${index}`}
              className="p-6 hover:bg-zinc-900/20 rounded-xl transition-colors duration-300 cursor-pointer border border-transparent hover:border-zinc-800/50"
              variants={itemVariants}
              whileHover="hover"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              layout
            >
              <div className="flex flex-col md:flex-row md:items-start gap-4">
                {/* Project Info */}
                <div className="flex-1 space-y-3">
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <AnimatePresence>
                        <motion.h3
                          className="text-xl font-bold text-white"
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{
                            duration: 0.4,
                            delay: index * 0.1 + 0.1,
                          }}
                          viewport={{ once: true }}
                        >
                          {contribution.name}
                        </motion.h3>
                      </AnimatePresence>
                      <motion.span
                        className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-full"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
                        whileHover={{
                          scale: 1.05,
                          backgroundColor: "rgba(59, 130, 246, 0.3)",
                          transition: { duration: 0.2 },
                        }}
                        viewport={{ once: true }}
                      >
                        {contribution.role}
                      </motion.span>
                    </div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      viewport={{ once: true }}
                    >
                      <TypingText
                        text={contribution.description}
                        className="text-zinc-300 text-sm leading-relaxed"
                        delay={index * 0.05 + 0.2}
                      />
                    </motion.div>
                  </motion.div>

                  {/* Technologies */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.05 + 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex flex-wrap gap-2">
                      <AnimatePresence>
                        {contribution.technologies.map((tech, techIndex) => (
                          <motion.span
                            key={tech}
                            className="px-3 py-1 bg-zinc-800 text-zinc-300 text-xs rounded-full cursor-pointer"
                            variants={techVariants}
                            initial="hidden"
                            whileInView="visible"
                            whileHover="hover"
                            custom={techIndex}
                            viewport={{ once: true }}
                            layout
                            exit={{
                              opacity: 0,
                              scale: 0.8,
                              transition: { duration: 0.15 },
                            }}
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </AnimatePresence>
                    </div>
                  </motion.div>

                  {/* Impact */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 + 0.15 }}
                    viewport={{ once: true }}
                  >
                    <p className="text-zinc-400 text-sm">
                      <span className="text-green-400 font-medium">
                        Impact:
                      </span>{" "}
                      <TypingText
                        text={contribution.impact}
                        className="inline"
                        delay={index * 0.05 + 0.25}
                      />
                    </p>
                  </motion.div>
                </div>

                {/* Stats & Link */}
                <motion.div
                  className="flex flex-col items-end gap-3"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 + 0.1 }}
                  viewport={{ once: true }}
                >
                  <motion.a
                    href={contribution.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white text-sm rounded-lg transition-colors duration-300 group"
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    View Project
                    <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
                  </motion.a>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.section>
  );
}
