import { createMachine } from "xstate";
import { defaultContext, dependencies } from "./dependencies";

export const messageMachine = createMachine(
  {
    id: "message",
    initial: "idle",
    context: { ...defaultContext },
    states: {
      idle: {
        on: {
          SET_EMAIL: {
            actions: ["setEmail", "validateEmail"],
          },
          SET_MESSAGE: {
            actions: ["setMessage", "validateMessage"],
          },
          SEND: [
            {
              target: "idle",
              cond: "hasErrors",
              actions: ["showErrors"],
            },
            {
              target: "submit",
            },
          ],
        },
      },
      submit: {
        invoke: {
          src: "submit",
          onDone: {
            target: "success",
          },
          onError: {
            target: "fail",
          },
        },
      },
      success: {
        on: {
          RESET: {
            target: "idle",
            actions: ["clearData"],
          },
        },
      },
      fail: {
        on: {
          RETRY: {
            target: "submit",
          },
        },
      },
    },
  },
  dependencies
);
