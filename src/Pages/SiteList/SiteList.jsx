import styled, { css } from "styled-components";
import useSWR from "swr";
// components
const Site = ({ data }) => {
  //   const { imageCover } = data;
  return (
    <div className="flex space-x-4" style={{ backgroundColor: "yellow" }}>
      <div className="flex-1">1</div>
    </div>
  );
};

const List = () => {
  return (
    <div className="flex space-x-4" style={{ backgroundColor: "blue" }}>
      <Site />
      <Site />
      <Site />
    </div>
  );
};

// page
const SiteList = () => {
  const { data, error, mutate } = useSWR(
    `${process.env.REACT_APP_API_ROOT_URL}/api/v1/sites`,
    (...args) =>
      fetch(...args)
        .then((res) => res.json())
        .then((res) => res?.data?.data)
  );
  return (
    <div className="h-screen" style={{ backgroundColor: "#FFB7C5" }}>
      <div
        className="absolute"
        style={{ backgroundColor: "orange", top: "30%" }}
      >
        <List data={data} />
      </div>
    </div>
  );
};
export default SiteList;
