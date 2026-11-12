import ProjectsFromApi from "@/components/ProjectsFromApi";

export default function SchoolProjects() {
    return (
        <section>
            <h1 className="text-3xl font-bold mb-4">School Projects</h1>
            <p className="text-lg text-stone-700 mb-5">
                Projects I have build for my web development class at BYU-Idaho.
            </p>
            <ProjectsFromApi type="school" />
        </section>
    );
}