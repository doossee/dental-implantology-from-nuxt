/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./components/**/*.{js,vue,ts}",
      "./layouts/**/*.vue",
      "./pages/**/*.vue",
      "./plugins/**/*.{js,ts}",
      "./app.vue",
      "./error.vue",
    ],
    safelist: [
      "bg-yellow-400", "bg-yellow-300", "bg-yellow-200", "text-yellow-400",
      "bg-green-500", "bg-green-400", "bg-green-300", "text-green-500",
      "bg-orange-500", "g-orange-400", "bg-orange-300", "text-orange-500",
      "bg-red-500", "bg-red-400", "bg-red-300", "text-red-500",
      "bg-gray-600", "bg-gray-500", "bg-gray-400", "text-gray-600",
      'bg-red-100', 'bg-green-100', 'bg-blue-100', 'bg-yellow-100/50', 
      'border-l-red-600', 'text-red-600',
      'border-l-blue-600', 'text-blue-600',
      'border-l-green-600', 'text-green-600',
      'border-l-yellow-500', 'text-yellow-500',
      'border-l-orange-500', 'text-orange-500',
      "py-1", "p-1",
      "py-2", "px-2",
      "py-3", "px-5",
    ],
    theme: {
      container: {
        center: true,
        padding: "1.5rem",
        screens: {
          "2xl": "1400px",
        },
      },
      extend: {
        colors: {
          border: "hsl(var(--border))",
          input: "hsl(var(--input))",
          ring: "hsl(var(--ring))",
          background: "hsl(var(--background))",
          foreground: "hsl(var(--foreground))",
          primary: {
            100: 'rgb(219 234 254 / 1)',
            200: 'rgb(191 219 254 / 1)',
            300: 'rgb(147 197 253 / 1)',
            400: 'rgb(96 165 250 / 1)',
            500: 'rgb(59 130 246 / 1)',
            600: 'rgb(37 99 235 / 1)',
            700: 'rgb(29 78 216 / 1)',
            800: 'rgb(30 64 175 / 1)',
            900: 'rgb(30 58 138 / 1)',
            // DEFAULT: "hsl(var(--primary))",
            // foreground: "hsl(var(--primary-foreground))",
          },
          secondary: {
            DEFAULT: "hsl(var(--secondary))",
            foreground: "hsl(var(--secondary-foreground))",
          },
          destructive: {
            DEFAULT: "hsl(var(--destructive))",
            foreground: "hsl(var(--destructive-foreground))",
          },
          muted: {
            DEFAULT: "hsl(var(--muted))",
            foreground: "hsl(var(--muted-foreground))",
          },
          accent: {
            DEFAULT: "hsl(var(--accent))",
            foreground: "hsl(var(--accent-foreground))",
          },
          popover: {
            DEFAULT: "hsl(var(--popover))",
            foreground: "hsl(var(--popover-foreground))",
          },
          card: {
            DEFAULT: "hsl(var(--card))",
            foreground: "hsl(var(--card-foreground))",
          },
        },
        // borderRadius: {
        //   lg: "var(--radius)",
        //   md: "calc(var(--radius) - 2px)",
        //   sm: "calc(var(--radius) - 4px)",
        // },
      },
      fontFamily: {
        'manrope': ['"Manrope"']
      }
      // extend: {},
    },
    plugins: [
      // require('preline/plugin')
    ],
  }
  
  