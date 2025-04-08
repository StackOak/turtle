export class FormValidationException extends Error {
  formId;
  errors;
  children;
  constructor(formId, errors, childErrors) {
    super("Form validation exception");
    this.formId = formId;
    this.errors = errors;
    this.children = childErrors;
    Object.setPrototypeOf(this, FormValidationException.prototype);
  }
}
