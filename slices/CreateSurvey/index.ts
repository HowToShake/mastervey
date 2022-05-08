import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";
import { uniqBy } from "lodash";

interface TypeOptionsProps {
  id: string;
  label: string;
}

interface NewQuestionProps {
  id: string;
  question: string;
  type:
    | "singleChoice"
    | "multipleChoice"
    | "shortText"
    | "longText"
    | "scale"
    | "date"
    | "time";
  typeOptions: TypeOptionsProps[] | null;
  isRequired: boolean;
}

interface SurveyFromDB {
  name: string;
  create: Record<string, unknown>[];
  answers: Record<string, unknown>[];
  userId: string;
}

export interface CreateSurveyState {
  createSurvey: NewQuestionProps[];
  surveys: SurveyFromDB[];
}

const initialState: CreateSurveyState = {
  createSurvey: [],
  surveys: [],
};

export const createSurveySlice = createSlice({
  name: "createSurvey",
  initialState,
  reducers: {
    createNewQuestion: (state) => {
      const newQuestion: NewQuestionProps = {
        isRequired: false,
        type: "singleChoice",
        id: nanoid(),
        question: "",
        typeOptions: [],
      };
      state.createSurvey.push(newQuestion);
    },
    changeQuestionState: (
      state,
      action: PayloadAction<{
        key: keyof NewQuestionProps;
        value: unknown;
        questionId: string;
      }>
    ) => {
      const currentState = current(state.createSurvey);
      const questionId = action.payload?.questionId;

      const oldQuestion = currentState?.find((question) => {
        return question?.id === questionId;
      });

      const newQuestion = {
        ...oldQuestion,
        [action.payload.key]: action.payload.value,
      };

      state.createSurvey = currentState.map((obj) =>
        obj.id === questionId ? newQuestion : obj
      );
    },
    addTypeOption: (state, action: PayloadAction<{ questionId: string }>) => {
      const currentState = current(state.createSurvey);
      const questionId = action.payload?.questionId;

      const question = currentState?.find(
        (question) => question?.id === questionId
      );

      const newQuestion = {
        ...question,
        typeOptions: [
          ...(question?.typeOptions || []),
          { id: nanoid(), label: "" },
        ],
      };

      state.createSurvey = currentState.map((obj) =>
        obj.id === questionId ? newQuestion : obj
      );
    },
    updateTypeOption: (
      state,
      action: PayloadAction<{
        id: string;
        label: string;
        value?: unknown;
        questionId: string;
      }>
    ) => {
      const currentState = current(state.createSurvey);
      const questionId = action.payload?.questionId;
      const typeOptionId = action?.payload?.id;

      const question = currentState?.find(
        (question) => question?.id === questionId
      );

      const selectedTypeOption = question?.typeOptions?.find(
        ({ id }) => id === typeOptionId
      );

      const newTypeOption = {
        ...selectedTypeOption,
        label: action.payload?.label,
      };

      const newTypeOptions = question.typeOptions.map((obj) =>
        obj.id === typeOptionId ? newTypeOption : obj
      );

      const newQuestion = {
        ...question,
        typeOptions: newTypeOptions,
      };

      state.createSurvey = currentState.map((obj) =>
        obj.id === questionId ? newQuestion : obj
      );
    },
    deleteTypeOption: (
      state,
      action: PayloadAction<{ id: string; questionId: string }>
    ) => {
      const currentState = current(state.createSurvey);
      const questionId = action.payload?.questionId;
      const typeOptionId = action?.payload?.id;

      const question = currentState?.find(
        (question) => question?.id === questionId
      );

      const newTypeOptions = question.typeOptions?.filter((object) => {
        return object?.id !== typeOptionId;
      });

      const newQuestion = {
        ...question,
        typeOptions: newTypeOptions,
      };

      state.createSurvey = currentState.map((obj) =>
        obj.id === questionId ? newQuestion : obj
      );
    },
    saveSurvey: (state, action: PayloadAction<{ data: SurveyFromDB[] }>) => {
      state.surveys = action.payload.data;
    },
    moveIncomingSurveyToCreateSurvey: (
      state,
      action: PayloadAction<{ name: string }>
    ) => {
      const currentSurvey = current(state.surveys).find(
        (survey) => survey?.name === action.payload?.name
      );

      console.log("currentSurvey", currentSurvey?.name);

      if (!currentSurvey || currentSurvey?.create?.length === 0) {
        state.createSurvey = [];
        return;
      }

      // @ts-ignore
      state.createSurvey = [...currentSurvey?.create];
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  createNewQuestion,
  changeQuestionState,
  addTypeOption,
  updateTypeOption,
  deleteTypeOption,
  saveSurvey,
  moveIncomingSurveyToCreateSurvey,
} = createSurveySlice.actions;

export default createSurveySlice.reducer;
