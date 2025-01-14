import { createRoot } from "react-dom/client";

import React from "react";
import { ProfileForm } from "./ProfileForm";

const root = createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <ProfileForm />
  </React.StrictMode>
);
