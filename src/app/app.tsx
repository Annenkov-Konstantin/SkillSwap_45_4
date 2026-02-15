import './styles/_variables.scss';
import './styles/reset.module.scss';
import './styles/global.scss';


import { Route, Routes, useLocation } from 'react-router-dom';

import { Home } from '@/pages/home';
// import { Button } from '@/shared/ui/button';

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

      {/* <Button status='_primary' textInside='Primary'></Button>
      <Button status='_primary_disabled' textInside='Primary Disabled'></Button>

      <Button status='_secondary' textInside='Secondary'></Button>
      <Button status='_secondary_disabled' textInside='Secondary Disabled'></Button> */}
    </>
  );
};

export default App;
