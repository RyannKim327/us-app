import { defaultDataInterface } from "./interfaces";

export function jsonParser(data: string | defaultDataInterface) {
  try {
    if (typeof data === "string") {
      return JSON.parse(data)
    } else {
      JSON.stringify(data, null, 2)
    }
  } catch (e: unknown) {
    return {
      "error": "The data can't be parse",
      "reason": e.message
    }
  }
}
