<template>
  <section class="relative h-full text-gray-600 body-font">
    <div class="absolute inset-0 bg-gray-300 z-minus">
      <Map />
    </div>
    <div class="container px-5 py-24 mx-auto">
      <Container v-if="state.matches('idle')" class="ml-auto">
        <Header>FastBox</Header>
        <Text>Send a message to your friends!</Text>
        <Input
          :value="state.context.email"
          @input="send('SET_EMAIL', { data: $event.target.value })"
          :has-error="
            state.context.errors.email !== null && state.context.showErrors
          "
          :error="state.context.errors.email"
          wrapperClass="mb-4"
          id="email"
          label="Email"
          autocomplete="off"
        />
        <Textarea
          :value="state.context.message"
          @input="send('SET_MESSAGE', { data: $event.target.value })"
          :has-error="
            state.context.errors.message !== null && state.context.showErrors
          "
          :error="state.context.errors.message"
          wrapperClass="mb-4"
          id="message"
          label="Message"
        />
        <Button @click="send('SEND')">SEND</Button>
      </Container>

      <Container v-if="state.matches('submit')" class="ml-auto">
        <Header>Sending...</Header>
        <Text>Please wait while sending a message</Text>
      </Container>

      <Container v-if="state.matches('fail')" class="ml-auto">
        <Header>Fail</Header>
        <Text>An error occurred while sending. Do you want to try again?</Text>
        <Button @click="send('RETRY')">TRY AGAIN</Button>
      </Container>

      <Container v-if="state.matches('success')" class="ml-auto">
        <Header>Success!</Header>
        <Text>Do you want to send the next message?</Text>
        <Button @click="send('RESET')">SEND NEXT</Button>
      </Container>
    </div>
  </section>
</template>

<script>
import { useMachine } from "@xstate/vue";

import Map from "@/components/Map.vue";
import Header from "@/components/Header.vue";
import Text from "@/components/Text.vue";
import Input from "@/components/Input.vue";
import Textarea from "@/components/Textarea.vue";
import Button from "@/components/Button.vue";
import Container from "@/components/Container.vue";
import { messageMachine } from "./machine";

export default {
  name: "App",
  components: { Map, Header, Text, Input, Textarea, Button, Container },
  setup() {
    const { state, send } = useMachine(messageMachine, { devTools: true });

    return {
      state,
      send,
    };
  },
};
</script>
