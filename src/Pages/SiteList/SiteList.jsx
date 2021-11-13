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

// gsap.registerPlugin(ScrollToPlugin);

const SiteCard = ({ siteData }) => {
  const { name, description, imageCover } = siteData;
  return (
    <div
      className="w-full bg-white sahdow-lg overflow-hidden flex flex-col justify-center items-center"
      style={{ border: "6px solid black" }}
    >
      <div>
        <img
          className="object-center object-cover h-auto w-full"
          src={`${process.env.REACT_APP_API_ROOT_URL}/images/sites/${imageCover}`}
          // style={{ border: "1px solid red" }}
          alt="photos"
        />
      </div>
      <div className="text-center py-8 sm:py-6" style={{ minHeight: "160px" }}>
        <p className="text-xl text-gray-700 font-bold mb-2">{name.en}</p>
        <p className="text-sm text-gray-800 font-light">{description}</p>
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
    <section
      draggable={false}
      className=""
      style={{
        // border: "2px solid red",
        touchAction: "none",
      }}
    >
      {/* <div className="text-center pb-12"> */}
      {/* <h2 className="text-base font-bold text-indigo-600">
          We have the best equipment in the market
        </h2>
        <h1 className="font-bold text-3xl md:text-4xl lg:text-5xl font-heading text-gray-900">
          Check our awesome team members
        </h1> */}
      {/* </div> */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {(data ?? []).map((siteData, index) => (
          <SiteCard key={index} siteData={siteData} />
        ))}
      </div>
    </section>
  );
};
export default SiteList;
