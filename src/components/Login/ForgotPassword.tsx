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
          "Utapokea ujumbe kwenye barua pepe ili kubadili nywila",
          {
            type: "success",
          },
        ],
      });
    } else {
      toastNotification({
        args: [
          "Imeshindikana. Jaribu tena",
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
        Kama umesahau nywila,{" "}
        <CustomButton
          variant="plain"
          onClick={toggleForgotPasswordHandler}
          className="!inline !font-semibold !text-spanish-violet"
        >
          Bofya hapa
        </CustomButton>
      </div>
      <Modal
        open={showModal}
        onClose={toggleForgotPasswordHandler}
        title={"Nimesahau Nywila (Password)"}
        description={"Weka anwani yako ya barua pepe ili uweze badili nywila."}
        cancelButtonAttributes={{
          value: "Ghairi",
          onClick: toggleForgotPasswordHandler,
        }}
        submitButtonAttributes={{
          value: "Tuma",
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
