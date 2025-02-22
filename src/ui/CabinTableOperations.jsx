import React from "react";
import TableOperations from "./TableOperations";
import Filter from "./Filter";
import SortBy from "./SortBy";

const filterOptions = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "No discount",
    value: "no-discount",
  },
  {
    label: "With discount",
    value: "with-discount",
  },
];

const sortOptions = [
  {
    label: "Sort by name (A-Z)",
    value: "name-asc",
  },
  {
    label: "Sort by name (Z-A)",
    value: "name-desc",
  },
  {
    label: "Sort by price (low first)",
    value: "regularPrice-asc",
  },
  {
    label: "Sort by price (high first)",
    value: "regularPrice-desc",
  },
  {
    label: "Sort by capacity (low first)",
    value: "maxCapacity-asc",
  },
  {
    label: "Sort by capacity (high first)",
    value: "maxCapacity-desc",
  },
];

function CabinTableOperations() {
  return (
    <TableOperations>
      <Filter queryField="discount" options={filterOptions} />
      <SortBy options={sortOptions} />
    </TableOperations>
  );
}

export default CabinTableOperations;
