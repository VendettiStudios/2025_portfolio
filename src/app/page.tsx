// app/page.tsx
import ClientApp from "../components/ClientApp/clientApp";
import { projects } from "../components/Projects/utils/data";

export default function Page() {
  return <ClientApp projects={projects} />;
}