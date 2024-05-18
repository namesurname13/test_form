import { useForm, Controller, FieldErrors } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Title from "../Title";
import NicheForm from "../NicheForm";
import ActivityForm from "../ActivityForm";
import ActivityTaskForm from "../ActivityTaskForm";
import { ActivityFormType, ResultDataType } from "../../utils/types";
import { SCHEMA, TELEGRAM } from "../../utils/constants";
import "./mainForm.css";
import { useEffect } from "react";
import { parseFormattedTextField } from "../../utils/tools";

const MainForm = () => {
  const {
    setFocus,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ActivityFormType>({
    resolver: yupResolver(SCHEMA),
  });
  console.log(errors);

  useEffect(() => {
    const firstErrorKey = Object.keys(errors).find(
      (key) => errors[key as keyof FieldErrors<ActivityFormType>]
    );

    if (firstErrorKey) {
      (
        document.querySelector(
          `input[name="${firstErrorKey}"]`
        ) as HTMLInputElement | null
      )?.focus();
    }
  }, [errors]);
  type ErrorsType = FieldErrors<ActivityFormType>;
  useEffect(() => {
    const firstErrorKey = Object.keys(errors).find(
      (key) => errors[key as keyof ErrorsType]
    ) as keyof ActivityFormType | undefined;

    if (firstErrorKey) {
      setFocus(firstErrorKey);
    }
  }, [errors, setFocus]);

  const onSubmit = (data: any) => {
    const {
      main_activity_emoji,
      main_activity_name,
      main_activity_description,
      niche_name_1,
      niche_description_1,
      niche_name_2,
      niche_description_2,
      niche_name_3,
      niche_description_3,
      activity_task_name_niche_1,
      activity_task_description_niche_1,
      activity_task_date_niche_1,
      activity_task_points_amount_niche_1,
      activity_task_name_niche_2,
      activity_task_description_niche_2,
      activity_task_date_niche_2,
      activity_task_points_amount_niche_2,
      activity_task_name_niche_3,
      activity_task_description_niche_3,
      activity_task_date_niche_3,
      activity_task_points_amount_niche_3,
      reward,
      prizes_number,
    } = data;

    const finalData: ResultDataType = {
      activity: {
        name: `${main_activity_emoji} ${main_activity_name}`,
        description: parseFormattedTextField(main_activity_description),
        reward,
        prizes_number,
      },
      niches: [
        {
          name: niche_name_1,
          description: parseFormattedTextField(niche_description_1),
          task: {
            name: activity_task_name_niche_1,
            description: parseFormattedTextField(
              activity_task_description_niche_1
            ),
            expiration_date: activity_task_date_niche_1.toISOString(),
            points: activity_task_points_amount_niche_1,
          },
        },
        {
          name: niche_name_2,
          description: parseFormattedTextField(niche_description_2),
          task: {
            name: activity_task_name_niche_2,
            description: parseFormattedTextField(
              activity_task_description_niche_2
            ),
            expiration_date: activity_task_date_niche_2.toISOString(),
            points: activity_task_points_amount_niche_2,
          },
        },
        {
          name: niche_name_3,
          description: parseFormattedTextField(niche_description_3),
          task: {
            name: activity_task_name_niche_3,
            description: parseFormattedTextField(
              activity_task_description_niche_3
            ),
            expiration_date: activity_task_date_niche_3.toISOString(),
            points: activity_task_points_amount_niche_3,
          },
        },
      ],
    };
    TELEGRAM.showPopup(
      {
        message: "Подтверди отправку формы",
        buttons: [
          {
            id: "submit",
            type: "default",
            text: "Подтвердить",
          },
          {
            id: "cancel",
            type: "cancel",
            text: "Отменить",
          },
        ],
      },
      (buttonId) => {
        if (buttonId === "submit") console.log(finalData);
      }
    );
    console.log(finalData);
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

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form">
      <div className="section">
        <ActivityForm control={control} errors={errors} />
      </div>
      <div className="section">
        <NicheForm control={control} errors={errors} id={"1"} />
        <ActivityTaskForm control={control} errors={errors} id={"1"} />
      </div>{" "}
      <div className="section">
        <NicheForm control={control} errors={errors} id={"2"} />
        <ActivityTaskForm control={control} errors={errors} id={"2"} />
      </div>
      <div className="section">
        <NicheForm control={control} errors={errors} id={"3"} />
        <ActivityTaskForm control={control} errors={errors} id={"3"} />
      </div>
      <div className="section">
        <Title title="💵 Призовой фонд (в рублях)" />
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
        <Title title="🏆 Количество призовых мест" />
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
      {/* <button type="submit">Отправить</button> */}
    </form>
  );
};

export default MainForm;
