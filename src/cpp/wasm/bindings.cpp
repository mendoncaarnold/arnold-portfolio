#include <emscripten/bind.h>

#include "PortfolioAPI.hpp"

using namespace emscripten;

EMSCRIPTEN_BINDINGS(portfolio_module) {

    class_<PortfolioAPI>("PortfolioAPI")

        .constructor<>()

        .function(
            "initialize",
            &PortfolioAPI::initialize
        )

        .function(
            "clearProjects",
            &PortfolioAPI::clearProjects
        )

        .function(
            "addProject",
            &PortfolioAPI::addProject
        )

        .function(
            "getProjectCount",
            &PortfolioAPI::getProjectCount
        )

        .function(
            "getFeaturedProjectCount",
            &PortfolioAPI::getFeaturedProjectCount
        )

        .function(
            "getProjectName",
            &PortfolioAPI::getProjectName
        )

        .function(
            "getProjectDescription",
            &PortfolioAPI::getProjectDescription
        )

        .function(
            "getProjectGithubUrl",
            &PortfolioAPI::getProjectGithubUrl
        )

        .function(
            "getProjectLiveUrl",
            &PortfolioAPI::getProjectLiveUrl
        )

        .function(
            "getProjectTechnologies",
            &PortfolioAPI::getProjectTechnologies
        )

        .function(
            "getProjectCategories",
            &PortfolioAPI::getProjectCategories
        )

        .function(
    "isProjectFeatured",
    &PortfolioAPI::isProjectFeatured
)
        .function(
            "searchProjects",
            &PortfolioAPI::searchProjects
        );
}
