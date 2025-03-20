import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/protected-route";
import ListGames from "./list-games";

export default function Home() {
  return (
    <div className="flex items-center justify-center p-8 pb-20 sm:p-20 bg-gray-100 font-[family-name:var(--font-geist-sans)]">
      <ProtectedRoute>
        <NavBar />
        <ListGames />
        <Footer />
      </ProtectedRoute>
    </div>
  );
}
