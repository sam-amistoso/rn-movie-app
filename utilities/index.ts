export const getErrorMessage = (error: any): string => {
  if (!error) return 'Unknown error';

  // Network error
  if ('status' in error && error.status === 'FETCH_ERROR') {
    return `Network error: ${error.error}`;
  }

  // Server returned error with message
  if ('data' in error) {
    if (typeof error.data === 'string') return error.data;
    if (error.data && 'message' in error.data) return error.data.message;
    return JSON.stringify(error.data);
  }

  // Original error message
  if ('error' in error) return error.error;

  // Fallback
  return 'Something went wrong';
};
