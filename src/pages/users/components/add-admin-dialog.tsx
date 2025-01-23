import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { PhoneInput } from "@/components/phone-input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, RegisterFields } from "../schema";
import { SubmitHandler, useForm } from "react-hook-form";

export function AddAdminDialog({
    className,
    ...props
}: React.ComponentPropsWithoutRef<"div">) {
    const [open, setOpen] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const form = useForm<RegisterFields>({
        resolver: zodResolver(registerSchema),
    });

    const onSubmit: SubmitHandler<RegisterFields> = () => {};

    return (
        <>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button>Администратор кошиш</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Регистрация</DialogTitle>
                        <DialogDescription>
                            Администратор кошиш учун маълумотларни киритинг
                        </DialogDescription>
                    </DialogHeader>
                    <div
                        className={cn("flex flex-col gap-6", className)}
                        {...props}
                    >
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)}>
                                <div className="flex flex-col gap-6">
                                    <div className="grid gap-2">
                                        <FormField
                                            control={form.control}
                                            name="first_name"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Исм</FormLabel>
                                                    <FormControl>
                                                        <Input {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <FormField
                                            control={form.control}
                                            name="last_name"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        Фамилия
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <FormField
                                            control={form.control}
                                            name="phone_number"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        Телефон
                                                    </FormLabel>
                                                    <FormControl>
                                                        <PhoneInput
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <FormField
                                            control={form.control}
                                            name="password"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        Пароль
                                                    </FormLabel>
                                                    <FormControl>
                                                        <div className="relative">
                                                            <Input
                                                                type={
                                                                    showPassword
                                                                        ? "text"
                                                                        : "password"
                                                                }
                                                                {...field}
                                                            />
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                className="absolute bottom-1 right-1 h-8 w-8"
                                                                onClick={() =>
                                                                    setShowPassword(
                                                                        !showPassword
                                                                    )
                                                                }
                                                            >
                                                                {showPassword ? (
                                                                    <EyeIcon className="h-4 w-4" />
                                                                ) : (
                                                                    <EyeOffIcon className="h-4 w-4" />
                                                                )}
                                                                <span className="sr-only">
                                                                    Toggle
                                                                    password
                                                                    visibility
                                                                </span>
                                                            </Button>
                                                        </div>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <Button type="submit" className="w-full">
                                        Регистрация
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}
