# qubic-react-ui

This package is pretty **early** in development and is open for contributions. If you have any ideas or want to help out, feel free to open an issue or a pull request. The goal is to create a set of common UI components and easy wallet integration for React applications in the Qubic style.

## Description
Common UI components for react applications in the Qubic style.

## Features

### Qubic Connect
- **MetaMask Integration**:
  - MetaMask Wallet support
  - Transaction confirmation modal
  - Wallet connection handling
- **Qubic Integration**:
  - Connect link component
  - Qubic connect modal
  - Custom configuration options

### UI Components
- **Button**: Customizable button component with Qubic styling
- **Card**: Container component for content organization
- **Dropdown**: Interactive dropdown menu component
- **ConfirmSlider**: Slider component for confirmation actions
- **LabelWithPopover**: Label component with additional information in a popover
- **MinMaxSpan**: Component for displaying minimum and maximum values

### Form Components
- **InputMaxChars**: Text input with character limit
- **InputNumbers**: Numeric input field with validation
- **InputRegEx**: Text input with regex pattern validation
- **FormHead**: Form header component
- **SelectDateTime**: Date and time picker component

### Layout Components
- **Header**: Application header component
- **Footer**: Application footer component

### Utility Functions
- MetaMask utilities for wallet interaction
- Type definitions for Qubic and account management

# Setup
The projects uses `pnpm` as package manager. You can install it by running `npm install -g pnpm`.
To install the dependencies, run `pnpm install`.

## Using the Package in Your Project

1. Install the package and its peer dependencies:
```bash
# Using npm
npm install @qubic/react-ui react@^18.0.0 react-dom@^18.0.0 react-router-dom@^6.28.0

# Using yarn
yarn add @qubic/react-ui react@^18.0.0 react-dom@^18.0.0 react-router-dom@^6.28.0

# Using pnpm
pnpm add @qubic/react-ui react@^18.0.0 react-dom@^18.0.0 react-router-dom@^6.28.0
```

2. Import and use components:
```typescript
import { Button, Card, ConnectModal } from '@qubic/react-ui';

function App() {
  return (
    <div>
      <Card>
        <Button variant="primary">Click me</Button>
      </Card>
      <ConnectModal />
    </div>
  );
}
```

3. For wallet integration, wrap your app with the QubicConnectProvider context provider:
```typescript
import { QubicConnectProvider } from '@qubic/react-ui';

function App() {
  return (
    <QubicConnectProvider>
      {/* Your app components */}
    </QubicConnectProvider>
  );
}
```

## Dev Stack
- [React](https://react.dev) for the UI
- [Tailwind](https://tailwindcss.com/docs/installation) CSS for styling
- [Vite](https://vitejs.dev/guide/) for development
- [Storybook](https://storybook.js.org/) for component development
- [Vitest](https://vitest.dev/guide/) for testing

## License
As we use some parts from the 451 Package to our Wallet also apply the Anti-Military License. See https://github.com/computor-tools/qubic-crypto
Further our Wallet Code is protected by the AGPL-3.0 License. You may use our Source-Code for what you need to do business.
