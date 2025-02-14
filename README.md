# Ejercicio 1

En el ejemplo original, se estaba utilizando un doble estado para el contador y el mensaje, lo que generaba re-renderizados innecesarios cada vez que se actualizaba el contador. El estado `message` dependía directamente de `count`, lo que hacía que ambos estados se actualizaran, aunque en realidad solo era necesario un estado para manejar el contador.


### Problemas del código original:
1. **Uso innecesario de estado**
2. **Re-renderizados excesivos**
3. **Complejidad innecesaria**

### Código refactorizado

```javascript
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(prevCount => prevCount + 1);
  };

  return (
    <div>
      <p>Count is: {count}</p>
      <button onClick={increment}>Increment</button>
    </div>
  );
}
```

### Explicación de la refactorización:
1. **Eliminación de `message`**: Se eliminó el estado redundante `message`, ya que podemos calcular directamente el mensaje en el JSX usando el valor de `count`.
2. **Uso de `prevCount` en la función `increment`**: En lugar de depender de `count` directamente en la función de actualización del estado, usamos `prevCount` (valor anterior) para garantizar que siempre estamos utilizando el valor más actualizado del contador, evitando problemas si se hacen múltiples actualizaciones de estado en el mismo ciclo de renderizado.


# Ejercicio 2 
## Optimización del uso de `useEffect` en React

### Problemas del código original

El código original presenta un problema en la dependencia del hook `useEffect`. En lugar de depender del `userId` (que es el prop que cambia cuando necesitamos realizar una nueva solicitud de usuario), el efecto depende de `user`. Esto puede causar un **bucle infinito de renderizados**, ya que cada vez que se actualiza `user`, el efecto se vuelve a ejecutar y hace otra solicitud, lo que actualiza `user` nuevamente, repitiendo el proceso.




## Problemas identificados:
1. **Dependencia incorrecta de `useEffect`**
2. **Bucle infinito de renderizado**
## Solución y código refactorizado

La solución consiste en corregir la dependencia de `useEffect`, asegurándonos de que se ejecute solo cuando el `userId` cambie. Además, moveremos la función `getUsers` dentro del `useEffect` para mayor claridad.

#### Código refactorizado

```javascript
import { useEffect, useState } from 'react';

function UserComponent({ userId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUsers = () => {
      fetch(`https://api.example.com/users/${userId}`)
        .then((response) => response.json())
        .then((data) => setUser(data));
    };

    getUsers();
  }, [userId]); // Ahora solo depende de `userId`

  return user ? <div>{user.name}</div> : <p>Loading...</p>;
}

```



# Ejercicio 3

## Problemas identificados:
1. **Código repetitivo**: El componente `UserList` tiene un patrón repetido para mostrar la información de cada usuario. Esto hace que el código sea más largo, difícil de mantener y propenso a errores si necesitamos actualizar la estructura de los usuarios.
2. **Falta de componentes reutilizables**: No hay un componente reutilizable que represente a cada usuario. Esto hace que el código sea menos flexible y escalable si se desea agregar más usuarios o cambiar la estructura del usuario en el futuro.

## Código refactorizado:

Para poder resolver los problemas anteriormente mencionados, crearemos un componente `User` el cual es el que nostrara la información del usuario. Luego, utilizaremos este componente dentro de `UserList`, pasando la información de cada usuario como props.

### Código refactorizado:

#### Nuevo componente User:

```javascript
import React from 'react';

// Componente reutilizable para mostrar un solo usuario
function User({ name, age }) {
  return (
    <div>
      <h3>{name}</h3>
      <p>Age: {age}</p>
    </div>
  );
}
```
#### Ejemplo de como se utilizaria el componente

```javascript
function UserList() {
  return (
    <div>
      <User name="James Gosling" age={69} />
      <User name="Alan Turing" age={41} />
      <User name="Dennis Ritchie" age={70} />
    </div>
  );
}

export default UserList;

```


# Como levantar el proyecto

Este proyecto está construido utilizando React como biblioteca principal y Vite como herramienta de construcción y desarrollo. Para levantar y ejecutar el proyecto, sigue los pasos a continuación:

## Requisitos previos

Antes de comenzar, asegúrate de tener instalados los siguientes programas:

- **Node.js** (se recomienda la última versión LTS): Puedes descargarlo desde [nodejs.org](https://nodejs.org/).
- **Git**: Si aún no tienes Git, instálalo desde [git-scm.com](https://git-scm.com/).

## Levantar el proyecto

1. **Clonar el repositorio**

   Primero, necesitas clonar el repositorio del proyecto en tu máquina local. Ejecuta el siguiente comando en tu terminal:

   ```bash
   git clone <<URL_DEL_REPOSITORIO>>
    ```
Asegúrate de reemplazar <<URL_DEL_REPOSITORIO>> con la URL real del repositorio.

## Acceder a la carpeta del proyecto

Una vez clonado el proyecto, navega a la carpeta del proyecto utilizando el siguiente comando:

```bash
cd nombre-del-proyecto
```

Reemplaza nombre-del-proyecto con el nombre de la carpeta que se haya creado después de clonar el repositorio.

## Instalar dependencias

El siguiente paso es instalar todas las dependencias del proyecto. Vite y React están definidos en el archivo `package.json`. Para instalar las dependencias, ejecuta:

```bash
npm install
```

Si prefieres usar `yarn`, puedes usar:

```bash
yarn install
```

Esto descargará e instalará todos los paquetes necesarios para que el proyecto funcione correctamente.

## Iniciar el servidor de desarrollo

Después de que las dependencias se hayan instalado correctamente, puedes iniciar el servidor de desarrollo de Vite. Esto te permitirá ver la aplicación en vivo en tu navegador. Ejecuta el siguiente comando:

```bash
npm run dev
```

O, si usas `yarn`:

```bash
yarn dev
```

Una vez ejecutado, Vite iniciará un servidor de desarrollo y podrás acceder al proyecto en tu navegador en la siguiente URL:

```bash
http://localhost:3000
```