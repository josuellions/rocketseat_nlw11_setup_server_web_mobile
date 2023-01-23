### OmniStack - NLW 11 - SETUP

#### Data: 16/01/2023 a 21/01/2023

#### RocketSeat

##### Educator: Diego Fernandes / Rodrigo Gonçalves

##### Developer: Josuel A. Lopes

#### About

Construindo aplicação gerenciamento de tarefas diária utilizando NodeJs no backend, React e VITE no frontend web e React Native no Mobile.

##### Criando e Inicio projeto

##### Instalando e configurando TypeScript - SERVER

```
$ npm init -y
```

##### Backend

> Instalando TYPESCRIPT

```
$ npm install typescript -D
$ npx tsc --init
$ npm i tsx -D
```

> Rodando aplicação

```
$ npm run dev
```

> Instalando Banco Dados - ORM Prisma

```
$ npm i prisma -D
$ npm i @prisma/client
$ npx prisma init --datasource-provider SQLite
```

> Criar tabela com base no schema

```
$ npx prisma migrate dev
$ npx prisma studio
```

> Criando Diagrama do Banco Dados

- https://www.npmjs.com/package/prisma-erd-generator

```
$ npm i -D prisma-erd-generator @mermaid-js/mermaid-cli
$ npx prisma generate
```

> Populando o dados no banco

```
$ npx prisma db seed
```

> Validações dados

```
$ npm i zod
```

> Formatando datas

```
$ npm i dayjs
```

> Configurando o CORS

```
$ npm i @fastify/cors
```

##### Frontend - WEB

> Criando projeto com VITE

```
$ npm create vite@latest
$ npm install
```

> Acessibilidade - MODAL

- https://www.radix-ui.com

```
$ npm install @radix-ui/react-dialog
$ npm install @radix-ui/react-popover
$ npm install @radix-ui/react-checkbox
```

> Adicionando condicionais no CSS - Tailwind

```
$ npm i clsx
```

> Conexão com banco dados - SERVER

```
$ npm i axios
```

##### Frontend - Mobile

> Criando projeto

```
$ npx create-expo-app mobile --template
$ npm run android
$ expo start --android
```

> Configurando Fontes

```
$ npx expo install expo-font @expo-google-fonts/inter
```

> Configurando NativeWind (Styles CSS - TailWind)

- https://www.nativewind.dev/

```
$ npm i nativewind
$ npm i tailwindcss -D
$ npx tailwindcss init
```

> Configurando biblioteca SVG - IMAGE

- https://github.com/kristerkari/react-native-svg-transformer

```
$ npx expo install react-native-svg
$ npm i react-native-svg-transformer -D
$
```

> Configurando navegação

```
$ npm install @react-navigation/native
$ npm install @react-navigation/native-stack
$ npx expo install react-native-screens react-native-safe-area-context
```

> Conexão com banco dados - SERVER

```
$ npm i axios
```

> Adicionando condicionais no CSS - Tailwind

```
$ npm i clsx
```

> Adicionando Animações

- https://docs.swmansion.com/react-native-reanimated/

```
$ npx expo install react-native-reanimated
$ npx expo start --clear
```

##### Melhorias e novas funcionalidades

- Autenticação (Firebase, Auth0)
- Notificações Push / Service Workers
- Perfil público com gráfico de resumo

================================================================================
