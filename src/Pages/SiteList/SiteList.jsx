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
import { useForm, Controller } from "react-hook-form";
import Menu from "../../Components/Menu";
import axios from "axios";

// import { debounce } from "../../utils";

// gsap.registerPlugin(ScrollToPlugin);

const SiteCard = ({ siteData }) => {
  const { name, description, imageCover, purposes, topics, owner } = siteData;
  return (
    <div
      className="w-full bg-white sahdow-lg overflow-hidden flex flex-col justify-center items-center "
      style={{
        maxWidth: "400px",
        placeSelf: "start center",
      }}
    >
      <div style={{}}>
        <img
          className="object-center object-cover h-auto w-full"
          src={`${process.env.REACT_APP_API_ROOT_URL}/images/sites/${imageCover}`}
          style={{ width: "400px", height: "300px", border: "1px solid black" }}
          alt="photos"
        />
      </div>
      <div className="text-center py-2 sm:py-2" style={{ minHeight: "160px" }}>
        <p
          className="text-xl text-gray-700 font-bold mb-1 md:mb-1"
          // style={{ border: "1px solid orange" }}
        >
          {name.en}
        </p>
        <div style={{ minHeight: "42px" }}>
          {!!owner.name &&
            (owner.url ? (
              <p
                className="text-sm text-gray-800 font-light"
                // style={{ border: "1px solid orange" }}
              >
                {`by `}
                <a
                  href={owner.url}
                  className=""
                  style={{ textDecoration: "underline dotted black" }}
                >
                  {`${owner.name}`}
                </a>
              </p>
            ) : (
              <p
                className="text-sm text-gray-600 font-light"
                // style={{ border: "1px solid orange" }}
              >
                {`by ${owner.name}`}
              </p>
            ))}
          <p
            className="text-sm text-gray-600 font-light italic mb-2 md:mb-1"
            // style={{ border: "1px solid orange" }}
          >
            {`${
              purposes.join("/") +
              (topics.length > 0 ? ` of ${topics.join(", ")}` : "")
            }`}
          </p>
        </div>
        <p
          className="text-sm text-gray-800 font-light"
          // style={{ border: "1px solid orange" }}
        >
          {description}
        </p>
      </div>
    </div>
  );
};

const SiteList = () => {
  const [search, setSearch] = useState({ purpose: "hide", topic: "hide" });

  const { data, error, mutate } = useSWR(
    `${process.env.REACT_APP_API_ROOT_URL}/api/v1/sites?${
      search?.purpose ? `purposes=${search.purpose}&` : ""
    }${search?.topic ? `topics=${search.topic}` : ""}`,
    (...args) =>
      fetch(...args)
        .then((res) => res.json())
        .then((res) => res?.data?.data)
  );

  const getSortedSites = (list) => {
    if (!list) [];
    return list.sort((a, b) => {
      if (!a?.name) return;
      return a.name.en.localeCompare(b.name.en);
    });
  };

  return (
    <section
      // draggable={false}
      className="flex justify-center"
      style={
        {
          // touchAction: "none",
        }
      }
    >
      <Menu setSearch={setSearch} search={search} />
      <div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 p-6"
        style={{}}
      >
        {getSortedSites(data ?? []).map((siteData, index) => (
          <SiteCard key={index} siteData={siteData} />
        ))}
      </div>
    </section>
  );
};
export default SiteList;
