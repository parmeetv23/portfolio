'use client'

import { useState } from 'react'
import Nav from '../components/Nav'
import ProjectCard from '../components/ProjectCard'
import { projects, type ProjectCategory } from '@/data/projects'

const categories: ProjectCategory[] = ['Distributed', 'ML', 'Embedded']
const allCategory: ProjectCategory | 'All' = 'All'

export default function ProjectsPage() {
    const [selectedCategory, setSelectedCategory] = useState<ProjectCategory | 'All'>(allCategory)

    const filteredProjects = selectedCategory === 'All'
        ? projects
        : projects.filter(p => p.category === selectedCategory)

    return (
        <div className="min-h-screen bg-[#0a0a0a]">
            <Nav />

            <div className="max-w-6xl mx-auto px-6 py-12">
                <h1 className="text-4xl font-bold mb-4 text-[#e5e5e5]">Projects</h1>
                <p className="text-[#a3a3a3] mb-8">
                    A collection of systems and applications I've built, focusing on distributed systems,
                    machine learning, and low-level programming.
                </p>

                {/* Category Filter */}
                <div className="flex flex-wrap gap-3 mb-8">
                    <button
                        onClick={() => setSelectedCategory('All')}
                        className={`px-4 py-2 rounded border transition-colors ${selectedCategory === 'All'
                            ? 'bg-[#3b82f6] text-white border-[#3b82f6]'
                            : 'border-[#262626] text-[#a3a3a3] hover:border-[#3b82f6] hover:text-[#3b82f6]'
                            }`}
                    >
                        All
                    </button>
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-4 py-2 rounded border transition-colors ${selectedCategory === category
                                ? 'bg-[#3b82f6] text-white border-[#3b82f6]'
                                : 'border-[#262626] text-[#a3a3a3] hover:border-[#3b82f6] hover:text-[#3b82f6]'
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredProjects.map((project) => (
                        <ProjectCard key={project.slug} project={project} />
                    ))}
                </div>

                {filteredProjects.length === 0 && (
                    <p className="text-[#a3a3a3] text-center py-12">
                        No projects found in this category.
                    </p>
                )}
            </div>
        </div>
    )
}

