const size = [
  "xs",
  "sm",
  "md",
  "lg",
  "xl"
] as const

const orientation = [
  "horizontal",
  "vertical"
] as const

export default {
  "base": "relative",
  "variants": {
    "size": {
      "xs": "",
      "sm": "",
      "md": "",
      "lg": "",
      "xl": ""
    },
    "orientation": {
      "horizontal": "inline-flex -space-x-px",
      "vertical": "flex flex-col -space-y-px"
    }
  }
}