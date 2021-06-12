---
title: 'Eslint y prettier sin conflicto en el formateo de código (next, react)'
description: 'Prettier hace el formateo del codigo e Eslint hace de otra manera, solucionemos ese conflicto instalando el paquete eslint-config-prettier'
date: 2021-06-12
timeToRead: 4
tags:
  - react
---

Si ya tienes un proyecto next o react y quieres un linter e prettier que te formatee el código sigue los siguientes pasos

```bash
npx eslint ---init
```

```bash
? How would you like to use ESLint? … 
  To check syntax only
  To check syntax and find problems
▸ To check syntax, find problems, and enforce code style
```

```bash
✔ How would you like to use ESLint? · style
? What type of modules does your project use? … 
▸ JavaScript modules (import/export)
  CommonJS (require/exports)
  None of these
```
```bash
✔ How would you like to use ESLint? · style
✔ What type of modules does your project use? · esm
? Which framework does your project use? … 
▸ React
  Vue.js
  None of these
```
En mi caso le digo que no uso TypeScript

```bash
✔ How would you like to use ESLint? · style
✔ What type of modules does your project use? · esm
✔ Which framework does your project use? · react
? Does your project use TypeScript? ‣ No / Yes
``` 

Selecciono **Browser** y **Node** con la tecla **a**

```bash
✔ How would you like to use ESLint? · style
✔ What type of modules does your project use? · esm
✔ Which framework does your project use? · react
✔ Does your project use TypeScript? · No / Yes
? Where does your code run? …  (Press <space> to select, <a> to toggle all, <i> to invert selection)
✔ Browser
✔ Node
```

```bash
✔ How would you like to use ESLint? · style
✔ What type of modules does your project use? · esm
✔ Which framework does your project use? · react
✔ Does your project use TypeScript? · No / Yes
✔ Where does your code run? · browser, node
? How would you like to define a style for your project? … 
▸ Use a popular style guide
  Answer questions about your style
  Inspect your JavaScript file(s)
  ```

  ```bash
  ✔ How would you like to use ESLint? · style
✔ What type of modules does your project use? · esm
✔ Which framework does your project use? · react
✔ Does your project use TypeScript? · No / Yes
✔ Where does your code run? · browser, node
✔ How would you like to define a style for your project? · guide
? Which style guide do you want to follow? … 
  Airbnb: https://github.com/airbnb/javascript
▸ Standard: https://github.com/standard/standard
  Google: https://github.com/google/eslint-config-google
  XO: https://github.com/xojs/eslint-config-xo
  ```

  ```bash
  ✔ How would you like to use ESLint? · style
✔ What type of modules does your project use? · esm
✔ Which framework does your project use? · react
✔ Does your project use TypeScript? · No / Yes
✔ Where does your code run? · browser, node
✔ How would you like to define a style for your project? · guide
✔ Which style guide do you want to follow? · standard
? What format do you want your config file to be in? … 
▸ JavaScript
  YAML
  JSON
  ```

  Seleccionamos Yes para instalar los paquetes requeridos con NPM

  ```bash
  Checking peerDependencies of eslint-config-standard@latest
Local ESLint installation not found.
The config that you ve selected requires the following dependencies:

eslint-plugin-react@latest eslint-config-standard@latest eslint@^7.12.1 eslint-plugin-import@^2.22.1 eslint-plugin-node@^11.1.0 eslint-plugin-promise@^4.2.1 || ^5.0.0
? Would you like to install them now with npm? ‣ No / Yes
  ```
Si tienes problemas con esta instalación puedes hacerlo con Yarn seleccionando los paquetes a instalar 

```bash
yarn add eslint-plugin-react@latest eslint-config-standard@latest eslint@^7.12.1 eslint-plugin-import@^2.22.1 eslint-plugin-node@^11.1.0 eslint-plugin-promise@^4.2.1 || ^5.0.0
```

`npx eslint .` => Ver los errores
`npx eslint . --fix` => Soluciona los errores

Ok vamos a automatizar esto poniendo `eslint . --fix` en **package.json** en la sección de scripts

```json
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "lint": "eslint . --fix",
    "start": "next start"
  },
```
Con Ctrl Shit + P e escribimos `Preferences: Open Settings (JSON)` la que vamos a abrir para añadir la siguiente configuración
```json
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true
  },
``` 
Para que esto funcione es necesario tener instalado el plugins **Eslint** Oficial, normalmente es la que tiene más descargas

Si queremos desactivar alguna advertencia de error, basta con ir a `.eslintrc.js` en la sección de `rules:{}` especificar el nombre del error en `off`=> desactivado, `warn` => warning, `error` => error. 
```js
  rules: {
    "react/react-in-jsx-scope": "off",
  }
```
## Desactivemos el formateador de eslint e delegarlo solo prettier 
```bash
yarn add eslint-config-prettier -D
```
Agreguemos en `eslintrc.js` en la seccion `extends[]` **prettier**, esto desactiva todas las reglas de eslint en conflicto con prettier 

```js
  extends: [
    'plugin:react/recommended',
    'standard',
    'prettier'
  ],
```
Instalemos `prettier`, ademas de esto prettier al menos necesita un archivo vacío `.prettierrc.json` en la raíz del proyecto
```bash
yarn add prettier -D
```
```bash
touch .prettierrc.json
```
No olvides instalarlo el plugin *Prettier - Code format*  

Ignoremos otros archivos para que prettier no las tome en cuenta como `.next`, para esto crea un archivo `.prettierignore`
```bash
touch prettierignore 
```
Dentro del archivo `prettierignore` añadímos `.next` del mismo modo puedes añadir las que necesites
```text
.next
```

Ejecutamos `npx prettier . --check` esto checkea todos los supuestos errores

`npx prettier . --write` esto es equivalente a fix de eslint, lo que va a hacer es corregir los códigos mal formateados.