"use client";
import { useState } from "react";
import CityNames from "../components/city-names";
import PageHeader from "../components/PageHeader";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";

interface Forecasts {
  forecasts: {
    city: string[];
    data: {
      weather: {
        date: string[];
        temperatureNight: string[];
        temperatureDay: string[];
        phenoIdNight: string[];
        phenoNight: string[];
        phenoIdDay: string[];
        phenoDay: string[];
        windNight: string[];
        windDay: string[];
      }[];
    }[];
  }[];
}

export default function ForecastView({ forecasts }: Forecasts) {
  const [selectedCity, setSelectedCity] = useState("Алтай");

  const cityNames = forecasts
    ?.map((forecast) => {
      return { name: forecast?.city[0] };
    })
    .sort((a, b) => a.name.localeCompare(b.name));

  const handleOnChange = (value: string) => {
    setSelectedCity(value);
  };

  return (
    <div className="md:px-8 flex flex-col space-y-5 px-3">
      <PageHeader heading={selectedCity} />

      <div className="block md:hidden w-full">
        <CityNames cityNames={cityNames} onChange={handleOnChange} />
      </div>

      {forecasts?.map((forecast, i) => {
        if (forecast.city[0] !== selectedCity) return null;
        return (
          <div key={i}>
            {forecast?.data.map((data, i) => (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 rounded-xl">
                {data?.weather?.map((weather, i) => {
                  return (
                    <div key={i} className="my-1 rounded-sm p-3 bg-white text-center flex flex-col space-y-5 shadow-md">
                      <div>{weather.date}</div>
                      <div>{weather.phenoDay}</div>
                      <div className="flex flex-row text-center justify-around items-center">
                        <div className="text-2xl font-semibold text-amber-500 flex flex-col space-y-1 items-center">
                          <h6>{weather.temperatureNight}</h6>
                          <SunIcon className="w-6 h-6" />
                        </div>
                        <div className="text-2xl font-semibold text-gray-700 flex flex-col space-y-1 items-center">
                          <h6>{weather.temperatureDay}</h6>
                          <MoonIcon className="w-6 h-6" />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        );
      })}

      <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4">
        {cityNames?.map((city, i) => (
          <div
            key={i}
            className={`rounded-sm p-3 m-1 shadow-sm cursor-pointer border
            ${
              selectedCity === city.name
                ? "bg-blue-500 text-white"
                : "bg-gray-50"
            }
            `}
            onClick={() => handleOnChange(city.name)}
          >
            <span className="text-base">{city.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
