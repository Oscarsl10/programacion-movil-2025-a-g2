<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <div>
    <h1>Gestión de Personas</h1>

    <PersonaRegister titulo="Cliente" :personaData="cliente" @guardar-persona="guardarCliente" />
    <PersonaRegister titulo="Empleado" :personaData="empleado" @guardar-persona="guardarEmpleado" />
    <PersonaRegister titulo="Proveedor" :personaData="proveedor" @guardar-persona="guardarProveedor" />

    <h2>Datos Guardados</h2>
    <pre>{{ datosGuardados }}</pre>
  </div>
</template>

<script>
import PersonaRegister from './components/PersonaRegister.vue'
export default {
  name: 'App',
  components: {
     PersonaRegister
  },data() {
    return {
      cliente: { nombre: '', apellido: '', documento: '', fechaNacimiento: '', direccion: '', telefono: '', correo: '' },
      empleado: { nombre: '', apellido: '', documento: '', fechaNacimiento: '', direccion: '', telefono: '', correo: '' },
      proveedor: { nombre: '', apellido: '', documento: '', fechaNacimiento: '', direccion: '', telefono: '', correo: '' },
      datosGuardados: []
    };
  },
  methods: {
    guardarCliente(datos) {
      this.datosGuardados.push({ tipo: 'Cliente', ...datos });
    },
    guardarEmpleado(datos) {
      this.datosGuardados.push({ tipo: 'Empleado', ...datos });
    },
    guardarProveedor(datos) {
      this.datosGuardados.push({ tipo: 'Proveedor', ...datos });
    }
  }
};
</script>

<style>
h1 {
  color: #42b983;
}
</style>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
