import { ValidationError } from "class-validator";

export const showMessageErrors = (validator: ValidationError[]) => {
  const errors: string[] = [];
  validator.forEach((error) => {
    if (error.constraints) {
      errors.push(...Object.values(error.constraints));
    }
    // Si hay errores hijos, procesarlos recursivamente
    if (error.children && error.children.length > 0) {
      errors.push(...showMessageErrors(error.children));
    }
  });
  return errors;
};
