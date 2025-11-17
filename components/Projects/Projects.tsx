"use client";

interface Project {
  title: string;
  description: string;
  link: string;
}

export default function Projects({ projects }: { projects: Project[] }) {
  return (
    <section className="py-14 sm:py-20 bg-gray-100">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-10">
        Projects
      </h2>

      <div
        className="
          grid
          grid-cols-1 
          sm:grid-cols-2 
          lg:grid-cols-3 
          gap-4 sm:gap-6 lg:gap-8
          w-full
          max-w-[1600px]
          mx-auto
          px-2 sm:px-4 lg:px-10
        "
      >
        {projects.map((project, index) => (
          <div
            key={index}
            className="
              p-4 sm:p-6 
              bg-white 
              rounded-xl 
              shadow 
              hover:shadow-xl 
              transition
              opacity-0 
              animate-cardFadeUp
            "
            style={{ animationDelay: `${index * 0.15}s` }}
          >
            <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold">
              {project.title}
            </h3>

            <p className="mt-2 text-gray-600 text-sm sm:text-base lg:text-lg">
              {project.description}
            </p>

            <a
              href={project.link}
              className="block mt-4 text-blue-600 font-medium text-sm sm:text-base"
            >
              View Project →
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
