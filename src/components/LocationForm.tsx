type Props = {
	handleSubmit: (e: React.FormEvent) => void;
	inputName: string;
};

export function LocationForm({ handleSubmit, inputName }: Props) {
	return (
		<form
			className="flex flex-col sm:flex-row gap-4 justify-center items-center rounded-md p-4 mx-auto my-0"
			onSubmit={handleSubmit}
		>
			<label className="text-lg" htmlFor={inputName}>
				Your location
			</label>
			<input
				required
				type="text"
				name={inputName}
				id={inputName}
				placeholder="London"
			/>

			<button type="submit">Submit</button>
		</form>
	);
}
