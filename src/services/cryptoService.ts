/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import appConfig from '../config/appConfig';

/**
 * Fetches the live ADA/EUROC exchange rate using the DIA REST API.
 * Assuming 1 EUROC = 1 EUR.
 * Returns the rate multiplier: how many ADA correspond to 1 EUR/EUROC.
 */
export async function fetchLiveAdaRate(): Promise<number> {
  const baseUrl = appConfig.diaBaseApiUrl || "https://api.diadata.org/v1";
  try {
    const [adaRes, eurcRes] = await Promise.all([
      fetch(`${baseUrl}/quotation/ADA`).then(res => {
        if (!res.ok) throw new Error(`ADA fetch failed: ${res.status}`);
        return res.json();
      }),
      fetch(`${baseUrl}/quotation/EURC`).then(res => {
        if (!res.ok) throw new Error(`EURC fetch failed: ${res.status}`);
        return res.json();
      })
    ]);

    const adaPriceUSD = adaRes?.Price;
    const eurcPriceUSD = eurcRes?.Price;

    if (adaPriceUSD && eurcPriceUSD) {
      const rateMultiplier = eurcPriceUSD / adaPriceUSD;
      console.log(`[cryptoService] Live ADA rate: 1 EUR = ${rateMultiplier.toFixed(6)} ADA`);
      return rateMultiplier;
    }
    throw new Error("Missing Price in DIA API response");
  } catch (err) {
    console.error("[cryptoService] Failed to fetch live DIA ADA rate, falling back to 2.22:", err);
    return 2.22;
  }
}
