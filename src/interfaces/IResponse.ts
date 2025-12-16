/**
 * Standardizes API responses with a consistent structure for success, data, and error messaging. Used to simplify client-side handling and improve API clarity.
 */
export interface IResponse {
    success?: boolean;
    message?: string;
    data?: object|null;
    error?: string;
}