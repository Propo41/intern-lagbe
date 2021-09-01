const errorHandling = (e) => {
  const errors = e.response.data.errors;
  const errorMessage = [];

  for (var key in errors) {
    if (errors.hasOwnProperty(key)) {
      errorMessage.push(errors[key]);
    }
  }

  return {
    status: true,
    title: e.response.data.title,
    message: errorMessage,
    severity: "error",
  };
};

export default errorHandling;
