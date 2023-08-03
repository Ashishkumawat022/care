import { Fragment } from "react";
import { useRouteMatch } from "react-router-dom";
import UserRoleManagement from "./UserRoleManagement";

export default function AccessRoles() {
  // The `path` lets us build <Route> paths that are
  // relative to the parent route, while the `url` lets
  // us build relative links.
  let { path, url } = useRouteMatch();
  return (
    <Fragment>
      <UserRoleManagement />
    </Fragment>
  );
}
