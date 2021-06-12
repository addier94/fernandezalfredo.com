---
title: 'Comandos fundamentales de git'
description: 'Domina estos comandos de git e evitate de muchos dolores'
date: 2021-05-02
timeToRead: 2
tags:
  - git
---

Voy a mostrarles los comandos que suelo usar con frecuencia en mí día a día

```bash
git init
```

**Inicializa git ->** con esto se creara un archivo .git la que se encargará de llevar todo el control del proyecto

```bash
git status
```

También podemos pasar el parámetro `-s` para ver más resumido y limpio. Este comando traquea o vigila, carpetas, eliminaciones, modificaciones etc..
Esto también es necesario para ver el estado de git

- **working directory ->** Cuando se ejecute `git status` se vera en **rojo** archivos nuevos, eliminados o modificados
- **staging area ->** Este escenario existe después de ejecutar `git add . git add file git add *.png` etc.. <br/> Cuando se ejecute `git status` se vera en **verde**

- **git directory Local repository->** En este escenario se encuentra el historial de los commits o confirmaciones a las que podemos viajar a cualquier punto de la historia.

```bash
git add .
```

Añade todo a la zona de state area o escenario, también podemos añadir un archivo en específico o por extensiones `git add <file>` `git add .png`, `git add --all`, `git add pdfs/*`, `git add '*.text'`, `git add *.text` a diferencia de `'*.text'`, `*.text` sólo añade en el directorio actual

```bash
git commit
```

Esto saca un snapshot del escenario para esto necesita un mensaje, que es clave para identificar todos los puntos al que podemos movernos en el avance del proyecto, podemos pasar el parámetro `-m` `git commit -m "mensaje"` o si damos enter se abrirá un editor en la terminal en el que podemos añadir un nombre y guardarlo.

Si queremos modificar el mensaje después de hacer commit `git commit --amend -m "mensaje"`

```bash
git checkout -- .
```

Ahora imagina que tenemos una app que funciona como queremos, pero metemos mano para añadir alguna funcionalidad, resulta que eliminamos archivos o las modificaciones que hicimos interfieren con el funcionamiento del app entonces con `git checkout -- .` borramos todos esos cambios o eliminaciones con esto limpiamos todo hasta el ultimo commit, también podemos rehacer un único archivo `git checkout <fileName>`

```bash
git log
```

Muestra todo el historial de confirmaciones (commits) puede recibir los siguientes parámetros `--oneline`, ver resumido, `--decoratey` `--graphver` ver elegante `--all` muestra todas las diferentes ramas

```bash
git reset HEAD <file>
```

Eliminar del área del escenario o especificar como `git reset *.xmlpuntos HEAD` a la última confirmación

```bash
git diff
```

Compara los cambios de archivo con la confirmación realizada en el área de seguimiento por git o pasando el parámetro `--staged` si lo tenemos en el área preparada

```bash
git reset --soft <id_commit>
```

Eliminar la confirmación sin eliminar cambios o archivos del proyecto, otras especificaciones `git reset --soft HEAD^`

```bash
git reset --hard <id_commit>
```

Esto funciona igual que `--soft`, con la diferencia de que esto destruye el proyecto, desde la confirmación (commit) que vaya a confirmaciones más recientes

```bash
git reflog
```

Muestra el historial de confirmaciones eliminadas con `git reset --hard <id_commit>` y que aún se pueden recuperar

```bash
git mv, git rm
```

Crear, mover, renombrar, eliminar archivos a través de la consola permite realizar un seguimiento de los archivos en git, puede actualizar todo con `git add -u` para ver el rastro de git

### ALIAS

Definamos estas alias con el único objetivo de no escribir comandos largos

```bash
git config --global alias.lg "log --oneline --decorate --all --graph"
```

El comando configurado sería `git lg`

Con esto vamos a ver más minimalista y elegante el historial de confirmaciones

```bash
git config --global alias.s "status -s -b"
```

El parámetro `-s` Para ver resumido <br/>
`-b` Para indicar la rama en la que estamos <br/>
El nuevo comando es `git s`

```bash
git config --global -e
```

Este comando nos muestra todas las configuraciones que hayamos hecho en git, en este caso nos mostraría las alias

### BONUS

`-` Indica que los parámetros de un solo carácter se pueden concatenar por ejemplo `git status -s -b` por `git status -sb`
`--` Normalmente estos son parámetros con nombre completo, por ejemplo `--global`, `--oneline`, `--decorate` etc...
