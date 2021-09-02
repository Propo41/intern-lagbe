// routes
import Router from './routes';
// theme
import ThemeConfig from './styles/admin';
// components
import ScrollToTop from './components/admin/ScrollToTop';

// ----------------------------------------------------------------------

export default function App() {
  return (
    <ThemeConfig>
      <ScrollToTop />
      <Router />
    </ThemeConfig>
  );
}
