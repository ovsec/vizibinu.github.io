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
		
		require('@tailwindcss/typography'),
		require("@catppuccin/tailwindcss")({
			
				// prefix to use, e.g. `text-pink` becomes `text-ctp-pink`.
				// default is `false`, which means no prefix
				prefix: "ctp",
				// which flavour of colours to use by default, in the `:root`
				defaultFlavour: "mocha",
			  
		}),
		require('@tailwindcss/container-queries'),
	],
	variants: {
		extend: {
		  typography: ['dark']
		}
	  },
};
