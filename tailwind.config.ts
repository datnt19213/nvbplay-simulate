import type {Config} from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      container: {
        screens: {
          lg: "1200px",
        },
        center: true,
      },
      colors: {
        txtprimary: "#27272A",
        txtsecondary: "#64646D",
        txtthird: "#FF3F1A",
        txtfourth: "#0B74E5",
        txtfifth: "#38383D",
        "blue-hovered": "#0D5BB5",
        "gray-primary": "#F5F5FA",
        "gray-icon": "#515158",
        "gray-border": "#EBEBF0",
        "black-primary": "#0a0604",
        "black-secondary": "#0E1C26",
        "gray-secondary": "#2a2a28",
        "gray-third": "#dbdbdb",
        "gray-fourth": "#8f9b99",
        "gray-fifth": "#0F0F10",
        "gray-sixth": "#808089",
        "gray-seventh": "#A6A6B0",
        "gray-eighth": "#DDDDE3",
        "red-primary": "#D93843",
        "red-sencondary": "#FFF0F1",
        "purple-primary": "#733DF2",
        "blue-primary": "#0B74E5",
        "green-primary": "#079449",
        "green-secondary": "#D7FAE0",
        "yellow-primary": "#CC8100",
        "yellow-secondary": "##FFC400",
        "yellow-third": "#FFFCED",
        "blue-secondary": "#F2F7FF",
        "blue-third": "#F0F8FF",
        "orange-primary": "#E59900",
        "orange-secondary": "#F09840",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        second: "#424242",
        font: "Plus Jakarta Sans",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      screens: {
        mobile: "375px",
        desktop: "1200px",
      },
      keyframes: {
        "text-shimmer": {
          from: {backgroundPosition: "0 0"},
          to: {backgroundPosition: "-200% 0"},
        },
        shimmer: {
          "100%": {
            transform: "translateX(100%)",
          },
        },
        "slide-full": {
          from: {
            transform: "translateX(-200%)",
          },
          to: {
            transform: "translateX(200%)",
          },
        },
        "fade-move": {
          "0%": {
            opacity: "0",
            transform: "translate(0, 0)",
          },
          "50%": {
            opacity: "1",
          },
          "100%": {
            opacity: "0",
          },
        },
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "text-shimmer": "text-shimmer 2.5s ease-out infinite alternate",
        "slide-infinite": "slide-full 2s linear infinite",
        "fade-move": "fade-move 1s ease-in-out",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("tailwindcss-animated"),
    require("tailwind-scrollbar")({
      nocompatible: true,
    }),
    require("@tailwindcss/typography"),
    function ({addComponents}: any) {
      addComponents({
        ".text-16-24-600": {
          fontSize: "16px", // custom text size
          fontWeight: "600", // custom font weight
          lineHeight: "24px", // custom line height
        },
        ".text-14-21-600": {
          fontSize: "14px", // custom text size
          fontWeight: "600", // custom font weight
          lineHeight: "21px", // custom line height
        },
        ".text-14-21-500": {
          fontSize: "14px", // custom text size
          fontWeight: "500", // custom font weight
          lineHeight: "21px", // custom line height
        },
        ".text-14-21-400": {
          fontSize: "14px", // custom text size
          fontWeight: "400", // custom font weight
          lineHeight: "21px", // custom line height
        },
        ".text-12-18-500": {
          fontSize: "12px", // custom text size
          fontWeight: "500", // custom font weight
          lineHeight: "18px", // custom line height
        },
        ".text-12-18-400": {
          fontSize: "12px", // custom text size
          fontWeight: "400", // custom font weight
          lineHeight: "18px", // custom line height
        },
        ".text-16-24-700": {
          fontSize: "16px", // custom text size
          fontWeight: "700", // custom font weight
          lineHeight: "24px", // custom line height
        },
        ".text-18-27-600": {
          fontSize: "18px", // custom text size
          fontWeight: "600", // custom font weight
          lineHeight: "27px", // custom line height
        },
        ".text-10-15-700": {
          fontSize: "10px", // custom text size
          fontWeight: "700", // custom font weight
          lineHeight: "15px", // custom line height
        },
        ".text-32-48-700": {
          fontSize: "32px", // custom text size
          fontWeight: "700", // custom font weight
          lineHeight: "48px", // custom line height
        },
        ".text-20-30-700": {
          fontSize: "20px", // custom text size
          fontWeight: "700", // custom font weight
          lineHeight: "30px", // custom line height
        },
        ".text-12-18-600": {
          fontSize: "12px", // custom text size
          fontWeight: "600", // custom font weight
          lineHeight: "18px", // custom line height
        },
      });
    },
  ],
} satisfies Config;
