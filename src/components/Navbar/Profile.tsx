import { profileMenuItems } from "@/common/data/profileMenuItems";
import { v4 as uuid4 } from "uuid";
import CustomMenu from "../Menu/CustomMenu";
import { getRenderedLinkOrButtonMenuItem } from "@/common/functions/getRenderedLinkOrButtonMenuItem";
import { CustomMenuItem } from "@/typings";
import { deleteUserAccountAction } from "@/common/actions/deleteUserAccountAction";
import { toastNotification } from "@/common/functions/toastNotification";
import { useState } from "react";
import Modal from "../Modal/Modal";
import { useUser } from "@/common/hooks/useUser";
import { logoutUser } from "@/common/functions/logoutUser";

type Props = {
  popOver?: boolean;
  closePopOver?: () => void;
};

export default function Profile({ popOver, closePopOver }: Props) {
  const { user } = useUser();

  const [showModal, setShowModal] = useState(false);
  const deleteAccountTitle = "Delete My Account";
  const deleteAccountDescription =
    "Remove your account and all associated data";
  const deleteAccountChildren = (
    <div className="py-2 my-4">
      <p>
        You are about to permanently delete your account. This action will erase
        all your account information, including your settings, usage history,
        and any stored data. This process is irreversible.
      </p>
      <br />
      <p>Are you sure you want to proceed?</p>
    </div>
  );

  const toggleModelHandler = () => {
    setShowModal((prev) => !prev);
  };

  const deleteUserAccountHandler = async () => {
    toggleModelHandler();
    const { data } = await deleteUserAccountAction(user?.id);
    if (data.user) {
      await logoutUser();
      closePopOver?.();
      return;
    }

    // error
    toastNotification({
      args: [
        "Failed to delete account. Please try again later.",
        {
          type: "error",
        },
      ],
    });
    closePopOver?.();
  };

  const handleButtonClick = async (actionName: CustomMenuItem["action"]) => {
    if (actionName === "delete-account") {
      toggleModelHandler();
    } else {
      await logoutUser();
      closePopOver?.();
    }
  };

  const profileItems = profileMenuItems.map((item) => {
    const linkOrButton = getRenderedLinkOrButtonMenuItem(
      item,
      handleButtonClick
    );
    return linkOrButton;
  });

  const renderedComponent = popOver ? (
    profileItems.map((item) => (
      <div key={uuid4()} className="p-1 hover:bg-purple-illusionist rounded">
        {item}
      </div>
    ))
  ) : (
    <CustomMenu
      componentName={"profile"}
      buttonClickHandler={handleButtonClick}
      containerClassName="top-9 left-auto right-0"
    />
  );

  return (
    <>
      {renderedComponent}
      <Modal
        open={showModal}
        onClose={toggleModelHandler}
        title={deleteAccountTitle}
        description={deleteAccountDescription}
        cancelButtonAttributes={{
          value: "Cancel",
          onClick: toggleModelHandler,
        }}
        submitButtonAttributes={{
          value: "Delete",
          variant: "danger",
          onClick: deleteUserAccountHandler,
        }}
      >
        {deleteAccountChildren}
      </Modal>
    </>
  );
}
