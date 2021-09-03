import "./styles/App.css";
import AdminTheme from "./styles/admin";
import ThemeConfig from "./styles/general";
import AdminRouter from "./utils/admin_routes";
import PublicRouter from "./utils/public_routes";
import PrivateRouter from "./utils/private_routes";

// @todo
const getPayload = (token) => {
  return "user";
};

function App() {
  console.log(window.location);
  console.log(localStorage);

  if (localStorage.getItem("token") !== null) {
    if (getPayload("token") === "admin") {
      return (
        <AdminTheme>
          <AdminRouter />
        </AdminTheme>
      );
    } else {
      return (
        <ThemeConfig>
          <PrivateRouter />
        </ThemeConfig>
      );
    }
  } else {
    return (
      <ThemeConfig>
        <PublicRouter />
      </ThemeConfig>
    );
  }
}

export default App;
