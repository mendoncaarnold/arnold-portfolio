const PROFILE_URL = "/data/profile.json";

export async function loadProfile() {
    const response = await fetch(PROFILE_URL);

    if (!response.ok) {
        throw new Error("Unable to load profile");
    }

    return response.json();
}
