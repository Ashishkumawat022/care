import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
} from "react-router-dom";

// --------------------------------------- Admin Components ----------------------------- //

import Login from "./admin/Login/login";
import Dashboard from "./admin/Dashboard/dashboard";
import Clients from "./admin/Clients/clients";
import ClientsDetails from "./admin/Clients/clientsDetails";
import CareTeam from "./admin/CareTeam/careteam";
import CareteamDetails from "./admin/CareTeam/careteamDetails";
import DemoData from "./admin/ShiftTask/demo/DemoData";
import DemoDataPayroll from "./admin/ShiftTask/payroll/DemoData";
import Shift from "./admin/ShiftTask/ShiftTask";
import Invoicing from "./admin/Invoicing/invoicing";
import SalesFunnel from "./admin/SalesFunnel/SalesFunnel";
import AccessRights from "./AccessRights/accessRights";
import Forgotpassword from "./admin/ForgotPassword/forgot-password";
import CreateShiftTask from "./admin/ShiftTask/CreateShiftTask";
import SignupAdmin from "./admin/Signup/signupAdmin";
import AddMedicines from "./admin/Medicines/addMedicines";
import Report from "./admin/Report/Report";
import Messaging from "./messaging/messaging";
import Signup from "./admin/Signup/signup";
import FromTemplate from "./admin/ShiftTask/FromTemplate";
import GenericShiftcreation from "./admin/ShiftTask/GenericShiftcreation";
import ClientShiftcreation from "./admin/ShiftTask/ClientSideshift";
import Header from "./admin/Header/header";
import Sidebar from "./admin/Sidebar/sidebar";
import Footer from "./admin/Footer/footer";
import UserRoleManagement from "./admin/UserRoleManagement/UserRoleManagement";
import SettingAceessModule from "./admin/UserRoleManagement/settingmoudles";
import ClientMedicinesWeekSchedule from "./admin/Medicines/clientSpeMedicWeekaddMedicines";
// ------------------------- Superadmin Components ------------------------- //

import SuperAdminHeader from "./superadmin/Header/header";
import SuperAdminFooter from "./superadmin/Footer/footer";
import SuperAdminSidebar from "./superadmin/Sidebar/sidebar";
import SuperAdminLogin from "./superadmin/Login/login";
import SuperAdminForgotpassword from "./superadmin/ForgotPassword/forgot-password";
import Analytics from "./superadmin/Analytics/analytics";
// import Subscribers from "./superadmin/Subscribers/subscribers";
// import SubscribersDetails from "./superadmin/Subscribers/subscribersDetails";
import Invoices from "./superadmin/Invoices/invoices";
import GeneralPlans from "./superadmin/SubscriptionPlans/generalPlans";
import AllActivity from "./superadmin/AllActivity/AllActivity";
import ContentManagement from "./superadmin/ContentManagement/ContentManagement";
import Support from "./superadmin/Support/Support";
import SuperAdminProfile from "./superadmin/Profile/Profile";
import PopupContactList from "./superadmin/ContentManagement/popup1";
import Page from "./superadmin/detailpage/page";
import Customdatatable from "./components/customtable/customtable";
import ClientsOfSuperadmin from "./superadmin/superadmin-clients/superadmin-client.component";
import SuperClientDetails from "./superadmin/superadminroutes/clientdetails";
import Subscription from "./superadmin/Allsubscription/subscription";
// import MultiplesiteDetails from "./superadmin/Subscribers/multiplesitedetails";

// ------------------------------ Website Components ------------------------------ //

import WebsiteHeader from "./website/Header/header";
import WebsiteFooter from "./website/Footer/footer";
import Home from "./website/Home/home";
import Segments from "./website/Segments/segments";
import Contact from "./website/Contact/contact";
import Privacy from "./website/PrivacyPolicy/privacy";
import Terms from "./website/TermsConditions/terms";
import Blog from "./website/Blog/blog";
import Features from "./website/Features/features";
import BlogDetails from "./website/Blog/blogDetails";
import AllBlogs from "./website/Blog/allBlogs";
import Payments from "./superadmin/Payments/payments";
import Reports from "./superadmin/Reports/reports";
import SubscriptionDetails from "./superadmin/Allsubscription/subscriptionDetails";
import EditPlanDetails from "./superadmin/Customtable/EditPlanDetails";
import EditCoupons from "./superadmin/Customtable/EditCoupons";
import EditAddOnDetails from "./superadmin/Customtable/EditAddOnDetails";
import Settings from "./superadmin/Settings/Settings";
import SettingsDetails from "./superadmin/superadminroutes/settingsDetails";
import ProfileRoutes from "./admin/adminRoutes/ProfileRoutes";
import WebsitePlan from "./website/WebsitePlans/WebsitePlans";
import MultiStepSignupForm from "./admin/Signup/MultiStepSignupForm";
import PayrollShiftTask from "./admin/ShiftTask/PayrollShiftTask";
import ClientJournalAsApp from "./admin/Clients/ClientJournalAsApp";
import CardlessPaymentSuccess from "./admin/Signup/CardlessPaymentSuccess";
import InvoiceTemplate from "./superadmin/Settings/InvoiceTemplate";
import EmailTemplates from "./superadmin/Settings/EmailTemplates";
import Rota from "./website/FetauresDetailsPages/Rota";
import TaskManagement from "./website/FetauresDetailsPages/TaskManagement";
import Emar from "./website/FetauresDetailsPages/Emar";
import CarePlans from "./website/FetauresDetailsPages/CarePlans";
import PayrollCalculator from "./website/FetauresDetailsPages/PayrollCalculator";
import SalesFunnels from "./website/FetauresDetailsPages/SalesFunnels";

const PrivateRoute = (props) => {
  const care_admin_token = localStorage.getItem("care_admin_token");
  console.log(care_admin_token);
  console.log(props, "privateRoute");

  return (
    <>
      {care_admin_token ? (
        <>
          <Header />
          <Sidebar />
          <Route {...props} />
          <Footer />
        </>
      ) : (
        <Redirect
          to={{
            pathname: "/admin/login",
          }}
        />
      )}
    </>
  );
};

const PublicRoute = (props) => {
  const care_admin_token = localStorage.getItem("care_admin_token");

  return care_admin_token ? (
    <Redirect to={{ pathname: "/admin/dashboard" }} />
  ) : (
    <Route {...props} />
  );
};

const SuperAdminPrivateRoute = (props) => {
  const superadmin_token = localStorage.getItem("superadmin_token");
  // console.log(superadmin_token);
  // console.log(props, "privateRoute");

  return (
    <>
      {superadmin_token ? (
        <>
          <SuperAdminHeader />
          <SuperAdminSidebar />
          <Route {...props} />
          <SuperAdminFooter />
        </>
      ) : (
        <Redirect
          to={{
            pathname: "/superadmin/login",
          }}
        />
      )}
    </>
  );
};

const SuperAdminPublicRoute = (props) => {
  const superadmin_token = localStorage.getItem("superadmin_token");

  return superadmin_token ? (
    <Redirect to={{ pathname: "/superadmin/dashboard" }} />
  ) : (
    <Route {...props} />
  );
};

function App() {
  return (
    <div>
      <Router basename="/">
        <Switch>
          // ----------------------------- Admin Routes
          ----------------------------- //
          <PublicRoute exact path="/admin/" component={Login}></PublicRoute>
          <PublicRoute exact path="/admin/login" component={Login} />
          <PublicRoute
            exact
            path="/admin/signup"
            component={MultiStepSignupForm}
          />
          <PublicRoute
            exact
            path="/admin/multistepsignupform"
            component={MultiStepSignupForm}
          />
          <PublicRoute
            exact
            path="/admin/multistepsignupform/paymentStatus"
            component={CardlessPaymentSuccess}
          />
          <PublicRoute
            exact
            path="/admin/signup/:plan/:planid/:prize"
            component={Signup}
          />
          <PublicRoute
            exact
            path="/admin/signup-admin"
            component={SignupAdmin}
          />
          <PrivateRoute
            exact
            path="/admin/forgotpassword"
            component={Forgotpassword}
          />
          <PrivateRoute path="/admin/profile" component={ProfileRoutes} />
          <PrivateRoute
            exact
            path="/admin/dashboard/:_id"
            component={Dashboard}
          />
          <PrivateRoute exact path="/admin/dashboard" component={Dashboard} />
          <PrivateRoute exact path="/admin/clients" component={Clients} />
          <PrivateRoute exact path="/admin/report" component={Report} />
          <PrivateRoute
            exact
            path="/admin/fromtemplate"
            component={FromTemplate}
          />
          <PrivateRoute
            exact
            path="/admin/genericshift"
            component={GenericShiftcreation}
          />
          <PrivateRoute
            exact
            path="/admin/clientSideshift"
            component={ClientShiftcreation}
          />
          <PrivateRoute
            exact
            path="/admin/clientsdetails/:id"
            component={ClientsDetails}
          />
          <PrivateRoute exact path="/admin/careteam" component={CareTeam} />
          <PrivateRoute
            exact
            path="/admin/careteamdetails/:id"
            component={CareteamDetails}
          />
          <PrivateRoute exact path="/admin/shift" component={Shift} />
          <PrivateRoute
            exact
            path="/admin/createshifttask"
            component={CreateShiftTask}
          />
          <PrivateRoute exact path="/admin/demo" component={DemoData} />
          <PrivateRoute
            exact
            path="/admin/payroll"
            component={PayrollShiftTask}
          />
          <PrivateRoute
            exact
            path="/admin/addmedicines"
            component={AddMedicines}
          />
          <PrivateRoute
            exact
            path="/admin/clientweekschedule"
            component={ClientMedicinesWeekSchedule}
          />
          <PrivateRoute exact path="/admin/invoicing" component={Invoicing} />
          <PrivateRoute
            exact
            path="/admin/clientJournal"
            component={ClientJournalAsApp}
          />
          <PrivateRoute
            exact
            path="/admin/salesfunnel"
            component={SalesFunnel}
          />
          <PrivateRoute
            exact
            path="/admin/accessrights"
            component={AccessRights}
          />
          <PrivateRoute exact path="/admin/messaging" component={Messaging} />
          <PrivateRoute
            exact
            path="/admin/userole"
            component={UserRoleManagement}
          />
          <PrivateRoute
            exact
            path="/admin/settings"
            component={SettingAceessModule}
          />
          // -------------------------------- Superadmin Routes
          --------------------------- //
          <SuperAdminPublicRoute
            exact
            path="/superadmin/"
            component={SuperAdminLogin}
          />
          <SuperAdminPublicRoute
            exact
            path="/superadmin/login"
            component={SuperAdminLogin}
          />
          <SuperAdminPublicRoute
            exact
            path="/superadmin/forgotpassword"
            component={SuperAdminForgotpassword}
          />
          <SuperAdminPrivateRoute
            exact
            path="/superadmin/dashboard"
            component={Analytics}
          />
          <SuperAdminPrivateRoute
            exact
            path="/superadmin/clients"
            component={ClientsOfSuperadmin}
          />
          <SuperAdminPrivateRoute
            exact
            path="/superadmin/subscription"
            component={Subscription}
          />
          <SuperAdminPrivateRoute
            path="/superadmin/settings"
            component={SettingsDetails}
          />
          <SuperAdminPrivateRoute
            path="/superadmin/invoiceTemplate"
            component={InvoiceTemplate}
          />
          <SuperAdminPrivateRoute
            path="/superadmin/emailTemplates/:templateType"
            component={EmailTemplates}
          />
          <SuperAdminPrivateRoute
            exact
            path="/superadmin/clientdetails/:id/subscription/:subId"
            component={SubscriptionDetails}
          />
          <SuperAdminPrivateRoute
            path="/superadmin/clientdetails/:copanyName/:id"
            component={SuperClientDetails}
          />
          {/* <SuperAdminPrivateRoute exact path="/superadmin/subscribers-details/:id" component={SubscribersDetails} /> */}
          {/* <SuperAdminPrivateRoute exact path="/superadmin/multisite-details/:id" component={MultiplesiteDetails} /> */}
          <SuperAdminPrivateRoute
            exact
            path="/superadmin/invoices"
            component={Invoices}
          />
          <SuperAdminPrivateRoute
            exact
            path="/superadmin/reports"
            component={Reports}
          />
          <SuperAdminPrivateRoute
            exact
            path="/superadmin/reports/:dashboardCategory/:dashboardSubCategory"
            component={Reports}
          />
          <SuperAdminPrivateRoute
            exact
            path="/superadmin/payments"
            component={Payments}
          />
          <SuperAdminPrivateRoute
            exact
            path="/superadmin/plans"
            component={GeneralPlans}
          />
          <SuperAdminPrivateRoute
            exact
            path="/superadmin/editAdd-On"
            component={EditAddOnDetails}
          />
          <SuperAdminPrivateRoute
            exact
            path="/superadmin/editCoupons"
            component={EditCoupons}
          />
          <SuperAdminPrivateRoute
            exact
            path="/superadmin/editPlan"
            component={EditPlanDetails}
          />
          <SuperAdminPrivateRoute
            exact
            path="/superadmin/all-activity"
            component={AllActivity}
          />
          <SuperAdminPrivateRoute
            exact
            path="/superadmin/content-management"
            component={ContentManagement}
          />
          <SuperAdminPrivateRoute
            exact
            path="/superadmin/content-management/:_id"
            component={ContentManagement}
          />
          {/* <PopupContactList /> */}
          <SuperAdminPrivateRoute
            exact
            path="/superadmin/support"
            component={Support}
          />
          <SuperAdminPrivateRoute
            exact
            path="/superadmin/customtable"
            component={Customdatatable}
          />
          <SuperAdminPrivateRoute
            exact
            path="/superadmin/page"
            component={Page}
          />
          <SuperAdminPrivateRoute
            exact
            path="/superadmin/profile"
            component={SuperAdminProfile}
          />
          // -------------------------- Website Routes
          -------------------------- //
          <Route exact path="/">
            <WebsiteHeader />
            <Home />
            <WebsiteFooter />
          </Route>
          <Route exact path="/segments">
            <WebsiteHeader />
            <Segments />
            <WebsiteFooter />
          </Route>
          <Route exact path="/contact">
            <WebsiteHeader />
            <Contact />
            <WebsiteFooter />
          </Route>
          <Route exact path="/plans">
            <WebsiteHeader />
            <WebsitePlan />
            <WebsiteFooter />
          </Route>
          <Route exact path="/privacy">
            <WebsiteHeader />
            <Privacy />
            <WebsiteFooter />
          </Route>
          <Route exact path="/terms">
            <WebsiteHeader />
            <Terms />
            <WebsiteFooter />
          </Route>
          <Route exact path="/allblogs">
            <WebsiteHeader />
            <AllBlogs />
            <WebsiteFooter />
          </Route>
          <Route exact path="/blog">
            <WebsiteHeader />
            <Blog />
            <WebsiteFooter />
          </Route>
          <Route exact path="/blog-details/">
            <WebsiteHeader />
            <BlogDetails />
            <WebsiteFooter />
          </Route>
          <Route exact path="/blog-details/:_id">
            <WebsiteHeader />
            <BlogDetails />
            <WebsiteFooter />
          </Route>
          <Route exact path="/features">
            <WebsiteHeader />
            <Features />
            <WebsiteFooter />
          </Route>
          <Route exact path="/rota">
            <WebsiteHeader />
            <Rota/>
            <WebsiteFooter />
          </Route>
          <Route exact path="/task-management">
            <WebsiteHeader />
            <TaskManagement/>
            <WebsiteFooter />
          </Route>
          <Route exact path="/emar">
            <WebsiteHeader />
            <Emar/>
            <WebsiteFooter />
          </Route>
          <Route exact path="/care-plans">
            <WebsiteHeader />
            <CarePlans/>
            <WebsiteFooter />
          </Route>
          <Route exact path="/payroll-calculator">
            <WebsiteHeader />
            <PayrollCalculator/>
            <WebsiteFooter />
          </Route>
          <Route exact path="/sales-funnel">
            <WebsiteHeader />
            <SalesFunnels/>
            <WebsiteFooter />
          </Route>
        
        </Switch>
      </Router>
    </div>
  );
}

export default App;
