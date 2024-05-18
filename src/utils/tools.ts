import { convertFromRaw } from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import { FORMAT_OPTIONS } from "./constants";

// Функция для подсчета эмоджи в строке
export const countEmojis = (str: string) => {
  const joiner = "\u{200D}";
  const split = str.split(joiner);
  let count = 0;

  for (const s of split) {
    const num = Array.from(s.split(/[\ufe00-\ufe0f]/).join("")).length;
    count += num;
  }

  return count / split.length;
};

export const parseFormattedTextField = (field: string) => {
  const rawContent = JSON.parse(field);
  const contentState = convertFromRaw(rawContent);
  const htmlContent = stateToHTML(contentState, FORMAT_OPTIONS);
  return htmlContent;
};
