import { ShoppingList } from "@/components/shopping/shopping-list";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { ThemeToggle } from "@/components/theme/theme-toggle";

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background text-foreground antialiased transition-colors">
        <ThemeToggle />
        <div className="flex flex-col items-center justify-center gap-4 pt-12 w-full">
          <div className="relative">
            <img
              src="/logo.svg"
              alt="Logo"
              className="size-24 object-contain"
            />
          </div>
          <ShoppingList />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
