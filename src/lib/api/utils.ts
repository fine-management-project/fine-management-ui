const NEXT_REDIRECT_ERROR = "NEXT_REDIRECT";

export type ServerSideCallback<T, Y> = (
  params: Y
) => Promise<T & { error?: Error | null }>;

export const wrapServerSideFetching =
  <T, Y>(callback: ServerSideCallback<T, Y>) =>
  async (params: Y) => {
    const result = await callback(params);

    if (result.error?.message === NEXT_REDIRECT_ERROR) {
      throw result.error;
    }

    return result;
  };

export const compareParamsForInitialData = <T>(
  oldParams: unknown,
  newParams: unknown,
  initialData: T
) => {
  if (JSON.stringify(oldParams) === JSON.stringify(newParams)) {
    return initialData;
  }
};
