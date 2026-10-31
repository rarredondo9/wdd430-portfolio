import ProjectList from "@/components/ProjectList";

const projects = [
  {
    title: 'Dom vs React Practice',
    description: 'A page comparing direct Dom manipulation with rendering the same content using a React component.',
    technologies: ['HTML', 'Javascript', 'React', 'Babel'],
    link: 'https://github.com/rarredondo9/wdd430--react-dom-practice.git/dom.html',
  },
  {
    title: 'React Core Principles',
    description: 'A practice page with a Greeting component that uses props and a Counter component that uses state.',
    technologies: ['React', 'Javascript', 'JSX'],
    link: 'https://github.com/rarredondo9/wdd430--react-dom-practice.git/react-core-concepts.html',
  },
];

export default function Home() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <section className="text-center py-12">
        <h1 className="text-4xl font-bold mb-4">My Portfolio</h1>
        <p className="text-lg text-stone-700">I&apos;m a web development student learning Next.js and React. Here are some of my recent projects.
        </p>
      </section>
      <ProjectList projects={projects} />
    </main>
  );
}