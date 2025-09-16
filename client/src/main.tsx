import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <Helmet>
      <title>Serie A Insider - Your Source for Italian Football News, Teams & Merchandise</title>
      <meta name="description" content="Get the latest Serie A news, team information, match results, and official merchandise from Italy's top football league." />
      <meta name="keywords" content="Serie A, Italian football, soccer, calcio, Inter, Milan, Juventus, Napoli, Roma" />
      <meta property="og:title" content="Serie A Insider" />
      <meta property="og:description" content="Your source for Serie A news, teams & merchandise" />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Serie A Insider" />
      <meta name="twitter:description" content="Your source for Serie A news, teams & merchandise" />
    </Helmet>
    <App />
  </HelmetProvider>
);

// Register service worker for PWA functionality
serviceWorkerRegistration.register({
  onSuccess: () => console.log('Serie A Insider is now available offline!'),
  onUpdate: () => console.log('New version of Serie A Insider is available!')
});
