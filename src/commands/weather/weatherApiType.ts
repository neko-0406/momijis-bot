// レスポンスの型定義
export interface WeatherResponse {
  publicTime: string;
  publicTimeFormatted: string;
  publishingOffice: string;
  title: string;
  link: string;
  description: Description;
  forecasts: Forecast[];
  location: Location;
  copyright: Copyright;
}

export interface Description {
  publicTime: string;
  publicTimeFormatted: string;
  headlineText: string;
  bodyText: string;
  text: string;
}

export interface Forecast {
  date: string;
  dateLabel: string;
  telop: string;
  detail: ForecastDetail;
  temperature: Temperature;
  chanceOfRain: ChanceOfRain;
  image: ForecastImage;
}

export interface ForecastDetail {
  weather: string | null;
  wind: string | null;
  wave: string | null;
}

export interface Temperature {
  min: TemperatureValue;
  max: TemperatureValue;
}

export interface TemperatureValue {
  celsius: string | null;
  fahrenheit: string | null;
}

export interface ChanceOfRain {
  T00_06: string;
  T06_12: string;
  T12_18: string;
  T18_24: string;
}

export interface ForecastImage {
  title: string;
  url: string;
  width: number;
  height: number;
}

export interface Location {
  area: string;
  prefecture: string;
  district: string;
  city: string;
}

export interface Copyright {
  title: string;
  link: string;
  image: CopyrightImage;
  provider: Provider[];
}

export interface CopyrightImage {
  title: string;
  link: string;
  url: string;
  width: number;
  height: number;
}

export interface Provider {
  link: string;
  name: string;
  note: string;
}