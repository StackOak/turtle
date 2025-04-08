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

export default {
  "slots": {
    "root": "relative",
    "fieldset": "flex",
    "legend": "mb-1 block font-medium text-(--ui-text)",
    "item": "flex items-start",
    "base": "rounded-full ring ring-inset ring-(--ui-border-accented) focus-visible:outline-2 focus-visible:outline-offset-2",
    "indicator": "flex items-center justify-center size-full rounded-full after:bg-(--ui-bg) after:rounded-full",
    "container": "flex items-center",
    "wrapper": "ms-2",
    "label": "block font-medium text-(--ui-text)",
    "description": "text-(--ui-text-muted)"
  },
  "variants": {
    "color": {
      "primary": {
        "base": "focus-visible:outline-(--ui-primary)",
        "indicator": "bg-(--ui-primary)"
      },
      "secondary": {
        "base": "focus-visible:outline-(--ui-secondary)",
        "indicator": "bg-(--ui-secondary)"
      },
      "success": {
        "base": "focus-visible:outline-(--ui-success)",
        "indicator": "bg-(--ui-success)"
      },
      "info": {
        "base": "focus-visible:outline-(--ui-info)",
        "indicator": "bg-(--ui-info)"
      },
      "warning": {
        "base": "focus-visible:outline-(--ui-warning)",
        "indicator": "bg-(--ui-warning)"
      },
      "error": {
        "base": "focus-visible:outline-(--ui-error)",
        "indicator": "bg-(--ui-error)"
      },
      "neutral": {
        "base": "focus-visible:outline-(--ui-border-inverted)",
        "indicator": "bg-(--ui-bg-inverted)"
      }
    },
    "orientation": {
      "horizontal": {
        "fieldset": "flex-row",
        "wrapper": "me-2"
      },
      "vertical": {
        "fieldset": "flex-col"
      }
    },
    "size": {
      "xs": {
        "fieldset": "gap-0.5",
        "legend": "text-xs",
        "base": "size-3",
        "item": "text-xs",
        "container": "h-4",
        "indicator": "after:size-1"
      },
      "sm": {
        "fieldset": "gap-0.5",
        "legend": "text-xs",
        "base": "size-3.5",
        "item": "text-xs",
        "container": "h-4",
        "indicator": "after:size-1"
      },
      "md": {
        "fieldset": "gap-1",
        "legend": "text-sm",
        "base": "size-4",
        "item": "text-sm",
        "container": "h-5",
        "indicator": "after:size-1.5"
      },
      "lg": {
        "fieldset": "gap-1",
        "legend": "text-sm",
        "base": "size-4.5",
        "item": "text-sm",
        "container": "h-5",
        "indicator": "after:size-1.5"
      },
      "xl": {
        "fieldset": "gap-1.5",
        "legend": "text-base",
        "base": "size-5",
        "item": "text-base",
        "container": "h-6",
        "indicator": "after:size-2"
      }
    },
    "disabled": {
      "true": {
        "base": "cursor-not-allowed opacity-75",
        "label": "cursor-not-allowed opacity-75"
      }
    },
    "required": {
      "true": {
        "legend": "after:content-['*'] after:ms-0.5 after:text-(--ui-error)"
      }
    }
  },
  "defaultVariants": {
    "size": "md" as typeof size[number],
    "color": "primary" as typeof color[number]
  }
}