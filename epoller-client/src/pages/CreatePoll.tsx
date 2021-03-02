import React, { FC, useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

import { NewPoll, Poll, PollView } from "../models/interfaces";
import { AddPoll } from "../services/api";
import { AppContext } from "../services/AppContext";

const CreatePoll: FC = () => {
  const history = useHistory();
  const { setSelectedPage, statePolls, dispatch } = useContext(AppContext);

  // React Hook Form
  const { register, handleSubmit } = useForm<FormData>();

  const [optionInputs, setOptionInputs] = useState<string[]>(["", ""]);
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);
  const [notUniqueTitle, setNotUniqueTitle] = useState<boolean>(false);
  const [notUniqueOptions, setNotUniqueOptions] = useState<boolean>(false);

  // Form data type
  type FormData = {
    title: string;
    options: string[];
  };

  //Check valid inputs function
  const checkUniqueOptions = (options: string[], title: string) => {
    let errors: any = {};
    let unqiueOptions: boolean = true;
    let prevOptions = Object.create(null);
    // Check if options are unique
    options.map((option) => {
      let value = option;
      if (value in prevOptions) {
        unqiueOptions = false;
      }
      prevOptions[value] = true;
    });
    if (!unqiueOptions) {
      setSubmitLoading(false);
      setNotUniqueOptions(true);
      errors.optionsNotUnique = true;
    }
    // Check if title exists
    let alreadyExists: boolean = false;
    statePolls.polls.map((poll: Poll) => {
      if (poll.title === title) {
        alreadyExists = true;
      }
    });
    if (alreadyExists) {
      setNotUniqueTitle(true);
      setSubmitLoading(false);
      errors.titleNotUnique = true;
    }
    return errors;
  };

  // SUBMIT NEW POLL
  const onSubmit = handleSubmit(async ({ title, options }) => {
    const newPoll: NewPoll = { title, options };

    // Set states
    setSubmitLoading(true);
    setNotUniqueTitle(false);
    setNotUniqueOptions(false);
    let errors: any = checkUniqueOptions(options, title);

    // Check valid form data
    if (0 < Object.keys(errors).length) {
      return;
    }
    // Add new poll
    const result: PollView = await AddPoll(newPoll);
    const newPollItem: Poll = { title: result.title, pollId: result.pollId };

    // Dispatch add poll
    dispatch({
      type: "ADD_POLL",
      payload: { poll: newPollItem },
    });
    setSubmitLoading(false);
    setNotUniqueTitle(false);
    history.push("/list-polls");
    setSelectedPage("list-polls");
  });

  // OPTIONS BUTTONS
  // Add option button
  const addOptionHandle: () => void = () => {
    setOptionInputs(optionInputs.concat(""));
  };
  // Remove option button
  const removeOptionHandle: () => void = () => {
    const newOptionInputs = optionInputs.filter(
      (option: string, index: number) => {
        return index === optionInputs.length - 1 ? false : true;
      }
    );
    setOptionInputs(newOptionInputs);
  };

  // Return JSX
  return (
    <div className="page-wrapper page-wrapper--create-new">
      <h2 className="title h2">CREATE NEW</h2>
      {/* Add new poll form */}
      <form className="form" onSubmit={onSubmit}>
        {/* Title */}
        <div className="form__title">
          <label>Poll Title</label>
          <textarea
            className="textarea"
            name="title"
            maxLength={100}
            ref={register({ required: true })}
          />
          {notUniqueTitle && (
            <p className="error">Title name needs to be unique</p>
          )}
        </div>

        {/* Options */}
        <div className="form__poll-options">
          <label>Poll Answers</label>
          {optionInputs &&
            optionInputs.map((option, index) => {
              return (
                <div className="option" key={index}>
                  <label className="option__label">Option #{index + 1}</label>
                  <input
                    className="input"
                    name={`options.${index}`}
                    maxLength={100}
                    ref={register({ required: true })}
                  />
                </div>
              );
            })}
          {notUniqueOptions && (
            <p className="error">Options need to be unqiue</p>
          )}

          {/* Add & Remove option buttons*/}
          <div className="button-group">
            {optionInputs.length === 10 && (
              <p className="button-group__info">(Max 10 options is allowed)</p>
            )}
            {/* Add */}
            <button
              className="button-group__button"
              disabled={9 < optionInputs.length || submitLoading ? true : false}
              onClick={addOptionHandle}
            >
              ADD OPTION <i className="fas fa-plus"></i>
            </button>

            {/* Remove */}
            <button
              className="button-group__button"
              disabled={optionInputs.length < 3 || submitLoading ? true : false}
              onClick={removeOptionHandle}
            >
              REMOVE OPTION <i className="fas fa-minus"></i>
            </button>
          </div>
        </div>

        {/* Submit button */}
        <div className="poll-submit">
          <input
            className="poll-submit__button"
            type="submit"
            value={submitLoading ? "SUBMITTING..." : "SUBMIT POLL"}
            disabled={submitLoading}
          />
        </div>
      </form>
    </div>
  );
};

export default CreatePoll;
