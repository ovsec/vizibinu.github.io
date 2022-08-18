const defaultTheme = require('tailwindcss/defaultTheme')


module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			fontFamily: {
				'sans': ['nunito', ...defaultTheme.fontFamily.sans],
				'serif': [...defaultTheme.fontFamily.serif],
				'mono': [...defaultTheme.fontFamily.mono]
			  },
		},
	},
	darkMode: 'class',
	plugins: [
		require('@tailwindcss/line-clamp'),
		require('@tailwindcss/typography'),
	],
	variants: {
		extend: {
		  typography: ['dark']
		}
	  },
};
