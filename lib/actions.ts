'use server';

import { email, z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { sql } from "@/lib/projects-db";
import { auth, signIn } from "@/auth";
import { AuthError } from "next-auth";

async function requireOwnerSession() {
    const session = await auth();
    if (!session?.user) {
        throw new Error('Not authenticated');
    }
    return session;
}

const currentYear = new Date().getFullYear();

const ProjectFormSchema = z.object({
    title: z.string().trim().min(3, 'Title must be at least 3 characters.'),
    description: z.string().trim().min(10, 'Description must be at least 10 characters.'),
    type: z.enum(['opensource', 'school']),
    technologies: z.string().trim().min(2, 'Add at least one technology.'),
    link: z
        .string()
        .trim()
        .refine((value) => value === '' || /^https?:\/\//.test(value), 'Link must start with hattp:// or https://'),
    yearCompleted: z.coerce
        .number()
        .int('Year must be a whole number')
        .gte(2000, 'Year must be 2000 or later.')
        .lte(currentYear, `Year cannot be greater than ${currentYear}.`),
});

export type ProjectFormValues = {
    title: string;
    description: string;
    type: string;
    technologies: string;
    link: string;
    yearCompleted: string;
};

export type ProjectFormState = {
    errors?: {
        title?: string [];
        description?: string[];
        type?: string[];
        technologies?: string[];
        link?: string[];
        yearCompleted?: string[];
    };
    message?: string | null;
    values?: ProjectFormValues;
};

function validateProjectForm(formData: FormData) {
    const values: ProjectFormValues = {
        title: String(formData.get('title') ?? ''),
        description: String(formData.get('description') ?? ''),
        type: String(formData.get('type') ?? ''),
        technologies: String(formData.get('technologies') ?? ''),
        link: String(formData.get('link') ?? ''),
        yearCompleted: String(formData.get('yearCompleted') ?? ''),
    };

    const validated = ProjectFormSchema.safeParse(values);

    if (!validated.success) {
        return {
            ok: false as const,
            state: {
                errors: validated.error.flatten().fieldErrors,
                message: 'Missing or invalid fields. Please fix the errors below.',
                values,
            },
        };
    }

    const technologies = validated.data.technologies
        .split(', ')
        .map((tech) => tech.trim())
        .filter((tech) => tech.length > 0);

    return {
        ok: true as const,
        values,
        data: {
            ...validated.data,
            technologies,
            link: validated.data.link || null,
        },
    };
}

function toProjectId(id: string | number): number {
    const projectId = Number(id);
    if (!Number.isInteger(projectId) || projectId < 1) {
        throw new Error('Invalid project id.');
    }
    return projectId;
}

export async function createProject(
    prevState: ProjectFormState,
    formData: FormData
): Promise<ProjectFormState> {
    await requireOwnerSession();
    const result = validateProjectForm(formData);
    if (!result.ok) return result.state;

    const { title, description, type, technologies, link, yearCompleted } = result.data;

    try {
        await sql`
        INSERT INTO projects (title, description, type, technologies, link, yearCompleted)
        VALUES (${title}, ${description}, ${type}, ${technologies}, ${link}, ${yearCompleted})
        `;
    } catch (error) {
        console.error('Database error while creating project:', error);
        return { message: 'Database error: Failed to create project.', values: result.values};
    }

    revalidatePath('/projects');
    redirect('/projects');
}

export async function updateProject(
    id: string,
    prevState: ProjectFormState,
    formData: FormData
): Promise<ProjectFormState> {
    await requireOwnerSession();
    const projectId = toProjectId(id);
    const result = validateProjectForm(formData);
    if (!result.ok) return result.state;

    const { title, description, type, technologies, link, yearCompleted } = result.data;

    try {
        await sql`
            UPDATE projects
            SET title = ${title},
                description = ${description},
                type = ${type},
                technologies = ${technologies},
                link = ${link},
                year_completed = ${yearCompleted}
            WHERE id = ${projectId}
        `;
    } catch (error) {
        console.error('Database error while updating project:', error);
        return { message: 'DAtabase error: Failed to update project.', values: result.values };
    }

    revalidatePath('/projects');
    redirect('/projects');
}

export async function deleteProject(id: number): Promise<void> {
    await requireOwnerSession();
    const projectId = toProjectId(id);

    try {
        await sql`DELETE FROM projects WHERE id = ${projectId}`;
    } catch (error) {
        console.error('Database error while deleting project:', error);
        throw new Error('Failed to delete project. Please try again later.');
    }

    revalidatePath('/projects');
}

export async function authenticate(
    prevState: string | undefined,
    formData: FormData
): Promise<string | undefined> {
    try { 
        await signIn('credentials', {
            email: formData.get('email'),
            password: formData.get('password'),
            redirectTo: '/projects',
        });
    } catch (error) {
        if (error instanceof AuthError) {
            return error.type === 'CredentialsSignin'
            ? 'Invalid email or password.'
            : 'Something went wrong.';
        }
        throw error;
    }
}