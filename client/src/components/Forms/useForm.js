import { useState, useEffect } from "react";

const useForm = (callback, initialValues, validate) => {
  const [values, setValues] = useState(initialValues);

  //new state for errors
  const [errors, setErrors] = useState({});

  const [isSubmitting, setIsSubmitting] = useState(false); //isolates the submit callback function to only run if there is an error change.

  const handleChange = (event) => {
    // let { name, value } = event.target;
    // not using destructuring in order to handle the specific case where a form has a checkbox or select

    // console.log(event.target);

    let value;

    if (event.target.type === "checkbox") {
      value = event.target.checked;
    } else if (
      event.target.type === "select" ||
      event.target.type === "select-multiple"
    ) {
      // console.log(
      //   Array.from(event.target.selectedOptions, (option) => option.value)
      // );
      value = Array.from(
        event.target.selectedOptions,
        (option) => option.value
      );
    } else {
      value = event.target.value;
    }

    // const value =
    //   event.target.type === "checkbox"
    //     ? event.target.checked
    //     : event.target.value;

    const name = event.target.name;

    setValues({
      ...values,
      [name]: value,
    });
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
  }, [errors]);

  return {
    handleChange,
    handleSubmit,
    values,
    errors,
  };
};

export default useForm;
