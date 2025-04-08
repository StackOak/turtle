const color = [
  "primary",
  "secondary",
  "success",
  "info",
  "warning",
  "error",
  "neutral"
] as const

const orientation = [
  "horizontal",
  "vertical"
] as const

const size = [
  "xs",
  "sm",
  "md",
  "lg",
  "xl"
] as const

const type = [
  "solid",
  "dashed",
  "dotted"
] as const

export default {
  "slots": {
    "root": "flex items-center align-center text-center",
    "border": "",
    "container": "font-medium text-(--ui-text) flex",
    "icon": "shrink-0 size-5",
    "avatar": "shrink-0",
    "avatarSize": "2xs",
    "label": "text-sm"
  },
  "variants": {
    "color": {
      "primary": {
        "border": "border-(--ui-primary)"
      },
      "secondary": {
        "border": "border-(--ui-secondary)"
      },
      "success": {
        "border": "border-(--ui-success)"
      },
      "info": {
        "border": "border-(--ui-info)"
      },
      "warning": {
        "border": "border-(--ui-warning)"
      },
      "error": {
        "border": "border-(--ui-error)"
      },
      "neutral": {
        "border": "border-(--ui-border)"
      }
    },
    "orientation": {
      "horizontal": {
        "root": "w-full flex-row",
        "border": "w-full",
        "container": "mx-3 whitespace-nowrap"
      },
      "vertical": {
        "root": "h-full flex-col",
        "border": "h-full",
        "container": "my-2"
      }
    },
    "size": {
      "xs": "",
      "sm": "",
      "md": "",
      "lg": "",
      "xl": ""
    },
    "type": {
      "solid": {
        "border": "border-solid"
      },
      "dashed": {
        "border": "border-dashed"
      },
      "dotted": {
        "border": "border-dotted"
      }
    }
  },
  "compoundVariants": [
    {
      "orientation": "horizontal" as typeof orientation[number],
      "size": "xs" as typeof size[number],
      "class": {
        "border": "border-t"
      }
    },
    {
      "orientation": "horizontal" as typeof orientation[number],
      "size": "sm" as typeof size[number],
      "class": {
        "border": "border-t-[2px]"
      }
    },
    {
      "orientation": "horizontal" as typeof orientation[number],
      "size": "md" as typeof size[number],
      "class": {
        "border": "border-t-[3px]"
      }
    },
    {
      "orientation": "horizontal" as typeof orientation[number],
      "size": "lg" as typeof size[number],
      "class": {
        "border": "border-t-[4px]"
      }
    },
    {
      "orientation": "horizontal" as typeof orientation[number],
      "size": "xl" as typeof size[number],
      "class": {
        "border": "border-t-[5px]"
      }
    },
    {
      "orientation": "vertical" as typeof orientation[number],
      "size": "xs" as typeof size[number],
      "class": {
        "border": "border-s"
      }
    },
    {
      "orientation": "vertical" as typeof orientation[number],
      "size": "sm" as typeof size[number],
      "class": {
        "border": "border-s-[2px]"
      }
    },
    {
      "orientation": "vertical" as typeof orientation[number],
      "size": "md" as typeof size[number],
      "class": {
        "border": "border-s-[3px]"
      }
    },
    {
      "orientation": "vertical" as typeof orientation[number],
      "size": "lg" as typeof size[number],
      "class": {
        "border": "border-s-[4px]"
      }
    },
    {
      "orientation": "vertical" as typeof orientation[number],
      "size": "xl" as typeof size[number],
      "class": {
        "border": "border-s-[5px]"
      }
    }
  ],
  "defaultVariants": {
    "color": "neutral" as typeof color[number],
    "size": "xs" as typeof size[number],
    "type": "solid" as typeof type[number]
  }
}