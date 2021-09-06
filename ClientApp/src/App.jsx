import ThemeConfig from "./styles";
import AdminRouter from "./utils/admin_routes";

function App() {
  return (
    <ThemeConfig>
      <AdminRouter />
    </ThemeConfig>
  );
}

export default App;
