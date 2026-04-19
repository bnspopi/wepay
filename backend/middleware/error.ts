import type { Context } from 'hono';

export const errorHandler = (err: any, c: Context) => {
  console.error('Error:', err?.message || err);
  let statusCode = 500;
  let message = 'Internal Server Error';

  if (err?.statusCode) {
    statusCode = err.statusCode;
    message = err.message;
  } else if (err?.status) {
    statusCode = err.status;
    message = err.message;
  } else if (err?.message) {
    message = err.message;
  }

  if (statusCode < 200 || statusCode > 599) statusCode = 500;
  return c.json({ message, code: statusCode }, statusCode as any);
};
