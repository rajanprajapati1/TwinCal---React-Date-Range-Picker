# 🗓️ TwinCal - React Date Range Picker

**TwinCal** is a modern, minimal, and fully customizable **date range picker** built with **React**, **styled-components**, and **date-fns**. Designed to fit beautifully into modern design systems, TwinCal offers performance, flexibility, and accessibility without the bloat.

---

## ✨ Features

- 📆 Intuitive and elegant **date range selection**
- 💅 Styled with `styled-components` for full theming and customization
- ⚡ Fast and lightweight with `date-fns`
- ⌨️ Keyboard accessible and screen-reader friendly
- 📱 Fully responsive (mobile-first)
- 🎯 Zero external UI dependencies (integrates into any design system)

---

## 🚀 Installation

First, install via npm:

```bash
npm install twincal
```

Or if you're using `yarn`:

```bash
yarn add twincal
```

---

## 🧩 Usage

```tsx
import React from 'react';
import { DateRangePicker } from 'twincal';

const App = () => {
  return (
    <div>
      <DateRangePicker
        startDate={new Date()}
        endDate={null}
        onChange={({ startDate, endDate }) => {
          console.log('Range selected:', { startDate, endDate });
        }}
      />
    </div>
  );
};
```

---

## 📦 Props

| Prop         | Type                         | Description                                              |
|--------------|------------------------------|----------------------------------------------------------|
| `startDate`  | `Date \| null`               | Selected start date                                      |
| `endDate`    | `Date \| null`               | Selected end date                                        |
| `onChange`   | `({ startDate, endDate }) => void` | Callback when dates are selected                   |
| `minDate`    | `Date`                       | Optional minimum selectable date                         |
| `maxDate`    | `Date`                       | Optional maximum selectable date                         |
| `disabled`   | `boolean`                    | Disable interaction                                      |
| `locale`     | `Locale` from `date-fns`     | Customize locale (e.g., `enUS`, `hiIN`)                  |
| `format`     | `string`                     | Date format string (e.g., `dd/MM/yyyy`)                  |
| `fullWidth`  | `boolean`                    | Stretch component to fill container                      |

---

## 🛠 Customization

You can override all styled-components using `styled-components`’ built-in features or extend the component to create your own styles.

```tsx
import styled from 'styled-components';
import { DateRangePicker } from 'twincal';

const CustomPicker = styled(DateRangePicker)`
  /* your custom styles */
`;

export default () => <CustomPicker />;
```

---

## 🧪 Development

To work on this locally:

```bash
# Inside TwinCal root
npm link

# In your test or app project
npm link twincal
```

---

## 📅 Roadmap

- [x] Date range selection
- [x] Keyboard navigation
- [ ] Single date picker mode
- [ ] Presets (e.g., Last 7 Days, This Month)
- [ ] Theme support (dark mode, custom colors)
- [ ] Multi-month view

---

## 🧠 Inspiration

TwinCal is inspired by the simplicity of tools like MUI DatePicker and the flexibility of tools like `react-day-picker`—but reimagined with clean styled-components integration.

---

## 📜 License

MIT © 2025 Rajan Prajapati
```
