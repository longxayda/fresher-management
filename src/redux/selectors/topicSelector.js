export const listTopicSelector = (state) => state.topicModule.listTopic;
export const isLoadingSelector = (state) => state.topicModule.isLoading;
export const isErrorTopicSelector = (state) => state.topicModule.isErrorTopic;
export const isSuccessTopicSelector = (state) => state.topicModule.isSuccessTopic

import { createSelector } from "@reduxjs/toolkit";

export const selectScore = createSelector(
  (state) => state.topic.score,
  (score) => Object.keys(score).map((key) => score[key])
);

export const selectQuiz = createSelector(
  (state) => state.topic.detailTraineeMark,
  (detailTraineeMark) => {
    return detailTraineeMark?.list
      ?.filter((row) => row.type == "quiz")
      .map((item) => {
        return {
          score: item.score,
          moduleSubjectMarkId: item.module_subject_mark_id,
        };
      });
  }
);
export const selectAssignment = createSelector(
  (state) => state.topic.detailTraineeMark,
  (detailTraineeMark) =>
    detailTraineeMark?.list
      ?.filter((item) => item.type === "assignment")
      .map((item) => {
        return {
          score: item.score,
          moduleSubjectMarkId: item.module_subject_mark_id,
        };
      })
);
export const selectFinalMark = createSelector(
  (state) => state.topic.detailTraineeMark,
  (detailTraineeMark) =>
    detailTraineeMark?.list
      ?.filter(
        (item) => item.type === "final_audit" || item.type === "final_practice"
      )
      .sort((a, b) => {
        return a.type.localeCompare(b.type);
      })
      .map((item) => {
        return {
          score: item.score,
          moduleSubjectMarkId: item.module_subject_mark_id,
        };
      })
);
