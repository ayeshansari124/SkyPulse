import Image from "next/image";
import { WeatherData } from "../app/page";

export default function WeatherCard({ data }: { data: WeatherData }) {
  const { name, main, weather } = data;
  const { temp, feels_like, humidity } = main;
  const { description, icon } = weather[0];

  return (
    <div className="bg-black/50 p-5 rounded-xl shadow-lg text-center mt-4">
      <h2 className="text-xl font-semibold text-white">{name}</h2>
      <div className="flex flex-col items-center mt-2">
        <Image
          src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
          alt={description}
          width={80}
          height={80}
        />
        <p className="text-lg text-white capitalize">{description}</p>
      </div>
      <div className="mt-3 text-white space-y-1">
        <p>🌡 Temp: {temp}°C</p>
        <p>🤔 Feels like: {feels_like}°C</p>
        <p>💧 Humidity: {humidity}%</p>
      </div>
    </div>
  );
}
