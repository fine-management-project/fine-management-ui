import { DropdownOption } from "../models/common/option";

export const getDropdownOptionsFormObject = <T>(
  object: Record<string, T>
): DropdownOption<T>[] => {
  return Object.entries(object).map(([key, value]) => {
    return {
      value,
      label: key,
    };
  });
};
