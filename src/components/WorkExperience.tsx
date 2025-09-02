import React from "react";
import { motion } from "framer-motion";

interface WorkItem {
  role: string;
  company: string;
  period: string;
  description: string[];
}

const workData: WorkItem[] = [
  {
    role: "UI/UX Designer, Graphics Developer",
    company: "SpeedexInd Private Limited, India",
    period: "Sep 2022 -- Jul 2025",
    description: [
      "Designed and prototyped responsive interfaces for e-commerce platforms, improving usability and consistency.",
      "Delivered high-fidelity screens and component libraries using Figma, HTML/CSS, and design systems.",
      "Managed end-to-end visual requirements as the team's principal designer, boosting brand engagement.",
    ],
  },
  {
    role: "Full Stack Developer, Open Source Contributor",
    company: "Real Dev Squad, Remote",
    period: "Sep 2024 -- Present",
    description: [
      "Built and maintained full stack features using React, Node.js/Express, and MongoDB for a large-scale open-source platform.",
      "Building the frontend of a public-facing project management app, delivering intuitive user experiences and scalable components.",
      "Designed REST APIs, wrote unit/integration tests, reviewed PRs, and mentored new contributors.",
      "Owned feature delivery end-to-end, improving scalability and developer experience with CI/CD pipelines.",
    ],
  },
];

export default function WorkExperience() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const lineVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.section
      id="work"
      className="md:px-20 sm:px-4 flex flex-col items-center justify-center py-20 bg-black"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <motion.h2
        className="md:text-6xl sm:text-4xl font-semibold mb-16 text-white"
        variants={textVariants}
      >
        Work Experience
      </motion.h2>

      <div className="max-w-4xl w-full space-y-12">
        {workData.map((work, index) => (
          <motion.div key={index} className="p-8" variants={itemVariants}>
            {/* Role and Company */}
            <motion.div className="mb-6" variants={textVariants}>
              <h3 className="text-2xl font-bold text-white mb-2">
                {work.role}
              </h3>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <p className="text-lg text-zinc-300">{work.company}</p>
                <p className="text-sm text-zinc-400 font-mono">{work.period}</p>
              </div>
            </motion.div>

            {/* Description */}
            <motion.div variants={textVariants}>
              <ul className="space-y-3">
                {work.description.map((item, itemIndex) => (
                  <motion.li
                    key={itemIndex}
                    className="flex items-start gap-3 text-zinc-300 leading-relaxed"
                    variants={lineVariants}
                    custom={itemIndex}
                  >
                    <span className="text-blue-400 text-sm flex-shrink-0 mt-1">
                      •
                    </span>
                    <span className="text-sm">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
