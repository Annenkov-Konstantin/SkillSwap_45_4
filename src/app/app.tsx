import { Home } from '@/pages/home';
import './styles/_variables.scss';
import './styles/global.scss';
import styles from './app.module.scss';

import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { ExampleComponent } from '@/widgets/ExampleComponent';

const App = () => {
  const location = useLocation();

  return (
    <>
      <Routes location={location}>
        <Route path='/' element={<Home />} />
      </Routes>

      {/* {backgroundLocation && (
        <Routes>
          <Route
            path="/img/:id"
            element={
              <Modal>
                <ImageView />
              </Modal>
            }
          />
        </Routes>
      )} */}
    </>
  );
};

export default App;
