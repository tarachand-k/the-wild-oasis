import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";

function useSettings() {
  const { data, isPending, error } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
  });

  return [data, isPending, error];
}

export default useSettings;
