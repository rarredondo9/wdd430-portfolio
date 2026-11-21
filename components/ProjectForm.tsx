import Link from "next/link";
import type { Project } from "@/lib/projects-db";

interface ProjectFormProps {
    action: (forData: FormData) => Promise<void>;
    project?: Project;
    submitLabel: string;
}

const inputClass =
    'w-full rounded-md border border-reso-200 bg-white px-3 py-2 text-stone-900 focus:border-rose-400 focus:outline-none focus:ring-2 focus:ring-rose-200';

    export default function ProjectForm({ action, project, submitLabel }: ProjectFormProps) {
        return (
            <form action={action} className="max-w-xl space-y-5">
                <div>
                    <label htmlFor="title" className="mb-1 block font-semifold">Title</label>
                    <input id="title" name="title" required minLength={2}
                        defaultValue={project?.title} className={inputClass} />
                </div>

                <div>
                    <label htmlFor="description" className="mb-1 block font-semibold">Description</label>
                    <textarea name="description" id="description" required minLength={10} rows={4}
                        defaultValue={project?.description} className={inputClass} />
                </div>

                <div>
                    <label htmlFor="type" className="mb-1 block font-semibold">Type</label>
                    <select id="type" name="type" required 
                        defaultValue={project?.type ?? 'school'} className={inputClass}>
                            <option value="school">School</option>
                            <option value="opensource">Open Source</option>
                        </select>
                </div>

                <div>
                    <label htmlFor="technologies" className="b-1 block font-semibold">
                        Technologies<span className="font-normmal text-stone-700">(separate with commas)</span>
                    </label>
                    <input id="technologies" name="technologies" required
                        placeholder="React, Next.js, Tailwind CSS"
                        defaultValue={project?.technologies.join(', ')} className={inputClass} />
                </div>

                <div>
                    <label htmlFor="link" className="mb-1 block font-semibold">
                        Link <span className="font-normal text-stone-700">(optional)</span>
                    </label>
                    <input id="link" name="link" type="url" placeholder="https://github.com/..."
                        defaultValue={project?.link ?? ''} className={inputClass} />
                </div>

                <div className="flex gap-3">
                    <button type="submit"
                     className="rounded-md bg-rose-700 px-5 py-2 font-semibold text-white hover:ng-rose-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-700">
                        {submitLabel}
                    </button>
                    <Link href="/projects"
                    className="rounded-md border border-rose-300 px-5 py-2 font-semibold text-rose-700 hover:bg-rose-50">
                        Cancel
                    </Link>
                </div>
            </form>
        );
    }