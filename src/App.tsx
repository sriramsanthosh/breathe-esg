import React from 'react';
import { ConfigProvider, message } from 'antd';
import WelcomePage from './pages/Welcome';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import EsgMetricsPage from './pages/EsgMetrics';

const App: React.FC = () => {
  const [api, contextHolder] = message.useMessage();
  return (
    <ConfigProvider theme={{ token: { colorPrimary: '#2E9844' } }}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<WelcomePage />} />
          <Route path='/dashboard' element={<EsgMetricsPage />} />
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  )
}

export default App;