import OrganisationHomepage from "../containers/OrganisationHomepage";
import LandingPage from "../containers/LandingPage";
import CompanyPage from "../containers/CompanyPage";
import SignInPage from "../containers/SignInPage";
import ForgotPassword from "../containers/ForgotPassword";
import ChangePassword from "../containers/ChangePassword";
import RegisterPage from "../containers/RegisterPage";
import VerifiedPage from "../containers/VerifedPage";
import OrganisationProfilePage from "../containers/OrganisationProfilePage";
import OrganisationCreateJob from "../containers/OrganisationCreateJob";
import OrganisationJobPost from "../containers/OrganisationJobPost";
import OrganisationJobPostEdit from "../containers/OrganisationJobPostEdit";
import OrganisationApplicants from "../containers/OrganisationApplicants";
import AboutPage from "../containers/AboutPage";
import StatusPage from "../containers/StatusPage";
import NotFoundPage from "../containers/NotFoundPage";

//                 ButtonUrl = $"https://internlagbe.azurewebsites.net/auth/user/{type}?token={token}&&uid={uid}",

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
      path: "/auth/user/change-password",
      component: ChangePassword,
    },
    {
      path: "/auth/user/verify",
      component: StatusPage,
    },

    { path: "/*", component: NotFoundPage },
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
      path: "/job/:jobId",
      component: OrganisationJobPost,
    },
    {
      path: "/job/:jobId/edit",
      component: OrganisationJobPostEdit,
    },
    { path: "/*", component: NotFoundPage },
  ],
};

export default routerList;
