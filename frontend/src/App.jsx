import { useEffect, useMemo, useState } from "react";
import "./App.css";

import ProjectShowcase from "./components/ProjectShowcase";
import { loadProjects } from "./data/projects";
import { loadExperience } from "./data/experience";
import { loadSkills } from "./data/skills";
import { initializePortfolioEngine } from "./data/wasm";

function ExperienceTimeline({ experience }) {
    if (!experience.length) {
        return (
            <div className="section-empty">
                No experience data available.
            </div>
        );
    }

    return (
        <div className="experience-timeline">
            {experience.map((item, index) => (
                <article
                    className="experience-item"
                    key={item.id || `${item.company}-${index}`}
                >
                    <div className="experience-marker">
                        <span>{String(index + 1).padStart(2, "0")}</span>
                    </div>

                    <div className="experience-content">
                        <div className="experience-meta">
                            <span>
                                {item.startDate} — {item.endDate}
                            </span>

                            {item.current && (
                                <span className="experience-current">
                                    Current
                                </span>
                            )}
                        </div>

                        <h3>{item.role}</h3>

                        <p className="experience-company">
                            {item.company}
                        </p>

                        {item.location && (
                            <p className="experience-location">
                                {item.location}
                            </p>
                        )}

                        <p className="experience-description">
                            {item.description}
                        </p>

                        {item.highlights?.length > 0 && (
                            <ul className="experience-highlights">
                                {item.highlights.map((highlight) => (
                                    <li key={highlight}>
                                        {highlight}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </article>
            ))}
        </div>
    );
}

function SkillsGrid({ skills }) {
    const groups = [
        {
            key: "programming",
            label: "Programming",
        },
        {
            key: "webDevelopment",
            label: "Web Development",
        },
        {
            key: "databases",
            label: "Databases",
        },
        {
            key: "cppAndSystems",
            label: "C++ & Systems",
        },
        {
            key: "cloudAndDevOps",
            label: "Cloud & DevOps",
        },
        {
            key: "networking",
            label: "Networking",
        },
        {
            key: "developmentTools",
            label: "Development Tools",
        },
        {
            key: "ai",
            label: "AI",
        },
    ];

    return (
        <div className="skills-grid">
            {groups.map((group) => {
                const values = skills?.[group.key] || [];

                if (!values.length) {
                    return null;
                }

                return (
                    <article
                        className="skill-card"
                        key={group.key}
                    >
                        <div className="skill-card-header">
                            <span className="skill-index">
                                {String(
                                    groups.findIndex(
                                        (item) =>
                                            item.key === group.key
                                    ) + 1
                                ).padStart(2, "0")}
                            </span>

                            <h3>{group.label}</h3>
                        </div>

                        <div className="skill-list">
                            {values.map((skill) => (
                                <span key={skill}>
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </article>
                );
            })}
        </div>
    );
}

function SectionHeading({ eyebrow, title, description }) {
    return (
        <div className="section-heading">
            <p className="section-eyebrow">{eyebrow}</p>
            <h2>{title}</h2>

            {description && (
                <p className="section-description">
                    {description}
                </p>
            )}
        </div>
    );
}

function App() {
    const [projects, setProjects] = useState([]);
    const [experience, setExperience] = useState([]);
    const [skills, setSkills] = useState({});

    const [wasmStatus, setWasmStatus] = useState("loading");
    const [wasmError, setWasmError] = useState("");
    const [wasmStats, setWasmStats] = useState({
        projectCount: 0,
        featuredCount: 0,
    });

    useEffect(() => {
        let mounted = true;

        async function loadPortfolio() {
            try {
                const [
                    projectsData,
                    experienceData,
                    skillsData,
                ] = await Promise.all([
                    loadProjects(),
                    loadExperience(),
                    loadSkills(),
                ]);

                if (!mounted) {
                    return;
                }

                setProjects(projectsData);
                setExperience(experienceData);
                setSkills(skillsData);

                setWasmStatus("loading");

                const { api } =
                    await initializePortfolioEngine(
                        projectsData
                    );

                if (!mounted) {
                    return;
                }

                setWasmStats({
                    projectCount:
                        api.getProjectCount(),
                    featuredCount:
                        api.getFeaturedProjectCount(),
                });

                setWasmStatus("ready");
            } catch (error) {
                console.error(
                    "Portfolio initialization failed:",
                    error
                );

                if (!mounted) {
                    return;
                }

                setWasmStatus("error");
                setWasmError(
                    error?.message ||
                        "Unable to initialize portfolio engine."
                );
            }
        }

        loadPortfolio();

        return () => {
            mounted = false;
        };
    }, []);

    const projectSummary = useMemo(() => {
        return {
            total: projects.length,
            featured: projects.filter(
                (project) => project.featured
            ).length,
        };
    }, [projects]);

    return (
        <div className="site-shell">
            <header className="site-header">
                <a className="brand" href="#top">
                    <span className="brand-mark">A</span>

                    <span className="brand-text">
                        Arnold
                        <span>David Mendonca</span>
                    </span>
                </a>

                <nav className="site-nav">
                    <a href="#work">Work</a>
                    <a href="#skills">Skills</a>
                    <a href="#experience">Experience</a>
                    <a href="#lab">Lab</a>
                    <a href="#contact">Contact</a>
                </nav>

                <a
                    className="header-cta"
                    href="mailto:arnolddavidmendonca@gmail.com"
                >
                    Let's talk ↗
                </a>
            </header>

            <main id="top">
                <section className="hero">
                    <div className="hero-grid">
                        <div className="hero-copy">
                            <p className="hero-eyebrow">
                                Software Developer Apprentice
                            </p>

                            <h1>
                                Building software
                                <br />
                                with{" "}
                                <span>
                                    code, data & systems.
                                </span>
                            </h1>

                            <p className="hero-description">
                                BCA graduate and Software Developer
                                Apprentice exploring C++, WebAssembly,
                                web development, automation, databases
                                and modern software technologies.
                            </p>

                            <div className="hero-actions">
                                <a
                                    className="button button-primary"
                                    href="#work"
                                >
                                    Explore my work
                                    <span>↓</span>
                                </a>

                                <a
                                    className="button button-secondary"
                                    href="https://github.com/mendoncaarnold"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    GitHub ↗
                                </a>
                            </div>
                        </div>

                        <div className="hero-visual">
                            <div className="hero-orbit orbit-one" />
                            <div className="hero-orbit orbit-two" />
                            <div className="hero-orbit orbit-three" />

                            <div className="hero-core">
                                <span>CPP</span>
                                <strong>+</strong>
                                <span>WASM</span>
                            </div>

                            <div className="hero-floating-card card-one">
                                <span>Projects</span>
                                <strong>
                                    {projectSummary.total
                                        .toString()
                                        .padStart(2, "0")}
                                </strong>
                            </div>

                            <div className="hero-floating-card card-two">
                                <span>Featured</span>
                                <strong>
                                    {projectSummary.featured
                                        .toString()
                                        .padStart(2, "0")}
                                </strong>
                            </div>
                        </div>
                    </div>

                    <div className="hero-bottom">
                        <span>Based in Udupi, Karnataka, India</span>

                        <span>
                            C++ / WebAssembly / Web / Data / Automation
                        </span>
                    </div>
                </section>

                <section className="intro-strip">
                    <div>
                        <span className="intro-number">01</span>

                        <p>
                            I enjoy understanding how software works
                            underneath the interface — then turning
                            that understanding into practical,
                            maintainable products.
                        </p>
                    </div>

                    <div className="intro-stat">
                        <strong>05</strong>
                        <span>Projects</span>
                    </div>

                    <div className="intro-stat">
                        <strong>08</strong>
                        <span>Skill areas</span>
                    </div>
                </section>

                <section
                    className="content-section"
                    id="work"
                >
                    <SectionHeading
                        eyebrow="02 / Selected work"
                        title="Projects"
                        description="A collection of practical software projects, from web applications to experiments with interactive interfaces."
                    />

                    <ProjectShowcase projects={projects} />
                </section>

                <section
                    className="content-section"
                    id="skills"
                >
                    <SectionHeading
                        eyebrow="03 / Technical toolkit"
                        title="Skills"
                        description="Technologies and development areas I am actively using, learning and exploring."
                    />

                    <SkillsGrid skills={skills} />
                </section>

                <section
                    className="content-section experience-section"
                    id="experience"
                >
                    <SectionHeading
                        eyebrow="04 / Journey"
                        title="Experience"
                        description="A timeline of my professional experience and progression into software development."
                    />

                    <ExperienceTimeline
                        experience={experience}
                    />
                </section>

                <section
                    className="content-section lab-section"
                    id="lab"
                >
                    <SectionHeading
                        eyebrow="05 / Systems lab"
                        title="C++ × WebAssembly"
                        description="The portfolio itself uses a C++ engine compiled to WebAssembly and connected to the React interface."
                    />

                    <div className="wasm-lab">
                        <div className="lab-terminal">
                            <div className="terminal-header">
                                <div className="terminal-dots">
                                    <span />
                                    <span />
                                    <span />
                                </div>

                                <span>
                                    portfolio-engine
                                </span>
                            </div>

                            <div className="terminal-body">
                                <p>
                                    <span className="terminal-prompt">
                                        $
                                    </span>{" "}
                                    loading portfolio engine
                                </p>

                                <p>
                                    <span className="terminal-prompt">
                                        $
                                    </span>{" "}
                                    loading WebAssembly runtime
                                </p>

                                {wasmStatus === "ready" && (
                                    <>
                                        <p className="terminal-success">
                                            ✓ WebAssembly runtime ready
                                        </p>

                                        <p className="terminal-success">
                                            ✓ C++ PortfolioAPI connected
                                        </p>
                                    </>
                                )}

                                {wasmStatus === "loading" && (
                                    <p>
                                        <span className="terminal-prompt">
                                            $
                                        </span>{" "}
                                        initializing...
                                    </p>
                                )}

                                {wasmStatus === "error" && (
                                    <p className="terminal-error">
                                        ✕ {wasmError}
                                    </p>
                                )}

                                <p className="terminal-cursor">
                                    <span className="terminal-prompt">
                                        $
                                    </span>{" "}
                                    <span>_</span>
                                </p>
                            </div>
                        </div>

                        <div className="lab-stats">
                            <div className="lab-stat">
                                <span>Status</span>

                                <strong>
                                    {wasmStatus === "ready"
                                        ? "ONLINE"
                                        : wasmStatus === "error"
                                        ? "ERROR"
                                        : "LOADING"}
                                </strong>
                            </div>

                            <div className="lab-stat">
                                <span>C++ projects</span>

                                <strong>
                                    {wasmStats.projectCount
                                        .toString()
                                        .padStart(2, "0")}
                                </strong>
                            </div>

                            <div className="lab-stat">
                                <span>Featured</span>

                                <strong>
                                    {wasmStats.featuredCount
                                        .toString()
                                        .padStart(2, "0")}
                                </strong>
                            </div>

                            <div className="lab-stat">
                                <span>Engine</span>

                                <strong>WASM</strong>
                            </div>
                        </div>
                    </div>
                </section>

                <section
                    className="contact-section"
                    id="contact"
                >
                    <div className="contact-inner">
                        <p className="section-eyebrow">
                            06 / Contact
                        </p>

                        <h2>
                            Have a project
                            <br />
                            in mind?
                        </h2>

                        <p>
                            I'm interested in software development,
                            practical engineering problems and
                            opportunities to keep learning.
                        </p>

                        <a
                            className="contact-email"
                            href="mailto:arnolddavidmendonca@gmail.com"
                        >
                            arnolddavidmendonca@gmail.com ↗
                        </a>
                    </div>
                </section>
            </main>

            <footer className="site-footer">
                <span>
                    © {new Date().getFullYear()} Arnold David
                    Mendonca
                </span>

                <div>
                    <a
                        href="https://github.com/mendoncaarnold"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        GitHub
                    </a>

                    <a
                        href="https://linkedin.com/in/arnolddavidmendonca"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        LinkedIn
                    </a>

                    <a href="mailto:arnolddavidmendonca@gmail.com">
                        Email
                    </a>
                </div>
            </footer>
        </div>
    );
}

export default App;