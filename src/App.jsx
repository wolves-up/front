import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Main from "./components/Main/Main";
import SignupForm from "./components/SignupForm/SignupForm";
import LoginForm from "./components/LoginForm/LoginForm";
import NotFoundPage from "./pages/NotFoundPage";
import RequireAuth from "./pages/RequireAuth";
import RequireUnauth from "./pages/RequireUnauth";
import Dashboard from "./components/Dashboard/Dashboard";
import RecipeInfo from "./components/RecipeInfo/RecipeInfo";
import AddRecipe from "./components/AddRecipe/AddRecipe";
import Recipes from "./components/Recipes/Recipes";
import Settings from "./components/Settings/Settings";
import ReportForm from "./components/ReportForm/ReportForm";

function App() {
  return (
      <Router>
        <Routes>
          {/* <Route path='/' element={<RequireUnauth loginButtonRequired><Main /></RequireUnauth>} />
          <Route path='/signup' element={<RequireUnauth><SignupForm /></RequireUnauth>} />
          <Route path='/login' element={<RequireUnauth><LoginForm /></RequireUnauth>} />
          <Route path='/dashboard' element={<RequireAuth><Dashboard /></RequireAuth>} />
          <Route path='/recipes' element={<RequireAuth><Recipes /></RequireAuth>} />
          <Route path='/add_recipe' element={<RequireAuth><AddRecipe /></RequireAuth>} />
          <Route path='/recipe/:id' element={<RequireAuth><RecipeInfo /></RequireAuth>} />
          <Route path='/settings' element={<RequireAuth><Settings /></RequireAuth>} /> */}
          <Route
            path="/"
            element={
              <RequireUnauth loginButtonRequired>
                {/* <Dashboard /> */}
              </RequireUnauth>
            }
          />
          <Route
            path="/report"
            element={
              <RequireUnauth>
                <ReportForm />
              </RequireUnauth>
            }
          />
          <Route path="/not_found" element={<NotFoundPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
  );
}

export default App;
