"use client";

import { useState } from "react";
import { CloudRain, Droplets, Search, Thermometer, Wind } from "lucide-react";
import Image from "next/image";

type WeatherData = {
  name: string;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  weather: {
    description: string;
    icon: string;
  }[];
  wind: {
    speed: number;
  };
};

export default function Home() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

  async function getWeather() {
    if (!city.trim()) {
      setError("Please enter a city name");
      setWeather(null);
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`,
      );

      if (!res.ok) {
        throw new Error("City not found");
      }

      const data = await res.json();

      setWeather(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setWeather(null);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main
      className="
      min-h-screen
      flex
      items-center
      justify-center
      px-4
      bg-[radial-gradient(circle_at_top,_#1e293b,_#020617,_black)]
    "
    >
      <div
        className="
        w-full
        max-w-md
        rounded-[32px]
        border
        border-white/10
        bg-white/[0.05]
        backdrop-blur-2xl
        shadow-[0_0_80px_rgba(0,0,0,0.8)]
        p-6
        text-white
      "
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div
            className="
            mx-auto
            mb-4
            flex
            h-16
            w-16
            items-center
            justify-center
            rounded-2xl
            bg-blue-500/10
            border
            border-blue-400/20
          "
          >
            <CloudRain className="text-blue-400" size={32} />
          </div>

          <h1 className="text-4xl font-bold tracking-tight">Weather</h1>

          <p className="mt-2 text-gray-400">Real-time weather information</p>
        </div>

        {/* Search */}
        <div className="flex gap-3 mb-5">
          <input
            type="text"
            placeholder="Search city..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                getWeather();
              }
            }}
            className="
              flex-1
              h-14
              rounded-2xl
              border
              border-white/10
              bg-black/30
              px-5
              text-white
              outline-none
              placeholder:text-gray-500
              focus:border-blue-500/40
            "
          />

          <button
            onClick={getWeather}
            disabled={loading}
            className="
              h-14
              w-14
              rounded-2xl
              bg-blue-600
              hover:bg-blue-500
              disabled:opacity-50
              transition-all
              duration-200
              flex
              items-center
              justify-center
              active:scale-95
            "
          >
            <Search size={22} />
          </button>
        </div>

        {/* Error */}
        {error && (
          <div
            className="
            mb-4
            rounded-2xl
            border
            border-red-500/20
            bg-red-500/10
            px-4
            py-3
            text-sm
            text-red-300
          "
          >
            {error}
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="text-center py-10 text-gray-400">
            Loading weather...
          </div>
        )}

        {/* Weather Card */}
        {weather && !loading && (
          <div
            className="
            rounded-3xl
            border
            border-white/10
            bg-black/20
            p-6
            mt-6
          "
          >
            {/* Top */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold">{weather.name}</h2>

                <p className="capitalize text-gray-400 mt-1">
                  {weather.weather[0].description}
                </p>
              </div>

              <Image
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt={weather.weather[0].description}
                width={90}
                height={90}
              />
            </div>

            {/* Temperature */}
            <div className="mt-2">
              <h3 className="text-6xl font-light">
                {Math.round(weather.main.temp)}°
              </h3>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 mt-6">
              <div
                className="
                rounded-2xl
                bg-white/[0.04]
                border border-white/5
                p-4
              "
              >
                <Thermometer size={20} className="text-orange-400 mb-2" />

                <p className="text-sm text-gray-400">Feels Like</p>

                <p className="text-lg font-semibold mt-1">
                  {Math.round(weather.main.feels_like)}°
                </p>
              </div>

              <div
                className="
                rounded-2xl
                bg-white/[0.04]
                border border-white/5
                p-4
              "
              >
                <Droplets size={20} className="text-blue-400 mb-2" />

                <p className="text-sm text-gray-400">Humidity</p>

                <p className="text-lg font-semibold mt-1">
                  {weather.main.humidity}%
                </p>
              </div>

              <div
                className="
                rounded-2xl
                bg-white/[0.04]
                border border-white/5
                p-4
              "
              >
                <Wind size={20} className="text-cyan-400 mb-2" />

                <p className="text-sm text-gray-400">Wind</p>

                <p className="text-lg font-semibold mt-1">
                  {weather.wind.speed} km/h
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
