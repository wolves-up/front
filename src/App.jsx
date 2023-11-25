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
import ReportsMap from "./components/ReportsMap/ReportsMap";
import ReportForm from "./components/ReportForm/ReportForm";
import { YMaps, Map, useYMaps } from '@pbe/react-yandex-maps';
import Reports from "./components/Reports/Reports";
import News from "./components/News/News";
import NewsArticleFull from "./components/NewsArticleFull/NewsArticleFull"
import NewsArticleForm from "./components/NewsArticleForm/NewsArticleForm";

function App() {  
  return (
    <YMaps>
      <Router>
        <Routes>
          {/* <Route path='/' element={<RequireUnauth loginButtonRequired><Main /></RequireUnauth>} />
          <Route path='/signup' element={<RequireUnauth><SignupForm /></RequireUnauth>} />
          <Route path='/login' element={<RequireUnauth><LoginForm /></RequireUnauth>} />
          <Route path='/dashboard' element={<RequireAuth><Dashboard /></RequireAuth>} />
          <Route path='/recipes' element={<RequireAuth><Recipes /></RequireAuth>} />
          <Route path='/add_recipe' element={<RequireAuth><AddRecipe /></RequireAuth>} />
          <Route path='/recipe/:id' element={<RequireAuth><RecipeInfo /></RequireAuth>} />
          <Route path='/settings' element={<RequireAuth><Settings /></RequireAuth>} /> 
          <Route path='/' element={<RequireUnauth loginButtonRequired><Main /></RequireUnauth>} />*/}

          <Route
            path="/signup"
            element={
              <RequireUnauth>
                <SignupForm />
              </RequireUnauth>
            }
          />
          <Route
            path="/login"
            element={
              <RequireUnauth>
                <LoginForm />
              </RequireUnauth>
            }
          />
          <Route
            path="/"
            element={
              <RequireAuth loginButtonRequired>
                {/* <Dashboard /> */}
              </RequireAuth>
            }
          />
          <Route
            path="/report"
            element={
              <RequireAuth>
                <ReportForm />
              </RequireAuth>
            }
          />
          <Route path="/map" element={
            <RequireAuth>
              <ReportsMap/>
            </RequireAuth>} />
          <Route
            path="/reports"
            element={
              <RequireAuth>
                <Reports />
              </RequireAuth>
            }
          />
          <Route
            path="/news"
            element={
              <RequireAuth>
                <News />
              </RequireAuth>
            }
          />
          <Route
            path="/news/:id"
            element={
              <RequireAuth>
                <NewsArticleFull />
              </RequireAuth>
            }
          />
          <Route
            path="/post"
            element={
              <RequireAuth>
                <NewsArticleForm />
              </RequireAuth>
            }
          />
          <Route path="/not_found" element={<NotFoundPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </YMaps>
  );
}

export default App;
