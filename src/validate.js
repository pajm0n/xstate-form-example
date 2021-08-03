const emailError = "Please provide the correct email";
const messageError = "Message is too long";
export const requiredError = "This field is required";

function isValidEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function isValidMessage(message) {
  return message.length < 30;
}

export function validateEmail(email) {
  if (email.trim().length === 0) return requiredError;
  else if (!isValidEmail(email)) return emailError;
  return null;
}

export function validateMessage(message) {
  if (message.trim().length === 0) return requiredError;
  else if (!isValidMessage(message)) return messageError;
  return null;
}
