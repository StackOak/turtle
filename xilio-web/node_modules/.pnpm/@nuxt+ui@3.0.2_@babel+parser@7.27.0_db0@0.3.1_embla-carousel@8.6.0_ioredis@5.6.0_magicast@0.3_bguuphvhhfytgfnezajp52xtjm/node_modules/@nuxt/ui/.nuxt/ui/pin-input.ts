const size = [
  "xs",
  "sm",
  "md",
  "lg",
  "xl"
] as const

const variant = [
  "outline",
  "soft",
  "subtle",
  "ghost",
  "none"
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
    "root": "relative inline-flex items-center gap-1.5",
    "base": [
      "rounded-[calc(var(--ui-radius)*1.5)] border-0 placeholder:text-(--ui-text-dimmed) text-center focus:outline-none disabled:cursor-not-allowed disabled:opacity-75",
      "transition-colors"
    ]
  },
  "variants": {
    "size": {
      "xs": {
        "base": "size-6 text-xs"
      },
      "sm": {
        "base": "size-7 text-xs"
      },
      "md": {
        "base": "size-8 text-sm"
      },
      "lg": {
        "base": "size-9 text-sm"
      },
      "xl": {
        "base": "size-10 text-base"
      }
    },
    "variant": {
      "outline": "text-(--ui-text-highlighted) bg-(--ui-bg) ring ring-inset ring-(--ui-border-accented)",
      "soft": "text-(--ui-text-highlighted) bg-(--ui-bg-elevated)/50 hover:bg-(--ui-bg-elevated) focus:bg-(--ui-bg-elevated) disabled:bg-(--ui-bg-elevated)/50",
      "subtle": "text-(--ui-text-highlighted) bg-(--ui-bg-elevated) ring ring-inset ring-(--ui-border-accented)",
      "ghost": "text-(--ui-text-highlighted) bg-transparent hover:bg-(--ui-bg-elevated) focus:bg-(--ui-bg-elevated) disabled:bg-transparent dark:disabled:bg-transparent",
      "none": "text-(--ui-text-highlighted) bg-transparent"
    },
    "color": {
      "primary": "",
      "secondary": "",
      "success": "",
      "info": "",
      "warning": "",
      "error": "",
      "neutral": ""
    },
    "highlight": {
      "true": ""
    }
  },
  "compoundVariants": [
    {
      "color": "primary" as typeof color[number],
      "variant": [
        "outline" as typeof variant[number],
        "subtle" as typeof variant[number]
      ],
      "class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-(--ui-primary)"
    },
    {
      "color": "secondary" as typeof color[number],
      "variant": [
        "outline" as typeof variant[number],
        "subtle" as typeof variant[number]
      ],
      "class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-(--ui-secondary)"
    },
    {
      "color": "success" as typeof color[number],
      "variant": [
        "outline" as typeof variant[number],
        "subtle" as typeof variant[number]
      ],
      "class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-(--ui-success)"
    },
    {
      "color": "info" as typeof color[number],
      "variant": [
        "outline" as typeof variant[number],
        "subtle" as typeof variant[number]
      ],
      "class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-(--ui-info)"
    },
    {
      "color": "warning" as typeof color[number],
      "variant": [
        "outline" as typeof variant[number],
        "subtle" as typeof variant[number]
      ],
      "class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-(--ui-warning)"
    },
    {
      "color": "error" as typeof color[number],
      "variant": [
        "outline" as typeof variant[number],
        "subtle" as typeof variant[number]
      ],
      "class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-(--ui-error)"
    },
    {
      "color": "primary" as typeof color[number],
      "highlight": true,
      "class": "ring ring-inset ring-(--ui-primary)"
    },
    {
      "color": "secondary" as typeof color[number],
      "highlight": true,
      "class": "ring ring-inset ring-(--ui-secondary)"
    },
    {
      "color": "success" as typeof color[number],
      "highlight": true,
      "class": "ring ring-inset ring-(--ui-success)"
    },
    {
      "color": "info" as typeof color[number],
      "highlight": true,
      "class": "ring ring-inset ring-(--ui-info)"
    },
    {
      "color": "warning" as typeof color[number],
      "highlight": true,
      "class": "ring ring-inset ring-(--ui-warning)"
    },
    {
      "color": "error" as typeof color[number],
      "highlight": true,
      "class": "ring ring-inset ring-(--ui-error)"
    },
    {
      "color": "neutral" as typeof color[number],
      "variant": [
        "outline" as typeof variant[number],
        "subtle" as typeof variant[number]
      ],
      "class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-(--ui-border-inverted)"
    },
    {
      "color": "neutral" as typeof color[number],
      "highlight": true,
      "class": "ring ring-inset ring-(--ui-border-inverted)"
    }
  ],
  "defaultVariants": {
    "size": "md" as typeof size[number],
    "color": "primary" as typeof color[number],
    "variant": "outline" as typeof variant[number]
  }
}