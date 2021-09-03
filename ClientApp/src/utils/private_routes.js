import { useRoutes } from "react-router-dom";

import OrganisationHomepage from "../containers/OrganisationHomepage";
import OrganisationProfilePage from "../containers/OrganisationProfilePage";
import OrganisationApplicants from "../containers/OrganisationApplicants";
import OrganisationCreateJob from "../containers/OrganisationCreateJob";
import OrganisationJobPost from "../containers/OrganisationJobPost";
import OrganisationJobPostEdit from "../containers/OrganisationJobPostEdit";
import NotFoundPage from "../containers/NotFoundPage";

export default function Router() {
  return useRoutes([
    { path: "/", element: <OrganisationHomepage /> },
    {
      path: "/profile",
      element: <OrganisationProfilePage />,
    },
    {
      path: "/applicants",
      element: <OrganisationApplicants />,
    },
    {
      path: "/create-job",
      element: <OrganisationCreateJob />,
    },
    {
      path: "/job/:jobId",
      element: <OrganisationJobPost />,
    },
    {
      path: "/job/:jobId/edit",
      element: <OrganisationJobPostEdit />,
    },
    { path: "/*", element: <NotFoundPage /> },
  ]);
}
