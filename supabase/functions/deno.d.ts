// Ambient type declarations for Deno runtime inside Supabase Edge Functions
// This resolves the editor lint error "Cannot find name 'Deno'"

declare namespace Deno {
  export interface ServeOptions {
    port?: number;
    hostname?: string;
    onError?: (error: unknown) => Response | Promise<Response>;
    onListen?: (params: { port: number; hostname: string }) => void;
  }

  export function serve(
    handler: (request: Request) => Response | Promise<Response>,
    options?: ServeOptions
  ): void;

  export const env: {
    get(key: string): string | undefined;
    set(key: string, value: string): void;
    delete(key: string): void;
    toObject(): Record<string, string>;
  };
}
