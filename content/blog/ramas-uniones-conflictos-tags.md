---
title: 'Ramas uniones conflictos y tags en git'
description: 'Como unir proyectos cuando se trabaja en equipo con las ramas de git'
date: 2021-06-015
timeToRead: 3
tags:
  - git
---

Hay tres posibles escenarios que puede pasar cuando se hace merge, una rama con otra 

**Fast-forward =>** Normalmente se dispara cuando no hay cambios en la rama principal y la integración se resuelve de forma transparente

**Uniones automáticas =>** Cuando tenemos cambios en ambas ramas git resuelve si no hay cambios en  líneas iguales.

**Manual =>** Es cuando hay modificaciones en la misma linea de ambas ramas y git nos pide resolverlo manualmente

## Fast-forward
Cuando inicializas git por defecto se crea una rama llamada master, en la que normalmente llevas el control de tu proyecto commits tags versionamiento etc.. 
Creemos una rama en el que añadiremos algunas características al proyecto
```bash
git branch nueva-rama
```
Veamos todas las ramas
```bash
git branch
* master
  nueva-rama
```
el * nos endica en la rama que estamos, movamonos a la nueva-rama
```bash
git checkout nueva-rama
Switched to branch 'nueva-rama'
``` 

Voy a agregar modificaciones y hacer commits en `nueva-rama`, ahora veamos los cambios de ambas ramas con `git diff`
 ```bash
 git diff nueva-rama master
 ```

 Regresemos a la rama principal que es `master` e unir ambas ramas   
 ```bash
git checkout master
 ```
 ```bash
 git merge nueva-rama
 Updating 62c8a10..6bb944e
Fast-forward
 newfile.md | 5 +++++
 1 file changed, 5 insertions(+)
 create mode 100644 newfile.md
 ```
Si no hay conflicto todos los cambios de la `nueva-rama` formaran parte de la rama `master`, con esto ya podemos borrarlo `nueva-rama` porque ya no tiene sentido tenerlo
```bash
git branch -d nueva-rama
```
### Merge automático

 Creemos nueva rama y cambiémonos a esa rama en un solo comando 
 ```bash
 git checkout -b nueva-rama
 ```
En `nueva-rama` al que nos movimos hagamos un commit. <br/>
Ahora regresemos a `master` rama para hacer otro commit **(hacer modificación en línea diferente o otro archivo para no hacer conflicto)**  
```bash
* bb2290d (HEAD -> master) añadiendo tdd en la rama master
| * 4f49c6a (nueva-rama) testing con jest en la rama nueva-rama
|/  
```
Estando en la rama master ejecutemos `merge` para unir con `nueva-rama` anotando un mensaje para el commit
```bash
git merge nueva-rama
```
```bash
*   c1c30db (HEAD -> master) Merge branch nueva-rama
|\  
| * 4f49c6a (nueva-rama) testing con jest en la rama nueva-rama
* | bb2290d añadiendo tdd en la rama master
|/  
```
### Uniones con conflictos
Ubiquémonos en `rama-conflicto` que vamos a crear a continuación
```bash
git checkout -b rama-conflicto
```
Hagamos dos commits en ambas ramas y en el mismo archivo la misma linea de código, cada rama con diferente contenido
```bash
* e358295 (HEAD -> master) Añadimos funcionalidad dark mode MASTER
| * d71b17a (rama-conflicto) Quitamos dark mode
|/  
```
```bash
git merge rama-conflicto
Auto-merging dark.md
CONFLICT (content): Merge conflict in dark.md
Automatic merge failed; fix conflicts and then commit the result.
```
Para resolver puedes eliminar los cambios que se sobreescriben o puedes hacer mediante algún plugin, una vez resuelto ***es necesario hacer commit para concluir la unión de las ramas***

## tags
Los tags se usa normalmente para añadir versiones en la aplicación<br/>

Perfectamente se puede crear con `git tag tag-name` y ver todos los tag con `git tag` para eliminar `git tag -d tag-name` pero el nombre del tag no dice mucho

Normalmente se crea pasando el flag -a para la anotación y -m para el mensaje
```bash
git tag -a v1.0.0 -m "Versión 1.0.0"
```
Para poner la versión en algún punto del commit solo copiamos el hash del commit en la que se efectuara la versión
```bash
git tag -a v0.1.0 6bb944e -m "Version alfa"         
```
Veamos un tag específico en detalle
```bash
git show v1.0.0
```
Tambien podemos reflejar estos tags en github 
```
git push origin --tags
```
