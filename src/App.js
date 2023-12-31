import React, {useEffect, useState} from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

import { Navbar, Footer, Sidebar, ThemeSettings } from './components';
import { Ecommerce } from './pages';
import Hair from './pages/Hair';
import './App.css';
import { useStateContext } from './contexts/ContextProvider';
import Statistic from './pages/Statistic';
import New from './pages/new/New';
import { HairstyleInput } from './HairstyleInputSample';
import Login from "./pages/login/login";
import UpdatePassword from "./pages/updatePassword/updatePassword";
import UpdateDisplayName from "./pages/updateDisplayName/UpdateDisplayName";
import ViewAllAdmin from "./pages/viewAllAdmins/ViewAllAdmins";
import UpdateAvatar from "./pages/updateAvatar/UpdateAvatar";
import constant from "./constants/constants";

const App = () => {
  const { setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, themeSettings, setThemeSettings } = useStateContext();

  const [is_login, setIsLogin] = useState(false)
  let isLoggedIn


  useEffect(() => {
    const currentThemeColor = localStorage.getItem('colorMode');
    const currentThemeMode = localStorage.getItem('themeMode');
    setIsLogin(window.localStorage.getItem(constant.IS_LOGGED_IN))

    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);

  const handleLogin = (isLoggedIn) => {
    setIsLogin(isLoggedIn)
  }

  if (!localStorage.getItem(constant.IS_LOGGED_IN)) {
    return (
        <div>
          <BrowserRouter basename='/shair'>
            <Routes>
              <Route path="/" element={(<Login onLogin={ handleLogin }/>)} />
            </Routes>
          </BrowserRouter>
        </div>
    )
  } else {
    return (
        <div className={currentMode === 'Dark' ? 'dark' : ''}>
          <BrowserRouter basename='/shair'>
            <div className="flex relative dark:bg-main-dark-bg">
              <div className="fixed right-4 bottom-4" style={{ zIndex: '1000' }}>
                <TooltipComponent
                    content="Settings"
                    position="Top"
                >
                  <button
                      type="button"
                      onClick={() => setThemeSettings(true)}
                      style={{ background: currentColor, borderRadius: '50%' }}
                      className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
                  >
                    <FiSettings />
                  </button>

                </TooltipComponent>
              </div>
              {activeMenu ? (
                  <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
                    <Sidebar />
                  </div>
              ) : (
                  <div className="w-0 dark:bg-secondary-dark-bg">
                    <Sidebar />
                  </div>
              )}
              <div
                  className={
                    activeMenu
                        ? 'dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  '
                        : 'bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 '
                  }
              >
                <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
                  <Navbar />
                </div>
                <div>
                  {themeSettings && (<ThemeSettings />)}

                  <Routes>
                    {/* dashboard  */}
                    <Route path="/" element={(<Hair />)} />
                    {/* <Route path="/ecommerce" element={(<Ecommerce />)} /> */}
                    {/*<Route path="/Statistic" element={(<Statistic />)} />*/}

                    {/* pages  */}
                    {/* <Route path="/orders" element={<Orders />} /> */}
                    {/* <Route path="/employees" element={<Employees />} /> */}
                    {/* <Route path="/customers" element={<Customers />} /> */}
                    <Route path="/Hair" element={<Hair />} />
                    <Route path="/Hair/new" element={<New inputs={HairstyleInput} title="Add new hairstyle" />} />
                    <Route path="/changepass" element={<UpdatePassword />} />
                    <Route path="/changedisplayname" element={<UpdateDisplayName />} />
                    <Route path="/Admin" element={<ViewAllAdmin />} />
                    <Route path="/changeavatar" element={<UpdateAvatar />} />

                    {/* /!* apps  *!/ */}
                    {/* <Route path="/kanban" element={<Kanban />} /> */}
                    {/* <Route path="/editor" element={<Editor />} /> */}
                    {/* <Route path="/calendar" element={<Calendar />} /> */}
                    {/* <Route path="/color-picker" element={<ColorPicker />} /> */}

                    {/* /!* charts  *!/ */}
                    {/* <Route path="/line" element={<Line />} /> */}
                    {/* <Route path="/area" element={<Area />} /> */}
                    {/* <Route path="/bar" element={<Bar />} /> */}
                    {/* <Route path="/pie" element={<Pie />} /> */}
                    {/* <Route path="/financial" element={<Financial />} /> */}
                    {/* <Route path="/color-mapping" element={<ColorMapping />} /> */}
                    {/* <Route path="/pyramid" element={<Pyramid />} /> */}
                    {/* <Route path="/stacked" element={<Stacked />} /> */}

                  </Routes>
                </div>
                <Footer />
              </div>
            </div>
          </BrowserRouter>
        </div>
    );
  }
};

export default App;
