import { Route, Routes } from 'react-router-dom';
import MainPage from './components/MainPage';
import UserPage from './components/member/UserPage';
import HostPage from './components/member/HostPage';
import InquiryPage from './components/inquiry/InquiryPage';
import DeclarationPage from './components/declaration/DeclarationPage';
import InquiryView from './components/inquiry/InquiryView';
import DeclarationView from './components/declaration/DeclarationView';
import Review from './components/Review';

function App() {
  return (
    <Routes>
      <Route index element={<MainPage />} />
      <Route path='/userpage' element={<UserPage />} />
      <Route path='/hostpage' element={<HostPage />} />
      <Route path='/inquiry' element={<InquiryPage />} />
      <Route path='/inquiryview' element={<InquiryView />} />
      <Route path='/declaration' element={<DeclarationPage />} />
      <Route path='/declarationview/:dseq' element={<DeclarationView />} />
      <Route path='/review' element={<Review />} />
    </Routes>
  );
}

export default App;
