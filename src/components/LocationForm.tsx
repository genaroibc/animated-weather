import { useWeather } from '@/hooks/useWeather';

const LOCATION_INPUT_NAME = 'user-location';

type Props = {
  isDisabled: boolean;
  defaultValue?: string;
  onLocation: (location: string) => void;
};

export function LocationForm({ isDisabled, defaultValue, onLocation }: Props) {
  const { loading, error } = useWeather({ isImmediate: false })

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const location = formData.get(LOCATION_INPUT_NAME) as string;

    onLocation(location);
  }

  return (
    <form
      className="w-full flex flex-col gap-4 justify-center rounded-md p-4 mx-auto my-0"
      onSubmit={handleSubmit}
    >
      <label className="text-lg" htmlFor={LOCATION_INPUT_NAME}>
        Enter a city name
      </label>
      <input
        required
        className="bg-slate-300"
        type="text"
        name={LOCATION_INPUT_NAME}
        id={LOCATION_INPUT_NAME}
        placeholder="London"
        defaultValue={defaultValue}
      />

      <button
        disabled={loading || isDisabled}
        type="submit"
        className="w-full max-w-none"
      >
        Submit 🚀
      </button>

      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
}
