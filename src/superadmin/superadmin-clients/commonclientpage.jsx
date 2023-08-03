import { useParams } from "react-router-dom";
import Emails from "./emails";
import Event from "./event";
import FriendsFamily from "./friendsfamily";
import Notes from "./notes";
import OverviewPage from "./overviewPage";

export default function CommonClientPage(props) {
  const {careSiteId} = props;
  // The `path` lets us build <Route> paths that are
  // relative to the parent route, while the `url` lets
  // us build relative links.
  let { topicId } = useParams();

  return (
    <div>
      {/* {topicId == '' && <OverviewPage />} */}
      {topicId == "events" && <Event careSiteId={careSiteId}/>}
      {topicId == "emails" && <Emails careSiteId={careSiteId}/>}
      {topicId == "overview" && <OverviewPage careSiteId={careSiteId}/>}
      {topicId == "ff" && <FriendsFamily careSiteId={careSiteId}/>}
      {topicId == "notes" && <Notes careSiteId={careSiteId}/>}
    </div>
  );
}
