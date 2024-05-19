import { useEffect } from "react";
import "./App.css";
import MainForm from "./components/MainForm";
import Title from "./components/Title";
import { TELEGRAM } from "./utils/constants";

function App() {
  useEffect(() => TELEGRAM.expand(), []);

  return (
    <div className="App">
      <p style={{ color: "var(--tg-theme-bg-color)" }}>bg_color</p>
      <p style={{ color: "var(--tg-theme-text-color)" }}>text_color</p>
      <p style={{ color: "var(--tg-theme-hint-color)" }}>hint_color</p>
      <p style={{ color: "var(--tg-theme-link-color)" }}>link_color</p>
      <p style={{ color: "var(--tg-theme-button-color)" }}>button_color</p>
      <p style={{ color: "var(--tg-theme-button-text-color)" }}>
        button_text_color
      </p>
      <p style={{ color: "var(--tg-theme-secondary-bg-color)" }}>
        secondary_bg_color
      </p>
      <p style={{ color: "var(--tg-theme-header-bg-color)" }}>
        header_bg_color
      </p>
      <p style={{ color: "var(--tg-theme-accent-text-color)" }}>
        accent_text_color
      </p>
      <p style={{ color: "var(--tg-theme-section-bg-color)" }}>
        section_bg_color
      </p>
      <p style={{ color: "var(--tg-theme-section-header-text-color)" }}>
        section_header_text_color
      </p>
      <p style={{ color: "var(--tg-theme-subtitle-text-color)" }}>
        subtitle_text_color
      </p>
      <p style={{ color: "var(--tg-theme-destructive-text-color)" }}>
        destructive_text_color
      </p>
      <Title size="big" title="⚡️ Запуск активности" />
      <MainForm />
    </div>
  );
}

export default App;
