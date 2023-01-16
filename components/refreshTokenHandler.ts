import { useSession } from "next-auth/react";
import { useEffect } from "react";

const RefreshTokenHandler = (props: any) => {
  const { data: session } = useSession();

  useEffect(() => {
    if (!!session) {
      // We did set the token to be ready to refresh after 23 hours, here we set interval of 23 hours 30 minutes.
      const timeRemaining = Math.round((session.accessTokenExpiry - 60 * 30) - Math.floor(Date.now() / 1000));
      props.setInterval(timeRemaining > 0 ? timeRemaining : 0);
    }
  }, [session]);

  return null;
}

export default RefreshTokenHandler;