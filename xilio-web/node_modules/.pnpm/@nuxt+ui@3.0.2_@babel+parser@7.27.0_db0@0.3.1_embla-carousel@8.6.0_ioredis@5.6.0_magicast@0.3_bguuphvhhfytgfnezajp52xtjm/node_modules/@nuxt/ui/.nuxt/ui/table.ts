const loadingAnimation = [
  "carousel",
  "carousel-inverse",
  "swing",
  "elastic"
] as const

const loadingColor = [
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
    "root": "relative overflow-auto",
    "base": "min-w-full overflow-clip",
    "caption": "sr-only",
    "thead": "relative [&>tr]:after:absolute [&>tr]:after:inset-x-0 [&>tr]:after:bottom-0 [&>tr]:after:h-px [&>tr]:after:bg-(--ui-border-accented)",
    "tbody": "divide-y divide-(--ui-border) [&>tr]:data-[selectable=true]:hover:bg-(--ui-bg-elevated)/50 [&>tr]:data-[selectable=true]:focus-visible:outline-(--ui-primary)",
    "tr": "data-[selected=true]:bg-(--ui-bg-elevated)/50",
    "th": "px-4 py-3.5 text-sm text-(--ui-text-highlighted) text-left rtl:text-right font-semibold [&:has([role=checkbox])]:pe-0",
    "td": "p-4 text-sm text-(--ui-text-muted) whitespace-nowrap [&:has([role=checkbox])]:pe-0",
    "empty": "py-6 text-center text-sm text-(--ui-text-muted)",
    "loading": "py-6 text-center"
  },
  "variants": {
    "pinned": {
      "true": {
        "th": "sticky bg-(--ui-bg)/75 data-[pinned=left]:left-0 data-[pinned=right]:right-0",
        "td": "sticky bg-(--ui-bg)/75 data-[pinned=left]:left-0 data-[pinned=right]:right-0"
      }
    },
    "sticky": {
      "true": {
        "thead": "sticky top-0 inset-x-0 bg-(--ui-bg)/75 z-[1] backdrop-blur"
      }
    },
    "loading": {
      "true": {
        "thead": "after:absolute after:bottom-0 after:inset-x-0 after:h-px"
      }
    },
    "loadingAnimation": {
      "carousel": "",
      "carousel-inverse": "",
      "swing": "",
      "elastic": ""
    },
    "loadingColor": {
      "primary": "",
      "secondary": "",
      "success": "",
      "info": "",
      "warning": "",
      "error": "",
      "neutral": ""
    }
  },
  "compoundVariants": [
    {
      "loading": true,
      "loadingColor": "primary" as typeof loadingColor[number],
      "class": {
        "thead": "after:bg-(--ui-primary)"
      }
    },
    {
      "loading": true,
      "loadingColor": "secondary" as typeof loadingColor[number],
      "class": {
        "thead": "after:bg-(--ui-secondary)"
      }
    },
    {
      "loading": true,
      "loadingColor": "success" as typeof loadingColor[number],
      "class": {
        "thead": "after:bg-(--ui-success)"
      }
    },
    {
      "loading": true,
      "loadingColor": "info" as typeof loadingColor[number],
      "class": {
        "thead": "after:bg-(--ui-info)"
      }
    },
    {
      "loading": true,
      "loadingColor": "warning" as typeof loadingColor[number],
      "class": {
        "thead": "after:bg-(--ui-warning)"
      }
    },
    {
      "loading": true,
      "loadingColor": "error" as typeof loadingColor[number],
      "class": {
        "thead": "after:bg-(--ui-error)"
      }
    },
    {
      "loading": true,
      "loadingColor": "neutral" as typeof loadingColor[number],
      "class": {
        "thead": "after:bg-(--ui-bg-inverted)"
      }
    },
    {
      "loading": true,
      "loadingAnimation": "carousel" as typeof loadingAnimation[number],
      "class": {
        "thead": "after:animate-[carousel_2s_ease-in-out_infinite] rtl:after:animate-[carousel-rtl_2s_ease-in-out_infinite]"
      }
    },
    {
      "loading": true,
      "loadingAnimation": "carousel-inverse" as typeof loadingAnimation[number],
      "class": {
        "thead": "after:animate-[carousel-inverse_2s_ease-in-out_infinite] rtl:after:animate-[carousel-inverse-rtl_2s_ease-in-out_infinite]"
      }
    },
    {
      "loading": true,
      "loadingAnimation": "swing" as typeof loadingAnimation[number],
      "class": {
        "thead": "after:animate-[swing_2s_ease-in-out_infinite]"
      }
    },
    {
      "loading": true,
      "loadingAnimation": "elastic" as typeof loadingAnimation[number],
      "class": {
        "thead": "after:animate-[elastic_2s_ease-in-out_infinite]"
      }
    }
  ],
  "defaultVariants": {
    "loadingColor": "primary" as typeof loadingColor[number],
    "loadingAnimation": "carousel" as typeof loadingAnimation[number]
  }
}