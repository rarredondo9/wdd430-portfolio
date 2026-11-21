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

export const sql = neon(databaseUrl);

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

const ITEMS_PER_PAGE = 2;

function cleanQuery(query: string): string {
    return query.trim().slice(0,50);
}

export async function fetchFilteredProjects(
    query:string,
    currentPage: number
): Promise<Project[]> {
    const search = `%${cleanQuery(query)}%`;
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;

    const rows = await sql`
    SELECT * FROM projects
    WHERE title ILIKE ${search}
        OR description ILIKE ${search}
        OR array_to_string(technologies, ' ') ILIKE ${search}
    ORDER BY id
    LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return rows as Project[];
}

export async function fetchProjectsPages(query: string): Promise<number> {
    const search = `%${cleanQuery(query)}%`;

    const rows = await  sql`
    SELECT COUNT(*) AS count FROM projects
    WHERE title ILIKE ${search}
        OR description ILIKE ${search}
        OR array_to_string(technologies, ' ') ILIKE ${search}
    `;

    const count = Number(rows[0]?.count ?? 0);
    return Math.ceil(count / ITEMS_PER_PAGE);
}