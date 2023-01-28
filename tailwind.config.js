module.exports = {
	content: ['./src/**/*.{ts,tsx}'],
	theme: {
		extend: {
			keyframes: {
				bounce: {
					to: { transform: 'rotateZ(-100deg)' },
				},
			},
		},
	},
	animation: {
		bounce: 'bounce 1s ease-in-out alternate infinite',
	},
	plugins: [],
};
