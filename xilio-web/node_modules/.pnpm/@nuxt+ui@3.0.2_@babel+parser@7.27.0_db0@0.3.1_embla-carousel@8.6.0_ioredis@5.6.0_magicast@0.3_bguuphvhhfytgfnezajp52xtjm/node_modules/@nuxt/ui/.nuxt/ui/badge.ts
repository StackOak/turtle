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
  "subtle"
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
    "base": "font-medium inline-flex items-center",
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
      "subtle": ""
    },
    "size": {
      "xs": {
        "base": "text-[8px]/3 px-1 py-0.5 gap-1 rounded-[calc(var(--ui-radius))]",
        "leadingIcon": "size-3",
        "leadingAvatarSize": "3xs",
        "trailingIcon": "size-3"
      },
      "sm": {
        "base": "text-[10px]/3 px-1.5 py-1 gap-1 rounded-[calc(var(--ui-radius))]",
        "leadingIcon": "size-3",
        "leadingAvatarSize": "3xs",
        "trailingIcon": "size-3"
      },
      "md": {
        "base": "text-xs px-2 py-1 gap-1 rounded-[calc(var(--ui-radius)*1.5)]",
        "leadingIcon": "size-4",
        "leadingAvatarSize": "3xs",
        "trailingIcon": "size-4"
      },
      "lg": {
        "base": "text-sm px-2 py-1 gap-1.5 rounded-[calc(var(--ui-radius)*1.5)]",
        "leadingIcon": "size-5",
        "leadingAvatarSize": "2xs",
        "trailingIcon": "size-5"
      },
      "xl": {
        "base": "text-base px-2.5 py-1 gap-1.5 rounded-[calc(var(--ui-radius)*1.5)]",
        "leadingIcon": "size-6",
        "leadingAvatarSize": "2xs",
        "trailingIcon": "size-6"
      }
    }
  },
  "compoundVariants": [
    {
      "color": "primary" as typeof color[number],
      "variant": "solid" as typeof variant[number],
      "class": "bg-(--ui-primary) text-(--ui-bg)"
    },
    {
      "color": "secondary" as typeof color[number],
      "variant": "solid" as typeof variant[number],
      "class": "bg-(--ui-secondary) text-(--ui-bg)"
    },
    {
      "color": "success" as typeof color[number],
      "variant": "solid" as typeof variant[number],
      "class": "bg-(--ui-success) text-(--ui-bg)"
    },
    {
      "color": "info" as typeof color[number],
      "variant": "solid" as typeof variant[number],
      "class": "bg-(--ui-info) text-(--ui-bg)"
    },
    {
      "color": "warning" as typeof color[number],
      "variant": "solid" as typeof variant[number],
      "class": "bg-(--ui-warning) text-(--ui-bg)"
    },
    {
      "color": "error" as typeof color[number],
      "variant": "solid" as typeof variant[number],
      "class": "bg-(--ui-error) text-(--ui-bg)"
    },
    {
      "color": "primary" as typeof color[number],
      "variant": "outline" as typeof variant[number],
      "class": "text-(--ui-primary) ring ring-inset ring-(--ui-primary)/50"
    },
    {
      "color": "secondary" as typeof color[number],
      "variant": "outline" as typeof variant[number],
      "class": "text-(--ui-secondary) ring ring-inset ring-(--ui-secondary)/50"
    },
    {
      "color": "success" as typeof color[number],
      "variant": "outline" as typeof variant[number],
      "class": "text-(--ui-success) ring ring-inset ring-(--ui-success)/50"
    },
    {
      "color": "info" as typeof color[number],
      "variant": "outline" as typeof variant[number],
      "class": "text-(--ui-info) ring ring-inset ring-(--ui-info)/50"
    },
    {
      "color": "warning" as typeof color[number],
      "variant": "outline" as typeof variant[number],
      "class": "text-(--ui-warning) ring ring-inset ring-(--ui-warning)/50"
    },
    {
      "color": "error" as typeof color[number],
      "variant": "outline" as typeof variant[number],
      "class": "text-(--ui-error) ring ring-inset ring-(--ui-error)/50"
    },
    {
      "color": "primary" as typeof color[number],
      "variant": "soft" as typeof variant[number],
      "class": "bg-(--ui-primary)/10 text-(--ui-primary)"
    },
    {
      "color": "secondary" as typeof color[number],
      "variant": "soft" as typeof variant[number],
      "class": "bg-(--ui-secondary)/10 text-(--ui-secondary)"
    },
    {
      "color": "success" as typeof color[number],
      "variant": "soft" as typeof variant[number],
      "class": "bg-(--ui-success)/10 text-(--ui-success)"
    },
    {
      "color": "info" as typeof color[number],
      "variant": "soft" as typeof variant[number],
      "class": "bg-(--ui-info)/10 text-(--ui-info)"
    },
    {
      "color": "warning" as typeof color[number],
      "variant": "soft" as typeof variant[number],
      "class": "bg-(--ui-warning)/10 text-(--ui-warning)"
    },
    {
      "color": "error" as typeof color[number],
      "variant": "soft" as typeof variant[number],
      "class": "bg-(--ui-error)/10 text-(--ui-error)"
    },
    {
      "color": "primary" as typeof color[number],
      "variant": "subtle" as typeof variant[number],
      "class": "bg-(--ui-primary)/10 text-(--ui-primary) ring ring-inset ring-(--ui-primary)/25"
    },
    {
      "color": "secondary" as typeof color[number],
      "variant": "subtle" as typeof variant[number],
      "class": "bg-(--ui-secondary)/10 text-(--ui-secondary) ring ring-inset ring-(--ui-secondary)/25"
    },
    {
      "color": "success" as typeof color[number],
      "variant": "subtle" as typeof variant[number],
      "class": "bg-(--ui-success)/10 text-(--ui-success) ring ring-inset ring-(--ui-success)/25"
    },
    {
      "color": "info" as typeof color[number],
      "variant": "subtle" as typeof variant[number],
      "class": "bg-(--ui-info)/10 text-(--ui-info) ring ring-inset ring-(--ui-info)/25"
    },
    {
      "color": "warning" as typeof color[number],
      "variant": "subtle" as typeof variant[number],
      "class": "bg-(--ui-warning)/10 text-(--ui-warning) ring ring-inset ring-(--ui-warning)/25"
    },
    {
      "color": "error" as typeof color[number],
      "variant": "subtle" as typeof variant[number],
      "class": "bg-(--ui-error)/10 text-(--ui-error) ring ring-inset ring-(--ui-error)/25"
    },
    {
      "color": "neutral" as typeof color[number],
      "variant": "solid" as typeof variant[number],
      "class": "text-(--ui-bg) bg-(--ui-bg-inverted)"
    },
    {
      "color": "neutral" as typeof color[number],
      "variant": "outline" as typeof variant[number],
      "class": "ring ring-inset ring-(--ui-border-accented) text-(--ui-text) bg-(--ui-bg)"
    },
    {
      "color": "neutral" as typeof color[number],
      "variant": "soft" as typeof variant[number],
      "class": "text-(--ui-text) bg-(--ui-bg-elevated)"
    },
    {
      "color": "neutral" as typeof color[number],
      "variant": "subtle" as typeof variant[number],
      "class": "ring ring-inset ring-(--ui-border-accented) text-(--ui-text) bg-(--ui-bg-elevated)"
    }
  ],
  "defaultVariants": {
    "color": "primary" as typeof color[number],
    "variant": "solid" as typeof variant[number],
    "size": "md" as typeof size[number]
  }
}