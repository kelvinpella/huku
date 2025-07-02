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
  const { user, isLoading } = useUser();

  const [showModal, setShowModal] = useState(false);
  const deleteAccountTitle = "Futa Akaunti Yangu";
  const deleteAccountDescription = "Ondoa akaunti na data zako zote";
  const deleteAccountChildren = (
    <div className="py-2 my-4">
      <p>
        Unakaribia kufuta akaunti yako kabisa. Hatua hii itafuta taarifa zako
        zote za akaunti, ikiwa ni pamoja na mipangilio yako, historia ya
        matumizi, na data yoyote iliyohifadhiwa. Hatua hii haiwezi kurudishwa
        nyuma.
      </p>
      <br />
      <p>Je, una uhakika unataka kuendelea?</p>
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
        "Imeshindikana kufuta akaunti. Jaribu baadae.",
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

  if (!user || isLoading) return null;
  return (
    <>
      {renderedComponent}
      <Modal
        open={showModal}
        onClose={toggleModelHandler}
        title={deleteAccountTitle}
        description={deleteAccountDescription}
        cancelButtonValue={"Ghairi"}
        cancelButtonHandler={toggleModelHandler}
        submitButtonValue={"Futa"}
        submitButtonVariant="danger"
        submitButtonType="button"
        submitButtonHandler={deleteUserAccountHandler}
      >
        {deleteAccountChildren}
      </Modal>
    </>
  );
}
