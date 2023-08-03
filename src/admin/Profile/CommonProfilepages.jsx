import { useParams } from "react-router-dom";
import Billing from "./Billing";
import Profile from "./Profile";
import Subscription from "./Subscription";

function CommonProfilepages() {
  // The `path` lets us build <Route> paths that are
  // relative to the parent route, while the `url` lets
  // us build relative links.
  let { topicId } = useParams();
  return (
    <div>
      {topicId == "details" && <Profile />}
      {topicId == "subscription" && <Subscription />}
      {topicId == "billing" && <Billing />}
    </div>
  );
}

export default CommonProfilepages;
