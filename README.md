This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Setear las variables de ambiente

Renombrar .env.example a .env y reemplazar las variables con los datos necesarios.

### AUTH_GITHUB_ID and AUTH_GITHUB_SECRET

Crear una aplicación en github en el siguiente link: https://github.com/settings/applications/new

Application name: llm-class
Homepage URL: http://localhost:3000
Authorization callback URL: http://localhost:3000/api/auth/callback/github

### PINECONE_API_KEY, PINECONE_ENVIRONMENT, PINECONE_INDEX_NAME

Crear una cuenta en Pinecone y crear un index: https://app.pinecone.io/

Para el index:

Give it a name: llm-class
Configure your Index: Click en Set up model y selecciona "OpenAI/text-embedding-ada-002"


## Cargar datos a Pinecone

Para procesar el documento pdf y cargar los vectores a pinecone correremos un script:

npm run ingest

## Deployar a AWS

Crear una cuenta en AWS:  https://aws.amazon.com/free/

Crear un IAM user:
https://sst.dev/chapters/create-an-iam-user.html

Instalar AWS CLI y correr el comando de configuración:
https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html


sudo apt install awscli

aws configure


## Configurar SST a nextjs
https://docs.sst.dev/start/nextjs

npx sst bootstrap

### Deployar a AWS
npx sst deploy --stage dev


## Alternativa: deployar a vercel

https://vercel.com/docs/deployments/overview

vercel --prod
