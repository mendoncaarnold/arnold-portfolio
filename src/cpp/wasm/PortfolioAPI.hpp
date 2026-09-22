#pragma once

#include "../core/PortfolioEngine.hpp"

#include <string>

class PortfolioAPI {
public:
    PortfolioAPI();

    void initialize();

    void clearProjects();

    void addProject(
        const std::string& id,
        const std::string& name,
        const std::string& description,
        const std::string& technologies,
        const std::string& categories,
        const std::string& githubUrl,
        const std::string& liveUrl,
        bool featured
    );

    int getProjectCount() const;

    int getFeaturedProjectCount() const;

    std::string getProjectName(int index) const;

    std::string getProjectDescription(int index) const;

    std::string getProjectGithubUrl(int index) const;

    std::string getProjectLiveUrl(int index) const;

    std::string getProjectTechnologies(int index) const;

    std::string getProjectCategories(int index) const;

    bool isProjectFeatured(int index) const;

    std::string searchProjects(
        const std::string& query
    ) const;

private:
    PortfolioEngine engine;
};
