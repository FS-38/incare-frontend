import axios from "axios";

export function submitAnswers(newQuizResult) {
    return {
        type: "SUBMIT_ANSWERS",
        payload: newQuizResult
    }
};

export function quizAnswers(userId, userResults) {
  return async function (dispatch) {
    try {
      const response = await axios.post(
        `https://incare-backend-production.up.railway.app/hasilquizzes/quiz`,
       JSON.stringify(userResults),
        {
          headers: {
            "Content-Type": "application/json",
           "Authorization" : "bearer " + localStorage.getItem("token")
          },
        }
      );
      const newQuizResult = await response.data;
      dispatch(submitAnswers(newQuizResult, userId));
    } catch (error) {
      console.log(error.message);
    }
  };
};
   
        
export function fetchAllResults(quizResults) {
    return {
        type: "FETCH_ALL_RESULTS",
        payload: quizResults
    }
} 

export function allResults () {
    return async function(dispatch) {
        const response = await axios.get(`https://incare-backend-production.up.railway.app/hasilquizzes`)
        const quizResults = response.data;
        dispatch(fetchAllResults(quizResults))
    }
}

export function fetchUserResults(userResults) {
    return {
        type: "FETCH_USER_RESULTS",
        payload: userResults
    }
}

export function userQuizResults(userId) {
   return async function(dispatch) {
    const response = await axios.get(`https://incare-backend-production.up.railway.app/hasilquizzes/${userId}`);
    const userResults = response.data;
    dispatch(fetchAllResults(userResults));
   }
}
        