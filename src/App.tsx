import { Button } from "./components/ui/button";
import { ThemeProvider } from "./styles/themeProvider";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="flex justify-center items-center h-screen bg-zinc-800 gap-5">
        <h1>Pizza Shop</h1>
        <Button variant={"outline"}>Test Button</Button>
      </div>
    </ThemeProvider>
  );
}

export default App;
