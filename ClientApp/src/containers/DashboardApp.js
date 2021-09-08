// material
import { Box, Grid, Container, Typography } from "@material-ui/core";
// components
import Page from "../components/Page";
import {
  AppTotalReports,
  AppApplicants,
  AppJobsPosted,
  AppCompanies,
} from "../components/dashboard";
import { useEffect, useState } from "react";
import { GET } from "../api/api";

// ----------------------------------------------------------------------

export default function DashboardApp() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const promise1 = new Promise((resolve, reject) => {
      const exe = async () => {
        try {
          const { data } = await GET(`admin/dashboard`);
          resolve(data);
        } catch (e) {
          console.log(e);
          reject(e);
        }
      };
      exe();
    });

    Promise.all([promise1])
      .then((values) => {
        console.log("all promises resolved");
        console.log(values[0]);
        setData(values[0]);
        setLoading(false);
      })
      .catch((error) => {
        console.log("error", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <h>Loading</h>;
  }

  return (
    <Page title="Dashboard | Admin">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">Hi, Welcome back</Typography>
        </Box>
        <Grid container spacing={3}>
          {/* START top 4 boxes */}
          <Grid item xs={12} sm={6} md={3}>
            <AppCompanies
              title="Total Companies Registered"
              value={data.totalCompanies}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppTotalReports title="Total Reports" value={data.totalReports} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppJobsPosted
              title="Total Jobs Posted"
              value={data.totalJobsPosted}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppApplicants
              title="Total Applicants"
              value={data.totalApplicants}
            />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
