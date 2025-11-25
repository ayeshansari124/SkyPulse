"use client";

import { useState } from "react";
import WeatherCard from "../components/WeatherCard";

export type WeatherData = {
  name: string;
  main: { temp: number; feels_like: number; humidity: number };
  weather: { description: string; icon: string }[];
};

export default function Home() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const apiKey = "0e628bd641b408f9bb831d9897518f0e";

  async function getWeather() {
    if (!city.trim()) return setError("Please enter your city name"), setWeather(null);
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      if (!res.ok) throw new Error("City not found");
      setWeather(await res.json());
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
      setWeather(null);
    }
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6">
      <div className="bg-black/30 backdrop-blur-md border border-white/20 w-full max-w-md rounded-2xl shadow-2xl p-6 sm:p-8 text-center">
        <h1 className="text-3xl font-bold text-white mb-6">☀️ Weather App</h1>

        <div className="flex flex-col sm:flex-row gap-3 mb-5">
          <input
            type="text"
            placeholder="Enter city name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 text-white"
          />
          <button
            onClick={getWeather}
            className="px-5 py-2 rounded-lg bg-green-900 text-white font-medium hover:bg-green-800 cursor-pointer active:scale-95 transition"
          >
            Get Weather
          </button>
        </div>

        {error && <p className="text-red-600 bg-red-100 p-2 rounded-md mb-2 text-sm">{error}</p>}
        {weather && <WeatherCard data={weather} />}
      </div>

      <footer className="mt-6 text-white text-sm opacity-80">
        Built with 💙 by <span className="font-semibold">Ayesha</span>
      </footer>
    </main>
  );
}
