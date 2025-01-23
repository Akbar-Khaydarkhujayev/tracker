import { cn } from "@/lib/utils";

function PageHeader({
    className,
    children,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <section
            className={cn("border-grid custom-border-bottom", className)}
            {...props}
        >
            <div className="container-wrapper">
                <div className="container flex items-start justify-between gap-1 py-2 md:py-4">
                    {children}
                </div>
            </div>
        </section>
    );
}

function PageHeaderHeading({
    className,
    ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
    return (
        <h1
            className={cn(
                "text-xl font-bold tracking-tighter md:text-2xl",
                className
            )}
            {...props}
        />
    );
}

function PageHeaderDescription({
    className,
    ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
    return (
        <p
            className={cn(
                "max-w-2xl text-balance text-lg font-light text-foreground",
                className
            )}
            {...props}
        />
    );
}

function PageActions({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn(
                "flex w-full items-center justify-start gap-2 pt-2",
                className
            )}
            {...props}
        />
    );
}

export { PageActions, PageHeader, PageHeaderDescription, PageHeaderHeading };
