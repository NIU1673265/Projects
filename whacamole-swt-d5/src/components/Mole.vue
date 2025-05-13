<template>
 <div class="moleHole" @click="HayHostia"><img :src="ImagenActual" /></div>
</template>

<script>
export default {
  Nome: 'Mole',
  data() {
    return {
      ImagenActual: "../../imagenes/empty.png", 
      Hostia: false,
      Estado: false,
      // Estado: false, // si esta en true = mole si esta en false = empty
    };
  },
  methods: {
      golpe(){
        if (!this.Hostia) {
          if (this.Estado == true) {
            this.ImagenActual = '../../imagenes/empty.png';
            this.Estado=false
          }
          else if(this.Estado == false){
            this.ImagenActual = '../../imagenes/mole.png';
            this.Estado=true
          }
        }
        setTimeout(this.golpe, Math.random() * 1000 + 500);

      },     

    HayHostia() {
      
      if (this.Estado == true ) {
        this.ImagenActual = '../../imagenes/ouch.png';
        this.Hostia = true;

      }
    }
  },
  mounted(){
    setTimeout(this.golpe, Math.random() * 1000 + 500);
  },


}
</script>

<style>
.moleHole {
  border: solid 1px black;
  margin: 2px;
}
</style>
