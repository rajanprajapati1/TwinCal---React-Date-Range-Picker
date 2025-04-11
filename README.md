# 🦅 Griffin UI

**Griffin UI** is a modern, flexible React component library designed to help developers build fast, clean, and responsive interfaces with minimal effort. Built for React and Next.js applications, it includes a growing collection of reusable UI components.

> ⚡️ Fast setup. 🎨 Clean design. 🧩 Developer friendly.

---

## 📦 Installation

```bash
npm install griffinui
```

or

```bash
yarn add griffinui
```

---

## 🚀 Quick Start

1. **Import global styles** (once in your root entry file):

```tsx
import 'griffinui/dist/index.css';
```

2. **Use components in your app:**

```tsx
import {
  Button,
  Badge,
  Divider,
  Skeleton,
  Spacer,
  Tooltip,
  Tabs,
} from 'griffinui';
```

---

## 🧩 Components & Examples

### 🔘 Button

```tsx
<Button onClick={() => alert('Clicked!')} variant="primary" size="md">
  Click Me
</Button>
```

Props:
- `variant`: `primary` | `secondary` | `outline`
- `size`: `sm` | `md` | `lg`

---

### 🎖️ Badge

```tsx
<Badge color="green">New</Badge>
```

Props:
- `color`: `blue` | `green` | `red` | `gray`

---

### 📏 Divider

```tsx
<p>Above</p>
<Divider />
<p>Below</p>
```

Props:
- `thickness`, `color`, `margin` (optional)

---

### 🦴 Skeleton

```tsx
<Skeleton width="200px" height="20px" />
```

Props:
- `width`, `height`

---

### 📐 Spacer

```tsx
<Spacer size="lg" />
```

Props:
- `size`: `xs` | `sm` | `md` | `lg` | `xl`

---

### 💬 Tooltip

```tsx
<Tooltip content="Tooltip text">
  <button>Hover me</button>
</Tooltip>
```

Props:
- `content`: tooltip text
- `position`: `top` | `right` | `bottom` | `left` *(optional)*

---

### 🗂️ Tabs

```tsx
<Tabs
  tabs={[
    { label: 'Tab 1', content: <p>This is Tab 1</p> },
    { label: 'Tab 2', content: <p>This is Tab 2</p> },
  ]}
/>
```

Props:
- `tabs`: Array of `{ label: string, content: ReactNode }`

---

## 🛠 Customization

Griffin UI components are lightweight and styleable. You can extend or override styles using your preferred CSS-in-JS solution or utility classes.

---

## 🧪 Storybook (Coming Soon)

Component previews and documentation will be available in the Storybook UI shortly.

---

## 👨‍💻 Contributing

Pull requests are welcome!

```bash
git clone https://github.com/rajanprajapati/griffinui
cd griffinui
npm install
npm run dev
```

---

## 📄 License

MIT License © [Rajan Prajapati](https://www.npmjs.com/~rajanprajapati)

---

## 🌟 Stay Connected

Star the repo and share your feedback to help improve Griffin UI!
