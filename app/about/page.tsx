import SkillsCard from "@/components/SkillsCard";

export default function About() {
    return (
        <main className="max-w-4xl mx-auto px-4 py-12">
            <h2 className="text-3xl font-bold mb-4">About Me</h2>
            <p className="text-lg text-stone-700">
                Hi! I am Rebeca Arredondo, a web development student at BYU-Idaho. 
                I enjoy building websites and currently I am learning full-stack development with React and Next.js.
            </p>
            <SkillsCard
            heading="My Skills"
            skills={['HTML', 'CSS','JavaScript', 'React', 'Next.js', 'TypeScript', "Tailwind CSS", 'Git' ]}
            />
        </main>
    );
}