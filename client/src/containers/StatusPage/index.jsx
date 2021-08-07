import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { GET } from "../../api/api";
import LoadingAnimation from "../../components/LoadingAnimation";
import useQuery from "../../utils/util";

/* a page that loads up when user clicks on the email verification link */
const StatusPage = () => {
  const [error, setError] = useState(false);
  const history = useHistory();
  let query = useQuery();

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
        history.push("/sign-in");
      } catch (e) {
        console.log(e);
        setError(true);
      }
    };
    exe();
  });

  if (error) {
    return <p>Error</p>;
  }
  return (
    <div>
      <LoadingAnimation />
    </div>
  );
};

export default StatusPage;
