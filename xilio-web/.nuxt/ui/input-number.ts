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

const variant = [
  "outline",
  "soft",
  "subtle",
  "ghost",
  "none"
] as const

const orientation = [
  "horizontal",
  "vertical"
] as const

export default {
  "slots": {
    "root": "relative inline-flex items-center",
    "base": [
      "w-full rounded-[calc(var(--ui-radius)*1.5)] border-0 placeholder:text-(--ui-text-dimmed) focus:outline-none disabled:cursor-not-allowed disabled:opacity-75",
      "transition-colors"
    ],
    "increment": "absolute flex items-center",
    "decrement": "absolute flex items-center"
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
    "size": {
      "xs": "px-2 py-1 text-xs gap-1",
      "sm": "px-2.5 py-1.5 text-xs gap-1.5",
      "md": "px-2.5 py-1.5 text-sm gap-1.5",
      "lg": "px-3 py-2 text-sm gap-2",
      "xl": "px-3 py-2 text-base gap-2"
    },
    "variant": {
      "outline": "text-(--ui-text-highlighted) bg-(--ui-bg) ring ring-inset ring-(--ui-border-accented)",
      "soft": "text-(--ui-text-highlighted) bg-(--ui-bg-elevated)/50 hover:bg-(--ui-bg-elevated) focus:bg-(--ui-bg-elevated) disabled:bg-(--ui-bg-elevated)/50",
      "subtle": "text-(--ui-text-highlighted) bg-(--ui-bg-elevated) ring ring-inset ring-(--ui-border-accented)",
      "ghost": "text-(--ui-text-highlighted) bg-transparent hover:bg-(--ui-bg-elevated) focus:bg-(--ui-bg-elevated) disabled:bg-transparent dark:disabled:bg-transparent",
      "none": "text-(--ui-text-highlighted) bg-transparent"
    },
    "disabled": {
      "true": {
        "increment": "opacity-75 cursor-not-allowed",
        "decrement": "opacity-75 cursor-not-allowed"
      }
    },
    "orientation": {
      "horizontal": {
        "base": "text-center",
        "increment": "inset-y-0 end-0 pe-1",
        "decrement": "inset-y-0 start-0 ps-1"
      },
      "vertical": {
        "increment": "top-0 end-0 pe-1 [&>button]:py-0 scale-80",
        "decrement": "bottom-0 end-0 pe-1 [&>button]:py-0 scale-80"
      }
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
    },
    {
      "orientation": "horizontal" as typeof orientation[number],
      "size": "xs" as typeof size[number],
      "class": "px-7"
    },
    {
      "orientation": "horizontal" as typeof orientation[number],
      "size": "sm" as typeof size[number],
      "class": "px-8"
    },
    {
      "orientation": "horizontal" as typeof orientation[number],
      "size": "md" as typeof size[number],
      "class": "px-9"
    },
    {
      "orientation": "horizontal" as typeof orientation[number],
      "size": "lg" as typeof size[number],
      "class": "px-10"
    },
    {
      "orientation": "horizontal" as typeof orientation[number],
      "size": "xl" as typeof size[number],
      "class": "px-11"
    },
    {
      "orientation": "vertical" as typeof orientation[number],
      "size": "xs" as typeof size[number],
      "class": "pe-7"
    },
    {
      "orientation": "vertical" as typeof orientation[number],
      "size": "sm" as typeof size[number],
      "class": "pe-8"
    },
    {
      "orientation": "vertical" as typeof orientation[number],
      "size": "md" as typeof size[number],
      "class": "pe-9"
    },
    {
      "orientation": "vertical" as typeof orientation[number],
      "size": "lg" as typeof size[number],
      "class": "pe-10"
    },
    {
      "orientation": "vertical" as typeof orientation[number],
      "size": "xl" as typeof size[number],
      "class": "pe-11"
    }
  ],
  "defaultVariants": {
    "size": "md" as typeof size[number],
    "color": "primary" as typeof color[number],
    "variant": "outline" as typeof variant[number]
  }
}