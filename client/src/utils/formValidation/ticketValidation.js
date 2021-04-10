import API from "../API";

export default async function validate(values) {
  let errors = {};

  //Title validation
  if (!values.title) {
    errors.title = "Title is required";
  }

  return errors;
}
