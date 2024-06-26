<template>
  <v-container>
    <v-row>
      <template v-for="n in 4" :key="n">
        <v-col
            class="mt-2"
            cols="12"
        >
          <strong>Kategorija {{ n }}</strong>
        </v-col>

        <v-col
            v-for="j in 6"
            :key="`${n}${j}`"
            cols="6"
            md="2"
        >
          <v-sheet height="150"></v-sheet>
        </v-col>
      </template>
    </v-row>
  </v-container>
</template>

<script>
//import { defineComponent } from 'vue';

// Components
//import HelloWorld from '../components/HelloWorld.vue';

export default {
  name: 'HomeView',

  //components: {
    //HelloWorld,
  //},
}
</script>
