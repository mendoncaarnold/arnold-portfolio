import createPortfolioModule from "./portfolio.js";

window.createPortfolioModule = createPortfolioModule;

window.dispatchEvent(
    new CustomEvent("portfolio-wasm-loader-ready")
);
