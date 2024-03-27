import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

import { getBookings } from "../../services/apiBookings";
import { NUM_PAGES_PER_PAGE } from "../../utils/constants";

function useBookings() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  // FILTER
  const filterOption = searchParams.get("status") || "all";

  const filter =
    !filterOption || filterOption === "all"
      ? null
      : { field: "status", option: filterOption };

  // SORT
  const sortyByOption = searchParams.get("sortBy") || "startDate-desc";

  const [field, direction] = sortyByOption.split("-");
  const sortBy = { field, direction };

  // PAGINATION
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  // QUERY
  const { isLoading, data: { data, count } = {} } = useQuery({
    queryKey: ["bookings", filter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page }),
  });

  const currentPage = Math.ceil(count / NUM_PAGES_PER_PAGE);
  if (page < currentPage) {
    const prefetchPage = page + 1;
    // PRE-FETCHING
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, prefetchPage],
      queryFn: () => getBookings({ filter, sortBy, page: prefetchPage }),
    });
  }

  if (page > 1) {
    const prefetchPage = page - 1;
    // PRE-FETCHING
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, prefetchPage],
      queryFn: () => getBookings({ filter, sortBy, page: prefetchPage }),
    });
  }

  return [isLoading, data, count];
}

export default useBookings;
