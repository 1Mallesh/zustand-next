
import Banner from "@/components/common/Banner/Banner";
import { portfolioData } from "./data/portfolioData";
import Projects from "@/components/Projects/Projects";

export default function HomePage() {
  const { banner, skills, projects } = portfolioData;

  return (
    <>
      <Banner
        title={banner.title}
        subtitle={banner.subtitle}
        description={banner.description}
        show={banner.show}
      />
      <Projects projects={projects} />
    </>
  );
}
