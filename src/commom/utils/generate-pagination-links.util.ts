export const generatePaginationLinks = (path: string, page: number, limit: number, total: number) => {
  const totalPages = Math.ceil(total / limit);
  return {
    first: { href: `/api/${path}?page=1&limit=${limit}` },
    next: page < totalPages ? { href: `/api/${path}?page=${page + 1}&limit=${limit}` } : null,
    prev: page > 1 ? { href: `/api/${path}?page=${page - 1}&limit=${limit}` } : null,
    last: { href: `/api/${path}?page=${totalPages}&limit=${limit}` },
  };
}