const buttonGroup = [
  "horizontal",
  "vertical"
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

const variant = [
  "solid",
  "outline",
  "soft",
  "subtle",
  "ghost",
  "link"
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
    "base": [
      "rounded-[calc(var(--ui-radius)*1.5)] font-medium inline-flex items-center disabled:cursor-not-allowed aria-disabled:cursor-not-allowed disabled:opacity-75 aria-disabled:opacity-75",
      "transition-colors"
    ],
    "label": "truncate",
    "leadingIcon": "shrink-0",
    "leadingAvatar": "shrink-0",
    "leadingAvatarSize": "",
    "trailingIcon": "shrink-0"
  },
  "variants": {
    "buttonGroup": {
      "horizontal": "not-only:first:rounded-e-none not-only:last:rounded-s-none not-last:not-first:rounded-none",
      "vertical": "not-only:first:rounded-b-none not-only:last:rounded-t-none not-last:not-first:rounded-none"
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
    "variant": {
      "solid": "",
      "outline": "",
      "soft": "",
      "subtle": "",
      "ghost": "",
      "link": ""
    },
    "size": {
      "xs": {
        "base": "px-2 py-1 text-xs gap-1",
        "leadingIcon": "size-4",
        "leadingAvatarSize": "3xs",
        "trailingIcon": "size-4"
      },
      "sm": {
        "base": "px-2.5 py-1.5 text-xs gap-1.5",
        "leadingIcon": "size-4",
        "leadingAvatarSize": "3xs",
        "trailingIcon": "size-4"
      },
      "md": {
        "base": "px-2.5 py-1.5 text-sm gap-1.5",
        "leadingIcon": "size-5",
        "leadingAvatarSize": "2xs",
        "trailingIcon": "size-5"
      },
      "lg": {
        "base": "px-3 py-2 text-sm gap-2",
        "leadingIcon": "size-5",
        "leadingAvatarSize": "2xs",
        "trailingIcon": "size-5"
      },
      "xl": {
        "base": "px-3 py-2 text-base gap-2",
        "leadingIcon": "size-6",
        "leadingAvatarSize": "xs",
        "trailingIcon": "size-6"
      }
    },
    "block": {
      "true": {
        "base": "w-full justify-center",
        "trailingIcon": "ms-auto"
      }
    },
    "square": {
      "true": ""
    },
    "leading": {
      "true": ""
    },
    "trailing": {
      "true": ""
    },
    "loading": {
      "true": ""
    },
    "active": {
      "true": {
        "base": ""
      },
      "false": {
        "base": ""
      }
    }
  },
  "compoundVariants": [
    {
      "color": "primary" as typeof color[number],
      "variant": "solid" as typeof variant[number],
      "class": "text-(--ui-bg) bg-(--ui-primary) hover:bg-(--ui-primary)/75 disabled:bg-(--ui-primary) aria-disabled:bg-(--ui-primary) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--ui-primary)"
    },
    {
      "color": "secondary" as typeof color[number],
      "variant": "solid" as typeof variant[number],
      "class": "text-(--ui-bg) bg-(--ui-secondary) hover:bg-(--ui-secondary)/75 disabled:bg-(--ui-secondary) aria-disabled:bg-(--ui-secondary) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--ui-secondary)"
    },
    {
      "color": "success" as typeof color[number],
      "variant": "solid" as typeof variant[number],
      "class": "text-(--ui-bg) bg-(--ui-success) hover:bg-(--ui-success)/75 disabled:bg-(--ui-success) aria-disabled:bg-(--ui-success) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--ui-success)"
    },
    {
      "color": "info" as typeof color[number],
      "variant": "solid" as typeof variant[number],
      "class": "text-(--ui-bg) bg-(--ui-info) hover:bg-(--ui-info)/75 disabled:bg-(--ui-info) aria-disabled:bg-(--ui-info) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--ui-info)"
    },
    {
      "color": "warning" as typeof color[number],
      "variant": "solid" as typeof variant[number],
      "class": "text-(--ui-bg) bg-(--ui-warning) hover:bg-(--ui-warning)/75 disabled:bg-(--ui-warning) aria-disabled:bg-(--ui-warning) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--ui-warning)"
    },
    {
      "color": "error" as typeof color[number],
      "variant": "solid" as typeof variant[number],
      "class": "text-(--ui-bg) bg-(--ui-error) hover:bg-(--ui-error)/75 disabled:bg-(--ui-error) aria-disabled:bg-(--ui-error) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--ui-error)"
    },
    {
      "color": "primary" as typeof color[number],
      "variant": "outline" as typeof variant[number],
      "class": "ring ring-inset ring-(--ui-primary)/50 text-(--ui-primary) hover:bg-(--ui-primary)/10 disabled:bg-transparent aria-disabled:bg-transparent dark:disabled:bg-transparent dark:aria-disabled:bg-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-(--ui-primary)"
    },
    {
      "color": "secondary" as typeof color[number],
      "variant": "outline" as typeof variant[number],
      "class": "ring ring-inset ring-(--ui-secondary)/50 text-(--ui-secondary) hover:bg-(--ui-secondary)/10 disabled:bg-transparent aria-disabled:bg-transparent dark:disabled:bg-transparent dark:aria-disabled:bg-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-(--ui-secondary)"
    },
    {
      "color": "success" as typeof color[number],
      "variant": "outline" as typeof variant[number],
      "class": "ring ring-inset ring-(--ui-success)/50 text-(--ui-success) hover:bg-(--ui-success)/10 disabled:bg-transparent aria-disabled:bg-transparent dark:disabled:bg-transparent dark:aria-disabled:bg-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-(--ui-success)"
    },
    {
      "color": "info" as typeof color[number],
      "variant": "outline" as typeof variant[number],
      "class": "ring ring-inset ring-(--ui-info)/50 text-(--ui-info) hover:bg-(--ui-info)/10 disabled:bg-transparent aria-disabled:bg-transparent dark:disabled:bg-transparent dark:aria-disabled:bg-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-(--ui-info)"
    },
    {
      "color": "warning" as typeof color[number],
      "variant": "outline" as typeof variant[number],
      "class": "ring ring-inset ring-(--ui-warning)/50 text-(--ui-warning) hover:bg-(--ui-warning)/10 disabled:bg-transparent aria-disabled:bg-transparent dark:disabled:bg-transparent dark:aria-disabled:bg-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-(--ui-warning)"
    },
    {
      "color": "error" as typeof color[number],
      "variant": "outline" as typeof variant[number],
      "class": "ring ring-inset ring-(--ui-error)/50 text-(--ui-error) hover:bg-(--ui-error)/10 disabled:bg-transparent aria-disabled:bg-transparent dark:disabled:bg-transparent dark:aria-disabled:bg-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-(--ui-error)"
    },
    {
      "color": "primary" as typeof color[number],
      "variant": "soft" as typeof variant[number],
      "class": "text-(--ui-primary) bg-(--ui-primary)/10 hover:bg-(--ui-primary)/15 focus:outline-none focus-visible:bg-(--ui-primary)/15 disabled:bg-(--ui-primary)/10 aria-disabled:bg-(--ui-primary)/10"
    },
    {
      "color": "secondary" as typeof color[number],
      "variant": "soft" as typeof variant[number],
      "class": "text-(--ui-secondary) bg-(--ui-secondary)/10 hover:bg-(--ui-secondary)/15 focus:outline-none focus-visible:bg-(--ui-secondary)/15 disabled:bg-(--ui-secondary)/10 aria-disabled:bg-(--ui-secondary)/10"
    },
    {
      "color": "success" as typeof color[number],
      "variant": "soft" as typeof variant[number],
      "class": "text-(--ui-success) bg-(--ui-success)/10 hover:bg-(--ui-success)/15 focus:outline-none focus-visible:bg-(--ui-success)/15 disabled:bg-(--ui-success)/10 aria-disabled:bg-(--ui-success)/10"
    },
    {
      "color": "info" as typeof color[number],
      "variant": "soft" as typeof variant[number],
      "class": "text-(--ui-info) bg-(--ui-info)/10 hover:bg-(--ui-info)/15 focus:outline-none focus-visible:bg-(--ui-info)/15 disabled:bg-(--ui-info)/10 aria-disabled:bg-(--ui-info)/10"
    },
    {
      "color": "warning" as typeof color[number],
      "variant": "soft" as typeof variant[number],
      "class": "text-(--ui-warning) bg-(--ui-warning)/10 hover:bg-(--ui-warning)/15 focus:outline-none focus-visible:bg-(--ui-warning)/15 disabled:bg-(--ui-warning)/10 aria-disabled:bg-(--ui-warning)/10"
    },
    {
      "color": "error" as typeof color[number],
      "variant": "soft" as typeof variant[number],
      "class": "text-(--ui-error) bg-(--ui-error)/10 hover:bg-(--ui-error)/15 focus:outline-none focus-visible:bg-(--ui-error)/15 disabled:bg-(--ui-error)/10 aria-disabled:bg-(--ui-error)/10"
    },
    {
      "color": "primary" as typeof color[number],
      "variant": "subtle" as typeof variant[number],
      "class": "text-(--ui-primary) ring ring-inset ring-(--ui-primary)/25 bg-(--ui-primary)/10 hover:bg-(--ui-primary)/15 disabled:bg-(--ui-primary)/10 aria-disabled:bg-(--ui-primary)/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-(--ui-primary)"
    },
    {
      "color": "secondary" as typeof color[number],
      "variant": "subtle" as typeof variant[number],
      "class": "text-(--ui-secondary) ring ring-inset ring-(--ui-secondary)/25 bg-(--ui-secondary)/10 hover:bg-(--ui-secondary)/15 disabled:bg-(--ui-secondary)/10 aria-disabled:bg-(--ui-secondary)/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-(--ui-secondary)"
    },
    {
      "color": "success" as typeof color[number],
      "variant": "subtle" as typeof variant[number],
      "class": "text-(--ui-success) ring ring-inset ring-(--ui-success)/25 bg-(--ui-success)/10 hover:bg-(--ui-success)/15 disabled:bg-(--ui-success)/10 aria-disabled:bg-(--ui-success)/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-(--ui-success)"
    },
    {
      "color": "info" as typeof color[number],
      "variant": "subtle" as typeof variant[number],
      "class": "text-(--ui-info) ring ring-inset ring-(--ui-info)/25 bg-(--ui-info)/10 hover:bg-(--ui-info)/15 disabled:bg-(--ui-info)/10 aria-disabled:bg-(--ui-info)/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-(--ui-info)"
    },
    {
      "color": "warning" as typeof color[number],
      "variant": "subtle" as typeof variant[number],
      "class": "text-(--ui-warning) ring ring-inset ring-(--ui-warning)/25 bg-(--ui-warning)/10 hover:bg-(--ui-warning)/15 disabled:bg-(--ui-warning)/10 aria-disabled:bg-(--ui-warning)/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-(--ui-warning)"
    },
    {
      "color": "error" as typeof color[number],
      "variant": "subtle" as typeof variant[number],
      "class": "text-(--ui-error) ring ring-inset ring-(--ui-error)/25 bg-(--ui-error)/10 hover:bg-(--ui-error)/15 disabled:bg-(--ui-error)/10 aria-disabled:bg-(--ui-error)/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-(--ui-error)"
    },
    {
      "color": "primary" as typeof color[number],
      "variant": "ghost" as typeof variant[number],
      "class": "text-(--ui-primary) hover:bg-(--ui-primary)/10 focus:outline-none focus-visible:bg-(--ui-primary)/10 disabled:bg-transparent aria-disabled:bg-transparent dark:disabled:bg-transparent dark:aria-disabled:bg-transparent"
    },
    {
      "color": "secondary" as typeof color[number],
      "variant": "ghost" as typeof variant[number],
      "class": "text-(--ui-secondary) hover:bg-(--ui-secondary)/10 focus:outline-none focus-visible:bg-(--ui-secondary)/10 disabled:bg-transparent aria-disabled:bg-transparent dark:disabled:bg-transparent dark:aria-disabled:bg-transparent"
    },
    {
      "color": "success" as typeof color[number],
      "variant": "ghost" as typeof variant[number],
      "class": "text-(--ui-success) hover:bg-(--ui-success)/10 focus:outline-none focus-visible:bg-(--ui-success)/10 disabled:bg-transparent aria-disabled:bg-transparent dark:disabled:bg-transparent dark:aria-disabled:bg-transparent"
    },
    {
      "color": "info" as typeof color[number],
      "variant": "ghost" as typeof variant[number],
      "class": "text-(--ui-info) hover:bg-(--ui-info)/10 focus:outline-none focus-visible:bg-(--ui-info)/10 disabled:bg-transparent aria-disabled:bg-transparent dark:disabled:bg-transparent dark:aria-disabled:bg-transparent"
    },
    {
      "color": "warning" as typeof color[number],
      "variant": "ghost" as typeof variant[number],
      "class": "text-(--ui-warning) hover:bg-(--ui-warning)/10 focus:outline-none focus-visible:bg-(--ui-warning)/10 disabled:bg-transparent aria-disabled:bg-transparent dark:disabled:bg-transparent dark:aria-disabled:bg-transparent"
    },
    {
      "color": "error" as typeof color[number],
      "variant": "ghost" as typeof variant[number],
      "class": "text-(--ui-error) hover:bg-(--ui-error)/10 focus:outline-none focus-visible:bg-(--ui-error)/10 disabled:bg-transparent aria-disabled:bg-transparent dark:disabled:bg-transparent dark:aria-disabled:bg-transparent"
    },
    {
      "color": "primary" as typeof color[number],
      "variant": "link" as typeof variant[number],
      "class": "text-(--ui-primary) hover:text-(--ui-primary)/75 disabled:text-(--ui-primary) aria-disabled:text-(--ui-primary) focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-(--ui-primary)"
    },
    {
      "color": "secondary" as typeof color[number],
      "variant": "link" as typeof variant[number],
      "class": "text-(--ui-secondary) hover:text-(--ui-secondary)/75 disabled:text-(--ui-secondary) aria-disabled:text-(--ui-secondary) focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-(--ui-secondary)"
    },
    {
      "color": "success" as typeof color[number],
      "variant": "link" as typeof variant[number],
      "class": "text-(--ui-success) hover:text-(--ui-success)/75 disabled:text-(--ui-success) aria-disabled:text-(--ui-success) focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-(--ui-success)"
    },
    {
      "color": "info" as typeof color[number],
      "variant": "link" as typeof variant[number],
      "class": "text-(--ui-info) hover:text-(--ui-info)/75 disabled:text-(--ui-info) aria-disabled:text-(--ui-info) focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-(--ui-info)"
    },
    {
      "color": "warning" as typeof color[number],
      "variant": "link" as typeof variant[number],
      "class": "text-(--ui-warning) hover:text-(--ui-warning)/75 disabled:text-(--ui-warning) aria-disabled:text-(--ui-warning) focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-(--ui-warning)"
    },
    {
      "color": "error" as typeof color[number],
      "variant": "link" as typeof variant[number],
      "class": "text-(--ui-error) hover:text-(--ui-error)/75 disabled:text-(--ui-error) aria-disabled:text-(--ui-error) focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-(--ui-error)"
    },
    {
      "color": "neutral" as typeof color[number],
      "variant": "solid" as typeof variant[number],
      "class": "text-(--ui-bg) bg-(--ui-bg-inverted) hover:bg-(--ui-bg-inverted)/90 disabled:bg-(--ui-bg-inverted) aria-disabled:bg-(--ui-bg-inverted) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--ui-border-inverted)"
    },
    {
      "color": "neutral" as typeof color[number],
      "variant": "outline" as typeof variant[number],
      "class": "ring ring-inset ring-(--ui-border-accented) text-(--ui-text) bg-(--ui-bg) hover:bg-(--ui-bg-elevated) disabled:bg-(--ui-bg) aria-disabled:bg-(--ui-bg) focus:outline-none focus-visible:ring-2 focus-visible:ring-(--ui-border-inverted)"
    },
    {
      "color": "neutral" as typeof color[number],
      "variant": "soft" as typeof variant[number],
      "class": "text-(--ui-text) bg-(--ui-bg-elevated) hover:bg-(--ui-bg-accented)/75 focus:outline-none focus-visible:bg-(--ui-bg-accented)/75 disabled:bg-(--ui-bg-elevated) aria-disabled:bg-(--ui-bg-elevated)"
    },
    {
      "color": "neutral" as typeof color[number],
      "variant": "subtle" as typeof variant[number],
      "class": "ring ring-inset ring-(--ui-border-accented) text-(--ui-text) bg-(--ui-bg-elevated) hover:bg-(--ui-bg-accented)/75 disabled:bg-(--ui-bg-elevated) aria-disabled:bg-(--ui-bg-elevated) focus:outline-none focus-visible:ring-2 focus-visible:ring-(--ui-border-inverted)"
    },
    {
      "color": "neutral" as typeof color[number],
      "variant": "ghost" as typeof variant[number],
      "class": "text-(--ui-text) hover:bg-(--ui-bg-elevated) focus:outline-none focus-visible:bg-(--ui-bg-elevated) hover:disabled:bg-transparent dark:hover:disabled:bg-transparent hover:aria-disabled:bg-transparent dark:hover:aria-disabled:bg-transparent"
    },
    {
      "color": "neutral" as typeof color[number],
      "variant": "link" as typeof variant[number],
      "class": "text-(--ui-text-muted) hover:text-(--ui-text) disabled:text-(--ui-text-muted) aria-disabled:text-(--ui-text-muted) focus:outline-none focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-(--ui-border-inverted)"
    },
    {
      "size": "xs" as typeof size[number],
      "square": true,
      "class": "p-1"
    },
    {
      "size": "sm" as typeof size[number],
      "square": true,
      "class": "p-1.5"
    },
    {
      "size": "md" as typeof size[number],
      "square": true,
      "class": "p-1.5"
    },
    {
      "size": "lg" as typeof size[number],
      "square": true,
      "class": "p-2"
    },
    {
      "size": "xl" as typeof size[number],
      "square": true,
      "class": "p-2"
    },
    {
      "loading": true,
      "leading": true,
      "class": {
        "leadingIcon": "animate-spin"
      }
    },
    {
      "loading": true,
      "leading": false,
      "trailing": true,
      "class": {
        "trailingIcon": "animate-spin"
      }
    }
  ],
  "defaultVariants": {
    "color": "primary" as typeof color[number],
    "variant": "solid" as typeof variant[number],
    "size": "md" as typeof size[number]
  }
}