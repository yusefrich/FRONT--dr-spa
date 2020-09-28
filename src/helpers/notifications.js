import { notification } from "antd";

export const notifyError = ({ title, message }) => {
  notification["error"]({
    message: title,
    description: message,
  });
};

export const notifySuccess = ({ title, message }) => {
  notification["success"]({
    message: title,
    description: message,
  });
};

export const notifyInfo = ({ title, message }) => {
  notification["info"]({
    message: title,
    description: message,
  });
};
