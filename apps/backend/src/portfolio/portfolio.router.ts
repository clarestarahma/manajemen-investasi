import { createRouter } from "@/shared/utils/create-router";

import { PortfolioController } from "./portfolio.controller";
import * as routes from "./portfolio.routes";

export function createPortfolioRouter(controller: PortfolioController) {
  return createRouter()
    .openapi(routes.create, controller.createPortfolio.bind(controller))
    .openapi(routes.get, controller.getPortfolio.bind(controller));
}
