import styled, { css } from "styled-components";
import React from "react";
import useSWR from "swr";
// components
const Site = ({ data }) => {
  //   const { imageCover } = data;
  //   console.log("data", data);
  return (
    <div
      style={{
        flex: "0 0 100%",
        width: "400px",
        height: "300px",
        // backgroundColor: "red",
      }}
    >
      {/* <div style={{ height: `300px` }}> */}
      <img
        // className="flex"
        src={`${process.env.REACT_APP_API_ROOT_URL}/images/sites/${data.imageCover}`}
        alt={data?.slug}
      />
    </div>
  );
};

const List = ({ sitesData }) => {
  return (
    <div
      className="relative"
      style={{
        top: "20%",
      }}
    >
      <div
        className="w-screen flex justify-center"
        style={{
          backgroundColor: "yellow",
          // width: "400px",
          // height: "300px",
          // transform: "rotateY(-10deg) translateX(1.5rem)",
          // transformStyle: "preserve-3d",
          // overflowX: "scroll",
          //   perspective: "800px",
        }}
      >
        <div
          style={{
            backgroundColor: "blue",
            width: "400px",
            height: "300px",
            // maxWidth: "80%",
            // maxHeight: "30%",
          }}
        >
          <div className="absolute" style={{ width: "100%" }}>
            <div
              className="fixed"
              style={{
                width: "100%",
                perspective: "800px",
              }}
            >
              <div
                className="flex"
                style={{
                  overflowX: "auto",
                  width: "100%",
                  transformOrigin: "0 0",
                  transform: "rotateY(-15deg)",
                }}
              >
                {/* <div
                  style={{
                    flex: "0 0 100%",
                    width: "4000px",
                    height: "100px",
                    backgroundColor: "red",
                  }}
                ></div>
                <div
                  style={{
                    flex: "0 0 100%",
                    width: "4000px",
                    height: "100px",
                    backgroundColor: "purple",
                  }}
                ></div> */}

                {sitesData &&
                  (sitesData ?? []).map((site) => (
                    <Site data={site} key={site?.slug} />
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
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
    <div
      className="h-screen"
      style={{
        //    perspective: "800px",
        backgroundColor: "orange",
      }}
    >
      <List sitesData={data} />
    </div>
    // <div className="fixed" style={{ height: "6em" }}>
    //   <div
    //     className="flex"
    //     style={{ overflowX: "scroll", height: "6em", width: "100vw" }}
    //   >
    //     <div
    //       style={{
    //         flex: "0 0 100%",
    //         height: "6em",
    //         //   width: "4000px",
    //         //   height: "100px",
    //         backgroundColor: "red",
    //       }}
    //     ></div>
    //     <div
    //       style={{
    //         flex: "0 0 100%",
    //         height: "6em",
    //         //   width: "4000px",
    //         //   height: "100px",
    //         backgroundColor: "blue",
    //       }}
    //     ></div>
    //     <div
    //       style={{
    //         flex: "0 0 100%",
    //         height: "6em",
    //         //   width: "4000px",
    //         //   height: "100px",
    //         backgroundColor: "red",
    //       }}
    //     ></div>
    //     <div
    //       style={{
    //         flex: "0 0 100%",
    //         height: "6em",
    //         //   width: "4000px",
    //         //   height: "100px",
    //         backgroundColor: "blue",
    //       }}
    //     ></div>
    //     <div
    //       style={{
    //         flex: "0 0 100%",
    //         height: "6em",
    //         //   width: "4000px",
    //         //   height: "100px",
    //         backgroundColor: "red",
    //       }}
    //     ></div>
    //     <div
    //       style={{
    //         flex: "0 0 100%",
    //         height: "6em",
    //         //   width: "4000px",
    //         //   height: "100px",
    //         backgroundColor: "blue",
    //       }}
    //     ></div>
    //     <div
    //       style={{
    //         flex: "0 0 100%",
    //         height: "6em",
    //         //   width: "4000px",
    //         //   height: "100px",
    //         backgroundColor: "red",
    //       }}
    //     ></div>
    //     <div
    //       style={{
    //         flex: "0 0 100%",
    //         height: "6em",
    //         //   width: "4000px",
    //         //   height: "100px",
    //         backgroundColor: "blue",
    //       }}
    //     ></div>
    //   </div>
    // </div>
  );
};
export default SiteList;
