import './Stage.scss';
import { EDITION_MARK, SERIES_TEXT } from '../../config/constants';

const Stage = () => {
  return (
    <div className="stage">
      <div className="pre-rule" />
      <div className="brand-wrap">
        <div className="brand">
          <span className="brand-inner">Blacksnow</span>
        </div>
        <div className="edition-mark">{EDITION_MARK}</div>
      </div>
      <div className="series-line">
        <div className="series-rule" />
        <div className="series-text">{SERIES_TEXT}</div>
        <div className="series-rule" />
      </div>
    </div>
  );
};

export default Stage;
