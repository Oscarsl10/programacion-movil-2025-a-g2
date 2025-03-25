<template>
  <div class="persona-form">
    <h2>{{ titulo }}</h2>
    <form @submit.prevent="enviarFormulario">
      <label>Nombre:</label>
      <input v-model="persona.nombre" type="text" required />

      <label>Apellido:</label>
      <input v-model="persona.apellido" type="text" required />

      <label>Documento:</label>
      <input v-model="persona.documento" type="text" required />

      <label>Fecha de Nacimiento:</label>
      <input v-model="persona.fechaNacimiento" type="date" required />

      <label>Dirección:</label>
      <input v-model="persona.direccion" type="text" required />

      <label>Teléfono:</label>
      <input v-model="persona.telefono" type="text" required />

      <label>Correo:</label>
      <input v-model="persona.correo" type="email" required />

      <button type="submit">Guardar</button>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    titulo: {
      type: String,
      required: true
    },
    personaData: {
      type: Object,
      default: () => ({
        nombre: '',
        apellido: '',
        documento: '',
        fechaNacimiento: '',
        direccion: '',
        telefono: '',
        correo: ''
      })
    }
  },
  data() {
    return {
      persona: { ...this.personaData }
    };
  },
  methods: {
    enviarFormulario() {
      this.$emit('guardar-persona', this.persona);
    }
  }
};
</script>

<style scoped>
.persona-form {
  border: 1px solid #ddd;
  padding: 20px;
  border-radius: 8px;
  width: 300px;
}
label {
  display: block;
  margin-top: 10px;
}
input {
  width: 100%;
  padding: 5px;
  margin-top: 5px;
}
button {
  margin-top: 15px;
  padding: 8px;
  background: #42b983;
  color: white;
  border: none;
  cursor: pointer;
}
</style>