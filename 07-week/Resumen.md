# Manual de Instalación de Ionic y Creación de Proyecto con React

## 1. Introducción

Ionic es un framework para desarrollar aplicaciones móviles híbridas utilizando tecnologías web como **HTML, CSS y JavaScript**, con la capacidad de compilar aplicaciones para **iOS, Android y la web**.

Este manual te guiará en la instalación de **Ionic CLI** de manera global en tu sistema y en la creación de un proyecto utilizando **React** como librería principal para la interfaz de usuario.

---

## 2. Requisitos Previos

Antes de instalar Ionic, asegúrate de tener instalado lo siguiente:

- **Node.js** (versión recomendada: LTS)  
  - Verifica la instalación con:  
    ```sh
    node -v
    ```
  - Descarga desde [Node.js](https://nodejs.org) si no lo tienes instalado.
  
- **npm** (incluido con Node.js)  
  - Verifica la instalación con:  
    ```sh
    npm -v
    ```

- **Git** (para la gestión de versiones)  
  - Verifica la instalación con:  
    ```sh
    git --version
    ```
  - Descarga desde [Git SCM](https://git-scm.com) si no lo tienes instalado.


## 3. Instalación de Ionic CLI

Para instalar **Ionic CLI** de manera global en tu sistema, ejecuta el siguiente comando:

```sh
npm install -g @ionic/cli
```

Después de la instalación, verifica que Ionic está correctamente instalado con:

```sh
ionic -v
```

Esto mostrará la versión de Ionic instalada en tu sistema.


## 4. Creación del Proyecto con Ionic React
Una vez que Ionic CLI esté instalado, puedes crear un nuevo proyecto utilizando React con el siguiente comando:

```sh
ionic start miApp blank --type=react
```

### Explicación del comando:

- miApp → Nombre de la aplicación.

- blank → Plantilla base sin componentes adicionales.

- --type=react → Indica que la aplicación usará React.

Después de ejecutar este comando, se te pedirá que elijas entre Capacitor o Cordova para el desarrollo móvil.
Puedes seleccionar Capacitor, ya que es la opción recomendada para nuevas aplicaciones.


## 5. Ejecutar la Aplicación en el Navegador
Para probar la aplicación en el navegador, accede a la carpeta del proyecto:

```sh
cd miApp
```
Luego, inicia el servidor de desarrollo con:

```sh
ionic serve
```

Esto abrirá la aplicación en tu navegador en http://localhost:8100.

## 6. Estructura del Proyecto
Después de crear la aplicación, tendrás una estructura de archivos similar a la siguiente:

```sh
miApp/
│── node_modules/       # Dependencias instaladas
│── public/             # Archivos públicos
│── src/                # Código fuente de la aplicación
│   ├── components/     # Componentes reutilizables
│   ├── pages/          # Páginas principales
│   ├── App.tsx         # Componente raíz
│   ├── main.tsx        # Punto de entrada de la app
│── package.json        # Archivo de configuración de dependencias
│── capacitor.config.ts # Configuración de Capacitor
│── tsconfig.json       # Configuración de TypeScript
```

## 7. Agregar una Página Nueva
Puedes generar una nueva página en Ionic React con el siguiente comando:

```sh
ionic generate page NombrePagina
```
Esto creará una carpeta dentro de src/pages/ con los archivos correspondientes.

## 8. Compilar la Aplicación para Móvil
Para compilar la aplicación y ejecutarla en un dispositivo o emulador, usa Capacitor:

Agrega la plataforma deseada (Android o iOS):

```sh
ionic cap add android
```
o para iOS:

```sh
ionic cap add ios
```
Abre el proyecto en Android Studio o Xcode:

```sh
ionic cap open android
```
o para iOS:

```sh
ionic cap open ios
```
Desde el IDE, compila y ejecuta la aplicación en un dispositivo o emulador.