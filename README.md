# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.

## Como instalar no celular

O Jogo da Redação pode ser instalado como um aplicativo direto na tela inicial do seu celular, sem precisar da loja de aplicativos.

**Android (Chrome):**
1. Acesse o jogo no navegador Chrome.
2. Toque no menu do navegador (⋮) no canto superior direito.
3. Selecione **"Adicionar à tela inicial"** (ou "Instalar aplicativo").
4. Confirme o nome e toque em **Adicionar**.

**iOS (Safari):**
1. Acesse o jogo no Safari.
2. Toque no ícone de **compartilhar** (quadrado com seta para cima) na barra inferior.
3. Role e selecione **"Adicionar à Tela de Início"**.
4. Confirme o nome e toque em **Adicionar**.

> **Importante:** Após instalar, abra o jogo sempre pelo ícone na tela inicial — não pelo navegador embutido de aplicativos de mensagens (WhatsApp, Instagram etc.). Isso garante que o progresso salvo no dispositivo seja preservado entre as sessões.
