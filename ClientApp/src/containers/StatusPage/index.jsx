import { useEffect, useState } from "react";
import { GET } from "../../api/api";
import LoadingAnimation from "../../components/LoadingAnimation";
import errorHandling from "../../utils/error_handling";
import useQuery from "../../utils/util";
import VerifedPage from "../VerifedPage";

/* a page that loads up when user clicks on the email verification link or forgot password link */
const StatusPage = () => {
  const [verified, setVerified] = useState(false);
  const [props, setProps] = useState(null);
  const [loading, setLoading] = useState(true);

  let query = useQuery();
  console.log("status page");

  console.log(query.get("token"));
  console.log(query.get("uid"));

  const token = query.get("token");
  const uid = query.get("uid");

  useEffect(() => {
    const exe = async () => {
      try {
        const { data } = await GET(
          `auth/user/verify-email?token=${token}&&uid=${uid}`
        );
        console.log(data);

        if (data.statusCode === 200) {
          console.log(data.statusDescription);
          setVerified(true);
          setProps({
            statusCode: "Verification Success",
            statusDescription: data.statusDescription,
          });
        }
        setLoading(false);
      } catch (e) {
        console.log(e);
        const errors = errorHandling(e);
        console.log(errors);
        setProps({
          statusCode: errors.title,
          statusDescription: errors.message[0],
        });
        setLoading(false);
      }
    };
    exe();
  }, []);

  if (!loading) {
    return <VerifedPage data={props} />;
  } else {
    return (
      <div>
        <LoadingAnimation />
      </div>
    );
  }
};

export default StatusPage;
