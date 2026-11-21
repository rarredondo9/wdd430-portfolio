'use client';

import Link from "next/link";
import { useActionState } from "react";
import type { ProjectFormState } from "@/lib/actions";
import type { Project } from "@/lib/projects-db";

interface ProjectFormProps {
    action: (prevState: ProjectFormState, formData: FormData) => Promise<ProjectFormState>;
    project?: Project;
    submitLabel: string;
}

const initialState: ProjectFormState = { message: null, errors:{} };

const inputClass =
    'w-full rounded-md border border-reso-200 bg-white px-3 py-2 text-stone-900 focus:border-rose-400 focus:outline-none focus:ring-2 focus:ring-rose-200';

function FieldErrors({ id, errors }: {id: string; errors?: string[] }) {
    return (
        <div id={id} aria-live="polite" aria-atomic="true">
            {errors?.map((error) => (
                <p key={error} className="mt-1 text-sm text-red-700">
                    {error}
                </p>
            ))}
        </div>
    );
}

export default function ProjectForm({ action, project, submitLabel }: ProjectFormProps) {
    const [state, formAction, isPending] = useActionState(action, initialState);

    const values = {
        title: state.values?.title ?? project?.title ?? '',
        description: state.values?.description ?? project?.description ?? '',
        type: state.values?.type ?? project?.type ?? 'school',
        technologies: state.values?.technologies ?? project?.technologies.join(', ') ?? '',
        link: state.values?.link ?? project?.link ?? '',
        yearCompleted: state.values?.yearCompleted ?? String(project?.yearCompleted ?? ''),
    };

    return (
        <form action={formAction} className="max-w-xl space-y-5" noValidate>
            <div>
                <label htmlFor="title" className="mb-1 block font-semibold">Title</label>
                <input 
                    id="title"
                    name="title"
                    type="text"
                    defaultValue={values.title}
                    aria-describedby="title-error"
                    aria-invalid={Boolean(state.errors?.title)}
                    className={inputClass}
                />
                <FieldErrors id="title-error" errors={state.errors?.title} />
            </div>

            <div>
                <label htmlFor="description" className="mb-1 block font-semibold">Description</label>
                <textarea 
                    id="description"
                    name="description"
                    rows={4}
                    defaultValue={values.description}
                    aria-describedby="description-error"
                    aria-invalid={Boolean(state.errors?.description)}
                    className={inputClass}
                />
                <FieldErrors id="description-error" errors={state.errors?.description} />
            </div>

            <div>
                <label htmlFor="type" className="mb-1 block font-semibold">Type</label>
                <select 
                    id="type"
                    name="type"
                    defaultValue={values.type}
                    aria-describedby="type-error"
                    aria-invalid={Boolean(state.errors?.type)}
                    className={inputClass}
                >
                    <option value="school">School</option>
                    <option value="opensource">Open Source</option>
                </select>
                <FieldErrors id="type-error" errors={state.errors?.type} />
            </div>

            <div>
                <label htmlFor="technologies" className="mb-1 block font-semibold">Technologies <span className="font-normal text-stone-700">(separate with commas)</span></label>
                <input 
                    id="technologies"
                    name="technologies"
                    type="text"
                    placeholder="React, Next.js, Tailwind CSS"
                    defaultValue={values.technologies}
                    aria-describedby="technologies-error"
                    aria-invalid={Boolean(state.errors?.technologies)}
                    className={inputClass}
                />
                <FieldErrors id="technologies-error" errors={state.errors?.technologies} />
            </div>

            <div>
                <label htmlFor="yearCompleted" className="mb-1 block font-semibold">Year Completed</label>
                <input 
                    id="yearCompleted"
                    name="yearCompleted"
                    type="number"
                    min={2000}
                    defaultValue={values.yearCompleted}
                    aria-describedby="yearCompleted-error"
                    aria-invalid={Boolean(state.errors?.yearCompleted)}
                    className={inputClass}
                />
                <FieldErrors id="yearCompleted-error" errors={state.errors?.yearCompleted} />
            </div>

            <div>
                <label htmlFor="link" className="mb-1 block font-semibold">Link <span className="font-normal text-stone-700">(optional)</span></label>
                <input 
                    id="link"
                    name="link"
                    type="url"
                    placeholder="https:..github.com/..."
                    defaultValue={values.link}
                    aria-describedby="link-error"
                    aria-invalid={Boolean(state.errors?.link)}
                    className={inputClass}
                />
                <FieldErrors id="link-error" errors={state.errors?.link} />
            </div>

            <div aria-live="polite" aria-atomic="true">
                {state.message ? <p className="font-semibold text-red-700">{state.message}</p>: null}
            </div>

            <div className="flex gap=3">
                <button 
                    type="submit"
                    disabled={isPending}
                    className="rounded-md bg-rose-700 px-5 py-2 font-semibold text-white hover:bg-rose-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-700 disabled:cursor-not-allowed disabled:opacity-60">
                        {isPending ? 'Saving...' : submitLabel}
                </button>
                <Link
                    href="/projects"
                    className="rounded-md border border-rose-300 px-5 py-2 font-semibold text-rose-700 hover:bg-rose-50">
                        Cancel
                    </Link>
            </div>
        </form>
    );
}