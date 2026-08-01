export interface ModelData {
  model: string;
  gCO2_512: number;
  gCO2_1024: number;
}

/**
 * Supplied dataset of 17 measured AI image-generation models.
 * Source: final_web_data.csv
 * All values are grams of CO2 per generated image (gCO2).
 */
export const MODELS_DATA: ModelData[] = [
  { model: "SD_1.5", gCO2_512: 0.095194, gCO2_1024: 0.368844 },
  { model: "SDXL", gCO2_512: 0.15771, gCO2_1024: 0.454728 },
  { model: "SDXL_Turbo", gCO2_512: 0.036433, gCO2_1024: 0.04836 },
  { model: "SDXL_Lightning", gCO2_512: 0.041207, gCO2_1024: 0.061107 },
  { model: "Hyper_SD", gCO2_512: 0.034682, gCO2_1024: 0.04836 },
  { model: "SSD_1B", gCO2_512: 0.102493, gCO2_1024: 0.29552 },
  { model: "LCM_SSD_1B", gCO2_512: 0.028132, gCO2_1024: 0.045473 },
  { model: "LCM_SDXL", gCO2_512: 0.041718, gCO2_1024: 0.063407 },
  { model: "Flash_SD", gCO2_512: 0.036884, gCO2_1024: 0.103763 },
  { model: "Flash_SDXL", gCO2_512: 0.081113, gCO2_1024: 0.131113 },
  { model: "PixArt_Alpha", gCO2_512: 0.277874, gCO2_1024: 0.277874 },
  { model: "PixArt_Sigma", gCO2_512: 0.291903, gCO2_1024: 0.288331 },
  { model: "Flash_PixArt", gCO2_512: 0.163645, gCO2_1024: 0.163645 },
  { model: "SD_3", gCO2_512: 0.236772, gCO2_1024: 0.454728 },
  { model: "Flash_SD3", gCO2_512: 0.037341, gCO2_1024: 0.069115 },
  { model: "Lumina", gCO2_512: 0.603596, gCO2_1024: 2.883308 },
  { model: "Flux_1", gCO2_512: 0.248725, gCO2_1024: 0.373414 }
];
