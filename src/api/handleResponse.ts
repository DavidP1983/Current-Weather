import { HttpError } from 'shared/errors/HttpError';

export const handleResponse = async (response: Response) => {
  const contentType = response.headers.get('content-type');
  const responseData = contentType?.includes('application/json')
    ? await response.json()
    : null;

  if (!response.ok) {
    const errorMessage =
      responseData?.message ??
      `HTTP request status - ${response.status} - ${response.statusText}`;

    throw new HttpError(errorMessage, response.status, response.statusText);
  }
  return responseData;
};
