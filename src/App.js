import { lazy, Suspense } from "react";
import "./App.css";
import "./styles/resuableStyles/fonts.css";
import "./styles/resuableStyles/colors.css";
import "./styles/resuableStyles/flex.css";
import "./styles/resuableStyles/lineHeight.css";

function App() {
  const Header = lazy(() => import("./components/Header/Header.jsx"));
  const HeroSection = lazy(() =>
    import("./components/HeroSection/HeroSection")
  );

  return (
    <Suspense fallback={<h1>Loading......</h1>}>
      <main className="background-colour font-roboto">
        <Header />
        <HeroSection />
      </main>
    </Suspense>
  );
}

export default App;
