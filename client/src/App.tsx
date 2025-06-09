import { ShoppingList } from "@/components/shopping/shopping-list";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { ThemeToggle } from "@/components/theme/theme-toggle";

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background text-foreground antialiased transition-colors">
        <ThemeToggle />
        <ShoppingList />
      </div>
    </ThemeProvider>
  );
}

export default App;
