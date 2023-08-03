import { useRouteMatch } from "react-router-dom";
import CurrenciesCustomTable from "./CurrenciesCustomTable";

export default function Currencies() {
  // The `path` lets us build <Route> paths that are
  // relative to the parent route, while the `url` lets
  // us build relative links.
  let { path, url } = useRouteMatch();
  return (
    <div>
      <CurrenciesCustomTable />
    </div>
  );
}
