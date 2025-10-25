export const formatBooleanToTextString = (value: boolean) =>
  value ? "Yes" : "No";

export const capitalize = (value: string) => {
  if (value.length === 0) {
    return "";
  }
  return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
};
