'use server';

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { sql } from "@/lib/projects-db";

const ProjectFormSchema = z.object({
    title: z.string().trim().min(2, 'Title must be at least 2 characters.'),
    description: z.string().trim().min(10, 'Description must be at least 10 characters.'),
    type: z.enum(['opensource', 'school']),
    technologies: z.string().trim().min(2, 'Add at least one technology.'),
    link: z
        .string()
        .trim()
        .refine((value) => value === '' || /^https?:\/\//.test(value), 'Link must start with hattp:// or https://'),

});

function parseProjectForm(formData: FormData) {
    const parsed = ProjectFormSchema.safeParse({
        title: formData.get('title') ?? '',
        description: formData.get('description') ?? '',
        type: formData.get('type') ?? '',
        technologies: formData.get('technologies') ?? '',
        link: formData.get('link') ?? '',
    });

    if (!parsed.success) {
        throw new Error('Invalid project input. Please check the form and try again.');
    }

    const technologies = parsed.data.technologies
        .split(',')
        .map((tech) => tech.trim())
        .filter((tech) => tech.length > 0);

    return {
        title: parsed.data.title,
        description: parsed.data.description,
        type: parsed.data.type,
        technologies,
        link: parsed.data.link || null, 
    };
}

function toProjectId(id: string | number): number {
    const projectId = Number(id);
    if (!Number.isInteger(projectId) || projectId < 1) {
        throw new Error('Invalid project id.');
    }
    return projectId;
}

export async function createProject(formData: FormData): Promise<void> {
    const { title, description, type, technologies, link } = parseProjectForm(formData);

    await sql`
    INSERT INTO projects (title, description, type, technologies, link)
    VALUES (${title}, ${description}, ${type}, ${technologies}, ${link})
    `;

    revalidatePath('/projects');
    redirect('/projects');
}

export async function updateProject(id: string, formData: FormData): Promise<void> {
    const projectId = toProjectId(id);
    const { title, description, type, technologies, link } =parseProjectForm(formData);

    await sql`
        UPDATE projects
        SET title = ${title},
            description = ${description},
            type = ${type},
            technologies = ${technologies},
            link = ${link}
        WHERE id = ${projectId}
    `;

    revalidatePath('/projects');
    redirect('/projects');
}

export async function deleteProject(id: number): Promise<void> {
    const projectId = toProjectId(id);

    await sql`DELETE FROM projects WHERE id = ${projectId}`;

    revalidatePath('/projects');
}