import { serve } from "@hono/node-server"; //import method unutuk serve http server

import app from "./app";

serve(
  {
    fetch: app.fetch,//entry point untuk http request
    port: 3000, //binding ke port mana
  },
  (info) => { //callback --> berhasil serving maka fungsi berjalan
    console.log(`Server is running on http://localhost:${info.port}`);
  }
);
