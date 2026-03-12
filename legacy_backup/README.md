# Ahmed Aymane - Portfolio

A modern, responsive portfolio website built with React, TypeScript, Vite, and Tailwind CSS. This portfolio showcases my skills, experience, projects, and provides a way to get in touch.

## 🚀 Features

- **Modern UI/UX** - Clean, responsive design that works on all devices
- **Performance Optimized** - Built with Vite for fast development and production builds
- **Type Safety** - Written in TypeScript for better developer experience
- **Animations** - Smooth animations using Framer Motion
- **Contact Form** - Functional contact form with EmailJS integration
- **Dark Mode** - Built-in dark mode support (coming soon)

## 🛠️ Technologies Used

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- React Icons
- React Scroll
- EmailJS

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or later)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/portfolio.git
   cd portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```

3. Create a `.env` file in the root directory and add your EmailJS credentials:
   ```env
   VITE_EMAILJS_SERVICE_ID=your_service_id
   VITE_EMAILJS_TEMPLATE_ID=your_template_id
   VITE_EMAILJS_PUBLIC_KEY=your_public_key
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:5173](http://localhost:5173) to view it in your browser.

## 📦 Building for Production

To create a production build:

```bash
npm run build
# or
yarn build
```

This will create a `dist` folder with the production-ready files.

## 🎨 Customization

### Personal Information

Update your personal information in the following files:

- `src/sections/Hero.tsx` - Update your name, title, and social links
- `src/sections/About.tsx` - Update your about text and skills
- `src/sections/Experience.tsx` - Update your work experience and education
- `src/sections/Projects.tsx` - Add/update your projects
- `src/sections/Contact.tsx` - Update contact information and social links

### Styling

This project uses Tailwind CSS for styling. You can customize the design by modifying the `tailwind.config.js` file.

### Theme

To change the color scheme, update the primary and secondary colors in the `tailwind.config.js` file:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          // Your primary color palette
        },
        secondary: {
          // Your secondary color palette
        },
      },
    },
  },
};
```

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [Vite](https://vitejs.dev/) - Next Generation Frontend Tooling
- [React](https://reactjs.org/) - A JavaScript library for building user interfaces
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework
- [Framer Motion](https://www.framer.com/motion/) - Production-ready animation library for React
- [React Icons](https://react-icons.github.io/react-icons/) - Popular icons for React projects

## 📬 Contact

- Email: your.email@example.com
- LinkedIn: [Your LinkedIn Profile](https://linkedin.com/in/yourusername)
- GitHub: [@yourusername](https://github.com/yourusername)

---

Made with ❤️ by [Your Name]

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
