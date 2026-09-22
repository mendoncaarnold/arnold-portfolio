const EXPERIENCE_URL = "/data/experience.json";

export async function loadExperience() {
    const response = await fetch(EXPERIENCE_URL);

    if (!response.ok) {
        throw new Error("Unable to load experience");
    }

    return response.json();
}
