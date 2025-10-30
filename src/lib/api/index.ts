/**
 * API Module Exports
 * Centralized exports for API-related functionality
 *
 * @deprecated This REST API client is deprecated in favor of Apollo Client.
 * Use @/lib/apollo-client for GraphQL queries and mutations.
 * These exports are maintained only for legacy REST endpoints (auth, email).
 */

export { default as apiClient, api } from './apiClient';
export * from './config';
