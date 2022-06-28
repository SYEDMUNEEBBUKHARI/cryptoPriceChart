import { theme } from "styles";

// export const AXIS_COLOR = theme.colors.primary;
export const AXIS_BOTTOM_TICK_LABEL_PROPS = {
  textAnchor: "middle" as const,
  fontFamily: "Roboto",
  fontSize: 10,
  fill: "blue",
};
export const AXIS_LEFT_TICK_LABEL_PROPS = {
  dx: "-0.25em",
  dy: "0.25em",
  fontFamily: "Roboto",
  fontSize: 10,
  textAnchor: "end" as const,
  fill: "blue",
};
