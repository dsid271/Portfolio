import React from 'react';
import { DesktopExperience } from './components/desktop/DesktopExperience';
import { MobileExperience } from './components/mobile/MobileExperience';
import { useIsMobile } from './hooks/useIsMobile';

function App() {
    const isMobile = useIsMobile();
    return isMobile ? <MobileExperience /> : <DesktopExperience />;
}

export default App;
