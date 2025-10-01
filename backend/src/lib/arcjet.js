import arcjet, { shield, detectBot, slidingWindow } from "@arcjet/node";
import { ENV } from "../email/env.js";

const aj = arcjet({
  key: ENV.ARCJET_KEY,

  rules: [
    shield({ mode: "LIVE" }),

    detectBot({
      mode: "LIVE", // Blocks requests. Use "DRY_RUN" to log only

      allow: [
        "CATEGORY:SEARCH_ENGINE", // Google, Bing, etc
      ],
    }),

    slidingWindow({
      mode: "LIVE",
      max: 100,
      interval: 60,
    }),
  ],
});

export default aj;
