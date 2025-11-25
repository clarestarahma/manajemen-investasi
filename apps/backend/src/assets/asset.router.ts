import { createRouter } from "@/shared/utils/create-router.js";
import { AssetController } from "./asset.controller.js";

export function createAssetRouter(controller: AssetController) {
  return createRouter();
}
