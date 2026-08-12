Deployment research (Aug 12, 2026):

Netlify official docs: https://docs.netlify.com/build/functions/environment-variables/
- Netlify environment variables are available to Serverless Functions at runtime when configured with the Functions scope.
- Variables placed in netlify.toml are not available to Serverless Functions; secrets must be set in the Netlify UI, CLI, or API.
- Functions access variables with process.env.VARIABLE_NAME.
- Updated Jun 16, 2026.

Cloudflare official docs: https://developers.cloudflare.com/pages/functions/bindings/
- Pages Functions use bindings, including text secrets/environment variables, accessed from context.env.
- Bindings can be configured in the Cloudflare dashboard or Wrangler configuration and can be set for production and preview environments.
- A redeploy is required for binding changes to take effect.

Implementation implication: Both platforms can securely host the contact handler, but Netlify is the simpler fit for this existing Vite + Node/Nodemailer project because it uses a straightforward netlify/functions endpoint and process.env secrets. Cloudflare would require adapting the handler to the Pages Functions/Workers runtime and context.env, and Nodemailer SMTP compatibility is less direct in the edge runtime. Web3Forms remains a browser-based fallback, but a server-side email API/SMTP handler is preferred for the primary path.
