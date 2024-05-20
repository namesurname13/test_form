import { useForm, Controller, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Title from "../Title";
import NicheForm from "../NicheForm";
import ActivityForm from "../ActivityForm";
import ActivityTaskForm from "../ActivityTaskForm";
import { ActivityFormType, ResultDataType } from "../../utils/types";
import { SCHEMA, TELEGRAM } from "../../utils/constants";
import "./mainForm.css";
import { useEffect, useState } from "react";
import { handleFocus, parseFormattedTextField } from "../../utils/tools";
import Button from "../Button";

const MainForm = () => {
  const {
    watch,
    setFocus,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ActivityFormType>({
    resolver: yupResolver(SCHEMA),
    shouldFocusError: false,
  });

  useEffect(() => {
    handleFocus(errors);
  }, [errors, setFocus]);
  const onSubmit = (data: any, e: any) => console.log("SUCCESS: ", data);
  const onError = (errors: any, e: any) => console.log("ERRORS: ", errors);
  const [nichesCount, setNichesCount] = useState<number>(0);
  const onSubmits = (data: any) => {
    // const finalData: ResultDataType = {
    //   activity: {
    //     name: `${main_activity_emoji} ${main_activity_name}`,
    //     description: parseFormattedTextField(main_activity_description),
    //     reward,
    //     prizes_number,
    //   },
    //   niches: [
    //     {
    //       name: niche_name_1,
    //       description: parseFormattedTextField(niche_description_1),
    //       task: {
    //         name: activity_task_name_niche_1,
    //         description: parseFormattedTextField(
    //           activity_task_description_niche_1
    //         ),
    //         expiration_date: activity_task_date_niche_1.toISOString(),
    //         points: activity_task_points_amount_niche_1,
    //       },
    //     },
    //     {
    //       name: niche_name_2,
    //       description: parseFormattedTextField(niche_description_2),
    //       task: {
    //         name: activity_task_name_niche_2,
    //         description: parseFormattedTextField(
    //           activity_task_description_niche_2
    //         ),
    //         expiration_date: activity_task_date_niche_2.toISOString(),
    //         points: activity_task_points_amount_niche_2,
    //       },
    //     },
    //     {
    //       name: niche_name_3,
    //       description: parseFormattedTextField(niche_description_3),
    //       task: {
    //         name: activity_task_name_niche_3,
    //         description: parseFormattedTextField(
    //           activity_task_description_niche_3
    //         ),
    //         expiration_date: activity_task_date_niche_3.toISOString(),
    //         points: activity_task_points_amount_niche_3,
    //       },
    //     },
    //   ],
    // };
    // TELEGRAM.showPopup(
    //   {
    //     message: "Подтверди отправку формы",
    //     buttons: [
    //       {
    //         id: "submit",
    //         type: "default",
    //         text: "Подтвердить",
    //       },
    //       {
    //         id: "cancel",
    //         type: "cancel",
    //         text: "Отменить",
    //       },
    //     ],
    //   },
    //   (buttonId) => {
    //     if (buttonId === "submit") console.log(finalData);
    //   }
    // );
    console.log("SUBMIT");
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handledSubmit = () => {
    handleSubmit(onSubmit)();
  };

  useEffect(() => {
    // Инициализация mainButton
    TELEGRAM.MainButton.setText("Отправить");
    TELEGRAM.MainButton.show();

    // Обработчик нажатия на mainButton
    TELEGRAM.onEvent("mainButtonClicked", handledSubmit);

    // Убираем mainButton при размонтировании компонента
    TELEGRAM.onEvent("mainButtonClicked", handledSubmit);
    return () => {
      TELEGRAM.offEvent("mainButtonClicked", handledSubmit);
    };
  }, [handledSubmit]);
  const { fields, append, remove } = useFieldArray({
    control,
    name: "niches",
  });

  const removeNiche = (index: number) => {
    remove(index);
    setNichesCount((state) => state - 1);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit, onError)} className="form">
      <div className="section">
        <ActivityForm control={control} errors={errors} />
      </div>
      {fields.map((field, index) => (
        <div className="section" key={field.id}>
          <NicheForm control={control} errors={errors} id={index} />
          <ActivityTaskForm control={control} errors={errors} id={index} />
          <Button
            text="Удалить нишу"
            type="button"
            onClick={() => {
              TELEGRAM && TELEGRAM.HapticFeedback.impactOccurred("light");
              TELEGRAM &&
                TELEGRAM.showPopup(
                  {
                    message: "Подтверди удаление ниши",
                    buttons: [
                      {
                        id: "submit",
                        type: "destructive",
                        text: "Удалить",
                      },
                      {
                        id: "cancel",
                        type: "cancel",
                        text: "Отменить",
                      },
                    ],
                  },
                  (buttonId) => {
                    if (buttonId === "submit") removeNiche(index);
                  }
                );
              !TELEGRAM && removeNiche(index);
            }}
          />
        </div>
      ))}
      <Button
        text="Добавить нишу"
        type="button"
        onClick={() => {
          TELEGRAM && TELEGRAM.HapticFeedback.impactOccurred("light");
          append(
            {
              niche_name: "",
              niche_description: "",
              //@ts-ignore
              activity_task_date: null,
              activity_task_description: "",
              activity_task_name: "",
              //@ts-ignore
              activity_task_points_amount: "",
            },
            {
              focusName: `niches.${nichesCount}.niche_name`,
            }
          );
          setNichesCount((state) => state + 1);
        }}
      />
      <div className="section">
        <Title title="💵 Призовой фонд (в рублях)" size="sub" />
        <Controller
          name="reward"
          control={control}
          render={({ field }) => (
            <div className="form-input_container">
              <input
                className="form-input"
                type="number"
                {...field}
                placeholder="Награда (в рублях)"
              />
              {errors.reward ? (
                <p className="error">{errors.reward?.message}</p>
              ) : (
                <p className="error"></p>
              )}
            </div>
          )}
        />
        <Title title="🏆 Количество призовых мест" size="sub" />
        <Controller
          name="prizes_number"
          control={control}
          render={({ field }) => (
            <div className="form-input_container">
              <input
                className="form-input"
                type="number"
                {...field}
                placeholder="Количество мест"
              />
              {errors.prizes_number ? (
                <p className="error">{errors.prizes_number?.message}</p>
              ) : (
                <p className="error"></p>
              )}
            </div>
          )}
        />
      </div>
      <button type="submit" onClick={() => console.log(watch())}>
        Отправить
      </button>
    </form>
  );
};

export default MainForm;
