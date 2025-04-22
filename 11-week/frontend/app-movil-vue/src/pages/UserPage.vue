<template>
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle>Gestión de Usuarios</IonTitle>
      </IonToolbar>
    </IonHeader>

    <IonContent>
      <div style="padding: 1rem">
        <IonInput
          v-model="user.name"
          placeholder="Nombre"
        />
        <IonInput
          v-model="user.email"
          type="email"
          placeholder="Correo Electrónico"
        />

        <IonButton @click="user.id ? updateUser() : saveUser()">
          {{ user.id ? 'Actualizar' : 'Guardar' }}
        </IonButton>
      </div>

      <IonList>
        <IonItem v-for="u in users" :key="u.id">
          <IonLabel>
            <h2>{{ u.name }}</h2>
            <p>{{ u.email }}</p>
          </IonLabel>
          <IonButton fill="outline" color="primary" @click="editUser(u)">Editar</IonButton>
          <IonButton fill="outline" color="danger" @click="deleteUser(u.id)">Eliminar</IonButton>
        </IonItem>
      </IonList>
    </IonContent>
  </IonPage>
</template>

<script setup lang="ts">
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonInput,
  IonButton,
  IonList,
  IonItem,
  IonLabel,
} from '@ionic/vue'
import { onMounted, ref } from 'vue'
import { User } from '../interfaces/User'
import { UserService } from '../services/UserService'

const userService = new UserService()

const users = ref<User[]>([])
const user = ref<User>({ name: '', email: '' })

const loadUsers = () => {
  userService.getAll().then((res) => {
    if (res.data.status) {
      users.value = res.data.data.filter((u: User) => u.status)
    }
  }).catch(console.error)
}

const saveUser = () => {
  userService.save(user.value).then(() => {
    user.value = { name: '', email: '' }
    loadUsers()
  }).catch(console.error)
}

const updateUser = () => {
  if (user.value.id) {
    userService.update(user.value.id, user.value).then(() => {
      user.value = { name: '', email: '' }
      loadUsers()
    }).catch(console.error)
  }
}

const editUser = (u: User) => {
  user.value = { ...u }
}

const deleteUser = (id?: number) => {
  if (!id) return
  userService.delete(id).then((res) => {
    if (res.data.message === 'Registro eliminado') {
      loadUsers()
    }
  }).catch(console.error)
}

onMounted(() => {
  loadUsers()
})
</script>

<style scoped>
/* Estilos opcionales */
</style>