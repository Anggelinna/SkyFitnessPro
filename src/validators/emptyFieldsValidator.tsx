export const emptyFieldsValidator = (
  values: Record<string, string>,
  requiredFields: string[]
): { hasEmpty: boolean; errors: Record<string, boolean> } => {
  const errors: Record<string, boolean> = {};
  let hasEmpty = false;

  requiredFields.forEach((field) => {
    if (!values[field]?.trim()) {
      errors[field] = true;
      hasEmpty = true;
    }
  });

  return { hasEmpty, errors };
};