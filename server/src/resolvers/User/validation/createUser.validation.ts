import { FieldError } from "../../../schema/shared/FieldError";
import emailIsValid from "../../../utils/emailIsValid";
import { emptyInputsValidator } from "../../../utils/emptyInputsValidator";
import { CreateUserInput } from "../inputs";

export const validateCreateUserInput = (
  data: CreateUserInput
): FieldError[] => {
  const validationErrors = emptyInputsValidator(data);
  if (data.email && !emailIsValid(data.email)) {
    validationErrors.push({
      field: "email",
      message: "Invalid email",
    });
  }

  if (data.password && data.password.trim().length <= 2) {
    validationErrors.push({
      field: "password",
      message: "Password length must be greater than 2",
    });
  }
  return validationErrors;
};
