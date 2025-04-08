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
    "root": "relative isolate",
    "item": "",
    "listWithChildren": "ms-4.5 border-s border-(--ui-border)",
    "itemWithChildren": "ps-1.5 -ms-px",
    "link": "relative group w-full flex items-center text-sm before:absolute before:inset-y-px before:inset-x-0 before:z-[-1] before:rounded-[calc(var(--ui-radius)*1.5)] focus:outline-none focus-visible:outline-none focus-visible:before:ring-inset focus-visible:before:ring-2",
    "linkLeadingIcon": "shrink-0",
    "linkLabel": "truncate",
    "linkTrailing": "ms-auto inline-flex gap-1.5 items-center",
    "linkTrailingIcon": "shrink-0 transform transition-transform duration-200 group-data-expanded:rotate-180"
  },
  "variants": {
    "color": {
      "primary": {
        "link": "focus-visible:before:ring-(--ui-primary)"
      },
      "secondary": {
        "link": "focus-visible:before:ring-(--ui-secondary)"
      },
      "success": {
        "link": "focus-visible:before:ring-(--ui-success)"
      },
      "info": {
        "link": "focus-visible:before:ring-(--ui-info)"
      },
      "warning": {
        "link": "focus-visible:before:ring-(--ui-warning)"
      },
      "error": {
        "link": "focus-visible:before:ring-(--ui-error)"
      },
      "neutral": {
        "link": "focus-visible:before:ring-(--ui-border-inverted)"
      }
    },
    "size": {
      "xs": {
        "link": "px-2 py-1 text-xs gap-1",
        "linkLeadingIcon": "size-4",
        "linkTrailingIcon": "size-4"
      },
      "sm": {
        "link": "px-2.5 py-1.5 text-xs gap-1.5",
        "linkLeadingIcon": "size-4",
        "linkTrailingIcon": "size-4"
      },
      "md": {
        "link": "px-2.5 py-1.5 text-sm gap-1.5",
        "linkLeadingIcon": "size-5",
        "linkTrailingIcon": "size-5"
      },
      "lg": {
        "link": "px-3 py-2 text-sm gap-2",
        "linkLeadingIcon": "size-5",
        "linkTrailingIcon": "size-5"
      },
      "xl": {
        "link": "px-3 py-2 text-base gap-2",
        "linkLeadingIcon": "size-6",
        "linkTrailingIcon": "size-6"
      }
    },
    "selected": {
      "true": {
        "link": "before:bg-(--ui-bg-elevated)"
      },
      "false": {
        "link": [
          "hover:not-disabled:text-(--ui-text-highlighted) hover:not-disabled:before:bg-(--ui-bg-elevated)/50",
          "transition-colors before:transition-colors"
        ]
      }
    },
    "disabled": {
      "true": {
        "link": "cursor-not-allowed opacity-75"
      }
    }
  },
  "compoundVariants": [
    {
      "color": "primary" as typeof color[number],
      "selected": true,
      "class": {
        "link": "text-(--ui-primary)"
      }
    },
    {
      "color": "secondary" as typeof color[number],
      "selected": true,
      "class": {
        "link": "text-(--ui-secondary)"
      }
    },
    {
      "color": "success" as typeof color[number],
      "selected": true,
      "class": {
        "link": "text-(--ui-success)"
      }
    },
    {
      "color": "info" as typeof color[number],
      "selected": true,
      "class": {
        "link": "text-(--ui-info)"
      }
    },
    {
      "color": "warning" as typeof color[number],
      "selected": true,
      "class": {
        "link": "text-(--ui-warning)"
      }
    },
    {
      "color": "error" as typeof color[number],
      "selected": true,
      "class": {
        "link": "text-(--ui-error)"
      }
    },
    {
      "color": "neutral" as typeof color[number],
      "selected": true,
      "class": {
        "link": "text-(--ui-text-highlighted)"
      }
    }
  ],
  "defaultVariants": {
    "color": "primary" as typeof color[number],
    "size": "md" as typeof size[number]
  }
}