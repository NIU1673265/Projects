<template>
  <div style="display: flex; flex-wrap: wrap">
    <Mole></Mole><Mole></Mole><Mole></Mole>
    <Mole></Mole><Mole></Mole><Mole></Mole>
  </div>
</template>

<script>
import Mole from './components/Mole.vue';

export default {
  name: 'App',
  components: {
    Mole
  }
};
</script>