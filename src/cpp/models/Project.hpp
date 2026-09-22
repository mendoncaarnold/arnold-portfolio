#pragma once

#include <string>
#include <vector>

struct Project {
    std::string id;
    std::string name;
    std::string description;

    std::vector<std::string> technologies;
    std::vector<std::string> categories;

    std::string githubUrl;
    std::string liveUrl;
    std::string imageUrl;

    bool featured = false;
};
