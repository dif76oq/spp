import { GraphQLClient } from 'graphql-request';
import { BASE_URL } from './api';

export const getGraphQLClient = (token?: string) => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return new GraphQLClient(`${BASE_URL}/graphql`, {
    headers,
  });
};

