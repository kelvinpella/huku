import { useState } from "react";
import CustomButton from "../Buttons/CustomButton";
import Modal from "../Modal/Modal";
import ForgotPasswordForm from "../Forms/ForgotPasswordForm/ForgotPasswordForm";
import { UserLoginForm } from "@/typings";
import { sendPasswordResetLinkAction } from "@/common/actions/sendPasswordResetLinkAction";
import { toastNotification } from "@/common/functions/toastNotification";

export default function ForgotPassword() {
  const [showModal, setShowModal] = useState(false);

  const toggleForgotPasswordHandler = () => {
    setShowModal((prev) => !prev);
  };

  const forgotPasswordSubmitHandler = async (
    values: Pick<UserLoginForm, "email">
  ) => {
    toggleForgotPasswordHandler();

    const origin = window.location.origin;
    const redirectPath = `${origin}/reset-password`;
    const { data } = await sendPasswordResetLinkAction(values, redirectPath);

    if (data) {
      toastNotification({
        args: [
          "You will receive an email with instructions to reset your password.",
          {
            type: "success",
          },
        ],
      });
    } else {
      toastNotification({
        args: [
          "Request failed. Please try again.",
          {
            type: "error",
          },
        ],
      });
    }
  };

  return (
    <>
      <div className="w-full text-sm pt-2 text-center">
        Forgot your password?{" "}
        <CustomButton
          variant="plain"
          onClick={toggleForgotPasswordHandler}
          className="!inline !font-semibold !text-spanish-violet"
        >
          Click here
        </CustomButton>
      </div>
      <Modal
        open={showModal}
        onClose={toggleForgotPasswordHandler}
        title={"Forgot Password"}
        description={
          "Please enter your email address to receive a password reset link."
        }
        cancelButtonAttributes={{
          value: "Cancel",
          onClick: toggleForgotPasswordHandler,
        }}
        submitButtonAttributes={{
          value: "Send",
          type: "submit",
          form: "forgot-password-form",
        }}
      >
        <ForgotPasswordForm
          forgotPasswordSubmitHandler={forgotPasswordSubmitHandler}
        />
      </Modal>
    </>
  );
}
