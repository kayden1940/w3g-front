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

// page
const MenuToggleIcon = () => (
  <>
    <div
      style={{
        width: "35px",
        height: "5px",
        backgroundColor: "black",
        margin: "6px 0",
      }}
    ></div>
    <div
      style={{
        height: "5px",
        width: "35px",
        backgroundColor: "black",
        margin: "6px 0",
      }}
    ></div>
    <div
      style={{
        width: "35px",
        height: "5px",
        backgroundColor: "black",
        margin: "6px 0",
      }}
    ></div>
  </>
);
const MenuToggle = ({ setSearch, search }) => {
  const {
    data: siteStats,
    error,
    mutate,
  } = useSWR(`${process.env.REACT_APP_API_ROOT_URL}/api/v1/stats`, (...args) =>
    fetch(...args)
      .then((res) => res.json())
      .then((res) => res?.data.sites)
  );

  const [menuShow, setmenuShow] = useState(true);
  const [aboutShow, setAboutShow] = useState(false);
  const [taskCreateShow, setTaskCreateShow] = useState(false);
  const { control, reset, watch, handleSubmit } = useForm({
    defaultValues: {
      taskType: "submit",
    },
  });

  console.log("watch", watch());

  useEffect(() => {
    if (setSearch) {
      setSearch({
        purpose: watch("purpose"),
        topic: watch("topic"),
      });
    }
  }, [watch("topic"), watch("purpose")]);

  const onSubmit = async (data) => {
    console.log("data", data);
    // setLoading(true);
    try {
      // message.loading({ content: "Creating...", key: "createResult" });
      const options = {
        method: "POST",
        // headers: {
        //   authorization: `Bearer ${me.token}`,
        // },
        data: {
          type: data.taskType,
          email: data.email,
          description: data.description,
          url: data.url,
        },
        url: `${process.env.REACT_APP_API_ROOT_URL}/api/v1/tasks`,
      };
      const createResult = await axios(options);

      console.log("createResult", createResult);
      // if (createResult?.data?.status === "success") {
      // setLoading(false);
      // message.success({
      //   content: "Created!",
      //   key: "createResult",
      // });
      // setTimeout(() => {
      //   history.push("/sites");
      // }, 250);
      // }
    } catch (error) {
      // setLoading(false);
      // message.error({
      //   content: `Erorr! ${error}`,
      //   key: "createResult",
      // });
    }
  };

  const purposeOptions = Object.keys(siteStats?.purposes?.[0] ?? {});
  const topicOptions = Object.keys(siteStats?.topics?.[0] ?? {});

  return (
    <>
      <div className="fixed" style={{ top: "5vh", right: "0px" }}>
        <button
          className="rounded-l-lg p-2"
          style={{
            backgroundColor: "white",
            borderWidth: "1px 0 1px 1px",
            borderColor: "black",
            borderStyle: "solid",
          }}
          onClick={() => setmenuShow((prev) => !prev)}
        >
          <MenuToggleIcon menuShow={menuShow} />
        </button>
      </div>
      <div
        className="fixed w-3/4 md:w-1/2 lg:w-1/3"
        style={{
          backgroundColor: "white",
          top: "2.5vh",
          display: menuShow ? "block" : "none",
          border: "1px solid black",
        }}
      >
        <div
          className="flex flex-col items-center"
          style={{ height: "100%", width: "100%" }}
        >
          {!taskCreateShow && (
            <div
              id="selects"
              className="w-full md:w-2/3 mt-4 flex flex-col md:flex-row items-center justify-around"
              // style={{ border: "1px solid red" }}
            >
              <Controller
                name="purpose"
                control={control}
                defaultValue="hide"
                render={({ field }) => (
                  <select
                    {...field}
                    className="px-4 py-2"
                    style={{ border: "1px solid black" }}
                  >
                    <option value="hide">Any sites</option>
                    {siteStats &&
                      purposeOptions.map((purpose) => (
                        <option key={purpose} value={purpose}>
                          {purpose}
                        </option>
                      ))}
                  </select>
                )}
              />
              <div>
                <p>of</p>
              </div>
              <Controller
                name="topic"
                defaultValue="hide"
                control={control}
                render={({ field }) => (
                  <select
                    {...field}
                    className="px-4 py-2"
                    style={{ border: "1px solid black" }}
                  >
                    <option value="hide">any topics</option>
                    {siteStats &&
                      topicOptions.map((purpose) => (
                        <option key={purpose} value={purpose}>
                          {purpose}
                        </option>
                      ))}
                  </select>
                )}
              />
            </div>
          )}
          <div
            id="actions"
            className="flex justify-between m-6 md:m-4"
            style={{ width: "65%" }}
          >
            <button
              onClick={() =>
                setTaskCreateShow((prev) => {
                  if (aboutShow && !prev) setAboutShow(false);
                  return !prev;
                })
              }
              style={{
                textDecoration: "underline solid black",
                ...(taskCreateShow && { opacity: "0.4" }),
              }}
            >
              submit/report page
            </button>

            <button
              onClick={() =>
                setAboutShow((prev) => {
                  if (taskCreateShow && !prev) setTaskCreateShow(false);
                  return !prev;
                })
              }
              style={{
                textDecoration: "underline solid black",
                ...(aboutShow && { opacity: "0.4" }),
              }}
            >
              about w3g.link
            </button>
          </div>
          {aboutShow && (
            <div id="about" className="flex flex-col items-center my-2">
              <p className="m-2">The g of w3g is stands for gallery,</p>
              <p className="m-2">
                {`It's`} a place for everyone to share their favorite websites.
              </p>
              <p className="m-2">
                We {`don't`} accept any promotional nor advertising offers.
              </p>
              <p className="m-2">Made by Kayden.</p>
            </div>
          )}
          {taskCreateShow && (
            <div
              id="taskCreate"
              className="flex flex-col items-center my-2"
              style={{ width: "100%" }}
            >
              <div className="flex items-center">
                <Controller
                  name="taskType"
                  control={control}
                  defaultValue="submit"
                  render={({ field }) => (
                    <select
                      {...field}
                      className="px-4 py-2"
                      style={{ border: "1px solid black" }}
                    >
                      <option value="submit">Submit</option>
                      <option value="report">Report</option>
                    </select>
                  )}
                />
                <p className="ml-4">a page:</p>
              </div>
              {watch("taskType") == "submit" && (
                <div className="mt-4" style={{ width: "100%" }}>
                  <div className="flex flex-col items-center justify-center">
                    <Controller
                      name="url"
                      defaultValue=""
                      control={control}
                      render={({ field }) => (
                        <input
                          {...field}
                          placeholder="Page url"
                          className="mt-2 min-w-2/3"
                          style={{
                            border: "1px solid black",
                            textAlign: "center",
                          }}
                        />
                      )}
                    />
                    <Controller
                      name="description"
                      defaultValue=""
                      control={control}
                      render={({ field }) => (
                        <textarea
                          {...field}
                          placeholder="Description"
                          className="mt-2 min-w-2/3"
                          rows="3"
                          style={{
                            border: "1px solid black",
                            textAlign: "center",
                          }}
                        />
                      )}
                    />
                    <Controller
                      name="email"
                      defaultValue=""
                      control={control}
                      render={({ field }) => (
                        <input
                          {...field}
                          placeholder="Your contact email"
                          className="mt-2 min-w-2/3"
                          style={{
                            border: "1px solid black",
                            textAlign: "center",
                          }}
                        />
                      )}
                    />
                    <div
                      id="agreement"
                      className="flex flex-row items-center justify-center mt-2"
                    >
                      <input type="checkbox" />
                      <p className="ml-2">this page is free from:</p>
                    </div>
                    <p>
                      hate speech, misinformation, illegal or harmful content.
                    </p>
                  </div>
                  <button
                    className="py-2 px-4 m-4"
                    style={{ border: "1px solid black" }}
                    onClick={handleSubmit(onSubmit)}
                  >
                    Confirm
                  </button>
                </div>
              )}
              {watch("taskType") == "report" && (
                <div className="mt-4" style={{ width: "100%" }}>
                  <div
                    className="flex flex-col items-center justify-center"
                    style={{ width: "100%" }}
                  >
                    <input
                      placeholder="Page title"
                      className="mt-2 min-w-2/3"
                      style={{
                        border: "1px solid black",
                        textAlign: "center",
                      }}
                    />
                    <textarea
                      placeholder="Description"
                      className="mt-2 min-w-2/3"
                      rows="3"
                      style={{ border: "1px solid black", textAlign: "center" }}
                    />
                    <input
                      placeholder="Your contact email"
                      className="mt-2 min-w-2/3"
                      style={{ border: "1px solid black", textAlign: "center" }}
                    />
                    <button
                      className="py-2 px-4 m-4"
                      style={{ border: "1px solid black" }}
                    >
                      Confirm
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

const SiteList = () => {
  const [search, setSearch] = useState({ purpose: "hide", topic: "hide" });

  const { data, error, mutate } = useSWR(
    `${process.env.REACT_APP_API_ROOT_URL}/api/v1/sites?${
      search?.purpose !== "hide" ? `purposes=${search.purpose}&` : ""
    }${search?.topic !== "hide" ? `topics=${search.topic}` : ""}`,
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
      <MenuToggle setSearch={setSearch} search={search} />
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
