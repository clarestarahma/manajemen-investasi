import { Scalar } from "@scalar/hono-api-reference"; //dokumentasi -> opern API
import { requestId } from "hono/request-id"; //middleware: memberikan request ID untuk setiap HTTP request
import { pinoLogger } from "hono-pino"; //middleware: untuk logger --> log di terminal (request masuk lewat fetch, lewatin middleware, baru masuk ke handler rute)
import { createConfig } from "./shared/config/config"; 
import { createLogger } from "./infra/logger/logger";
import { notFound, onError } from "stoker/middlewares";
import packageJSON from "../package.json";
import { createRouter } from "./shared/utils/create-router";
import { PortfolioController } from "./portfolio/portfolio.controller";
import { createPortfolioRouter } from "./portfolio/portfolio.router";

import { createDb } from "./infra/db/db"; //koneksi database
const app = createRouter(); 

app.use(requestId()) //nambahin middleware

app.notFound(notFound); //handler not found (tidak memiliki rute)
app.onError(onError); //handler error 500, etc

// config
const config = createConfig(); //config isinya database url, logging level seberapa

// logger
const logger = createLogger(config); //format log di terminal
app.use(pinoLogger({ pino: logger })); 

const db = createDb(config); //koneksi ke database
// portfolios router
const portfolioController = new PortfolioController(db, logger) 
const portfolioRouter = createPortfolioRouter(portfolioController)
app.route("/portfolios", portfolioRouter)

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
    theme: "deepSpace",
    layout: "classic",
    defaultHttpClient: {
      targetKey: "js",
      clientKey: "fetch",
    },
  })
);

export default app;