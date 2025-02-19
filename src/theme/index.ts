import { MantineThemeOverride } from "@mantine/core";

export const theme: MantineThemeOverride = {
  colorScheme: "dark",
  fontFamily:
    "Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif",
  primaryColor: "spaceNeutral",
  defaultRadius: "md",

  colors: {
    spaceNeutral: [
      "#FFFFFF", 
      "#F5F5F5",
      "#E5E5E5",
      "#D4D4D4",
      "#A3A3A3",
      "#737373",
      "#525252",
      "#22272B", // SpaceX Dark Gray
      "#181C1F", // SpaceX Darker Gray
      "#0F1112", // SpaceX Darkest
    ],
  },

  components: {
    Button: {
      styles: (theme) => ({
        root: {
          backgroundColor: "#FFFFFF",
          color: "#0F1112",
          border: "none",
          height: "42px",
          padding: "0 24px",
          fontSize: theme.fontSizes.sm,
          fontWeight: 500,
          transition: "all 0.2s ease",
          "&:hover": {
            backgroundColor: "#E5E5E5",
            transform: "translateY(-1px)",
          },
          "&:active": {
            transform: "translateY(0)",
          },
          "&[data-loading]": {
            backgroundColor: "#D4D4D4",
          },
          '&[data-variant="outline"]': {
            backgroundColor: "transparent",
            border: "1px solid #FFFFFF",
            color: "#FFFFFF",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.1)",
            },
          },
        },
      }),
    },

    Card: {
      styles: () => ({
        root: {
          backgroundColor: "#181C1F",
          backdropFilter: "blur(8px)",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: "0 12px 24px rgba(0, 0, 0, 0.2)",
          },
        },
      }),
    },

    Paper: {
      styles: () => ({
        root: {
          backgroundColor: "#0F1112",
          backdropFilter: "blur(8px)",
          border: "1px solid rgba(255, 255, 255, 0.08)",
        },
      }),
    },

    Badge: {
      styles: () => ({
        root: {
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          fontWeight: 600,
          padding: "0 10px",
          height: "22px",
          fontSize: "11px",
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          color: "#FFFFFF",
          border: "1px solid rgba(255, 255, 255, 0.2)",

          '&[data-variant="filled"]': {
            backgroundColor: "#FFFFFF",
            color: "#0F1112",
            borderColor: "transparent",
          },

          '&[data-variant="outline"]': {
            backgroundColor: "transparent",
            borderColor: "#FFFFFF",
            color: "#FFFFFF",
          },
        },
      }),
    },

    TextInput: {
      styles: () => ({
        input: {
          height: "42px",
          backgroundColor: "rgba(255, 255, 255, 0.05)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          color: "#FFFFFF",
          "&:focus": {
            borderColor: "#FFFFFF",
            backgroundColor: "rgba(255, 255, 255, 0.08)",
          },
          "&::placeholder": {
            color: "#737373",
          },
        },
        label: {
          marginBottom: "6px",
          fontSize: "0.875rem",
          fontWeight: 500,
          color: "#D4D4D4",
        },
      }),
    },

    Select: {
      styles: () => ({
        input: {
          height: "42px",
          backgroundColor: "rgba(255, 255, 255, 0.05)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          color: "#FFFFFF",
          "&:focus": {
            borderColor: "#FFFFFF",
            backgroundColor: "rgba(255, 255, 255, 0.08)",
          },
        },
        label: {
          marginBottom: "6px",
          fontSize: "0.875rem",
          fontWeight: 500,
          color: "#D4D4D4",
        },
      }),
    },
  },

  other: {
    headerHeight: "70px",
    sideNavWidth: "280px",
    maxContentWidth: "1440px",
    borderRadius: {
      sm: "4px",
      md: "6px",
      lg: "8px",
      xl: "12px",
    },
    boxShadow: {
      sm: "0 2px 4px rgba(0,0,0,0.08)",
      md: "0 4px 8px rgba(0,0,0,0.12)",
      lg: "0 8px 16px rgba(0,0,0,0.16)",
      xl: "0 12px 24px rgba(0,0,0,0.2)",
    },
    transition: {
      fast: "all 0.15s cubic-bezier(0.4, 0, 0.2, 1)",
      medium: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
      slow: "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
    },
    zIndex: {
      dropdown: 1000,
      sticky: 1020,
      fixed: 1030,
      modal: 1040,
      popover: 1050,
      tooltip: 1060,
    },
  },
};