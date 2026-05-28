export class TraceContext {
  private static activeCorrelationId: string | null = null;
  
  // Enabled by default, but can be controlled via env variables or runtime setters
  private static isEnabled: boolean = 
    typeof import.meta !== 'undefined' && import.meta.env
      ? import.meta.env.VITE_ENABLE_TRACING !== 'false'
      : true;

  /**
   * Gets the current correlation ID or generates a new one if not set.
   */
  public static getCorrelationId(): string {
    if (!this.activeCorrelationId) {
      this.activeCorrelationId = crypto.randomUUID();
    }
    return this.activeCorrelationId;
  }

  /**
   * Sets the active correlation ID.
   */
  public static setCorrelationId(id: string): void {
    this.activeCorrelationId = id;
  }

  /**
   * Clears the current correlation ID.
   */
  public static clear(): void {
    this.activeCorrelationId = null;
  }

  /**
   * Enables or disables trace logging globally.
   */
  public static setEnabled(enabled: boolean): void {
    this.isEnabled = enabled;
  }

  /**
   * Checks if trace logging is active.
   */
  public static isTracingActive(): boolean {
    return this.isEnabled;
  }

  /**
   * Formats and logs a trace message if tracing is enabled.
   */
  public static log(message: string, ...args: any[]): void {
    if (this.isEnabled) {
      console.log(message, ...args);
    }
  }

  /**
   * Formats and logs a trace error if tracing is enabled.
   */
  public static error(message: string, ...args: any[]): void {
    if (this.isEnabled) {
      console.error(message, ...args);
    }
  }
}
