'use client';

import { useEffect, useState } from "react";
import ProjectList from "./ProjectList";

interface ApiProject {
    id: number;
    title: string;
    description: string;
    type: string;
    technologies: string[];
    link?: string;
}

interface ProjectsFromApiProps {
    type?: 'opensource' | 'school';
}

export default function ProjectsFromApi({ type }: ProjectsFromApiProps) {
    const [projects, setProjects] = useState<ApiProject[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const url = type ? `/api/projects?type=${type}` : '/api/projects';

        fetch(url)
        .then((response) => {
            if(!response.ok) {
                throw new Error('Request failed.');
            }
            return response.json();
        })
        .then((data: ApiProject[]) => setProjects(data))
        .catch(() => setError('Could not load projects.'))
        .finally(() => setLoading(false));
    }, [type]);

    if (loading) return <p className="text-stone-700">Loading projects...</p>;
    if (error) return <p className="text-red-700">{error}</p>;
    if (projects.length === 0) return <p className="text-stone-700">No projects found.</p>

    return <ProjectList projects={projects} />
}