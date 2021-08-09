<template>
  <section class="relative h-full text-gray-600 body-font">
    <div class="absolute inset-0 bg-gray-300 z-minus">
      <Map />
    </div>
    <div class="container px-5 py-24 mx-auto">
      <Container v-if="step === IDLE" class="ml-auto">
        <Header>FastBox</Header>
        <Text>Send a message to your friends!</Text>
        <Input
          v-model="email"
          :has-error="emailError !== null && isTouched"
          :error="emailError"
          wrapperClass="mb-4"
          id="email"
          label="Email"
          autocomplete="off"
        />
        <Textarea
          v-model="message"
          :has-error="messageError !== null && isTouched"
          :error="messageError"
          wrapperClass="mb-4"
          id="message"
          label="Message"
        />
        <Button @click="send">SEND</Button>
      </Container>

      <Container v-if="step === SUBMITING" class="ml-auto">
        <Header>Sending...</Header>
        <Text>Please wait while sending a message</Text>
      </Container>

      <Container v-if="step === FAIL" class="ml-auto">
        <Header>Fail</Header>
        <Text>An error occurred while sending. Do you want to try again?</Text>
        <Button @click="send">TRY AGAIN</Button>
      </Container>

      <Container v-if="step === SUCCESS" class="ml-auto">
        <Header>Success!</Header>
        <Text>Do you want to send the next message?</Text>
        <Button @click="reset">SEND NEXT</Button>
      </Container>
    </div>
  </section>
</template>

<script>
import { ref, computed } from "vue";

import Map from "@/components/Map.vue";
import Header from "@/components/Header.vue";
import Text from "@/components/Text.vue";
import Input from "@/components/Input.vue";
import Textarea from "@/components/Textarea.vue";
import Button from "@/components/Button.vue";
import Container from "@/components/Container.vue";
import { validateEmail, validateMessage } from "./validate";
import { sendMessage } from "./services";

const IDLE = "idle";
const SUBMITING = "submiting";
const FAIL = "fail";
const SUCCESS = "success";

export default {
  name: "App",
  components: { Map, Header, Text, Input, Textarea, Button, Container },
  setup() {
    const step = ref(IDLE);
    const email = ref("");
    const message = ref("");
    const isTouched = ref(false);

    const emailError = computed(() => {
      return validateEmail(email.value);
    });

    const messageError = computed(() => {
      return validateMessage(message.value);
    });

    const formIsValid = () => {
      return emailError.value !== null && messageError.value !== null;
    };

    const clear = () => {
      message.value = "";
      email.value = "";
    };

    const send = async () => {
      isTouched.value = true;
      if (formIsValid) {
        return;
      }

      step.value = SUBMITING;
      isTouched.value = false;
      try {
        await sendMessage();
        step.value = SUCCESS;
      } catch {
        step.value = FAIL;
      }
    };

    const reset = () => {
      clear();
      step.value = IDLE;
    };

    return {
      IDLE,
      SUBMITING,
      FAIL,
      SUCCESS,
      email,
      message,
      step,
      emailError,
      messageError,
      isTouched,
      send,
      reset,
    };
  },
};
</script>
