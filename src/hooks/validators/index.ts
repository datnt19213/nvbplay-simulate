export const REGEXS = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^[0-9]{10,11}$/,
  url: /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)(\/[\w-]*)*(\?.*)?$/,
  username: /^[a-zA-Z0-9_]{3,20}$/,
  password:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  postalCode: /^[0-9]{5,6}$/,
  number: /^\d+$/,
  decimal: /^\d+(\.\d{1,2})?$/,
  name: /^[a-zA-ZÀ-ỹ\s]{1,50}$/,
  date: /^\d{4}-\d{2}-\d{2}$/,
};

import {useState} from "react";

interface ValidationRule {
  required?: boolean;
  /**
   * Call use a pattern in `REGEXS` or any regex outside of default pattern
   */
  pattern?: RegExp;
  custom?: (value: string) => boolean;
  minLength?: number;
  maxLength?: number;
  errorMessage?: string;
}

type ValidationRules<T> = {
  [K in keyof T]: ValidationRule;
};

type ValidationErrors<T> = {
  [K in keyof T]?: string;
};

/**
 * The useFormValidator function in TypeScript is used to create a form validation hook that handles
 * validation rules for form fields.
 * @param {T} initialValues - The `initialValues` parameter in the `useFormValidator` function
 * represents the initial values of the form fields. It is a generic type `T` that extends
 * `Record<string, any>`, allowing you to define the shape of the form data structure. For example, if
 * you have a form
 * @param validationRules - The `validationRules` parameter in the `useFormValidator` function is an
 * object that defines the validation rules for each field in the form. It is a generic type
 * `ValidationRules<T>` where `T` extends `Record<string, any>`.
 * @returns The `useFormValidator` function returns an object with the following properties and
 * methods:
 */
export const useFormValidator = <T extends Record<string, any>>(
  initialValues: T,
  validationRules: ValidationRules<T>
) => {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<ValidationErrors<T>>({});

  const validateField = (field: keyof T, value: string): string | undefined => {
    const rules = validationRules[field];
    if (!rules) return undefined;

    if (rules.required && !value) {
      return rules.errorMessage || "This field is required.";
    }

    if (rules.pattern && !rules.pattern.test(value)) {
      return rules.errorMessage || "Invalid format.";
    }

    if (rules.minLength && value.length < rules.minLength) {
      return rules.errorMessage || `Minimum length is ${rules.minLength}.`;
    }

    if (rules.maxLength && value.length > rules.maxLength) {
      return rules.errorMessage || `Maximum length is ${rules.maxLength}.`;
    }

    if (rules.custom && !rules.custom(value)) {
      return rules.errorMessage || "Invalid value.";
    }

    return undefined;
  };

  const validateAllFields = (): boolean => {
    const newErrors: ValidationErrors<T> = {};
    let isValid = true;

    for (const field in validationRules) {
      const value = values[field];
      const error = validateField(field, value);
      if (error) {
        isValid = false;
        newErrors[field] = error;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const validateAndSetErrors = (): ValidationErrors<T> => {
    const newErrors: ValidationErrors<T> = {};

    for (const field in validationRules) {
      const value = values[field];
      const error = validateField(field, value);
      if (error) {
        newErrors[field] = error;
      }
    }

    setErrors(newErrors);
    return newErrors;
  };

  const handleChange = (field: keyof T, value: any) => {
    setValues({...values, [field]: value});
    const error = validateField(field, value);
    setErrors({...errors, [field]: error});
  };

  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
  };

  return {
    values,
    errors,
    resetForm,
    handleChange,
    validateField,
    validateAllFields,
    setValues,
    validateAndSetErrors,
  };
};
