import { assign } from "xstate";
import { validateEmail, validateMessage, requiredError } from "./validate";

export const defaultContext = {
  email: "",
  message: "",
  showErrors: false,
  errors: {
    email: requiredError,
    message: requiredError,
  },
};

const setEmail = assign({
  email: (_, e) => e.data,
});

const validEmail = assign({
  errors: (ctx, e) => {
    return {
      ...ctx.errors,
      email: validateEmail(e.data),
    };
  },
});

const validMessage = assign({
  errors: (ctx, e) => {
    return {
      ...ctx.errors,
      message: validateMessage(e.data),
    };
  },
});

const setMessage = assign({
  message: (_, e) => e.data,
});

const showErrors = assign({
  showErrors: true,
});

const clearData = assign(defaultContext);

const hasErrors = (ctx) =>
  ctx.errors.message !== null || ctx.errors.email !== null;

export const dependencies = {
  actions: {
    setEmail,
    setMessage,
    validateEmail: validEmail,
    validateMessage: validMessage,
    showErrors,
    clearData,
  },
  services: {
    submit: () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const r = Math.random();
          if (r > 0.5) resolve();
          else reject();
        }, 2000);
      });
    },
  },
  guards: {
    hasErrors,
  },
};
