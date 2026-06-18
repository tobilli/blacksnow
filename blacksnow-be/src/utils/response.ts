import { Response } from 'express';

export const ok = (res: Response, data: unknown, statusCode = 200) =>
  res.status(statusCode).json({ status: 'success', data });

export const created = (res: Response, data: unknown) => ok(res, data, 201);

export const paginated = (
  res: Response,
  data: unknown[],
  meta: { totalCount: number; currentPage: number; perPage: number; totalPages: number }
) =>
  res.json({
    status: 'success',
    metadata: {
      ...meta,
      hasNextPage: meta.currentPage < meta.totalPages,
      hasPreviousPage: meta.currentPage > 1,
    },
    data,
  });

export const notFound = (res: Response, message = 'Not found') =>
  res.status(404).json({ status: 'error', message });

export const badRequest = (res: Response, message: string | string[]) =>
  res.status(400).json({ status: 'error', message });

export const unauthorized = (res: Response, message = 'Unauthorized') =>
  res.status(401).json({ status: 'error', message });

export const forbidden = (res: Response, message = 'Forbidden') =>
  res.status(403).json({ status: 'error', message });

export const serverError = (res: Response, err: unknown) => {
  console.error(err);
  res.status(500).json({ status: 'error', message: 'Internal server error' });
};
