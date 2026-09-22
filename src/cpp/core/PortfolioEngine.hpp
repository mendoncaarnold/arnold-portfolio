#pragma once

#include "../services/ProjectManager.hpp"

class PortfolioEngine {
public:
    PortfolioEngine();

    ProjectManager& getProjectManager();

    const ProjectManager& getProjectManager() const;

private:
    ProjectManager projectManager;
};
