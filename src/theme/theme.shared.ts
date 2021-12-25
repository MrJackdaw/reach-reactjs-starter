const sizes = {
  xxs: "0.125rem",
  xs: "0.3rem",
  sm: "0.6rem",
  default: "1rem",
  md: "1.4rem",
  lg: "2.1rem",
  xlg: "2.6rem",
  xxlg: "3.2rem",
  xxxlg: "4.8rem",
};

const presets = {
  elevated: {
    md: `0 ${sizes.xs} ${sizes.xs}`,
    sm: `0 ${sizes.xxs} ${sizes.xs}`,
    lg: `0 ${sizes.sm} ${sizes.xs}`,
    xlg: `0 ${sizes.default} ${sizes.xs}`,
  },

  rounded: {
    xlg: `72px`,
    lg: `48px`,
    md: `16px`,
    sm: `4px`,
  },
};

const shared = {
  sizes,
  presets,
};

export default shared;
