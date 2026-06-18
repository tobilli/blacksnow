import './Ticker.css';
import { TICKER_ITEMS } from '../../config/constants';

const Ticker = () => {
  return (
    <div className="ticker-wrap">
      <div className="ticker">
        {TICKER_ITEMS.concat(TICKER_ITEMS).map((item, index) => (
          <span key={`${item}-${index}`} className="ticker-item">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Ticker;
