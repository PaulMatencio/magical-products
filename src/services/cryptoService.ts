/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import appConfig from '../config/appConfig';

/**
 * Fetches all live cryptocurrency exchange rates relative to the Euro.
 * Returns the rate multipliers (units of crypto per 1 EUR).
 */
export async function fetchLiveRates(): Promise<{ adaRate: number; ethRate: number; usdcRate: number }> {
  const baseUrl = appConfig.diaBaseApiUrl || "https://api.diadata.org/v1";
  try {
    const [adaRes, ethRes, eurcRes] = await Promise.all([
      fetch(`${baseUrl}/quotation/ADA`).then(res => {
        if (!res.ok) throw new Error(`ADA fetch failed: ${res.status}`);
        return res.json();
      }),
      fetch(`${baseUrl}/quotation/ETH`).then(res => {
        if (!res.ok) throw new Error(`ETH fetch failed: ${res.status}`);
        return res.json();
      }),
      fetch(`${baseUrl}/quotation/EURC`).then(res => {
        if (!res.ok) throw new Error(`EURC fetch failed: ${res.status}`);
        return res.json();
      })
    ]);

    const adaPriceUSD = adaRes?.Price;
    const ethPriceUSD = ethRes?.Price;
    const eurcPriceUSD = eurcRes?.Price;

    if (adaPriceUSD && ethPriceUSD && eurcPriceUSD) {
      const adaRate = eurcPriceUSD / adaPriceUSD;
      const ethRate = eurcPriceUSD / ethPriceUSD;
      const usdcRate = eurcPriceUSD;
      
      console.log(`[cryptoService] Live Rates:`);
      console.log(` - 1 EUR = ${adaRate.toFixed(6)} ADA`);
      console.log(` - 1 EUR = ${ethRate.toFixed(8)} ETH`);
      console.log(` - 1 EUR = ${usdcRate.toFixed(4)} USDC`);
      
      return { adaRate, ethRate, usdcRate };
    }
    throw new Error("Missing Price in DIA API responses");
  } catch (err) {
    console.error("[cryptoService] Failed to fetch live DIA rates, using defaults:", err);
    return {
      adaRate: 2.22,
      ethRate: 0.00066,
      usdcRate: 1.08
    };
  }
}
