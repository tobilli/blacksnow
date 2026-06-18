import Background from '../../components/Background/Background';
import NavBar from '../../components/NavBar/NavBar';
import Stage from '../../components/Stage/Stage';
import Ticker from '../../components/Ticker/Ticker';
import './style/LandingPage.scss';

const LandingPage = () => {
  return (
    <main className="landing-page">
      <Background />
      <div className="page-shell">
        <NavBar showBottomBar />
        <Stage />
        <Ticker />
      </div>
    </main>
  );
};

export default LandingPage;
