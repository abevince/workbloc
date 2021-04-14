import { UserResponse } from "../../../schema/User.schema";
import emailIsValid from "../../../utils/emailIsValid";
import { UserInput } from "../inputs";

export const validateRegisterInput = (data: UserInput): UserResponse | null => {
  if (!data.email || data.email.trim().length === 0) {
    return {
      errors: [
        {
          field: "email",
          message: "Email is required",
        },
      ],
    };
  }

  if (!emailIsValid(data.email)) {
    return {
      errors: [
        {
          field: "email",
          message: "Invalid email",
        },
      ],
    };
  }

  if (!data.password || data.password.trim().length <= 2) {
    return {
      errors: [
        {
          field: "password",
          message: "Password length must be greater than 2",
        },
      ],
    };
  }
  return null;
};
