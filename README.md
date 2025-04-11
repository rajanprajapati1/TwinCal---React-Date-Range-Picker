# 🗓️ TwinCal – React Date Range Picker Component

**TwinCal** is a highly customizable and accessible **date range picker** for React, built using **styled-components** and **date-fns**. It’s perfect for modern design systems and clean UI/UX requirements.

---

## ✨ Features

- 📅 **Date range selection** with start and end dates
- 🧠 Built-in logic to disable past/future or custom dates
- 🌍 Locale and format support via `date-fns`
- 🎨 Multiple variants: `outlined`, `filled`, `standard`
- 🧼 Clearable input option
- 🧱 Full-width layout support
- 🎯 Controlled open/close logic with `onOpen` / `onClose` handlers
- 🧭 Optional left sidebar for quick range presets
- 🎨 Customizable primary color
- ♿ Fully accessible and keyboard-friendly

---

## 🚀 Installation

```bash
npm install twincal
# or
yarn add twincal
```

---

## 🧩 Usage

```tsx
import React, { useState } from 'react';
import { DateRangePicker, DateRange } from 'twincal';

const App = () => {
  const [range, setRange] = useState<DateRange>({ startDate: null, endDate: null });

  return (
    <DateRangePicker
      value={range}
      onChange={setRange}
      disablePast
      format="dd/MM/yyyy"
      clearable
      variant="outlined"
    />
  );
};
```

---

## 📦 Props

| Prop              | Type                                  | Default      | Description |
|-------------------|---------------------------------------|--------------|-------------|
| `value`           | `{ startDate: Date \| null, endDate: Date \| null }` | – | Controlled date range value |
| `onChange`        | `(value: DateRange) => void`          | –            | Callback on range selection |
| `disablePast`     | `boolean`                             | `false`      | Disables selection of past dates |
| `disableFuture`   | `boolean`                             | `false`      | Disables selection of future dates |
| `disableDates`    | `(date: Date) => boolean`             | –            | Custom logic to disable specific dates |
| `minDate`         | `Date`                                | –            | Minimum selectable date |
| `maxDate`         | `Date`                                | –            | Maximum selectable date |
| `locale`          | `string`                              | `'en-US'`    | Locale string for date formatting |
| `format`          | `string`                              | `'MM/dd/yyyy'` | Custom format for displaying dates |
| `clearable`       | `boolean`                             | `false`      | Show a clear icon to reset input |
| `inputPlaceholder`| `string`                              | `'Select range'` | Placeholder text |
| `fullWidth`       | `boolean`                             | `false`      | Stretch to parent width |
| `variant`         | `"outlined" \| "filled" \| "standard"`| `'outlined'` | Input styling variant |
| `disabled`        | `boolean`                             | `false`      | Disable entire picker |
| `readOnly`        | `boolean`                             | `false`      | Makes input read-only |
| `openOnFocus`     | `boolean`                             | `true`       | Automatically open calendar on focus |
| `open`            | `boolean`                             | –            | Control calendar visibility externally |
| `onOpen`          | `() => void`                          | –            | Callback when calendar opens |
| `onClose`         | `() => void`                          | –            | Callback when calendar closes |
| `showSidebar`     | `boolean`                             | `false`      | Show sidebar with quick presets |
| `primaryColor`    | `string`                              | `'#6366f1'`  | Customize primary theme color |

---

## 🎨 Variants

```tsx
<DateRangePicker variant="filled" />
<DateRangePicker variant="outlined" />
<DateRangePicker variant="standard" />
```

---

## 📚 Format & Locale

Using `date-fns` under the hood, TwinCal supports [format strings](https://date-fns.org/v2.30.0/docs/format) and locales:

```tsx
<DateRangePicker format="dd MMM, yyyy" locale="en-GB" />
```

To change locale, make sure to import the appropriate `date-fns/locale` and pass it via `locale`.

---

## 📁 Types

```ts
export interface DateRange {
  startDate: Date | null;
  endDate: Date | null;
}
```

---

## 🧠 Roadmap

- [x] Date range picker
- [x] Variant styles
- [x] Sidebar support
- [ ] Time picker support
- [ ] Dark mode
- [ ] Mobile-native UI
- [ ] i18n labels and accessibility roles

---

## 🧪 Local Development

```bash
# In your TwinCal root folder
npm link

# In your app or test project
npm link twincal
```

---

## 📜 License

MIT © 2025 Rajan Prajapati
```
