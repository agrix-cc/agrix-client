/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Poppins', 'sans-serif'],
                serif: ['Roboto', 'serif'],
            },
            colors: {
                'primary-green': "#02542D",
                'mint-green': "#E4F0E6",
                'lime-green': "#34C759",
                'sage-green': "#508D4E",
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: 0, transform: 'translateY(20px)' },
                    '100%': { opacity: 1, transform: 'translateY(0)' },
                },
            },
            animation: {
                fadeIn: 'fadeIn 0.5s ease-in-out',
            },
        },
    },
    plugins: [],
}
