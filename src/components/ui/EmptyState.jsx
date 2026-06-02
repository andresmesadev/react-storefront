import { Link } from "react-router-dom";
import "../../styles/ux.css";

const EmptyState = ({ title, description, actionLabel, actionTo = "/home" }) => {
  return (
    <section className="statePanel" aria-labelledby="empty-state-title">
      <h2 id="empty-state-title">{title}</h2>
      <p>{description}</p>
      {actionLabel ? <Link className="stateAction" to={actionTo}>{actionLabel}</Link> : null}
    </section>
  );
};

export default EmptyState;
