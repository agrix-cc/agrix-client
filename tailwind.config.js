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
                'primary-green' : "#02542D",
                'mint-green' : "#E4F0E6",
                'lime-green' : "#34C759",
                'sage-green' : "#508D4E"
            }
        },
    },
    plugins: [],
}

