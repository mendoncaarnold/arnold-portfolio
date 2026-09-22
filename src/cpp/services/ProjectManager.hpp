#pragma once

#include "../models/Project.hpp"

#include <string>
#include <vector>

class ProjectManager {
public:
    void addProject(const Project& project);

    void clearProjects();

    const std::vector<Project>& getProjects() const;

    std::vector<Project> getFeaturedProjects() const;

    std::vector<Project> searchProjects(
        const std::string& query
    ) const;

    std::vector<Project> filterByCategory(
        const std::string& category
    ) const;

    std::vector<Project> filterByTechnology(
        const std::string& technology
    ) const;

private:
    std::vector<Project> projects;
};
