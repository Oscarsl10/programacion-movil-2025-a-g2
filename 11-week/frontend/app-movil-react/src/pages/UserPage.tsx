import {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonInput,
    IonButton,
    IonList,
    IonItem,
    IonLabel,
  } from '@ionic/react';
  import React, { useEffect, useState } from 'react';
    import { User } from '../interfaces/User';
  import { UserService } from '../services/UserService';
  
  const userService = new UserService();
  
  const UserPage: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [user, setUser] = useState<User>({ name: '', email: '' });
  
    useEffect(() => {
      loadUsers();
    }, []);
  
    const loadUsers = () => {
      userService.getAll().then((res) => {
        if (res.data.status) {
          const activeUsers = res.data.data.filter((u) => u.status);
          setUsers(activeUsers);
        }
      }).catch((err) => console.error(err));
    };
  
    const save = () => {
      userService.save(user).then(() => {
        setUser({ name: '', email: '' });
        loadUsers();
      }).catch((err) => console.error(err));
    };
  
    const updateUser = () => {
      if (user.id) {
        userService.update(user.id, user).then(() => {
          setUser({ name: '', email: '' });
          loadUsers();
        }).catch((err) => console.error(err));
      }
    };
  
    const editUser = (u: User) => {
      setUser({ ...u });
    };
  
    const deleteUser = (id?: number) => {
      if (!id) return;
      userService.delete(id).then((res) => {
        if (res.data.message === 'Registro eliminado') {
          loadUsers();
        }
      }).catch((err) => console.error(err));
    };
  
    return (
      <>
        <IonHeader translucent={true}>
          <IonToolbar>
            <IonTitle>Gestión de Usuarios</IonTitle>
          </IonToolbar>
        </IonHeader>
  
        <IonContent fullscreen={true}>
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">Usuarios</IonTitle>
            </IonToolbar>
          </IonHeader>
  
          <div style={{ padding: '1rem' }}>
            <IonInput
              value={user.name}
              placeholder="Nombre"
              onIonChange={(e) => setUser({ ...user, name: e.detail.value! })}
            />
            <IonInput
              value={user.email}
              type="email"
              placeholder="Correo Electrónico"
              onIonChange={(e) => setUser({ ...user, email: e.detail.value! })}
            />
  
            {!user.id ? (
              <IonButton onClick={save}>Guardar</IonButton>
            ) : (
              <IonButton onClick={updateUser}>Actualizar</IonButton>
            )}
          </div>
  
          <IonList>
            {users.map((u) => (
              <IonItem key={u.id}>
                <IonLabel>
                  <h2>{u.name}</h2>
                  <p>{u.email}</p>
                </IonLabel>
                <IonButton fill="outline" color="primary" onClick={() => editUser(u)}>Editar</IonButton>
                <IonButton fill="outline" color="danger" onClick={() => deleteUser(u.id)}>Eliminar</IonButton>
              </IonItem>
            ))}
          </IonList>
        </IonContent>
      </>
    );
  };
  
  export default UserPage;