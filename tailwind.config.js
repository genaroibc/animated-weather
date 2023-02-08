module.exports = {
	content: ['./src/**/*.{ts,tsx}'],
	theme: {
		extend: {
			keyframes: {
				bounce: {
					to: { transform: 'rotateZ(-100deg)' },
				},
			},
			colors: {
				'primary-color': 'var(--primary-color)',
				'secondary-color': 'var(--secondary-color)',
				'terciary-color': 'var(--terciary-color)',
				'complement-color': 'var(--complement-color)',
			},
		},
	},
	animation: {
		bounce: 'bounce 1s ease-in-out alternate infinite',
	},
	plugins: [],
};
