import { CHANGE_EMAIL } from "./actionType";

//  export const getReviewQuestions = () => (dispatch) => {
//     axios
//       .get(`/rating/question-list`, {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       })
//       .then((res) => {
//         console.log("datares", res);
//         dispatch(setReviewQuestionsInRedux(res?.data?.data ?? []));
//       })
//       .catch((err) => {});
//   };
export const setChangeEmail = (email) => (dispatch) => {
  dispatch({
    type: CHANGE_EMAIL,
    payload: email,
  });
};
