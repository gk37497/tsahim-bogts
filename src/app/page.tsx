import HomeScreen from "./views/home";
import MainLayout from "./views/main-layout";

export default function Home() {
  return (
    <MainLayout>
      <HomeScreen />
    </MainLayout>
  );
}
