import * as yup from "yup";
import { countEmojis } from "./tools";

export const TELEGRAM = window.Telegram.WebApp;

export const FORMAT_OPTIONS = {
  inlineStyles: {
    SPOILER: {
      element: "span",
      attributes: { class: "tg-spoiler" },
    },
  },
};

// Валидатор для эмоджи
export const EMOJI_REGEX =
  /(?:\p{Emoji}|\p{Emoji_Presentation}|\p{Extended_Pictographic}){1}/gu;

//Схема валидации
export const SCHEMA = yup.object().shape({
  // Активность
  main_activity_emoji: yup
    .string()
    .matches(EMOJI_REGEX, "Только эмоджи")
    .required("Обязательное поле")
    .test(
      "max-emoji",
      "Только 1 эмоджи",
      (value) => countEmojis(value, EMOJI_REGEX) <= 1
    ),
  main_activity_name: yup.string().required("Обязательное поле"),
  main_activity_description: yup.string().required("Обязательное поле"),

  // Ниша 1
  niche_name_1: yup.string().required("Обязательное поле"),
  niche_description_1: yup.string().required("Обязательное поле"),
  activity_task_name_niche_1: yup.string().required("Обязательное поле"),
  activity_task_description_niche_1: yup.string().required("Обязательное поле"),
  activity_task_date_niche_1: yup.date().required("Обязательное поле"),
  activity_task_points_amount_niche_1: yup
    .number()
    .typeError("Должно быть числом")
    .required("Обязательное поле"),

  // Ниша 2
  niche_name_2: yup.string().required("Обязательное поле"),
  niche_description_2: yup.string().required("Обязательное поле"),
  activity_task_name_niche_2: yup.string().required("Обязательное поле"),
  activity_task_description_niche_2: yup.string().required("Обязательное поле"),
  activity_task_date_niche_2: yup.date().required("Обязательное поле"),
  activity_task_points_amount_niche_2: yup
    .number()
    .typeError("Должно быть числом")
    .required("Обязательное поле"),

  // Ниша 3
  niche_name_3: yup.string().required("Обязательное поле"),
  niche_description_3: yup.string().required("Обязательное поле"),
  activity_task_name_niche_3: yup.string().required("Обязательное поле"),
  activity_task_description_niche_3: yup.string().required("Обязательное поле"),
  activity_task_date_niche_3: yup.date().required("Обязательное поле"),
  activity_task_points_amount_niche_3: yup
    .number()
    .typeError("Должно быть числом")
    .required("Обязательное поле"),

  // Призы
  reward: yup
    .number()
    .typeError("Должно быть числом")
    .required("Обязательное поле"),
  prizes_number: yup
    .number()
    .typeError("Должно быть числом")
    .required("Обязательное поле"),
});
