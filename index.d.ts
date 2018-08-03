/**
 * Filter function.
 */
declare type Filter <T> = (item: T, index: number, items: ReadonlyArray<T>) => boolean;

/**
 * Acessor function.
 */
declare type Acessor <T, U> = (item: T, index: number, items: ReadonlyArray<T>) => U;

/**
 * Filters namespace.
 */
declare namespace filters {

  /**
   * Returns inverse of filter argument.
   * @param filter
   */
  export const not: <T> (filter: Filter<T>) => Filter<T>;

  /**
   * Check if value is into items collection.
   * @param items - A collection of items to compaare.
   * @param λ - Acessor function.
   */
  export const into: <T, U> (items: Array<U>, λ?: Acessor<T, U>) => Filter<T>;

  /**
   * Check if item words match to text.
   * @param text - A text to match item string/Arrau<string>.
   * @param λ - Acessor function.
   */
  export const search: <T> (text: string, λ?: Acessor<T, (string | string[])>) => Filter<T>;

  /**
   * Check if value is truthy.
   * @param λ - Acessor function.
   */
  export const truthy: <T> (λ?: Acessor<T, boolean>) => Filter<T>;
}

/**
 * Filter items using filter functions. Each filter refines the result.
 * @param items - A iterable/collection of items to filter.
 * @param λs - Filter functions.
 */
declare const cull: <T> (items: Iterable<T>, ...λs: Array<Filter<T>>) => Array<T>;

/**
 * Create a filter function composing other filters with a directive.
 *
 * Directives:
 * - 'OR' checks if at least one filter is true;
 * - 'AND' checks if every filter is true;
 * @param type - Composing directive.
 * @param λs - Filter functions.
 */
declare const create: <T> (type: 'AND' | 'OR', ...λs: Array<Filter<T>>) => Filter<T>;

/**
 * Index of default exported object.
 */
declare const index: {
  cull: typeof cull;
  create: typeof create;
  filters: typeof filters;
};

export default index;

export { Filter, Acessor, filters, create, cull };
