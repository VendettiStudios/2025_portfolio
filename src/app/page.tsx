import ClientApp from "../components/ClientApp/clientApp";
import { projects } from "../components/Projects/utils/data";

export default function Page() {
  return (
    <div className="scroll-lock">
      <ClientApp projects={projects} />
    </div>
  );
}