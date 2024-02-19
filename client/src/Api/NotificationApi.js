import { publicRequest } from "../Request/RequestMethod";

export const friendNotification = async (newFriend) => {
  try {
    const FriendReq = await publicRequest.post("notification", newFriend);
    console.log("request send");
  } catch (err) {
    console.log("err friend notification", err);
  }
};
export const likeNotificationApi = async (newLike) => {
  try {
    console.log('like api ',newLike);
    const LikeNoti = await publicRequest.post("notification", newLike);
    console.log("like noti send", LikeNoti);
  } catch (err) {
    console.log("like noti error", err);
  }
};
export const commentNotificationApi = async (newComment) => {
  try {
    const CommentNoti = await publicRequest.post("notification", newComment);
    console.log("new comment send", CommentNoti);
  } catch (err) {
    console.log("comment api err", err);
  }
};
export const notificationData = async (id) => {
  try {
    const nData = await publicRequest.get(`notification/${id}`);
    console.log("notification data api", nData.data);
    return nData.data;
  } catch (err) {
    console.log("erere notificatin api", err);
  }
};

// delete notification
export const deleteNotificationApi = async (id) => {
  try {
    const deleteNoti = await publicRequest.delete(`notification/${id}`);
    console.log("notification deleted", deleteNoti);
  } catch (err) {
    console.log("delete notification err", err);
  }
};
