/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import appConfig from '../config/appConfig';

const DEFAULT_PINATA_ENDPOINT = 'https://api.pinata.cloud/pinning/pinFileToIPFS';

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

function getPinataJwt(): string {
  return import.meta.env.VITE_PINATA_JWT || '';
}

function getPinataEndpoint(): string {
  return import.meta.env.VITE_PINATA_UPLOAD_URL || DEFAULT_PINATA_ENDPOINT;
}

function getGatewayBaseUrl(): string {
  return appConfig.ipfsGatewayUrl.replace(/\/+$/, '');
}

function assertConfigured() {
  if (!getPinataJwt()) {
    throw new Error('IPFS upload is not configured. Set VITE_PINATA_JWT in your environment.');
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

    const response = await fetch(getPinataEndpoint(), {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${getPinataJwt()}`,
      },
      body: buildFormData(file, options),
      signal: options.signal,
    });

    if (!response.ok) {
      const message = await parseError(response);
      throw new Error(`IPFS upload failed: ${message}`);
    }

    const data = await response.json() as PinataPinFileResponse;
    const cid = data.IpfsHash;

    if (!cid) {
      throw new Error('IPFS upload failed: provider response did not include a CID.');
    }

    const gatewayUrls = buildGatewayUrls(cid);
    //const baseGateway = process.env.IPFS_GATEWAY_URL || 'https://gateway.pinata.cloud';
    //const gatewayUrl = `${baseGateway.replace(/\/$/, '')}/ipfs/${cid}`;
    return {
      cid,
      ipfsUri: `ipfs://${cid}`,
      gatewayUrl: gatewayUrls.primary,
      gatewayUrls,
      size: data.PinSize,
      timestamp: data.Timestamp,
      provider: 'pinata',
    };
  },

  getGatewayUrls(cid: string) {
    return buildGatewayUrls(cid);
  },

  async unpinFile(cid: string): Promise<void> {
    if (!cid) return;
    assertConfigured();

    const response = await fetch(`https://api.pinata.cloud/pinning/unpin/${cid}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${getPinataJwt()}`,
      },
    });

    if (!response.ok && response.status !== 404) {
      const message = await parseError(response);
      console.warn(`IPFS unpin failed for CID ${cid}: ${message}`);
      // We don't throw here to avoid blocking the main deletion flow if unpinning fails
    }
  },
};
