import React from "react"
import { motion } from "framer-motion"
import { cva, type VariantProps } from "class-variance-authority"
import { twMerge } from "tailwind-merge"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-full text-base font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 hover:scale-[1.02] active:scale-[0.98]",
  {
    variants: {
      variant: {
        primary: "bg-blush-rose text-white hover:opacity-90",
        secondary:
          "border-2 border-blush-rose text-blush-rose hover:bg-blush-rose hover:text-white",
        link: "text-blush-rose font-medium hover:underline",
      },
      size: {
        default: "px-8 py-3.5",
        sm: "px-6 py-2.5",
        lg: "px-10 py-4",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
)

export interface ButtonProps
  extends
    Omit<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      | "onAnimationStart"
      | "onAnimationEnd"
      | "onAnimationIteration"
      | "onTransitionEnd"
      | "onDrag"
      | "onDragEnd"
      | "onDragEnter"
      | "onDragExit"
      | "onDragLeave"
      | "onDragOver"
      | "onDragStart"
      | "onDrop"
    >,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const classes = twMerge(buttonVariants({ variant, size, className }))

    if (asChild && React.isValidElement(props.children)) {
      const child = props.children as React.ReactElement
      
      // If it's an anchor, we use motion.a
      if (child.type === "a") {
        return (
          <motion.a
            className={twMerge(classes, child.props.className)}
            ref={ref as any}
            {...props}
            {...child.props}
          />
        )
      }
      
      // Fallback for other elements: just clone it without motion if it's not a common case
      // or we can just use motion.div as a wrapper if needed.
      return React.cloneElement(child, {
        className: twMerge(classes, child.props.className),
        ...props,
      } as any)
    }

    return (
      <motion.button
        className={classes}
        ref={ref}
        transition={{ duration: 0.2 }}
        {...props}
      />
    )
  },
)
Button.displayName = "Button"

export { Button, buttonVariants }
