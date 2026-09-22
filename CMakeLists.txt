cmake_minimum_required(VERSION 3.16)

project(ArnoldPortfolio
    VERSION 1.0
    LANGUAGES CXX
)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

add_executable(portfolio-engine

    src/cpp/main.cpp

    src/cpp/core/PortfolioEngine.cpp

    src/cpp/services/ProjectManager.cpp

    src/cpp/wasm/PortfolioAPI.cpp
)

target_include_directories(portfolio-engine
    PRIVATE
        src/cpp
)
