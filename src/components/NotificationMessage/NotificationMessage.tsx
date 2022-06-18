import tw from "tailwind-styled-components";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@store/hooks/hooks";
import { MESSAGE_REMOVE_DELAY } from "@global/vars";
import { userActions } from "@store/slices/user";
import { useLocation } from "react-router-dom";
import { selectNotification } from "@store/selectors/selectors";
import { StatusTypes } from "@store/types/userTypes";

interface MessageProps {
  $status: StatusTypes;
}

export const NotificationMessage = () => {
  const dispatch = useAppDispatch();
  const notification = useAppSelector(selectNotification);
  const location = useLocation();

  useEffect(() => {
    dispatch(userActions.resetMessage());
  }, [location]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch(userActions.resetMessage());
    }, MESSAGE_REMOVE_DELAY);

    return () => clearTimeout(timeout);
  }, [notification, dispatch]);

  return notification ? (
    <MessageContainer $status={notification.status}>
      {notification.content}
    </MessageContainer>
  ) : null;
};

const MessageContainer = tw.div<MessageProps>`
    ${(p: { $status: StatusTypes }) =>
      p.$status === StatusTypes.Error ? "bg-red-700" : "bg-green-700"}
    container-fluid
    w-full
    text-center
    text-white
`;
