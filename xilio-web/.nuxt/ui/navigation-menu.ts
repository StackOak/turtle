const color = [
  "primary",
  "secondary",
  "success",
  "info",
  "warning",
  "error",
  "neutral"
] as const

const highlightColor = [
  "primary",
  "secondary",
  "success",
  "info",
  "warning",
  "error",
  "neutral"
] as const

const variant = [
  "pill",
  "link"
] as const

const orientation = [
  "horizontal",
  "vertical"
] as const

const contentOrientation = [
  "horizontal",
  "vertical"
] as const

export default {
  "slots": {
    "root": "relative flex gap-1.5 [&>div]:min-w-0",
    "list": "isolate min-w-0",
    "label": "w-full flex items-center gap-1.5 font-semibold text-xs/5 text-(--ui-text-highlighted) px-2.5 py-1.5",
    "item": "min-w-0",
    "link": "group relative w-full flex items-center gap-1.5 font-medium text-sm before:absolute before:z-[-1] before:rounded-[calc(var(--ui-radius)*1.5)] focus:outline-none focus-visible:outline-none dark:focus-visible:outline-none focus-visible:before:ring-inset focus-visible:before:ring-2",
    "linkLeadingIcon": "shrink-0 size-5",
    "linkLeadingAvatar": "shrink-0",
    "linkLeadingAvatarSize": "2xs",
    "linkTrailing": "ms-auto inline-flex gap-1.5 items-center",
    "linkTrailingBadge": "shrink-0",
    "linkTrailingBadgeSize": "sm",
    "linkTrailingIcon": "size-5 transform shrink-0 group-data-[state=open]:rotate-180 transition-transform duration-200",
    "linkLabel": "truncate",
    "linkLabelExternalIcon": "inline-block size-3 align-top text-(--ui-text-dimmed)",
    "childList": "",
    "childItem": "",
    "childLink": "group size-full px-3 py-2 rounded-[calc(var(--ui-radius)*1.5)] flex items-start gap-2 text-start",
    "childLinkWrapper": "flex flex-col items-start",
    "childLinkIcon": "size-5 shrink-0",
    "childLinkLabel": "font-semibold text-sm relative inline-flex",
    "childLinkLabelExternalIcon": "inline-block size-3 align-top text-(--ui-text-dimmed)",
    "childLinkDescription": "text-sm text-(--ui-text-muted)",
    "separator": "px-2 h-px bg-(--ui-border)",
    "viewportWrapper": "absolute top-full left-0 flex w-full",
    "viewport": "relative overflow-hidden bg-(--ui-bg) shadow-lg rounded-[calc(var(--ui-radius)*1.5)] ring ring-(--ui-border) h-(--reka-navigation-menu-viewport-height) w-full transition-[width,height,left] duration-200 origin-[top_center] data-[state=open]:animate-[scale-in_100ms_ease-out] data-[state=closed]:animate-[scale-out_100ms_ease-in] z-[1]",
    "content": "absolute top-0 left-0 w-full",
    "indicator": "absolute data-[state=visible]:animate-[fade-in_100ms_ease-out] data-[state=hidden]:animate-[fade-out_100ms_ease-in] data-[state=hidden]:opacity-0 bottom-0 z-[2] w-(--reka-navigation-menu-indicator-size) translate-x-(--reka-navigation-menu-indicator-position) flex h-2.5 items-end justify-center overflow-hidden transition-[translate,width] duration-200",
    "arrow": "relative top-[50%] size-2.5 rotate-45 border border-(--ui-border) bg-(--ui-bg) z-[1] rounded-[calc(var(--ui-radius)/2)]"
  },
  "variants": {
    "color": {
      "primary": {
        "link": "focus-visible:before:ring-(--ui-primary)",
        "childLink": "focus-visible:outline-(--ui-primary)"
      },
      "secondary": {
        "link": "focus-visible:before:ring-(--ui-secondary)",
        "childLink": "focus-visible:outline-(--ui-secondary)"
      },
      "success": {
        "link": "focus-visible:before:ring-(--ui-success)",
        "childLink": "focus-visible:outline-(--ui-success)"
      },
      "info": {
        "link": "focus-visible:before:ring-(--ui-info)",
        "childLink": "focus-visible:outline-(--ui-info)"
      },
      "warning": {
        "link": "focus-visible:before:ring-(--ui-warning)",
        "childLink": "focus-visible:outline-(--ui-warning)"
      },
      "error": {
        "link": "focus-visible:before:ring-(--ui-error)",
        "childLink": "focus-visible:outline-(--ui-error)"
      },
      "neutral": {
        "link": "focus-visible:before:ring-(--ui-border-inverted)",
        "childLink": "focus-visible:outline-(--ui-border-inverted)"
      }
    },
    "highlightColor": {
      "primary": "",
      "secondary": "",
      "success": "",
      "info": "",
      "warning": "",
      "error": "",
      "neutral": ""
    },
    "variant": {
      "pill": "",
      "link": ""
    },
    "orientation": {
      "horizontal": {
        "root": "items-center justify-between",
        "list": "flex items-center",
        "item": "py-2",
        "link": "px-2.5 py-1.5 before:inset-x-px before:inset-y-0",
        "childList": "grid p-2"
      },
      "vertical": {
        "root": "flex-col",
        "link": "flex-row px-2.5 py-1.5 before:inset-y-px before:inset-x-0"
      }
    },
    "contentOrientation": {
      "horizontal": {
        "viewport": "",
        "viewportWrapper": "justify-center",
        "content": "data-[motion=from-start]:animate-[enter-from-left_200ms_ease] data-[motion=from-end]:animate-[enter-from-right_200ms_ease] data-[motion=to-start]:animate-[exit-to-left_200ms_ease] data-[motion=to-end]:animate-[exit-to-right_200ms_ease]"
      },
      "vertical": {
        "viewport": "sm:w-(--reka-navigation-menu-viewport-width) left-(--reka-navigation-menu-viewport-left)",
        "content": ""
      }
    },
    "active": {
      "true": {
        "childLink": "bg-(--ui-bg-elevated) text-(--ui-text-highlighted)",
        "childLinkIcon": "text-(--ui-text)"
      },
      "false": {
        "link": "text-(--ui-text-muted)",
        "linkLeadingIcon": "text-(--ui-text-dimmed)",
        "childLink": [
          "hover:bg-(--ui-bg-elevated)/50 text-(--ui-text) hover:text-(--ui-text-highlighted)",
          "transition-colors"
        ],
        "childLinkIcon": [
          "text-(--ui-text-dimmed) group-hover:text-(--ui-text)",
          "transition-colors"
        ]
      }
    },
    "disabled": {
      "true": {
        "link": "cursor-not-allowed opacity-75"
      }
    },
    "highlight": {
      "true": ""
    },
    "level": {
      "true": ""
    },
    "collapsed": {
      "true": ""
    }
  },
  "compoundVariants": [
    {
      "orientation": "horizontal" as typeof orientation[number],
      "contentOrientation": "horizontal" as typeof contentOrientation[number],
      "class": {
        "childList": "grid-cols-2 gap-2"
      }
    },
    {
      "orientation": "horizontal" as typeof orientation[number],
      "contentOrientation": "vertical" as typeof contentOrientation[number],
      "class": {
        "childList": "gap-1",
        "content": "w-60"
      }
    },
    {
      "orientation": "horizontal" as typeof orientation[number],
      "highlight": true,
      "class": {
        "link": [
          "after:absolute after:-bottom-2 after:inset-x-2.5 after:block after:h-px after:rounded-full",
          "after:transition-colors"
        ]
      }
    },
    {
      "orientation": "vertical" as typeof orientation[number],
      "highlight": true,
      "level": true,
      "class": {
        "link": [
          "after:absolute after:-start-1.5 after:inset-y-0.5 after:block after:w-px after:rounded-full",
          "after:transition-colors"
        ]
      }
    },
    {
      "disabled": false,
      "active": false,
      "variant": "pill" as typeof variant[number],
      "class": {
        "link": [
          "hover:text-(--ui-text-highlighted) hover:before:bg-(--ui-bg-elevated)/50",
          "transition-colors before:transition-colors"
        ],
        "linkLeadingIcon": [
          "group-hover:text-(--ui-text)",
          "transition-colors"
        ]
      }
    },
    {
      "disabled": false,
      "active": false,
      "variant": "pill" as typeof variant[number],
      "orientation": "horizontal" as typeof orientation[number],
      "class": {
        "link": "data-[state=open]:text-(--ui-text-highlighted)",
        "linkLeadingIcon": "group-data-[state=open]:text-(--ui-text)"
      }
    },
    {
      "disabled": false,
      "variant": "pill" as typeof variant[number],
      "highlight": true,
      "orientation": "horizontal" as typeof orientation[number],
      "class": {
        "link": "data-[state=open]:before:bg-(--ui-bg-elevated)/50"
      }
    },
    {
      "disabled": false,
      "variant": "pill" as typeof variant[number],
      "highlight": false,
      "active": false,
      "orientation": "horizontal" as typeof orientation[number],
      "class": {
        "link": "data-[state=open]:before:bg-(--ui-bg-elevated)/50"
      }
    },
    {
      "color": "primary" as typeof color[number],
      "variant": "pill" as typeof variant[number],
      "active": true,
      "class": {
        "link": "text-(--ui-primary)",
        "linkLeadingIcon": "text-(--ui-primary) group-data-[state=open]:text-(--ui-primary)"
      }
    },
    {
      "color": "secondary" as typeof color[number],
      "variant": "pill" as typeof variant[number],
      "active": true,
      "class": {
        "link": "text-(--ui-secondary)",
        "linkLeadingIcon": "text-(--ui-secondary) group-data-[state=open]:text-(--ui-secondary)"
      }
    },
    {
      "color": "success" as typeof color[number],
      "variant": "pill" as typeof variant[number],
      "active": true,
      "class": {
        "link": "text-(--ui-success)",
        "linkLeadingIcon": "text-(--ui-success) group-data-[state=open]:text-(--ui-success)"
      }
    },
    {
      "color": "info" as typeof color[number],
      "variant": "pill" as typeof variant[number],
      "active": true,
      "class": {
        "link": "text-(--ui-info)",
        "linkLeadingIcon": "text-(--ui-info) group-data-[state=open]:text-(--ui-info)"
      }
    },
    {
      "color": "warning" as typeof color[number],
      "variant": "pill" as typeof variant[number],
      "active": true,
      "class": {
        "link": "text-(--ui-warning)",
        "linkLeadingIcon": "text-(--ui-warning) group-data-[state=open]:text-(--ui-warning)"
      }
    },
    {
      "color": "error" as typeof color[number],
      "variant": "pill" as typeof variant[number],
      "active": true,
      "class": {
        "link": "text-(--ui-error)",
        "linkLeadingIcon": "text-(--ui-error) group-data-[state=open]:text-(--ui-error)"
      }
    },
    {
      "color": "neutral" as typeof color[number],
      "variant": "pill" as typeof variant[number],
      "active": true,
      "class": {
        "link": "text-(--ui-text-highlighted)",
        "linkLeadingIcon": "text-(--ui-text-highlighted) group-data-[state=open]:text-(--ui-text-highlighted)"
      }
    },
    {
      "variant": "pill" as typeof variant[number],
      "active": true,
      "highlight": false,
      "class": {
        "link": "before:bg-(--ui-bg-elevated)"
      }
    },
    {
      "variant": "pill" as typeof variant[number],
      "active": true,
      "highlight": true,
      "class": {
        "link": [
          "hover:before:bg-(--ui-bg-elevated)/50",
          "before:transition-colors"
        ]
      }
    },
    {
      "disabled": false,
      "active": false,
      "variant": "link" as typeof variant[number],
      "class": {
        "link": [
          "hover:text-(--ui-text-highlighted)",
          "transition-colors"
        ],
        "linkLeadingIcon": [
          "group-hover:text-(--ui-text)",
          "transition-colors"
        ]
      }
    },
    {
      "disabled": false,
      "active": false,
      "variant": "link" as typeof variant[number],
      "orientation": "horizontal" as typeof orientation[number],
      "class": {
        "link": "data-[state=open]:text-(--ui-text-highlighted)",
        "linkLeadingIcon": "group-data-[state=open]:text-(--ui-text)"
      }
    },
    {
      "color": "primary" as typeof color[number],
      "variant": "link" as typeof variant[number],
      "active": true,
      "class": {
        "link": "text-(--ui-primary)",
        "linkLeadingIcon": "text-(--ui-primary) group-data-[state=open]:text-(--ui-primary)"
      }
    },
    {
      "color": "secondary" as typeof color[number],
      "variant": "link" as typeof variant[number],
      "active": true,
      "class": {
        "link": "text-(--ui-secondary)",
        "linkLeadingIcon": "text-(--ui-secondary) group-data-[state=open]:text-(--ui-secondary)"
      }
    },
    {
      "color": "success" as typeof color[number],
      "variant": "link" as typeof variant[number],
      "active": true,
      "class": {
        "link": "text-(--ui-success)",
        "linkLeadingIcon": "text-(--ui-success) group-data-[state=open]:text-(--ui-success)"
      }
    },
    {
      "color": "info" as typeof color[number],
      "variant": "link" as typeof variant[number],
      "active": true,
      "class": {
        "link": "text-(--ui-info)",
        "linkLeadingIcon": "text-(--ui-info) group-data-[state=open]:text-(--ui-info)"
      }
    },
    {
      "color": "warning" as typeof color[number],
      "variant": "link" as typeof variant[number],
      "active": true,
      "class": {
        "link": "text-(--ui-warning)",
        "linkLeadingIcon": "text-(--ui-warning) group-data-[state=open]:text-(--ui-warning)"
      }
    },
    {
      "color": "error" as typeof color[number],
      "variant": "link" as typeof variant[number],
      "active": true,
      "class": {
        "link": "text-(--ui-error)",
        "linkLeadingIcon": "text-(--ui-error) group-data-[state=open]:text-(--ui-error)"
      }
    },
    {
      "color": "neutral" as typeof color[number],
      "variant": "link" as typeof variant[number],
      "active": true,
      "class": {
        "link": "text-(--ui-text-highlighted)",
        "linkLeadingIcon": "text-(--ui-text-highlighted) group-data-[state=open]:text-(--ui-text-highlighted)"
      }
    },
    {
      "highlightColor": "primary" as typeof highlightColor[number],
      "highlight": true,
      "level": true,
      "active": true,
      "class": {
        "link": "after:bg-(--ui-primary)"
      }
    },
    {
      "highlightColor": "secondary" as typeof highlightColor[number],
      "highlight": true,
      "level": true,
      "active": true,
      "class": {
        "link": "after:bg-(--ui-secondary)"
      }
    },
    {
      "highlightColor": "success" as typeof highlightColor[number],
      "highlight": true,
      "level": true,
      "active": true,
      "class": {
        "link": "after:bg-(--ui-success)"
      }
    },
    {
      "highlightColor": "info" as typeof highlightColor[number],
      "highlight": true,
      "level": true,
      "active": true,
      "class": {
        "link": "after:bg-(--ui-info)"
      }
    },
    {
      "highlightColor": "warning" as typeof highlightColor[number],
      "highlight": true,
      "level": true,
      "active": true,
      "class": {
        "link": "after:bg-(--ui-warning)"
      }
    },
    {
      "highlightColor": "error" as typeof highlightColor[number],
      "highlight": true,
      "level": true,
      "active": true,
      "class": {
        "link": "after:bg-(--ui-error)"
      }
    },
    {
      "highlightColor": "neutral" as typeof highlightColor[number],
      "highlight": true,
      "level": true,
      "active": true,
      "class": {
        "link": "after:bg-(--ui-bg-inverted)"
      }
    },
    {
      "orientation": "vertical" as typeof orientation[number],
      "collapsed": false,
      "class": {
        "childList": "ms-5 border-s border-(--ui-border)",
        "childItem": "ps-1.5 -ms-px"
      }
    },
    {
      "orientation": "vertical" as typeof orientation[number],
      "collapsed": true,
      "class": {
        "link": "px-1.5"
      }
    }
  ],
  "defaultVariants": {
    "color": "primary" as typeof color[number],
    "highlightColor": "primary" as typeof highlightColor[number],
    "variant": "pill" as typeof variant[number]
  }
}