import { useState, useEffect } from "react";
import { AsYouType } from "libphonenumber-js";

const useForm = (callback, initialValues, validate) => {
  const [values, setValues] = useState(initialValues);

  //new state for errors
  const [errors, setErrors] = useState({});

  const [isSubmitting, setIsSubmitting] = useState(false); //isolates the submit callback function to only run if there is an error change.

  let asYouType = new AsYouType("US");

  const handleChange = (event) => {
    if (event.target.getAttribute("type") === "phone") {
      let phone = asYouType.input(event.target.value);

      setValues({ ...values, phone });
    } else {
      let value;

      if (event.target.type === "checkbox") {
        value = event.target.checked;
      } else if (
        event.target.type === "select" ||
        event.target.type === "select-multiple"
      ) {
        value = Array.from(
          event.target.selectedOptions,
          (option) => option.value
        );
      } else {
        value = event.target.value;
      }

      const name = event.target.name;

      setValues({
        ...values,
        [name]: value,
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    validate(values).then((res) => {
      setIsSubmitting(true);
      setErrors(res); //handle validation
    });
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      callback();
    }
  }, [errors, callback, isSubmitting]); //callback and isSubmitting might not need be in dependency array

  return {
    handleChange,
    handleSubmit,
    values,
    errors,
  };
};

export default useForm;
