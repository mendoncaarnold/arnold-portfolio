#include "ProjectManager.hpp"

#include <algorithm>
#include <cctype>

void ProjectManager::addProject(const Project& project) {
    projects.push_back(project);
}
void ProjectManager::clearProjects() {
    projects.clear();
}
const std::vector<Project>& ProjectManager::getProjects() const {
    return projects;
}

std::vector<Project> ProjectManager::getFeaturedProjects() const {
    std::vector<Project> result;

    for (const auto& project : projects) {
        if (project.featured) {
            result.push_back(project);
        }
    }

    return result;
}

std::vector<Project> ProjectManager::searchProjects(
    const std::string& query
) const {
    std::vector<Project> result;

    if (query.empty()) {
        return projects;
    }

    std::string searchQuery = query;

    std::transform(
        searchQuery.begin(),
        searchQuery.end(),
        searchQuery.begin(),
        [](unsigned char c) {
            return static_cast<char>(std::tolower(c));
        }
    );

    for (const auto& project : projects) {

        std::string name = project.name;
        std::string description = project.description;

        std::transform(
            name.begin(),
            name.end(),
            name.begin(),
            [](unsigned char c) {
                return static_cast<char>(std::tolower(c));
            }
        );

        std::transform(
            description.begin(),
            description.end(),
            description.begin(),
            [](unsigned char c) {
                return static_cast<char>(std::tolower(c));
            }
        );

        if (
            name.find(searchQuery) != std::string::npos ||
            description.find(searchQuery) != std::string::npos
        ) {
            result.push_back(project);
        }
    }

    return result;
}

std::vector<Project> ProjectManager::filterByCategory(
    const std::string& category
) const {
    std::vector<Project> result;

    if (category.empty()) {
        return projects;
    }

    for (const auto& project : projects) {

        for (const auto& projectCategory : project.categories) {

            if (projectCategory == category) {
                result.push_back(project);
                break;
            }
        }
    }

    return result;
}

std::vector<Project> ProjectManager::filterByTechnology(
    const std::string& technology
) const {
    std::vector<Project> result;

    if (technology.empty()) {
        return projects;
    }

    for (const auto& project : projects) {

        for (const auto& projectTechnology :
             project.technologies) {

            if (projectTechnology == technology) {
                result.push_back(project);
                break;
            }
        }
    }

    return result;
}
