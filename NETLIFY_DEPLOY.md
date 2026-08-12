# Deploying the Lucian Portfolio to Netlify

## Recommendation

Netlify is the simpler and safer fit for this portfolio. The project already uses a Vite build and a conventional Node/Nodemailer contact endpoint. The Netlify adapter keeps the existing browser request at `/api/contact`, redirects it to a serverless function, and reads the Gmail credentials only on the server.

| Approach | Tradeoffs | Cost | Setup complexity |
| --- | --- | --- | --- |
| **Netlify + Function** | Best match for this project; easy Git deployment, previews, redirects, and environment variables. | Free tier is sufficient for a small portfolio; limits depend on current Netlify plan. | **Lowest** |
| **Cloudflare Pages/Workers** | Excellent performance and DNS/CDN, but the email handler must be adapted to the Workers runtime and `context.env`; the existing Nodemailer SMTP path is less direct. | Free tier is available, with platform-specific limits. | Medium |
| Static hosting + Web3Forms only | Fastest setup and no server code, but the primary Gmail delivery depends entirely on the third-party form provider. | Usually free within provider limits. | Lowest, but least control |

The recommended path is **Netlify + the included serverless function**, with Web3Forms retained as a client-side fallback. This means a visitor's inquiry first goes through the private Gmail-backed function. If the function is temporarily unavailable, the existing Web3Forms fallback still attempts delivery.

## Before deployment

Create or connect a Git repository containing this project. Do not commit a real `.env` file, Gmail password, or app password. The repository should contain only `.env.example`.

The Gmail account must use a Google **App Password**, not the normal Gmail login password. If the app password that was previously placed in local source code is still active, revoke it in the Google Account security settings and create a fresh one. The fresh value should be entered only in Netlify's environment-variable settings. Do not write the real address or app password into source files.

## Netlify setup

1. Sign in to Netlify and choose **Add new site → Import an existing project**.
2. Connect the Git provider and select the portfolio repository.
3. Netlify will read `netlify.toml`. The build command is `pnpm run build:netlify`, the publish directory is `dist/public`, and the function directory is `netlify/functions`.
4. Open the site's **Project configuration → Environment variables** section and add these values for the production environment:

   | Variable | Value |
   | --- | --- |
   | `EMAIL_USER` | Your Gmail address used for sending |
   | `EMAIL_PASSWORD` | The new Gmail App Password, entered without spaces if Google displays it that way |
   | `EMAIL_TO` | The inbox where you want to receive inquiries |

5. Make sure the variables are available to **Functions**, not only to the build process. Netlify applies changed environment variables on the next deploy, so trigger a new deploy after saving them.
6. Open the deployed site and submit a real test inquiry using an email address you can access. The message should arrive at the inbox configured in `EMAIL_TO`; replying to it will go to the visitor because the function sets the visitor's address as `Reply-To`.

## How the email flow works

The React form continues to post to `/api/contact`. The Netlify redirect in `netlify.toml` forwards that request to `/.netlify/functions/contact`. The function validates the required fields, sends the formatted inquiry through Gmail SMTP, and returns a success response. The Gmail credentials never enter the browser bundle. If the serverless function returns an error, the existing Web3Forms fallback in `client/src/lib/email.ts` makes a second delivery attempt.

## Local testing

For a local Node server, copy `.env.example` to `.env`, insert the fresh app password, and run the existing development commands. For a production-like Netlify preview, install the Netlify CLI and run `netlify dev`; this uses the same redirects and function folder as the deployed site. Never paste the real app password into source files or screenshots.

## Important verification checklist

After the first deploy, test the form with a real submission and confirm all of the following: the browser shows the success toast; the email reaches the inbox configured in `EMAIL_TO`; the visitor's email appears as the reply address; empty required fields are rejected; and no email credential is visible in the browser's page source or Network response.

## Official references

- [Netlify environment variables for serverless functions](https://docs.netlify.com/build/functions/environment-variables/)
- [Cloudflare Pages Function bindings](https://developers.cloudflare.com/pages/functions/bindings/)
