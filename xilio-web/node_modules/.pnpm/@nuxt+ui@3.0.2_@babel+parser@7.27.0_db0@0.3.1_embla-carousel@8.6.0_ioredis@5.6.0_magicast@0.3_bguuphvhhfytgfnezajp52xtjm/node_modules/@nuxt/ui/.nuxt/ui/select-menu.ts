const buttonGroup = [
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

const type = [
  "file"
] as const

export default {
  "slots": {
    "base": [
      "relative group rounded-[calc(var(--ui-radius)*1.5)] inline-flex items-center focus:outline-none disabled:cursor-not-allowed disabled:opacity-75",
      "transition-colors"
    ],
    "leading": "absolute inset-y-0 start-0 flex items-center",
    "leadingIcon": "shrink-0 text-(--ui-text-dimmed)",
    "leadingAvatar": "shrink-0",
    "leadingAvatarSize": "",
    "trailing": "absolute inset-y-0 end-0 flex items-center",
    "trailingIcon": "shrink-0 text-(--ui-text-dimmed)",
    "value": "truncate pointer-events-none",
    "placeholder": "truncate text-(--ui-text-dimmed)",
    "arrow": "fill-(--ui-border)",
    "content": "max-h-60 w-(--reka-popper-anchor-width) bg-(--ui-bg) shadow-lg rounded-[calc(var(--ui-radius)*1.5)] ring ring-(--ui-border) overflow-hidden data-[state=open]:animate-[scale-in_100ms_ease-out] data-[state=closed]:animate-[scale-out_100ms_ease-in] pointer-events-auto",
    "viewport": "divide-y divide-(--ui-border) scroll-py-1",
    "group": "p-1 isolate",
    "empty": "py-2 text-center text-sm text-(--ui-text-muted)",
    "label": "font-semibold text-(--ui-text-highlighted)",
    "separator": "-mx-1 my-1 h-px bg-(--ui-border)",
    "item": [
      "group relative w-full flex items-center select-none outline-none before:absolute before:z-[-1] before:inset-px before:rounded-[calc(var(--ui-radius)*1.5)] data-disabled:cursor-not-allowed data-disabled:opacity-75 text-(--ui-text) data-highlighted:text-(--ui-text-highlighted) data-highlighted:before:bg-(--ui-bg-elevated)/50",
      "transition-colors before:transition-colors"
    ],
    "itemLeadingIcon": [
      "shrink-0 text-(--ui-text-dimmed) group-data-highlighted:text-(--ui-text)",
      "transition-colors"
    ],
    "itemLeadingAvatar": "shrink-0",
    "itemLeadingAvatarSize": "",
    "itemLeadingChip": "shrink-0",
    "itemLeadingChipSize": "",
    "itemTrailing": "ms-auto inline-flex gap-1.5 items-center",
    "itemTrailingIcon": "shrink-0",
    "itemLabel": "truncate",
    "input": "border-b border-(--ui-border)",
    "focusScope": "flex flex-col min-h-0"
  },
  "variants": {
    "buttonGroup": {
      "horizontal": "not-only:first:rounded-e-none not-only:last:rounded-s-none not-last:not-first:rounded-none",
      "vertical": "not-only:first:rounded-b-none not-only:last:rounded-t-none not-last:not-first:rounded-none"
    },
    "size": {
      "xs": {
        "base": "px-2 py-1 text-xs gap-1",
        "leading": "ps-2",
        "trailing": "pe-2",
        "leadingIcon": "size-4",
        "leadingAvatarSize": "3xs",
        "trailingIcon": "size-4",
        "label": "p-1 text-[10px]/3 gap-1",
        "item": "p-1 text-xs gap-1",
        "itemLeadingIcon": "size-4",
        "itemLeadingAvatarSize": "3xs",
        "itemLeadingChip": "size-4",
        "itemLeadingChipSize": "sm",
        "itemTrailingIcon": "size-4"
      },
      "sm": {
        "base": "px-2.5 py-1.5 text-xs gap-1.5",
        "leading": "ps-2.5",
        "trailing": "pe-2.5",
        "leadingIcon": "size-4",
        "leadingAvatarSize": "3xs",
        "trailingIcon": "size-4",
        "label": "p-1.5 text-[10px]/3 gap-1.5",
        "item": "p-1.5 text-xs gap-1.5",
        "itemLeadingIcon": "size-4",
        "itemLeadingAvatarSize": "3xs",
        "itemLeadingChip": "size-4",
        "itemLeadingChipSize": "sm",
        "itemTrailingIcon": "size-4"
      },
      "md": {
        "base": "px-2.5 py-1.5 text-sm gap-1.5",
        "leading": "ps-2.5",
        "trailing": "pe-2.5",
        "leadingIcon": "size-5",
        "leadingAvatarSize": "2xs",
        "trailingIcon": "size-5",
        "label": "p-1.5 text-xs gap-1.5",
        "item": "p-1.5 text-sm gap-1.5",
        "itemLeadingIcon": "size-5",
        "itemLeadingAvatarSize": "2xs",
        "itemLeadingChip": "size-5",
        "itemLeadingChipSize": "md",
        "itemTrailingIcon": "size-5"
      },
      "lg": {
        "base": "px-3 py-2 text-sm gap-2",
        "leading": "ps-3",
        "trailing": "pe-3",
        "leadingIcon": "size-5",
        "leadingAvatarSize": "2xs",
        "trailingIcon": "size-5",
        "label": "p-2 text-xs gap-2",
        "item": "p-2 text-sm gap-2",
        "itemLeadingIcon": "size-5",
        "itemLeadingAvatarSize": "2xs",
        "itemLeadingChip": "size-5",
        "itemLeadingChipSize": "md",
        "itemTrailingIcon": "size-5"
      },
      "xl": {
        "base": "px-3 py-2 text-base gap-2",
        "leading": "ps-3",
        "trailing": "pe-3",
        "leadingIcon": "size-6",
        "leadingAvatarSize": "xs",
        "trailingIcon": "size-6",
        "label": "p-2 text-sm gap-2",
        "item": "p-2 text-base gap-2",
        "itemLeadingIcon": "size-6",
        "itemLeadingAvatarSize": "xs",
        "itemLeadingChip": "size-6",
        "itemLeadingChipSize": "lg",
        "itemTrailingIcon": "size-6"
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
    "leading": {
      "true": ""
    },
    "trailing": {
      "true": ""
    },
    "loading": {
      "true": ""
    },
    "highlight": {
      "true": ""
    },
    "type": {
      "file": "file:me-1.5 file:font-medium file:text-(--ui-text-muted) file:outline-none"
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
      "leading": true,
      "size": "xs" as typeof size[number],
      "class": "ps-7"
    },
    {
      "leading": true,
      "size": "sm" as typeof size[number],
      "class": "ps-8"
    },
    {
      "leading": true,
      "size": "md" as typeof size[number],
      "class": "ps-9"
    },
    {
      "leading": true,
      "size": "lg" as typeof size[number],
      "class": "ps-10"
    },
    {
      "leading": true,
      "size": "xl" as typeof size[number],
      "class": "ps-11"
    },
    {
      "trailing": true,
      "size": "xs" as typeof size[number],
      "class": "pe-7"
    },
    {
      "trailing": true,
      "size": "sm" as typeof size[number],
      "class": "pe-8"
    },
    {
      "trailing": true,
      "size": "md" as typeof size[number],
      "class": "pe-9"
    },
    {
      "trailing": true,
      "size": "lg" as typeof size[number],
      "class": "pe-10"
    },
    {
      "trailing": true,
      "size": "xl" as typeof size[number],
      "class": "pe-11"
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
    "size": "md" as typeof size[number],
    "color": "primary" as typeof color[number],
    "variant": "outline" as typeof variant[number]
  }
}