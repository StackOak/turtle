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

export default {
  "slots": {
    "root": "relative flex items-start",
    "base": "shrink-0 flex items-center justify-center rounded-(--ui-radius) text-(--ui-bg) ring ring-inset ring-(--ui-border-accented) focus-visible:outline-2 focus-visible:outline-offset-2",
    "container": "flex items-center",
    "wrapper": "ms-2",
    "icon": "shrink-0 size-full",
    "label": "block font-medium text-(--ui-text)",
    "description": "text-(--ui-text-muted)"
  },
  "variants": {
    "color": {
      "primary": "focus-visible:outline-(--ui-primary)",
      "secondary": "focus-visible:outline-(--ui-secondary)",
      "success": "focus-visible:outline-(--ui-success)",
      "info": "focus-visible:outline-(--ui-info)",
      "warning": "focus-visible:outline-(--ui-warning)",
      "error": "focus-visible:outline-(--ui-error)",
      "neutral": "focus-visible:outline-(--ui-border-inverted)"
    },
    "size": {
      "xs": {
        "base": "size-3",
        "container": "h-4",
        "wrapper": "text-xs"
      },
      "sm": {
        "base": "size-3.5",
        "container": "h-4",
        "wrapper": "text-xs"
      },
      "md": {
        "base": "size-4",
        "container": "h-5",
        "wrapper": "text-sm"
      },
      "lg": {
        "base": "size-4.5",
        "container": "h-5",
        "wrapper": "text-sm"
      },
      "xl": {
        "base": "size-5",
        "container": "h-6",
        "wrapper": "text-base"
      }
    },
    "required": {
      "true": {
        "label": "after:content-['*'] after:ms-0.5 after:text-(--ui-error)"
      }
    },
    "disabled": {
      "true": {
        "base": "cursor-not-allowed opacity-75",
        "label": "cursor-not-allowed opacity-75",
        "description": "cursor-not-allowed opacity-75"
      }
    },
    "checked": {
      "true": ""
    }
  },
  "compoundVariants": [
    {
      "color": "primary" as typeof color[number],
      "checked": true,
      "class": "ring-2 ring-(--ui-primary) bg-(--ui-primary)"
    },
    {
      "color": "secondary" as typeof color[number],
      "checked": true,
      "class": "ring-2 ring-(--ui-secondary) bg-(--ui-secondary)"
    },
    {
      "color": "success" as typeof color[number],
      "checked": true,
      "class": "ring-2 ring-(--ui-success) bg-(--ui-success)"
    },
    {
      "color": "info" as typeof color[number],
      "checked": true,
      "class": "ring-2 ring-(--ui-info) bg-(--ui-info)"
    },
    {
      "color": "warning" as typeof color[number],
      "checked": true,
      "class": "ring-2 ring-(--ui-warning) bg-(--ui-warning)"
    },
    {
      "color": "error" as typeof color[number],
      "checked": true,
      "class": "ring-2 ring-(--ui-error) bg-(--ui-error)"
    },
    {
      "color": "neutral" as typeof color[number],
      "checked": true,
      "class": "ring-2 ring-(--ui-border-inverted) bg-(--ui-bg-inverted)"
    }
  ],
  "defaultVariants": {
    "size": "md" as typeof size[number],
    "color": "primary" as typeof color[number]
  }
}