import { agents } from "../data/agents";
import { AgentCard } from "../Components/Agents/AgentCard";
import { useState } from "react";
import { AgentBioPage } from "../Components/Agents/AgentBioPage";
import { NotFound } from "./NotFound";
import { useEffect } from "react";
import { navigateToAgent, navigateToListing } from "../utils/navigation";

export function AgentsPage() {
  const [currentAgentId, setCurrentAgentId] = useState<null | string>(null);
  const currentAgent =
    agents.find((agent) => agent.id === currentAgentId) || null;

  // Sync agent with hash: #/agents/:id
  useEffect(() => {
    const applyFromHash = () => {
      const raw = window.location.hash.replace(/^#\/?/, "");
      const [page, id] = raw.split("/");
      if (page === "agents") {
        setCurrentAgentId(id || null);
      }
    };
    applyFromHash();
    window.addEventListener("hashchange", applyFromHash);
    return () => window.removeEventListener("hashchange", applyFromHash);
  }, []);

  const openAgent = (id: string) => {
    navigateToAgent(id);
    setCurrentAgentId(id);
  };
  const backToAgents = () => {
    window.history.pushState({}, "", `#/agents`);
    setCurrentAgentId(null);
  };
  return (
    <div className="agents-page">
      <h1>Our Agents</h1>
      {currentAgent == null && (
        <div className="agents-list">
          {agents.map((agent) => (
            <AgentCard
              key={agent.id}
              {...agent}
              showProfile={() => openAgent(agent.id)}
            />
          ))}
        </div>
      )}
      {currentAgent !== null && (
        <AgentBioPage
          agent={currentAgent}
          onBack={backToAgents}
          openListing={navigateToListing}
        />
      )}
      {currentAgentId !== null && currentAgent === null && (
        <NotFound
          title="Agent Not Found"
          message="We couldn't find that agent. They may no longer be available."
          homeLabel="Back to Home"
        />
      )}
    </div>
  );
}
