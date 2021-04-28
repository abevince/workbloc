import { FieldError } from "../schema/shared/FieldError";

export const emptyInputsValidator = (data = {}): FieldError[] => {
  return Object.entries(data).reduce((data: FieldError[], entry) => {
    if (!entry[1]) {
      data = [...data, { field: entry[0], message: "Field required" }];
    }
    return data;
  }, []);
};
