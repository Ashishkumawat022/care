import { useParams } from "react-router-dom";
import AccessRoles from "./accessroles";
import Company from "./company";
import Currencies from "./currencies";
import Taxes from "./taxes";
import Templates from "./templates";

function CommonSettingsPage() {
  // The `path` lets us build <Route> paths that are
  // relative to the parent route, while the `url` lets
  // us build relative links.
  let roleAccess = JSON.parse(localStorage.getItem("__csadmin__d"));

  let { topicId } = useParams();
  return (
    <div>
      {topicId == "company" && <Company />}
      {topicId == "access-roles" &&
        roleAccess?.userType !== "customer_support" && <AccessRoles />}
      {topicId == "taxes" && <Taxes />}
      {topicId == "currencies" && <Currencies />}
      {topicId == "templates" && <Templates />}
    </div>
  );
}

export default CommonSettingsPage;
