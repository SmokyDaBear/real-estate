import type { TAgent } from "../../types";
import "./agent.css";
type TAgentCardProps = TAgent & {
  showProfile?: () => void;
};

export function AgentCard({
  profileImage,
  name,
  bio,
  email,
  phone,
  showProfile,
}: TAgentCardProps) {
  return (
    <div className="agent-card" onClick={showProfile}>
      <div className="agent-photo">
        <img src={profileImage} alt={`${name}'s profile`} />
      </div>
      <div className="agent-card-info">
        <h3>{name}</h3>
        <p>{bio}</p>
        <p>Email: {email}</p>
        <p>Phone: {phone}</p>
      </div>
    </div>
  );
}
