import Filter from "../../ui/Filter";

const filterOptions = [
  { value: "7", label: "Last 7 days" },
  { value: "30", label: "Last 30 days" },
  { value: "90", label: "Last 90 days" },
];

function DashboardFilter() {
  return <Filter queryField="last" options={filterOptions} />;
}

export default DashboardFilter;
