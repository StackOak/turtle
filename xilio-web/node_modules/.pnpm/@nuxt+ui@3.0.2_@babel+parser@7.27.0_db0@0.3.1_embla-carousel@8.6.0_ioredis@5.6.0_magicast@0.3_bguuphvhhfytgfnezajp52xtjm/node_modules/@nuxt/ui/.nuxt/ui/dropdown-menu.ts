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
    "content": "min-w-32 bg-(--ui-bg) shadow-lg rounded-[calc(var(--ui-radius)*1.5)] ring ring-(--ui-border) divide-y divide-(--ui-border) overflow-y-auto scroll-py-1 data-[state=open]:animate-[scale-in_100ms_ease-out] data-[state=closed]:animate-[scale-out_100ms_ease-in]",
    "arrow": "fill-(--ui-border)",
    "group": "p-1 isolate",
    "label": "w-full flex items-center font-semibold text-(--ui-text-highlighted)",
    "separator": "-mx-1 my-1 h-px bg-(--ui-border)",
    "item": "group relative w-full flex items-center select-none outline-none before:absolute before:z-[-1] before:inset-px before:rounded-[calc(var(--ui-radius)*1.5)] data-disabled:cursor-not-allowed data-disabled:opacity-75",
    "itemLeadingIcon": "shrink-0",
    "itemLeadingAvatar": "shrink-0",
    "itemLeadingAvatarSize": "",
    "itemTrailing": "ms-auto inline-flex gap-1.5 items-center",
    "itemTrailingIcon": "shrink-0",
    "itemTrailingKbds": "hidden lg:inline-flex items-center shrink-0",
    "itemTrailingKbdsSize": "",
    "itemLabel": "truncate",
    "itemLabelExternalIcon": "inline-block size-3 align-top text-(--ui-text-dimmed)"
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
    "active": {
      "true": {
        "item": "text-(--ui-text-highlighted) before:bg-(--ui-bg-elevated)",
        "itemLeadingIcon": "text-(--ui-text)"
      },
      "false": {
        "item": [
          "text-(--ui-text) data-highlighted:text-(--ui-text-highlighted) data-[state=open]:text-(--ui-text-highlighted) data-highlighted:before:bg-(--ui-bg-elevated)/50 data-[state=open]:before:bg-(--ui-bg-elevated)/50",
          "transition-colors before:transition-colors"
        ],
        "itemLeadingIcon": [
          "text-(--ui-text-dimmed) group-data-highlighted:text-(--ui-text) group-data-[state=open]:text-(--ui-text)",
          "transition-colors"
        ]
      }
    },
    "loading": {
      "true": {
        "itemLeadingIcon": "animate-spin"
      }
    },
    "size": {
      "xs": {
        "label": "p-1 text-xs gap-1",
        "item": "p-1 text-xs gap-1",
        "itemLeadingIcon": "size-4",
        "itemLeadingAvatarSize": "3xs",
        "itemTrailingIcon": "size-4",
        "itemTrailingKbds": "gap-0.5",
        "itemTrailingKbdsSize": "sm"
      },
      "sm": {
        "label": "p-1.5 text-xs gap-1.5",
        "item": "p-1.5 text-xs gap-1.5",
        "itemLeadingIcon": "size-4",
        "itemLeadingAvatarSize": "3xs",
        "itemTrailingIcon": "size-4",
        "itemTrailingKbds": "gap-0.5",
        "itemTrailingKbdsSize": "sm"
      },
      "md": {
        "label": "p-1.5 text-sm gap-1.5",
        "item": "p-1.5 text-sm gap-1.5",
        "itemLeadingIcon": "size-5",
        "itemLeadingAvatarSize": "2xs",
        "itemTrailingIcon": "size-5",
        "itemTrailingKbds": "gap-0.5",
        "itemTrailingKbdsSize": "md"
      },
      "lg": {
        "label": "p-2 text-sm gap-2",
        "item": "p-2 text-sm gap-2",
        "itemLeadingIcon": "size-5",
        "itemLeadingAvatarSize": "2xs",
        "itemTrailingIcon": "size-5",
        "itemTrailingKbds": "gap-1",
        "itemTrailingKbdsSize": "md"
      },
      "xl": {
        "label": "p-2 text-base gap-2",
        "item": "p-2 text-base gap-2",
        "itemLeadingIcon": "size-6",
        "itemLeadingAvatarSize": "xs",
        "itemTrailingIcon": "size-6",
        "itemTrailingKbds": "gap-1",
        "itemTrailingKbdsSize": "lg"
      }
    }
  },
  "compoundVariants": [
    {
      "color": "primary" as typeof color[number],
      "active": false,
      "class": {
        "item": "text-(--ui-primary) data-highlighted:text-(--ui-primary) data-highlighted:before:bg-(--ui-primary)/10 data-[state=open]:before:bg-(--ui-primary)/10",
        "itemLeadingIcon": "text-(--ui-primary)/75 group-data-highlighted:text-(--ui-primary) group-data-[state=open]:text-(--ui-primary)"
      }
    },
    {
      "color": "secondary" as typeof color[number],
      "active": false,
      "class": {
        "item": "text-(--ui-secondary) data-highlighted:text-(--ui-secondary) data-highlighted:before:bg-(--ui-secondary)/10 data-[state=open]:before:bg-(--ui-secondary)/10",
        "itemLeadingIcon": "text-(--ui-secondary)/75 group-data-highlighted:text-(--ui-secondary) group-data-[state=open]:text-(--ui-secondary)"
      }
    },
    {
      "color": "success" as typeof color[number],
      "active": false,
      "class": {
        "item": "text-(--ui-success) data-highlighted:text-(--ui-success) data-highlighted:before:bg-(--ui-success)/10 data-[state=open]:before:bg-(--ui-success)/10",
        "itemLeadingIcon": "text-(--ui-success)/75 group-data-highlighted:text-(--ui-success) group-data-[state=open]:text-(--ui-success)"
      }
    },
    {
      "color": "info" as typeof color[number],
      "active": false,
      "class": {
        "item": "text-(--ui-info) data-highlighted:text-(--ui-info) data-highlighted:before:bg-(--ui-info)/10 data-[state=open]:before:bg-(--ui-info)/10",
        "itemLeadingIcon": "text-(--ui-info)/75 group-data-highlighted:text-(--ui-info) group-data-[state=open]:text-(--ui-info)"
      }
    },
    {
      "color": "warning" as typeof color[number],
      "active": false,
      "class": {
        "item": "text-(--ui-warning) data-highlighted:text-(--ui-warning) data-highlighted:before:bg-(--ui-warning)/10 data-[state=open]:before:bg-(--ui-warning)/10",
        "itemLeadingIcon": "text-(--ui-warning)/75 group-data-highlighted:text-(--ui-warning) group-data-[state=open]:text-(--ui-warning)"
      }
    },
    {
      "color": "error" as typeof color[number],
      "active": false,
      "class": {
        "item": "text-(--ui-error) data-highlighted:text-(--ui-error) data-highlighted:before:bg-(--ui-error)/10 data-[state=open]:before:bg-(--ui-error)/10",
        "itemLeadingIcon": "text-(--ui-error)/75 group-data-highlighted:text-(--ui-error) group-data-[state=open]:text-(--ui-error)"
      }
    },
    {
      "color": "primary" as typeof color[number],
      "active": true,
      "class": {
        "item": "text-(--ui-primary) before:bg-(--ui-primary)/10",
        "itemLeadingIcon": "text-(--ui-primary)"
      }
    },
    {
      "color": "secondary" as typeof color[number],
      "active": true,
      "class": {
        "item": "text-(--ui-secondary) before:bg-(--ui-secondary)/10",
        "itemLeadingIcon": "text-(--ui-secondary)"
      }
    },
    {
      "color": "success" as typeof color[number],
      "active": true,
      "class": {
        "item": "text-(--ui-success) before:bg-(--ui-success)/10",
        "itemLeadingIcon": "text-(--ui-success)"
      }
    },
    {
      "color": "info" as typeof color[number],
      "active": true,
      "class": {
        "item": "text-(--ui-info) before:bg-(--ui-info)/10",
        "itemLeadingIcon": "text-(--ui-info)"
      }
    },
    {
      "color": "warning" as typeof color[number],
      "active": true,
      "class": {
        "item": "text-(--ui-warning) before:bg-(--ui-warning)/10",
        "itemLeadingIcon": "text-(--ui-warning)"
      }
    },
    {
      "color": "error" as typeof color[number],
      "active": true,
      "class": {
        "item": "text-(--ui-error) before:bg-(--ui-error)/10",
        "itemLeadingIcon": "text-(--ui-error)"
      }
    }
  ],
  "defaultVariants": {
    "size": "md" as typeof size[number]
  }
}