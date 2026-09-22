#include "PortfolioAPI.hpp"

#include <sstream>
#include <vector>

namespace {

std::vector<std::string> split(
    const std::string& value
) {
    std::vector<std::string> result;

    std::stringstream stream(value);
    std::string item;

    while (std::getline(stream, item, '|')) {
        if (!item.empty()) {
            result.push_back(item);
        }
    }

    return result;
}

std::string join(
    const std::vector<std::string>& values
) {
    std::string result;

    for (const auto& value : values) {

        if (!result.empty()) {
            result += "|";
        }

        result += value;
    }

    return result;
}

}

PortfolioAPI::PortfolioAPI() = default;

void PortfolioAPI::initialize() {
    engine.getProjectManager().clearProjects();
}

void PortfolioAPI::clearProjects() {
    engine.getProjectManager().clearProjects();
}

void PortfolioAPI::addProject(
    const std::string& id,
    const std::string& name,
    const std::string& description,
    const std::string& technologies,
    const std::string& categories,
    const std::string& githubUrl,
    const std::string& liveUrl,
    bool featured
) {
    Project project;

    project.id = id;
    project.name = name;
    project.description = description;

    project.technologies = split(technologies);
    project.categories = split(categories);

    project.githubUrl = githubUrl;
    project.liveUrl = liveUrl;

    project.featured = featured;

    engine.getProjectManager().addProject(project);
}

int PortfolioAPI::getProjectCount() const {
    return static_cast<int>(
        engine.getProjectManager()
            .getProjects()
            .size()
    );
}

int PortfolioAPI::getFeaturedProjectCount() const {
    return static_cast<int>(
        engine.getProjectManager()
            .getFeaturedProjects()
            .size()
    );
}

std::string PortfolioAPI::getProjectName(
    int index
) const {

    const auto& projects =
        engine.getProjectManager().getProjects();

    if (
        index < 0 ||
        index >= static_cast<int>(projects.size())
    ) {
        return "";
    }

    return projects[index].name;
}

std::string PortfolioAPI::getProjectDescription(
    int index
) const {

    const auto& projects =
        engine.getProjectManager().getProjects();

    if (
        index < 0 ||
        index >= static_cast<int>(projects.size())
    ) {
        return "";
    }

    return projects[index].description;
}

std::string PortfolioAPI::getProjectGithubUrl(
    int index
) const {

    const auto& projects =
        engine.getProjectManager().getProjects();

    if (
        index < 0 ||
        index >= static_cast<int>(projects.size())
    ) {
        return "";
    }

    return projects[index].githubUrl;
}

std::string PortfolioAPI::getProjectLiveUrl(
    int index
) const {

    const auto& projects =
        engine.getProjectManager().getProjects();

    if (
        index < 0 ||
        index >= static_cast<int>(projects.size())
    ) {
        return "";
    }

    return projects[index].liveUrl;
}

std::string PortfolioAPI::getProjectTechnologies(
    int index
) const {

    const auto& projects =
        engine.getProjectManager().getProjects();

    if (
        index < 0 ||
        index >= static_cast<int>(projects.size())
    ) {
        return "";
    }

    return join(projects[index].technologies);
}

std::string PortfolioAPI::getProjectCategories(
    int index
) const {

    const auto& projects =
        engine.getProjectManager().getProjects();

    if (
        index < 0 ||
        index >= static_cast<int>(projects.size())
    ) {
        return "";
    }

    return join(projects[index].categories);
}
bool PortfolioAPI::isProjectFeatured(
    int index
) const {

    const auto& projects =
        engine.getProjectManager().getProjects();

    if (
        index < 0 ||
        index >= static_cast<int>(projects.size())
    ) {
        return false;
    }

    return projects[index].featured;
}

std::string PortfolioAPI::searchProjects(
    const std::string& query
) const {

    auto results =
        engine.getProjectManager()
            .searchProjects(query);

    std::string output;

    for (const auto& project : results) {

        if (!output.empty()) {
            output += "\n";
        }

        output += project.name;
    }

    return output;
}
