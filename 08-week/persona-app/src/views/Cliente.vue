<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title> Cliente </ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-card>
        <ion-card-content>
          <form @submit.prevent="enviarFormulario">
            <ion-item>
              <ion-label position="floating">Nombre</ion-label>
              <ion-input v-model="persona.nombre" type="text" required></ion-input>
            </ion-item>

            <ion-item>
              <ion-label position="floating">Apellido</ion-label>
              <ion-input v-model="persona.apellido" type="text" required></ion-input>
            </ion-item>

            <ion-item>
              <ion-label position="floating">Documento</ion-label>
              <ion-input v-model="persona.documento" type="text" required></ion-input>
            </ion-item>

            <ion-item>
              <ion-label position="floating">Fecha de Nacimiento</ion-label>
              <ion-datetime v-model="persona.fechaNacimiento" display-format="YYYY-MM-DD" required></ion-datetime>
            </ion-item>

            <ion-item>
              <ion-label position="floating">Dirección</ion-label>
              <ion-input v-model="persona.direccion" type="text" required></ion-input>
            </ion-item>

            <ion-item>
              <ion-label position="floating">Teléfono</ion-label>
              <ion-input v-model="persona.telefono" type="tel" required></ion-input>
            </ion-item>

            <ion-item>
              <ion-label position="floating">Correo</ion-label>
              <ion-input v-model="persona.correo" type="email" required></ion-input>
            </ion-item>

            <ion-button expand="full" type="submit" color="primary">Guardar</ion-button>
          </form>
        </ion-card-content>
      </ion-card>

      <ion-card v-if="personas.length">
        <ion-card-header>
          <ion-card-title>Personas Guardadas</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <ion-list>
            <ion-item v-for="(p, index) in personas" :key="index">
              <ion-label>
                <h2>{{ p.nombre }} {{ p.apellido }}</h2>
                <p>Documento: {{ p.documento }}</p>
                <p>Fecha de Nacimiento: {{ p.fechaNacimiento }}</p>
                <p>Dirección: {{ p.direccion }}</p>
                <p>Teléfono: {{ p.telefono }}</p>
                <p>Correo: {{ p.correo }}</p>
              </ion-label>
            </ion-item>
          </ion-list>
        </ion-card-content>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonItem, IonLabel, IonInput, IonDatetime, IonButton, IonList } from '@ionic/vue';

export default {
  components: {
    IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonItem, IonLabel, IonInput, IonDatetime, IonButton, IonList
  },
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
      persona: { ...this.personaData },
      personas: []
    };
  },
  methods: {
    enviarFormulario() {
      this.personas.push({ ...this.persona });
      this.persona = { ...this.personaData };
    }
  }
};
</script>

<style scoped>
ion-card {
  max-width: 400px;
  margin: auto;
}
</style>
