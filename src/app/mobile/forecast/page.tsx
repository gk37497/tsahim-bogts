import { convertXmlToJson } from "@/app/utils/api-helpers";
import MobileForecastView from "@/app/views/mobile/forecast-view";

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

  return <MobileForecastView forecasts={forecasts} />;
}
