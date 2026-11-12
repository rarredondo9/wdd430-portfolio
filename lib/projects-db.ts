import { neon } from '@neondatabase/serverless';

export type ProjectType = 'opensource' | 'school';

export interface Project {
    id: number;
    title: string;
    description: string;
    type: ProjectType;
    technologies: string[];
    link?: string;
}

const databaseUrl = process.env.DATABASE_URL ?? process.env.POSTGRES_URL;

if (!databaseUrl) {
    throw new Error('Database URL is missing. Check your .env.local file.');
}

const sql = neon(databaseUrl);

export async function getProjects(type?: string | null): Promise<Project[]> {
    if (type) {
        const rows = await sql`
        SELECT * FROM projects WHERE type = ${type} ORDER BY id
        `;
        return rows as Project[];
    }

    const rows = await sql`SELECT * FROM projects ORDER BY id`;
    return rows as Project[];
}

export async function getProjectById(id:number): Promise<Project | null> {
    const rows = await sql`
    SELECT * FROM projects WHERE id = ${id}
    `;
    return (rows[0] as Project | undefined) ?? null;
}