let portfolioFactoryPromise = null;
let portfolioRuntimePromise = null;

function getBaseUrl() {
    const base = import.meta.env.BASE_URL || "/";
    return new URL(base, window.location.origin);
}

function getLoaderUrl() {
    return new URL("portfolio-loader.js", getBaseUrl()).href;
}

function getAssetBaseUrl() {
    return new URL("./", getLoaderUrl()).href;
}

function loadPortfolioLoader() {
    if (portfolioFactoryPromise) {
        return portfolioFactoryPromise;
    }

    portfolioFactoryPromise = new Promise((resolve, reject) => {
        if (typeof window === "undefined") {
            reject(
                new Error(
                    "WebAssembly can only be initialized in a browser."
                )
            );
            return;
        }

        if (typeof window.createPortfolioModule === "function") {
            resolve(window.createPortfolioModule);
            return;
        }

        let settled = false;

        const cleanup = () => {
            window.removeEventListener(
                "portfolio-wasm-loader-ready",
                handleReady
            );
            window.removeEventListener(
                "portfolio-wasm-loader-error",
                handleError
            );
        };

        const handleReady = () => {
            if (settled) return;

            if (
                typeof window.createPortfolioModule !==
                "function"
            ) {
                handleError({
                    detail: {
                        message:
                            "Portfolio WASM module factory was not found.",
                    },
                });
                return;
            }

            settled = true;
            cleanup();
            resolve(window.createPortfolioModule);
        };

        const handleError = (event) => {
            if (settled) return;

            settled = true;
            cleanup();

            reject(
                new Error(
                    event?.detail?.message ||
                        "Unable to load portfolio WASM module."
                )
            );
        };

        window.addEventListener(
            "portfolio-wasm-loader-ready",
            handleReady,
            {
                once: true,
            }
        );

        window.addEventListener(
            "portfolio-wasm-loader-error",
            handleError,
            {
                once: true,
            }
        );

        const existingScript = document.querySelector(
            'script[data-portfolio-wasm-loader="true"]'
        );

        if (existingScript) {
            if (existingScript.dataset.failed === "true") {
                handleError({
                    detail: {
                        message:
                            "Unable to load portfolio WASM loader.",
                    },
                });
            }

            return;
        }

        const script = document.createElement("script");

        script.type = "module";
        script.src = getLoaderUrl();
        script.async = true;
        script.dataset.portfolioWasmLoader = "true";

        script.onerror = () => {
            script.dataset.failed = "true";

            handleError({
                detail: {
                    message:
                        "Unable to load portfolio WASM loader.",
                },
            });
        };

        document.head.appendChild(script);
    });

    return portfolioFactoryPromise;
}

export async function loadPortfolioModule() {
    if (portfolioRuntimePromise) {
        return portfolioRuntimePromise;
    }

    portfolioRuntimePromise = loadPortfolioLoader().then(
        (createPortfolioModule) => {
            const assetBaseUrl = getAssetBaseUrl();

            return createPortfolioModule({
                locateFile: (file) =>
                    new URL(file, assetBaseUrl).href,
            });
        }
    );

    return portfolioRuntimePromise;
}

export async function initializePortfolioEngine(
    projects = []
) {
    const Module = await loadPortfolioModule();

    if (
        typeof Module?.PortfolioAPI !==
        "function"
    ) {
        throw new Error(
            "PortfolioAPI is not available in the WebAssembly module."
        );
    }

    const api = new Module.PortfolioAPI();

    api.initialize();
    api.clearProjects();

    for (const project of projects) {
        api.addProject(
            project.id || "",
            project.name || "",
            project.description || "",
            (project.technologies || []).join("|"),
            (project.categories || []).join("|"),
            project.githubUrl || "",
            project.liveUrl || "",
            Boolean(project.featured)
        );
    }

    return {
        Module,
        api,
    };
}
