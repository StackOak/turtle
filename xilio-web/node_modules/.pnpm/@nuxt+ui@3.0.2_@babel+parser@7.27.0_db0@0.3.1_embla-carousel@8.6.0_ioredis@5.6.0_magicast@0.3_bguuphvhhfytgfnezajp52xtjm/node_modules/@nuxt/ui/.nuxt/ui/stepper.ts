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

const color = [
  "primary",
  "secondary",
  "success",
  "info",
  "warning",
  "error",
  "neutral"
] as const

export default {
  "slots": {
    "root": "flex gap-4",
    "header": "flex",
    "item": "group text-center relative w-full",
    "container": "relative",
    "trigger": "rounded-full font-medium text-center align-middle flex items-center justify-center font-semibold group-data-[state=completed]:text-(--ui-bg) group-data-[state=active]:text-(--ui-bg) text-(--ui-text-muted) bg-(--ui-bg-elevated) focus-visible:outline-2 focus-visible:outline-offset-2",
    "indicator": "flex items-center justify-center size-full",
    "icon": "shrink-0",
    "separator": "absolute rounded-full group-data-[disabled]:opacity-75 bg-(--ui-border-accented)",
    "wrapper": "",
    "title": "font-medium text-(--ui-text)",
    "description": "text-(--ui-text-muted) text-wrap",
    "content": "size-full"
  },
  "variants": {
    "orientation": {
      "horizontal": {
        "root": "flex-col",
        "container": "flex justify-center",
        "separator": "top-[calc(50%-2px)] h-0.5",
        "wrapper": "mt-1"
      },
      "vertical": {
        "header": "flex-col gap-4",
        "item": "flex text-start",
        "separator": "start-[calc(50%-1px)] -bottom-[10px] w-0.5"
      }
    },
    "size": {
      "xs": {
        "trigger": "size-6 text-xs",
        "icon": "size-3",
        "title": "text-xs",
        "description": "text-xs",
        "wrapper": "mt-1.5"
      },
      "sm": {
        "trigger": "size-8 text-sm",
        "icon": "size-4",
        "title": "text-xs",
        "description": "text-xs",
        "wrapper": "mt-2"
      },
      "md": {
        "trigger": "size-10 text-base",
        "icon": "size-5",
        "title": "text-sm",
        "description": "text-sm",
        "wrapper": "mt-2.5"
      },
      "lg": {
        "trigger": "size-12 text-lg",
        "icon": "size-6",
        "title": "text-base",
        "description": "text-base",
        "wrapper": "mt-3"
      },
      "xl": {
        "trigger": "size-14 text-xl",
        "icon": "size-7",
        "title": "text-lg",
        "description": "text-lg",
        "wrapper": "mt-3.5"
      }
    },
    "color": {
      "primary": {
        "trigger": "group-data-[state=completed]:bg-(--ui-primary) group-data-[state=active]:bg-(--ui-primary) focus-visible:outline-(--ui-primary)",
        "separator": "group-data-[state=completed]:bg-(--ui-primary)"
      },
      "secondary": {
        "trigger": "group-data-[state=completed]:bg-(--ui-secondary) group-data-[state=active]:bg-(--ui-secondary) focus-visible:outline-(--ui-secondary)",
        "separator": "group-data-[state=completed]:bg-(--ui-secondary)"
      },
      "success": {
        "trigger": "group-data-[state=completed]:bg-(--ui-success) group-data-[state=active]:bg-(--ui-success) focus-visible:outline-(--ui-success)",
        "separator": "group-data-[state=completed]:bg-(--ui-success)"
      },
      "info": {
        "trigger": "group-data-[state=completed]:bg-(--ui-info) group-data-[state=active]:bg-(--ui-info) focus-visible:outline-(--ui-info)",
        "separator": "group-data-[state=completed]:bg-(--ui-info)"
      },
      "warning": {
        "trigger": "group-data-[state=completed]:bg-(--ui-warning) group-data-[state=active]:bg-(--ui-warning) focus-visible:outline-(--ui-warning)",
        "separator": "group-data-[state=completed]:bg-(--ui-warning)"
      },
      "error": {
        "trigger": "group-data-[state=completed]:bg-(--ui-error) group-data-[state=active]:bg-(--ui-error) focus-visible:outline-(--ui-error)",
        "separator": "group-data-[state=completed]:bg-(--ui-error)"
      },
      "neutral": {
        "trigger": "group-data-[state=completed]:bg-(--ui-bg-inverted) group-data-[state=active]:bg-(--ui-bg-inverted) focus-visible:outline-(--ui-border-inverted)",
        "separator": "group-data-[state=completed]:bg-(--ui-bg-inverted)"
      }
    }
  },
  "compoundVariants": [
    {
      "orientation": "horizontal" as typeof orientation[number],
      "size": "xs" as typeof size[number],
      "class": {
        "separator": "start-[calc(50%+16px)] end-[calc(-50%+16px)]"
      }
    },
    {
      "orientation": "horizontal" as typeof orientation[number],
      "size": "sm" as typeof size[number],
      "class": {
        "separator": "start-[calc(50%+20px)] end-[calc(-50%+20px)]"
      }
    },
    {
      "orientation": "horizontal" as typeof orientation[number],
      "size": "md" as typeof size[number],
      "class": {
        "separator": "start-[calc(50%+28px)] end-[calc(-50%+28px)]"
      }
    },
    {
      "orientation": "horizontal" as typeof orientation[number],
      "size": "lg" as typeof size[number],
      "class": {
        "separator": "start-[calc(50%+32px)] end-[calc(-50%+32px)]"
      }
    },
    {
      "orientation": "horizontal" as typeof orientation[number],
      "size": "xl" as typeof size[number],
      "class": {
        "separator": "start-[calc(50%+36px)] end-[calc(-50%+36px)]"
      }
    },
    {
      "orientation": "vertical" as typeof orientation[number],
      "size": "xs" as typeof size[number],
      "class": {
        "separator": "top-[30px]",
        "item": "gap-1.5"
      }
    },
    {
      "orientation": "vertical" as typeof orientation[number],
      "size": "sm" as typeof size[number],
      "class": {
        "separator": "top-[38px]",
        "item": "gap-2"
      }
    },
    {
      "orientation": "vertical" as typeof orientation[number],
      "size": "md" as typeof size[number],
      "class": {
        "separator": "top-[46px]",
        "item": "gap-2.5"
      }
    },
    {
      "orientation": "vertical" as typeof orientation[number],
      "size": "lg" as typeof size[number],
      "class": {
        "separator": "top-[54px]",
        "item": "gap-3"
      }
    },
    {
      "orientation": "vertical" as typeof orientation[number],
      "size": "xl" as typeof size[number],
      "class": {
        "separator": "top-[62px]",
        "item": "gap-3.5"
      }
    }
  ],
  "defaultVariants": {
    "size": "md" as typeof size[number],
    "color": "primary" as typeof color[number]
  }
}