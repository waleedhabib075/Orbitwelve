import { pageMetadata } from "@/lib/seo";
import ProjectsClient from "./ProjectsClient";

export const metadata = pageMetadata({
  title: "Our Work | Orbitwelve",
  description:
    "Selected project work across web and app development, digital marketing, SEO, graphic design, video editing, and research writing.",
  path: "/projects",
});

export default function ProjectsPage() {
  return <ProjectsClient />;
}
