import { useMemo, useState } from "react";

function ProjectCard({ project, index, featured = false }) {
    const technologies = project.technologies || [];
    const categories = project.categories || [];

    return (
        <article
            className={`project-card ${featured ? "project-card-featured" : "project-card-standard"}`}
        >
            <div className="project-card-glow" />

            <div className="project-card-header">
                <span className="project-number">
                    {String(index + 1).padStart(2, "0")}
                </span>

                {project.featured && (
                    <span className="project-featured">
                        Featured
                    </span>
                )}
            </div>

            <div className="project-card-main">
                <div className="project-card-heading">
                    <span className="project-category">
                        {categories.length > 0
                            ? categories.join(" / ")
                            : "Software Project"}
                    </span>

                    <h3>{project.name}</h3>
                </div>

                <p className="project-description">
                    {project.description}
                </p>
            </div>

            <div className="project-card-footer">
                <div className="project-technologies">
                    {technologies.map((technology) => (
                        <span key={technology}>
                            {technology}
                        </span>
                    ))}
                </div>

                <div className="project-actions">
                    {project.githubUrl && (
                        <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            GitHub
                            <span>↗</span>
                        </a>
                    )}

                    {project.liveUrl && (
                        <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Live Demo
                            <span>↗</span>
                        </a>
                    )}
                </div>
            </div>
        </article>
    );
}

export default function ProjectShowcase({ projects = [] }) {
    const [query, setQuery] = useState("");
    const [filter, setFilter] = useState("All");

    const filters = useMemo(() => {
        const availableCategories = new Set();

        projects.forEach((project) => {
            project.categories?.forEach((category) => {
                if (category === "Web Development") {
                    availableCategories.add("Web");
                } else {
                    availableCategories.add(category);
                }
            });
        });

        return [
            "All",
            ...Array.from(availableCategories)
        ];
    }, [projects]);

    const filteredProjects = useMemo(() => {
        const normalizedQuery = query
            .trim()
            .toLowerCase();

        return projects.filter((project) => {
            const searchableText = [
                project.name,
                project.description,
                ...(project.categories || []),
                ...(project.technologies || [])
            ]
                .join(" ")
                .toLowerCase();

            const matchesSearch =
                !normalizedQuery ||
                searchableText.includes(normalizedQuery);

            const normalizedCategories =
                (project.categories || []).map((category) =>
                    category === "Web Development"
                        ? "Web"
                        : category
                );

            const matchesFilter =
                filter === "All" ||
                normalizedCategories.includes(filter);

            return matchesSearch && matchesFilter;
        });
    }, [projects, query, filter]);

    const featuredProjects = filteredProjects.filter(
        (project) => project.featured
    );

    const standardProjects = filteredProjects.filter(
        (project) => !project.featured
    );

    return (
        <div className="project-showcase">
            <div className="project-controls">
                <div className="project-search">
                    <span className="project-search-icon">
                        ⌕
                    </span>

                    <input
                        type="search"
                        placeholder="Search projects..."
                        value={query}
                        onChange={(event) =>
                            setQuery(event.target.value)
                        }
                    />

                    {query && (
                        <button
                            className="project-search-clear"
                            type="button"
                            onClick={() => setQuery("")}
                            aria-label="Clear search"
                        >
                            ×
                        </button>
                    )}
                </div>

                <div className="project-filters">
                    {filters.map((item) => (
                        <button
                            key={item}
                            type="button"
                            className={
                                filter === item
                                    ? "active"
                                    : ""
                            }
                            onClick={() => setFilter(item)}
                        >
                            {item}
                        </button>
                    ))}
                </div>
            </div>

            <div className="project-results-bar">
                <span>
                    {filteredProjects.length}{" "}
                    {filteredProjects.length === 1
                        ? "PROJECT"
                        : "PROJECTS"}
                </span>

                {(query || filter !== "All") && (
                    <button
                        type="button"
                        onClick={() => {
                            setQuery("");
                            setFilter("All");
                        }}
                    >
                        Reset filters ↗
                    </button>
                )}
            </div>

            {filteredProjects.length > 0 ? (
                <>
                    {featuredProjects.length > 0 && (
                        <div className="project-featured-grid">
                            {featuredProjects.map(
                                (project) => {
                                    const originalIndex =
                                        projects.findIndex(
                                            (item) =>
                                                item.id ===
                                                project.id
                                        );

                                    return (
                                        <ProjectCard
                                            key={project.id}
                                            project={project}
                                            index={
                                                originalIndex
                                            }
                                            featured
                                        />
                                    );
                                }
                            )}
                        </div>
                    )}

                    {standardProjects.length > 0 && (
                        <div className="project-standard-grid">
                            {standardProjects.map(
                                (project) => {
                                    const originalIndex =
                                        projects.findIndex(
                                            (item) =>
                                                item.id ===
                                                project.id
                                        );

                                    return (
                                        <ProjectCard
                                            key={project.id}
                                            project={project}
                                            index={
                                                originalIndex
                                            }
                                        />
                                    );
                                }
                            )}
                        </div>
                    )}
                </>
            ) : (
                <div className="project-empty">
                    <span>NO MATCH</span>
                    <strong>
                        No projects match your search.
                    </strong>

                    <button
                        type="button"
                        onClick={() => {
                            setQuery("");
                            setFilter("All");
                        }}
                    >
                        View all projects ↗
                    </button>
                </div>
            )}
        </div>
    );
}
