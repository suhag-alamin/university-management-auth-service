import { SortOrder } from 'mongoose';
import { IPaginationOptions } from '../interfaces/pagination';

type IOptionsResult = {
  page: number;
  limit: number;
  skip: number;
  sortBy: string;
  sortOrder: SortOrder;
};

const calculatePagination = (option: IPaginationOptions): IOptionsResult => {
  const page = Number(option.page || 1);
  const limit = Number(option.limit || 10);

  const skip: number = (page - 1) * limit;

  const sortBy = option.sortBy || 'createdAt';
  const sortOrder = option.sortOrder || 'desc';

  return {
    page,
    limit,
    skip,
    sortBy,
    sortOrder,
  };
};

export const paginationHelpers = { calculatePagination };
