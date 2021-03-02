export let baseUrl: string;

if (process.env.NODE_ENV === "development") {
  baseUrl = "http://localhost:5000/";
} else if (process.env.NODE_ENV === "production") {
  baseUrl = "";
}
