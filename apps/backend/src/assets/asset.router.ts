import { createRouter } from "@/shared/utils/create-router";
import { AssetController } from "./asset.controller";

export function createAssetRouter(controller: AssetController) {
  return createRouter();
}
