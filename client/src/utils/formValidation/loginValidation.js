export default async function validate(values) {
  let errors = {};

  //Email validation
  if (!values.email) {
    errors.email = "Email is required";
  }

  //password validation
  return errors;
}
