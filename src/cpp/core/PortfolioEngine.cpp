#include "PortfolioEngine.hpp"

PortfolioEngine::PortfolioEngine() = default;

ProjectManager& PortfolioEngine::getProjectManager() {
    return projectManager;
}

const ProjectManager& PortfolioEngine::getProjectManager() const {
    return projectManager;
}
