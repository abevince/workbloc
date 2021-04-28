import { FieldError } from "../../../schema/shared/FieldError";
import { emptyInputsValidator } from "../../../utils/emptyInputsValidator";
import { CreateWorklogItemInput } from "../inputs";

export const validateCreateWorklogItemInput = (
  data: CreateWorklogItemInput
): FieldError[] => {
  const validationErrors = emptyInputsValidator(data);
  return validationErrors;
};
