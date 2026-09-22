const SKILLS_URL = "/data/skills.json";

export async function loadSkills() {
    const response = await fetch(SKILLS_URL);

    if (!response.ok) {
        throw new Error("Unable to load skills");
    }

    return response.json();
}
