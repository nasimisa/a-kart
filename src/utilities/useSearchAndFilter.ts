import { useState, useMemo } from 'react';

interface FilterConfig<T> {
  key: keyof T;
  value: string | number | boolean;
  exact?: boolean; // Whether to match exactly or partially
}

export const useSearchAndFilter = <T extends object>(
  data: T[] | undefined,
  searchFields: (keyof T)[] // Fields to search in
) => {
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState<FilterConfig<T>[]>([]);

  const filteredData = useMemo(() => {
    if (!data) return [];

    return data.filter(item => {
      // Apply search
      const matchesSearch = search
        ? searchFields.some(field => {
            const value = item[field];
            if (value == null) return false;
            return String(value).toLowerCase().includes(search.toLowerCase());
          })
        : true;

      // Apply filters
      const matchesFilters = filters.every(filter => {
        const itemValue = item[filter.key];
        if (itemValue == null) return false;

        if (filter.exact) {
          return String(itemValue) === String(filter.value);
        }
        return String(itemValue).toLowerCase().includes(String(filter.value).toLowerCase());
      });

      return matchesSearch && matchesFilters;
    });
  }, [data, search, filters, searchFields]);

  return {
    search,
    setSearch,
    filters,
    setFilters,
    filteredData,
  };
};
