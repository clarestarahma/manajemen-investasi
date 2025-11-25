import { Scalar } from "@scalar/hono-api-reference";
import { requestId } from "hono/request-id";
import { pinoLogger } from "hono-pino";
import { createConfig } from "./shared/config/config.js";
import { createLogger } from "./infra/logger/logger.js";
import { notFound, onError } from "stoker/middlewares";
import packageJSON from "../package.json" with { type: "json" };
import { createRouter } from "./shared/utils/create-router.js";
import { PortfolioController } from "./portfolio/portfolio.controller.js";
import { createPortfolioRouter } from "./portfolio/portfolio.router.js";
import { AssetController } from "./assets/asset.controller.js";
import { createAssetRouter } from "./assets/asset.router.js";
import { MassiveClient } from "./infra/vendors/massive/massive-client.js";
const app = createRouter();

app.use(requestId())

app.notFound(notFound);
app.onError(onError);

// config
const config = createConfig();

// logger
const logger = createLogger(config);
app.use(pinoLogger({ pino: logger }));

// massive client
const massive = new MassiveClient();
massive.startIngestion();

// portfolios router
const portfolioController = new PortfolioController()
const portfolioRouter = createPortfolioRouter(portfolioController)
app.route("/portfolios", portfolioRouter)

// assets router
const assetController = new AssetController()
const assetRouter = createAssetRouter(assetController)
app.route("/assets", assetRouter)

// OpenAPI
app.doc("/doc", {
  openapi: "3.0.0",
  info: {
    version: packageJSON.version,
    title: "MarketGuardian Backend",
  },
});

app.get(
  "/reference",
  Scalar({
    url: "/doc",
    theme: "kepler",
    layout: "classic",
    defaultHttpClient: {
      targetKey: "js",
      clientKey: "fetch",
    },
  })
);

export default app;