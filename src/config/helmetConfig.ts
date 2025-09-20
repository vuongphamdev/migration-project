// src/config/helmetConfig.ts
// Helmet configuration for best-practice security headers in Express
import { HelmetOptions } from "helmet";

/**
 * Helmet is used to secure Express apps by setting various HTTP headers.
 * Below are best-practice options with descriptions for each:
 */
const helmetConfig: HelmetOptions = {
  // Disables Content Security Policy (CSP) since this API does not serve HTML pages
  contentSecurityPolicy: false,
  // Prevents loading cross-origin resources unless explicitly allowed
  crossOriginEmbedderPolicy: true,
  // Restricts loading resources (images, scripts, etc.) to same-origin
  crossOriginResourcePolicy: { policy: "same-origin" },
  // Prevents clickjacking by denying the site from being loaded in an iframe
  frameguard: { action: "deny" },
  // Enforces HTTP Strict Transport Security (HSTS) for one year
  hsts: { maxAge: 31536000, includeSubDomains: true },
  // Ensures no referrer information is sent with requests
  referrerPolicy: { policy: "no-referrer" },
  // Enables XSS filter in supported browsers
  xssFilter: true,
  // Prevents browsers from MIME-sniffing a response away from the declared content-type
  noSniff: true,
  // Disables DNS prefetching to reduce privacy leaks
  dnsPrefetchControl: { allow: false },
};

export default helmetConfig;
