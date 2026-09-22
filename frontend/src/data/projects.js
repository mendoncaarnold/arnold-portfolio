const PROJECTS_URL = "/data/projects.json";

export async function loadProjects() {
    const response = await fetch(PROJECTS_URL);

    if (!response.ok) {
        throw new Error("Unable to load projects");
    }

    return response.json();
}
