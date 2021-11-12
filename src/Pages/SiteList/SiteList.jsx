/* eslint-disable react/display-name */
import styled, { css } from "styled-components";
import React, { forwardRef, useRef, useState, useEffect } from "react";
import useSWR from "swr";
import { motion, useTransform, useElementScroll } from "framer-motion";
import { useWindowSize } from "../../hooks/useWindowSize";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.defaults({
  toggleActions: "restart pause resume pause",
  scroller: ".container",
});

const Site = ({ data }) => {
  return (
    <div
      className="panel flex"
      style={{
        flex: "0 0 100%",
        scrollSnapAlign: "start",
        width: "100vw",
        justifyContent: "center",
        border: "1px solid red",
        height: "300px",
      }}
    >
      <img
        src={`${process.env.REACT_APP_API_ROOT_URL}/images/sites/${data.imageCover}`}
        alt={data?.slug}
        style={{ width: "90%" }}
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
        style={
          {
            // backgroundColor: "yellow",
            // width: "400px",
            // height: "300px",
            // transform: "rotateY(-10deg) translateX(1.5rem)",
            // transformStyle: "preserve-3d",
            // overflowX: "scroll",
            //   perspective: "800px",
          }
        }
      >
        <div
          style={{
            // backgroundColor: "blue",
            width: "100%",
            height: "300px",
            // maxWidth: "50%",
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
                className="container"
                style={{
                  maxHeight: "100vh",
                  maxWidth: "100vw",
                  overflowX: "scroll",
                  display: "flex",
                  scrollSnapType: "x mandatory",
                  transformOrigin: "0 0",
                  border: "2px solid blue",
                  transform: "rotateY(-15deg)",
                }}
              >
            
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
      style={
        {
          //    perspective: "800px",
          // backgroundColor: "orange",
        }
      }
    >
      <List sitesData={data} />
      {/* <div
        className="container"
        style={{
          maxHeight: "100vh",
          maxWidth: "100vw",
          overflowX: "scroll",
          display: "flex",
          scrollSnapType: "x mandatory",
        }}
      >
        {["1", "2", "3", "4"].map((p) => {
          return (
            <div
              style={{
                flex: "0 0 100%",
                border: "2px solid red",
                scrollSnapAlign: "start",
                height: "100vh",
                width: "100vw",
              }}
              key={p}
            >
              <p>{p}</p>
            </div>
          );
        })}
      </div> */}
    </div>
  );
};
export default SiteList;
