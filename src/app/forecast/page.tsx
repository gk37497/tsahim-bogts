import { convertXmlToJson } from "../utils/api-helpers";

interface ForecastResposne {
  xml: {
    forecast5day: {
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
  };
}

async function getForecast() {
  const response = await fetch("http://tsag-agaar.gov.mn/forecast_xml");
  const data = await response.text();
  return convertXmlToJson(data);
}

export default async function ForecastPage() {
  const res = (await getForecast()) as ForecastResposne;
  const forecasts = res.xml.forecast5day;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {forecasts.map((forecast, index) => {
        return (
          <div key={index} className="bg-gray-100 rounded-sm p-3 m-1 shadow-md">
            <h1 className="text-lg font-bold">{forecast.city}</h1>
            {forecast.data.map((data, index) => {
              return (
                <div key={index}>
                  {data.weather.map((weather, i) => {
                    return (
                      <div key={i} className="my-1 rounded-sm p-2 border-b">
                        <div>{weather.date}</div>
                        <div>{weather.temperatureNight}</div>
                        <div>{weather.temperatureDay}</div>
                        <div>{weather.phenoNight}</div>
                        <div>{weather.phenoDay}</div>
                        <div>{weather.windNight}</div>
                        <div>{weather.windDay}</div>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
