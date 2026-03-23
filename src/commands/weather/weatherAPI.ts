import type { WeatherResponse } from "./weatherApiType";

export interface Response {
  status: "ok" | "error";
  data: WeatherResponse | null;
}

export async function fetchWeatherData(): Promise<Response> {
  const url = new URL("https://weather.tsukumijima.net/api/forecast");
  url.searchParams.append("city", "040010");

  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = (await response.json()) as WeatherResponse;
      const res: Response = {
        data: data,
        status: "ok",
      };

      return res;
    } else {
      const res: Response = {
        status: "error",
        data: null,
      };

      return res;
    }
  } catch (error) {
    console.log(error);
    const res: Response = {
      status: "error",
      data: null,
    };

    return res;
  }
}
