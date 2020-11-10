import validator from "validator";

export const errorHandler = (error: any) => {
  var message = { httpStatusCode: 0, code: "", message: "" };

  switch (error) {
    case 4061:
      message.httpStatusCode = 400;
      message.code = error;
      message.message = "E-mail already exist.";
      break;
    case 4041:
      message.httpStatusCode = 400;
      message.code = error;
      message.message = "Not a valid email address.";
      break;
    case 401:
      message.httpStatusCode = 401;
      message.code = error;
      message.message =
        "Unauthorized acces. Please check your token and try again later.";
      break;
    case 4010:
      message.httpStatusCode = 400;
      message.code = error;
      message.message = "Null token detected. Please pass the firebase token.";
      break;
    default:
      message.httpStatusCode = 500;
      if (validator.equals(error.code + "", "23505")) {
        message.code = error.code;
        message.message = error.detail;
      } else {
        message.code = error.code;
        message.message = error;
      }
      break;
  }

  return message;
};
