import { Outlet } from "react-router";

export function MainLayout() {
  return (
    <div>
      <Outlet />
    </div>
  );
}

export default function App() {
  return <h1>Coucou</h1>;
}
