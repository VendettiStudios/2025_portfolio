import ClientApp from "../components/ClientApp/clientApp";
import { projects } from "../components/Projects/utils/data";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={null}>
    <div className="scroll-lock">
      <ClientApp projects={projects} />
    </div>
    </Suspense>
  );
}