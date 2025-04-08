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

export default {
  "slots": {
    "root": "relative group overflow-hidden bg-(--ui-bg) shadow-lg rounded-[calc(var(--ui-radius)*2)] ring ring-(--ui-border) p-4 flex gap-2.5 focus:outline-none",
    "wrapper": "w-0 flex-1 flex flex-col",
    "title": "text-sm font-medium text-(--ui-text-highlighted)",
    "description": "text-sm text-(--ui-text-muted)",
    "icon": "shrink-0 size-5",
    "avatar": "shrink-0",
    "avatarSize": "2xl",
    "actions": "flex gap-1.5 shrink-0",
    "progress": "absolute inset-x-0 bottom-0 h-1 z-[-1]",
    "close": "p-0"
  },
  "variants": {
    "color": {
      "primary": {
        "root": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-(--ui-primary)",
        "icon": "text-(--ui-primary)",
        "progress": "bg-(--ui-primary)"
      },
      "secondary": {
        "root": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-(--ui-secondary)",
        "icon": "text-(--ui-secondary)",
        "progress": "bg-(--ui-secondary)"
      },
      "success": {
        "root": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-(--ui-success)",
        "icon": "text-(--ui-success)",
        "progress": "bg-(--ui-success)"
      },
      "info": {
        "root": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-(--ui-info)",
        "icon": "text-(--ui-info)",
        "progress": "bg-(--ui-info)"
      },
      "warning": {
        "root": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-(--ui-warning)",
        "icon": "text-(--ui-warning)",
        "progress": "bg-(--ui-warning)"
      },
      "error": {
        "root": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-(--ui-error)",
        "icon": "text-(--ui-error)",
        "progress": "bg-(--ui-error)"
      },
      "neutral": {
        "root": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-(--ui-border-inverted)",
        "icon": "text-(--ui-text-highlighted)",
        "progress": "bg-(--ui-bg-inverted)"
      }
    },
    "orientation": {
      "horizontal": {
        "root": "items-center",
        "actions": "items-center"
      },
      "vertical": {
        "root": "items-start",
        "actions": "items-start mt-2.5"
      }
    },
    "title": {
      "true": {
        "description": "mt-1"
      }
    }
  },
  "defaultVariants": {
    "color": "primary" as typeof color[number]
  }
}