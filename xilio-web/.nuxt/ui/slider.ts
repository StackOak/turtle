const color = [
  "primary",
  "secondary",
  "success",
  "info",
  "warning",
  "error",
  "neutral"
] as const

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
  "slots": {
    "root": "relative flex items-center select-none touch-none",
    "track": "relative bg-(--ui-bg-accented) overflow-hidden rounded-full grow",
    "range": "absolute rounded-full",
    "thumb": "rounded-full bg-(--ui-bg) ring-2 focus-visible:outline-2 focus-visible:outline-offset-2"
  },
  "variants": {
    "color": {
      "primary": {
        "range": "bg-(--ui-primary)",
        "thumb": "ring-(--ui-primary) focus-visible:outline-(--ui-primary)/50"
      },
      "secondary": {
        "range": "bg-(--ui-secondary)",
        "thumb": "ring-(--ui-secondary) focus-visible:outline-(--ui-secondary)/50"
      },
      "success": {
        "range": "bg-(--ui-success)",
        "thumb": "ring-(--ui-success) focus-visible:outline-(--ui-success)/50"
      },
      "info": {
        "range": "bg-(--ui-info)",
        "thumb": "ring-(--ui-info) focus-visible:outline-(--ui-info)/50"
      },
      "warning": {
        "range": "bg-(--ui-warning)",
        "thumb": "ring-(--ui-warning) focus-visible:outline-(--ui-warning)/50"
      },
      "error": {
        "range": "bg-(--ui-error)",
        "thumb": "ring-(--ui-error) focus-visible:outline-(--ui-error)/50"
      },
      "neutral": {
        "range": "bg-(--ui-bg-inverted)",
        "thumb": "ring-(--ui-border-inverted) focus-visible:outline-(--ui-border-inverted)/50"
      }
    },
    "size": {
      "xs": {
        "thumb": "size-3"
      },
      "sm": {
        "thumb": "size-3.5"
      },
      "md": {
        "thumb": "size-4"
      },
      "lg": {
        "thumb": "size-4.5"
      },
      "xl": {
        "thumb": "size-5"
      }
    },
    "orientation": {
      "horizontal": {
        "root": "w-full",
        "range": "h-full"
      },
      "vertical": {
        "root": "flex-col h-full",
        "range": "w-full"
      }
    },
    "disabled": {
      "true": {
        "root": "opacity-75 cursor-not-allowed"
      }
    }
  },
  "compoundVariants": [
    {
      "orientation": "horizontal" as typeof orientation[number],
      "size": "xs" as typeof size[number],
      "class": {
        "track": "h-[6px]"
      }
    },
    {
      "orientation": "horizontal" as typeof orientation[number],
      "size": "sm" as typeof size[number],
      "class": {
        "track": "h-[7px]"
      }
    },
    {
      "orientation": "horizontal" as typeof orientation[number],
      "size": "md" as typeof size[number],
      "class": {
        "track": "h-[8px]"
      }
    },
    {
      "orientation": "horizontal" as typeof orientation[number],
      "size": "lg" as typeof size[number],
      "class": {
        "track": "h-[9px]"
      }
    },
    {
      "orientation": "horizontal" as typeof orientation[number],
      "size": "xl" as typeof size[number],
      "class": {
        "track": "h-[10px]"
      }
    },
    {
      "orientation": "vertical" as typeof orientation[number],
      "size": "xs" as typeof size[number],
      "class": {
        "track": "w-[6px]"
      }
    },
    {
      "orientation": "vertical" as typeof orientation[number],
      "size": "sm" as typeof size[number],
      "class": {
        "track": "w-[7px]"
      }
    },
    {
      "orientation": "vertical" as typeof orientation[number],
      "size": "md" as typeof size[number],
      "class": {
        "track": "w-[8px]"
      }
    },
    {
      "orientation": "vertical" as typeof orientation[number],
      "size": "lg" as typeof size[number],
      "class": {
        "track": "w-[9px]"
      }
    },
    {
      "orientation": "vertical" as typeof orientation[number],
      "size": "xl" as typeof size[number],
      "class": {
        "track": "w-[10px]"
      }
    }
  ],
  "defaultVariants": {
    "size": "md" as typeof size[number],
    "color": "primary" as typeof color[number]
  }
}