// import styled, { css } from "styled-components";
import React, {
  forwardRef,
  useState,
  useEffect,
  useImperativeHandle,
  useMemo,
} from "react";
import { useLocation } from "react-router-dom";
import useSWR from "swr";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { validateEmail, validateUrl } from "../utils";
import ReactGA from "react-ga4";

const About = () => {
  return (
    <div id="about" className="flex flex-col items-center my-2 text-center">
      <p className="m-2">w3g.link is a public driven website bookmarks.</p>
      <p className="m-2">
        We {`don't`} accept any promotional nor advertising offers.
      </p>
      <div
        className="flex justify-center min-w-1/3 m-2"
        style={{ textDecoration: "underline solid black" }}
      >
        <a href="mailto:w3g@airmail.cc">Email</a>
        {/* <a href="https://discord.gg/ac3aHYPw">Discord</a> */}
      </div>
    </div>
  );
};
const TaskForm = () => {
  const {
    control,
    reset,
    watch,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      taskType: "submit",
    },
  });
  const [submited, setSubmited] = useState(null);
  const onSubmit = async (data) => {
    try {
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
      if (createResult?.data?.status === "success") {
        setSubmited(`Thanks, we'll look at it shortly.`);
      }
    } catch (error) {
      setSubmited(`Somethings off from ourside, please try again later.`);
    }
  };

  if (submited) {
    return (
      <div
        id="taskCreate"
        className="flex flex-col items-center my-2"
        style={{ width: "100%" }}
      >
        <p className="m-4">{submited}</p>
      </div>
    );
  }
  return (
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
        <p className="ml-4">a site:</p>
      </div>
      <div className="mt-4" style={{ width: "100%" }}>
        <div className="flex flex-col items-center justify-center">
          <Controller
            name="url"
            defaultValue=""
            rules={{
              required: {
                value: true,
                message: "Pastes the link of the site here.",
              },
              minLength: {
                value: 10,
                message: "Too short, please provides full path.",
              },
              maxLength: {
                value: 80,
                message: "Too long, please exclude queries.",
              },
              validate: () => validateUrl(watch("url")) || "Invlid url.",
            }}
            control={control}
            render={({ field }) => (
              <input
                {...field}
                placeholder={"Site url"}
                className="mt-2 min-w-2/3"
                style={{
                  border: "1px solid black",
                  textAlign: "center",
                }}
              />
            )}
          />
          {errors?.url && <p>{errors?.url?.message}</p>}
          <Controller
            name="description"
            defaultValue=""
            rules={{
              required: {
                value: true,
                message:
                  watch("taskType") == "submit"
                    ? "What is the site about?"
                    : "What is worng with the site?",
              },
              minLength: {
                value: 17,
                message: "Too short.",
              },
              maxLength: {
                value: 250,
                message: "Too long.",
              },
            }}
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
          {errors?.description && <p>{errors?.description?.message}</p>}
          <Controller
            name="email"
            defaultValue=""
            rules={{
              required: {
                value: true,
                message: `Email for contacts about the ${
                  watch("taskType") === "submit" ? "submission" : "report"
                } only.`,
              },
              validate: () => validateEmail(watch("email")) || "Invlid email.",
              minLength: {
                value: 8,
                message: "Too short.",
              },
              maxLength: {
                value: 38,
                message: "Too long.",
              },
            }}
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
          {errors?.email && <p>{errors?.email?.message}</p>}
          {watch("taskType") == "submit" && (
            <Controller
              name="agreement"
              defaultValue={false}
              rules={{
                //
                required: {
                  value: watch("taskType") == "submit" ? true : false,
                  message: "Don't send us weird stuff",
                },
              }}
              control={control}
              render={({ field }) => (
                <>
                  <div
                    id="agreement"
                    className="flex flex-row items-center justify-center mt-2 text-center"
                  >
                    <input type="checkbox" {...field} />
                    <p className="ml-2">this site is free from:</p>
                  </div>
                  <p className="text-center">
                    hate speech, misinformation, illegal and harmful content.
                  </p>
                </>
              )}
            />
          )}
          <button
            className="py-2 px-4 m-4"
            style={{ border: "1px solid black" }}
            onClick={handleSubmit(onSubmit)}
          >
            {watch("taskType") == "submit" && errors?.agreement
              ? "Don't send us weird stuff"
              : "Confirm"}
          </button>
        </div>
      </div>
    </div>
  );
};
const MenuToggleIcon = ({ menuShow }) => {
  return (
    <>
      {menuShow ? (
        <>
          <div
            style={{
              height: "5px",
              width: "35px",
              //   backgroundColor: "black",
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
              height: "5px",
              width: "35px",
              //   backgroundColor: "black",
              margin: "6px 0",
            }}
          ></div>
        </>
      ) : (
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
      )}
    </>
  );
};
const useQuery = () => {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
};

const MenuToggle = forwardRef(({ setSearch, search }, ref) => {
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
  const [aboutShow, setAboutShow] = useState(true);
  const [taskCreateShow, setTaskCreateShow] = useState(false);
  const query = useQuery();
  const { control, reset, watch, handleSubmit, setValue } = useForm({
    defaultValues: {
      taskType: "submit",
      purpose: query.get("purpose"),
      topic: query.get("topic"),
    },
  });

  useImperativeHandle(ref, () => ({
    clickNoSiteSubmit() {
      setmenuShow(true);
      setAboutShow(false);
      setTaskCreateShow(true);
      setValue("taskType", "submit");
    },
  }));

  useEffect(() => {
    if (setSearch) {
      setSearch({
        purpose: watch("purpose"),
        topic: watch("topic"),
      });
    }
    let queries = "";
    if (watch("purpose") && !watch("topic")) {
      queries = `/?purpose=${watch("purpose")}`;
      ReactGA.event("choosed_purpose", { purpose: watch("purpose") });
    }
    if (!watch("purpose") && watch("topic")) {
      queries = `/?topic=${watch("topic")}`;
      ReactGA.event("choosed_topic", { topic: watch("topic") });
    }
    if (!watch("purpose") && !watch("topic")) {
      queries = `/`;
    }
    if (watch("purpose") && watch("topic")) {
      ReactGA.event("choosed_purpose", { purpose: watch("purpose") });
      ReactGA.event("choosed_topic", { topic: watch("topic") });
      queries = `/?purpose=${watch("purpose")}&topic=${watch("topic")}`;
    }
    history.replaceState(null, "", queries);
  }, [watch("topic"), watch("purpose")]);

  const purposeOptions = Object.keys(siteStats?.purposes?.[0] ?? {});
  const topicOptions = Object.keys(siteStats?.topics?.[0] ?? {});

  return (
    <>
      <div
        className="fixed"
        style={{ top: "5vh", right: "0px", zIndex: 2 }}
        ref={ref}
      >
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
        className="fixed w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3"
        style={{
          backgroundColor: "white",
          top: "2.5vh",
          display: menuShow ? "block" : "none",
          border: "1px solid black",
          zIndex: 1,
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
                defaultValue=""
                render={({ field }) => (
                  <select
                    {...field}
                    className="px-4 py-2 min-w-3/7"
                    style={{ border: "1px solid black", textAlign: "center" }}
                  >
                    <option value="">Any sites</option>
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
                defaultValue=""
                control={control}
                render={({ field }) => (
                  <select
                    {...field}
                    className="px-4 py-2 min-w-3/7"
                    style={{ border: "1px solid black", textAlign: "center" }}
                  >
                    <option value="">any topics</option>
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
              submit/report site
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
          {aboutShow && <About />}
          {taskCreateShow && <TaskForm />}
        </div>
      </div>
    </>
  );
});
export default MenuToggle;
