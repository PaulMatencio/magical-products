/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import appConfig from '../config/appConfig';

const DEFAULT_PINATA_ENDPOINT = 'https://api.pinata.cloud/pinning/pinFileToIPFS';
const DEFAULT_PINATA_UNPIN_ENDPOINT = 'https://api.pinata.cloud/pinning/unpin';

export interface IpfsUploadOptions {
  fileName?: string;
  metadata?: Record<string, unknown>;
  pinataOptions?: {
    cidVersion?: 0 | 1;
    wrapWithDirectory?: boolean;
  };
  signal?: AbortSignal;
}

export interface IpfsUploadResult {
  cid: string;
  ipfsUri: string;
  gatewayUrl: string;
  gatewayUrls: {
    primary: string;
    pinata: string;
  };
  size?: number;
  timestamp?: string;
  provider: 'pinata';
}

interface PinataPinFileResponse {
  IpfsHash: string;
  PinSize?: number;
  Timestamp?: string;
}

import { supabase } from './supabase';

function getPinataJwt(): string {
  return import.meta.env.VITE_PINATA_JWT || '';
}

function getPinataEndpoint(): string {
  return import.meta.env.VITE_PINATA_UPLOAD_URL || DEFAULT_PINATA_ENDPOINT;
}

function getPinataUnpinEndpoint(): string {
  return import.meta.env.VITE_PINATA_UNPIN_URL || DEFAULT_PINATA_UNPIN_ENDPOINT;
}

function getGatewayBaseUrl(): string {
  return appConfig.ipfsGatewayUrl.replace(/\/+$/, '');
}

function assertConfigured() {
  if (!getPinataJwt() && !import.meta.env.VITE_SUPABASE_URL) {
    throw new Error('IPFS upload is not configured. Set VITE_PINATA_JWT (direct) or VITE_SUPABASE_URL (proxy) in your environment.');
  }
}

function buildGatewayUrls(cid: string) {
  const primary = `${getGatewayBaseUrl()}/${cid}`;
  return {
    primary,
    pinata: primary,
  };
}

function buildFormData(file: File | Blob, options: IpfsUploadOptions = {}) {
  const formData = new FormData();
  const fileName = options.fileName || (file instanceof File ? file.name : 'upload.bin');

  formData.append('file', file, fileName);

  if (options.metadata) {
    formData.append('pinataMetadata', JSON.stringify({
      name: fileName,
      keyvalues: options.metadata,
    }));
  }

  if (options.pinataOptions) {
    formData.append('pinataOptions', JSON.stringify({
      cidVersion: options.pinataOptions.cidVersion ?? 1,
      wrapWithDirectory: options.pinataOptions.wrapWithDirectory ?? false,
    }));
  }

  return formData;
}

async function parseError(response: Response): Promise<string> {
  try {
    const body = await response.json();
    return body?.error?.details || body?.error || body?.message || response.statusText;
  } catch (_) {
    return response.statusText;
  }
}

export const ipfsService = {
  async uploadFile(file: File | Blob, options: IpfsUploadOptions = {}): Promise<IpfsUploadResult> {
    assertConfigured();
    const pinataJwt = getPinataJwt();
    let cid: string;
    let pinSize: number | undefined;
    let timestamp: string | undefined;

    if (pinataJwt) {
      // Direct upload (Legacy/Development mode)
      const response = await fetch(getPinataEndpoint(), {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${pinataJwt}`,
        },
        body: buildFormData(file, options),
        signal: options.signal,
      });

      if (!response.ok) {
        const message = await parseError(response);
        throw new Error(`IPFS upload failed: ${message}`);
      }

      const data = await response.json() as PinataPinFileResponse;
      cid = data.IpfsHash;
      pinSize = data.PinSize;
      timestamp = data.Timestamp;
    } else {
      // Secure upload proxy via Supabase Edge Function
      const { data, error } = await supabase.functions.invoke('upload-to-ipfs', {
        body: buildFormData(file, options),
      });

      if (error) {
        throw new Error(`IPFS secure proxy upload failed: ${error.message || error}`);
      }

      cid = data?.IpfsHash;
      pinSize = data?.PinSize;
      timestamp = data?.Timestamp;
    }

    if (!cid) {
      throw new Error('IPFS upload failed: provider response did not include a CID.');
    }

    const gatewayUrls = buildGatewayUrls(cid);
    return {
      cid,
      ipfsUri: `ipfs://${cid}`,
      gatewayUrl: gatewayUrls.primary,
      gatewayUrls,
      size: pinSize,
      timestamp: timestamp,
      provider: 'pinata',
    };
  },

  getGatewayUrls(cid: string) {
    return buildGatewayUrls(cid);
  },

  async unpinFile(cid: string): Promise<void> {
    if (!cid) return;
    assertConfigured();
    const pinataJwt = getPinataJwt();

    if (pinataJwt) {
      const response = await fetch(`${getPinataUnpinEndpoint().replace(/\/+$/, '')}/${cid}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${pinataJwt}`,
        },
      });

      if (!response.ok && response.status !== 404) {
        const message = await parseError(response);
        throw new Error(`IPFS unpin failed for CID ${cid}: ${message}`);
      }
    } else {
      // Secure proxy unpin via Supabase Edge Function
      const { error } = await supabase.functions.invoke(`upload-to-ipfs?cid=${encodeURIComponent(cid)}`, {
        method: 'DELETE',
      });

      if (error) {
        throw new Error(`IPFS secure proxy unpin failed for CID ${cid}: ${error.message || error}`);
      }
    }
  },
};
