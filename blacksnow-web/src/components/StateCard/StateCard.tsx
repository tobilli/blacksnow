import './StateCard.scss';

interface StateCardProps {
  icon?: string;
  title: string;
  subtitle?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

const StateCard = ({ icon, title, subtitle, action }: StateCardProps) => {
  return (
    <div className="state-card">
      {icon && <span className="state-card__icon">{icon}</span>}
      <p className="state-card__title">{title}</p>
      {subtitle && <p className="state-card__subtitle">{subtitle}</p>}
      {action && (
        <button className="state-card__btn" onClick={action.onClick}>
          {action.label}
        </button>
      )}
    </div>
  );
};

export default StateCard;
