import ProjectsFromApi from "@/components/ProjectsFromApi";

export default function ProjectsOverview() {
    return (
        <section>
            <h1 className="text-3xl font-bold mb-4">Projects Overview</h1>
            <p className="text-lg text-stone-700 mb-5">
                Here you can find the different kinds of projects I have worked on.
                Use the menu above to see my open source and school projects.
            </p>
            <ProjectsFromApi />
        </section>
    );
}