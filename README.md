# react-ui

## Description
Common UI component for react applications in the Qubic style.

# Setup
The projects uses `pnpm` as package manager. You can install it by running `npm install -g pnpm`.
To install the dependencies, run `pnpm install`.

## Dev Stack
- [React](https://react.dev) for the UI
- [Tailwind](https://tailwindcss.com/docs/installation) CSS for styling
- [Vite](https://vitejs.dev/guide/) for development
- [Storybook](https://storybook.js.org/) for component development
- [Vitest](https://vitest.dev/guide/) for testing

## License
As we use some parts from the 451 Package to our Wallet also apply the Anti-Military License. See https://github.com/computor-tools/qubic-crypto
Further our Wallet Code is protected by the AGPL-3.0 License. You may use our Source-Code for what you need to do business.


# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
