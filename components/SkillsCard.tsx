interface SkillsCardProps {
    heading: string;
    skills: string[];
}

export default function SkillsCard({ heading, skills }: SkillsCardProps) {
    return (
        <section className="mt-8 p-6 bg-rose-50 rounded-lg border border-rose-200">
            <h3 className="text-2xl font-bold mb-4 text-stone-900">{heading}</h3>
            <ul className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                    <li key={skill} className="px-3 py-1 bg-white text-rose-900 rounded-full border border-rose-300 text-sm">
                        {skill}
                    </li>
                ))}
            </ul>
        </section>
    );
}