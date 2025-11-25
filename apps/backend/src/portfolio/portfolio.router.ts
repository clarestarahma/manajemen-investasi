import { createRouter } from "@/shared/utils/create-router.js";

import { PortfolioController } from "./portfolio.controller.js";
import * as routes from "./portfolio.routes.js";

export function createPortfolioRouter(controller: PortfolioController) {
  return createRouter().openapi(routes.create, controller.createPortfolio);
}
