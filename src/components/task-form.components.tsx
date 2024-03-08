import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import Button from "./button.components";

interface TaskFormProps {
  onSubmit: (values: { message: string }) => void;
  title?: string;
  onClose: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit, title, onClose }) => {
  return (
    <Formik
      initialValues={{ message: title ? title : "" }}
      validationSchema={Yup.object({
        message: Yup.string()
          .required("Required")
          .max(250, "Message must be at most 250 characters"),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(true);
        onSubmit(values);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form className="w-full mt-[20px]">
          <div className="mb-4">
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700"
            >
              Task
            </label>
            <Field
              as="textarea"
              id="message"
              name="message"
              rows="4"
              className="resize-none p-[5px] mt-1 block w-full border-[2px] border-gray-300 rounded-md shadow-sm focus:border-[#6528F7] sm:text-sm outline-none"
            />
            <ErrorMessage
              name="message"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>
          <div className="grid grid-cols-2 gap-x-[30px]">
            <Button type="button" onClick={onClose} variant="secondary">
              Cancel
            </Button>

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default TaskForm;
