#include "core/PortfolioEngine.hpp"

#include <iostream>

int main() {
    PortfolioEngine engine;

    // -----------------------------
    // ShopMate
    // -----------------------------

    Project shopMate;

    shopMate.id = "shopmate";
    shopMate.name = "ShopMate";

    shopMate.description =
        "Responsive e-commerce application built with HTML, CSS and JavaScript.";

    shopMate.technologies = {
        "HTML",
        "CSS",
        "JavaScript"
    };

    shopMate.categories = {
        "Web Development"
    };

    shopMate.githubUrl =
        "https://github.com/mendoncaarnold/shopmate";

    shopMate.liveUrl =
        "https://shopmate-rho.vercel.app/";

    shopMate.featured = true;

    engine.getProjectManager().addProject(shopMate);

    // -----------------------------
    // Expense Tracker
    // -----------------------------

    Project expenseTracker;

    expenseTracker.id = "expense-tracker";
    expenseTracker.name = "Expense Tracker";

    expenseTracker.description =
        "Web application for tracking and managing expenses.";

    expenseTracker.technologies = {
        "HTML",
        "CSS",
        "JavaScript"
    };

    expenseTracker.categories = {
        "Web Development"
    };

    expenseTracker.githubUrl =
        "https://github.com/mendoncaarnold/expense-track-sms";

    expenseTracker.liveUrl =
        "https://expense-track-sms.vercel.app/";

    expenseTracker.featured = true;

    engine.getProjectManager().addProject(expenseTracker);

    // -----------------------------
    // Display portfolio
    // -----------------------------

    std::cout << "=================================\n";
    std::cout << "       ARNOLD PORTFOLIO ENGINE\n";
    std::cout << "=================================\n\n";

    const auto& projects =
        engine.getProjectManager().getProjects();

    std::cout << "Total Projects: "
              << projects.size()
              << "\n\n";

    for (const auto& project : projects) {
        std::cout << "Project: "
                  << project.name
                  << "\n";

        std::cout << "Description: "
                  << project.description
                  << "\n";

        std::cout << "GitHub: "
                  << project.githubUrl
                  << "\n";

        std::cout << "Live: "
                  << project.liveUrl
                  << "\n";

        std::cout << "Featured: "
                  << (project.featured ? "Yes" : "No")
                  << "\n";

        std::cout << "---------------------------------\n";
    }

    // -----------------------------
    // Featured projects
    // -----------------------------

    auto featured =
        engine.getProjectManager().getFeaturedProjects();

    std::cout << "\nFeatured Projects: "
              << featured.size()
              << "\n";

    for (const auto& project : featured) {
        std::cout << " - "
                  << project.name
                  << "\n";
    }

    // -----------------------------
    // Search
    // -----------------------------

    auto searchResults =
        engine.getProjectManager().searchProjects("expense");

    std::cout << "\nSearch Results for 'expense': "
              << searchResults.size()
              << "\n";

    for (const auto& project : searchResults) {
        std::cout << " - "
                  << project.name
                  << "\n";
    }

    return 0;
}
