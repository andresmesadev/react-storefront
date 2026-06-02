import { Link } from "react-router-dom";
import "../../styles/ux.css";

const ErrorState = ({ title, description, actionLabel = "Volver al inicio", actionTo = "/home" }) => {
  return (
    <section className="statePanel statePanelError" role="alert" aria-labelledby="error-state-title">
      <h2 id="error-state-title">{title}</h2>
      <p>{description}</p>
      <Link className="stateAction stateActionSecondary" to={actionTo}>{actionLabel}</Link>
    </section>
  );
};

export default ErrorState;
