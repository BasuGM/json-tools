# JSON Tools

A comprehensive suite of 8 professional JSON utilities built with modern web technologies. Features a clean, responsive interface with dark mode support and real-time syntax highlighting powered by Monaco Editor.

## 🚀 Features

### Tools Included
1. **JSON Formatter / Beautifier** - Format JSON with proper indentation and structure
2. **JSON Validator** - Validate JSON syntax with detailed error messages
3. **JSON Diff Tool** - Compare two JSON objects and visualize differences
4. **JSON Visualizer** - Interactive tree view with collapsible nodes and type coloring
5. **JSON Size Analyzer** - Analyze file sizes and identify largest properties
6. **JSON Minifier** - Compress JSON by removing whitespace
7. **JSON Cleanup Tool** - Remove nulls, empty values, trim strings, and sort keys
8. **JSON to XML Converter** - Convert JSON to XML format with proper escaping

### Technical Highlights
- **Monaco Editor Integration** - Full-featured code editor with syntax highlighting for JSON and XML
- **shadcn/ui Components** - Modern, accessible UI component library built on Radix UI
- **Tailwind CSS** - Utility-first CSS with custom design system (rounded-none styling)
- **Dark Mode** - System-aware theme switching with persistent preferences
- **Responsive Design** - Mobile-first approach with breakpoint-based layouts
- **Type Safety** - Fully typed with TypeScript interfaces and strict mode
- **Modular Architecture** - Well-organized component structure with JSDoc documentation

## 🛠️ Tech Stack

- **Framework:** Next.js 16.1.1 (App Router)
- **Runtime:** React 19.2.3
- **Language:** TypeScript 5
- **Code Editor:** Monaco Editor (@monaco-editor/react)
- **UI Components:** shadcn/ui (Radix UI primitives)
- **Styling:** Tailwind CSS 4
- **Icons:** Lucide React + React Icons
- **Theme:** next-themes
- **Fonts:** IBM Plex Sans (Google Fonts)

## 📁 Project Structure

```
json-tools/
├── app/                          # Next.js App Router
│   ├── analyzer/                 # Size analysis tool route
│   ├── cleanup/                  # Cleanup tool route
│   ├── diff/                     # Diff comparison route
│   ├── formatter/                # Formatter route
│   ├── json-to-xml/              # XML converter route
│   ├── minifier/                 # Minifier route
│   ├── validator/                # Validator route
│   ├── visualizer/               # Tree visualizer route
│   └── layout.tsx                # Root layout with theme provider
├── components/
│   ├── analyzer/                 # Analyzer subcomponents
│   ├── cleanup/                  # Cleanup subcomponents
│   ├── common/                   # Shared components
│   │   ├── copy-button.tsx       # Reusable copy button
│   │   ├── header.tsx            # App header with dynamic titles
│   │   ├── json-editor.tsx       # Monaco Editor wrapper
│   │   ├── status-alert.tsx      # Success/error alerts
│   │   ├── theme-provider.tsx    # Theme context provider
│   │   └── theme-toggle.tsx      # Light/dark mode toggle
│   ├── diff/                     # Diff comparison subcomponents
│   ├── formatter/                # Formatter components
│   ├── home/                     # Landing page components
│   ├── json-to-xml/              # XML converter subcomponents
│   ├── minifier/                 # Minifier subcomponents
│   ├── ui/                       # shadcn/ui base components
│   ├── validator/                # Validator components
│   └── visualizer/               # Tree view subcomponents
└── lib/
    └── utils.ts                  # Utility functions (cn helper)
```

## 🎨 Key Implementation Details

### Monaco Editor
- Multi-language support (JSON, XML)
- Theme synchronization with app-wide dark/light mode
- Configurable options (line numbers, word wrap, read-only mode)
- Auto-layout adjustment for responsive containers

### shadcn/ui
- Button, Card, Label, Alert, Separator, Checkbox components
- Dropdown menus for theme selection
- Customized with `rounded-none` for consistent design system
- Built on Radix UI for accessibility

### Tailwind CSS
- Custom configuration with rounded-none default
- Dark mode with class-based strategy
- Responsive grid layouts with breakpoints
- Color-coded type indicators (green for strings, blue for numbers, etc.)

### Component Architecture
- Page components in `app/[route]/page.tsx`
- Feature logic in `components/[route]/index.tsx`
- Subcomponents split into separate files for maintainability
- Comprehensive JSDoc comments throughout

## 🚦 Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Build for Production

```bash
# Create optimized production build
npm run build

# Start production server
npm start
```

## 🎯 Development Practices

- **Type Safety:** Strict TypeScript with no implicit any
- **Code Quality:** ESLint configuration with Next.js rules
- **Component Reusability:** Shared components in `common/` folder
- **Documentation:** JSDoc comments on all components and functions
- **Modular Design:** Each tool is independently maintainable
- **Performance:** Server components where possible, client components only when needed

## 📝 License

This project is open source and available for portfolio demonstration.

## 👤 Contact

**My Name**

- LinkedIn: [Your LinkedIn](https://linkedin.com/in/your-profile)
- Portfolio: [Your Portfolio](https://yourportfolio.com)
- Email: [your.email@example.com](mailto:your.email@example.com)
