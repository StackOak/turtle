const color = [
  "primary",
  "secondary",
  "success",
  "info",
  "warning",
  "error",
  "neutral"
] as const

const variant = [
  "solid",
  "outline",
  "soft",
  "subtle"
] as const

const orientation = [
  "horizontal",
  "vertical"
] as const

export default {
  "slots": {
    "root": "relative overflow-hidden w-full rounded-[calc(var(--ui-radius)*2)] p-4 flex gap-2.5",
    "wrapper": "min-w-0 flex-1 flex flex-col",
    "title": "text-sm font-medium",
    "description": "text-sm opacity-90",
    "icon": "shrink-0 size-5",
    "avatar": "shrink-0",
    "avatarSize": "2xl",
    "actions": "flex flex-wrap gap-1.5 shrink-0",
    "close": "p-0"
  },
  "variants": {
    "color": {
      "primary": "",
      "secondary": "",
      "success": "",
      "info": "",
      "warning": "",
      "error": "",
      "neutral": ""
    },
    "variant": {
      "solid": "",
      "outline": "",
      "soft": "",
      "subtle": ""
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
  "compoundVariants": [
    {
      "color": "primary" as typeof color[number],
      "variant": "solid" as typeof variant[number],
      "class": {
        "root": "bg-(--ui-primary) text-(--ui-bg)"
      }
    },
    {
      "color": "secondary" as typeof color[number],
      "variant": "solid" as typeof variant[number],
      "class": {
        "root": "bg-(--ui-secondary) text-(--ui-bg)"
      }
    },
    {
      "color": "success" as typeof color[number],
      "variant": "solid" as typeof variant[number],
      "class": {
        "root": "bg-(--ui-success) text-(--ui-bg)"
      }
    },
    {
      "color": "info" as typeof color[number],
      "variant": "solid" as typeof variant[number],
      "class": {
        "root": "bg-(--ui-info) text-(--ui-bg)"
      }
    },
    {
      "color": "warning" as typeof color[number],
      "variant": "solid" as typeof variant[number],
      "class": {
        "root": "bg-(--ui-warning) text-(--ui-bg)"
      }
    },
    {
      "color": "error" as typeof color[number],
      "variant": "solid" as typeof variant[number],
      "class": {
        "root": "bg-(--ui-error) text-(--ui-bg)"
      }
    },
    {
      "color": "primary" as typeof color[number],
      "variant": "outline" as typeof variant[number],
      "class": {
        "root": "text-(--ui-primary) ring ring-inset ring-(--ui-primary)/25"
      }
    },
    {
      "color": "secondary" as typeof color[number],
      "variant": "outline" as typeof variant[number],
      "class": {
        "root": "text-(--ui-secondary) ring ring-inset ring-(--ui-secondary)/25"
      }
    },
    {
      "color": "success" as typeof color[number],
      "variant": "outline" as typeof variant[number],
      "class": {
        "root": "text-(--ui-success) ring ring-inset ring-(--ui-success)/25"
      }
    },
    {
      "color": "info" as typeof color[number],
      "variant": "outline" as typeof variant[number],
      "class": {
        "root": "text-(--ui-info) ring ring-inset ring-(--ui-info)/25"
      }
    },
    {
      "color": "warning" as typeof color[number],
      "variant": "outline" as typeof variant[number],
      "class": {
        "root": "text-(--ui-warning) ring ring-inset ring-(--ui-warning)/25"
      }
    },
    {
      "color": "error" as typeof color[number],
      "variant": "outline" as typeof variant[number],
      "class": {
        "root": "text-(--ui-error) ring ring-inset ring-(--ui-error)/25"
      }
    },
    {
      "color": "primary" as typeof color[number],
      "variant": "soft" as typeof variant[number],
      "class": {
        "root": "bg-(--ui-primary)/10 text-(--ui-primary)"
      }
    },
    {
      "color": "secondary" as typeof color[number],
      "variant": "soft" as typeof variant[number],
      "class": {
        "root": "bg-(--ui-secondary)/10 text-(--ui-secondary)"
      }
    },
    {
      "color": "success" as typeof color[number],
      "variant": "soft" as typeof variant[number],
      "class": {
        "root": "bg-(--ui-success)/10 text-(--ui-success)"
      }
    },
    {
      "color": "info" as typeof color[number],
      "variant": "soft" as typeof variant[number],
      "class": {
        "root": "bg-(--ui-info)/10 text-(--ui-info)"
      }
    },
    {
      "color": "warning" as typeof color[number],
      "variant": "soft" as typeof variant[number],
      "class": {
        "root": "bg-(--ui-warning)/10 text-(--ui-warning)"
      }
    },
    {
      "color": "error" as typeof color[number],
      "variant": "soft" as typeof variant[number],
      "class": {
        "root": "bg-(--ui-error)/10 text-(--ui-error)"
      }
    },
    {
      "color": "primary" as typeof color[number],
      "variant": "subtle" as typeof variant[number],
      "class": {
        "root": "bg-(--ui-primary)/10 text-(--ui-primary) ring ring-inset ring-(--ui-primary)/25"
      }
    },
    {
      "color": "secondary" as typeof color[number],
      "variant": "subtle" as typeof variant[number],
      "class": {
        "root": "bg-(--ui-secondary)/10 text-(--ui-secondary) ring ring-inset ring-(--ui-secondary)/25"
      }
    },
    {
      "color": "success" as typeof color[number],
      "variant": "subtle" as typeof variant[number],
      "class": {
        "root": "bg-(--ui-success)/10 text-(--ui-success) ring ring-inset ring-(--ui-success)/25"
      }
    },
    {
      "color": "info" as typeof color[number],
      "variant": "subtle" as typeof variant[number],
      "class": {
        "root": "bg-(--ui-info)/10 text-(--ui-info) ring ring-inset ring-(--ui-info)/25"
      }
    },
    {
      "color": "warning" as typeof color[number],
      "variant": "subtle" as typeof variant[number],
      "class": {
        "root": "bg-(--ui-warning)/10 text-(--ui-warning) ring ring-inset ring-(--ui-warning)/25"
      }
    },
    {
      "color": "error" as typeof color[number],
      "variant": "subtle" as typeof variant[number],
      "class": {
        "root": "bg-(--ui-error)/10 text-(--ui-error) ring ring-inset ring-(--ui-error)/25"
      }
    },
    {
      "color": "neutral" as typeof color[number],
      "variant": "solid" as typeof variant[number],
      "class": {
        "root": "text-(--ui-bg) bg-(--ui-bg-inverted)"
      }
    },
    {
      "color": "neutral" as typeof color[number],
      "variant": "outline" as typeof variant[number],
      "class": {
        "root": "text-(--ui-text-highlighted) bg-(--ui-bg) ring ring-inset ring-(--ui-border)"
      }
    },
    {
      "color": "neutral" as typeof color[number],
      "variant": "soft" as typeof variant[number],
      "class": {
        "root": "text-(--ui-text-highlighted) bg-(--ui-bg-elevated)/50"
      }
    },
    {
      "color": "neutral" as typeof color[number],
      "variant": "subtle" as typeof variant[number],
      "class": {
        "root": "text-(--ui-text-highlighted) bg-(--ui-bg-elevated)/50 ring ring-inset ring-(--ui-border-accented)"
      }
    }
  ],
  "defaultVariants": {
    "color": "primary" as typeof color[number],
    "variant": "solid" as typeof variant[number]
  }
}