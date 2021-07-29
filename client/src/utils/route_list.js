import OrganisationHomepage from "../containers/OrganisationHomepage";
import LandingPage from "../containers/LandingPage";
import CompanyPage from "../containers/CompanyPage";
import SignInPage from "../containers/SignInPage";
import ForgotPassword from "../containers/ForgotPassword";
import ChangePassword from "../containers/ChangePassword";
import RegisterPage from "../containers/RegisterPage";
import VerifedPage from "../containers/VerifedPage";
import OrganisationProfilePage from "../containers/OrganisationProfilePage";
import OrganisationCreateJob from "../containers/OrganisationCreateJob";
import OrganisationJobPost from "../containers/OrganisationJobPost";
import OrganisationJobPostEdit from "../containers/OrganisationJobPostEdit";
import OrganisationApplicants from "../containers/OrganisationApplicants";
import AboutPage from "../containers/AboutPage";

const routerList = {
  public: [
    { path: "/", component: LandingPage },
    { path: "/about", component: AboutPage },
    {
      path: "/company/:companyId",
      component: CompanyPage,
    },
    { path: "/sign-in", component: SignInPage },
    { path: "/register", component: RegisterPage },
    {
      path: "/forgot-password",
      component: ForgotPassword,
    },
    {
      path: "/change-password/:token",
      component: ChangePassword,
    },
    {
      path: "/verification-success/:token",
      component: VerifedPage,
    },
    { path: "/*", component: SignInPage },
  ],
  private: [
    { path: "/", component: OrganisationHomepage },
    {
      path: "/profile",
      component: OrganisationProfilePage,
    },
    {
      path: "/applicants",
      component: OrganisationApplicants,
    },
    {
      path: "/create-job",
      component: OrganisationCreateJob,
    },
    {
      path: "/job/:jobid",
      component: OrganisationJobPost,
    },
    {
      path: "/job/:jobid/edit",
      component: OrganisationJobPostEdit,
    },
    { path: "/*", component: OrganisationHomepage },
  ],
};

export default routerList;
