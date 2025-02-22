import { useQuery } from "@tanstack/react-query";
import { getStaysTodayActivity } from "../../services/apiBookings";

function useTodayActivity() {
  const { data, isLoading } = useQuery({
    queryKey: ["today-activity"],
    queryFn: getStaysTodayActivity,
  });

  return [data, isLoading];
}

export default useTodayActivity;
