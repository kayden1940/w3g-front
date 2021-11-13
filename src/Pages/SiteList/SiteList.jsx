/* eslint-disable react/display-name */
import styled, { css } from "styled-components";
import React, {
  forwardRef,
  useRef,
  useState,
  useEffect,
  useCallback,
} from "react";
import useSWR from "swr";
import { motion, useTransform, useElementScroll } from "framer-motion";
// import { useWindowSize } from "../../hooks/useWindowSize";
import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useDrag } from "@use-gesture/react";
// import { debounce } from "../../utils";

gsap.registerPlugin(ScrollToPlugin);

// gsap.registerPlugin(ScrollTrigger);

// ScrollTrigger.defaults({
//   toggleActions: "restart pause resume pause",
//   scroller: "#container",
// });

const Site = ({ data, siteIndex }) => {
  return (
    <div
      id={`site_${siteIndex}`}
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
      {/* <img
        src={`${process.env.REACT_APP_API_ROOT_URL}/images/sites/${data.imageCover}`}
        alt={data?.slug}
        style={{ width: "100%" }}
      /> */}
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
            backgroundColor: "blue",
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
                // perspective: "800px",
              }}
            >
              {/* <div
                id="container"
                className="container"
                style={{
                  maxHeight: "100vh",
                  maxWidth: "100vw",
                  overflowX: "scroll",
                  display: "flex",
                  // scrollSnapType: "x mandatory",
                  transformOrigin: "0 0",
                  // border: "2px solid blue",
                  // transform: "rotateY(-15deg)",
                }}
              >
                {sitesData &&
                  (sitesData ?? []).map((site, index) => (
                    <Site data={site} key={site?.slug} siteIndex={index} />
                  ))}
              </div> */}
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
  const bind = useDrag((dragData) => {
    const { movement, last } = dragData;
    if (last) {
      onDrag(movement);
    }
  });

  const scrollToSite = (siteId) => {
    gsap.to("#container", {
      duration: 1.3,
      scrollTo: `#site_${siteId}`,
      ease: "power2",
    });
  };

  const container = document.querySelector("#container");

  const onDrag = useCallback(
    (movement) => {
      console.log("onDrag");
      // if (my < -50) {
      //   console.log("dragged up");
      // }

      if (container) {
        const observer = new IntersectionObserver(
          (entries) => {
            const currentSite = entries.find(
              (entry) => entry.intersectionRatio > 0.7
            );
            if (currentSite) {
              const currentSiteIndex = Number(currentSite.target.id.slice(5));
              const mx = movement[0];
              if (mx > 35) {
                console.log("dragged to right");
                scrollToSite(currentSiteIndex - 1);
              }
              if (mx < -35) {
                console.log("dragged to left");
                scrollToSite(currentSiteIndex + 1);
              }
            }
          },
          { threshold: [0], root: container }
        );

        const sitesObserve = data.map((site, index) => {
          observer.observe(
            document.querySelector(`#container > #site_${index}`)
          );
        });
      }
    },
    [container]
  );

  return (
    <div
      draggable={false}
      className="h-screen"
      {...bind()}
      style={{
        touchAction: "none",
        // backgroundColor: "orange",
      }}
    >
      <List sitesData={data} />
    </div>
  );
};
export default SiteList;
