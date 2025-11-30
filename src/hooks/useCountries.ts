import { GeneralCountriesService } from "@/lib/api/general/GeneralCountriesService/GeneralCountriesService";
import { DropdownOption } from "@/lib/models/common/option";
import { Country } from "@/lib/models/country";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ApiError } from "next/dist/server/api-utils";
import { useMemo } from "react";

type UseCountries = {
  countries: Country[] | undefined;
  countryOptions: DropdownOption<number>[];
  isLoading: boolean;
  error?: AxiosError<ApiError> | null;
};

export const useCountries = (): UseCountries => {
  const {
    data: countries,
    isPending,
    error,
  } = useQuery<Country[], AxiosError<ApiError>, Country[]>({
    queryKey: ["countryOptions"],
    queryFn: async (): Promise<Country[]> => {
      const client = new GeneralCountriesService();

      const { data } = await client.getAvailableCountries();

      return data;
    },
  });

  const countryOptions: DropdownOption<number>[] = useMemo(
    () =>
      countries
        ? countries.map((country) => {
            return { label: country.name, value: country.id };
          })
        : [],
    [countries]
  );

  return {
    countryOptions,
    countries,
    isLoading: isPending,
    error,
  };
};
