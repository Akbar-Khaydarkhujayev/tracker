import { useState } from "react";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import { useUpdateWorkSessionHours } from "../api/updateWorkSessionHours";

export default function BonusDrawer({ sessionId }: { sessionId: string }) {
    const [bonus, setBonus] = useState(0);
    const [isOpen, setIsOpen] = useState(false);

    const { mutate } = useUpdateWorkSessionHours();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.trim();

        if (value === "") {
            setBonus(0);
            return;
        }

        const parsedValue = Number(value);
        if (!isNaN(parsedValue)) {
            setBonus(parsedValue);
        }
    };

    return (
        <Drawer
            open={isOpen}
            onOpenChange={setIsOpen}
            onClose={() => setBonus(0)}
        >
            <DrawerTrigger asChild>
                <Button
                    variant="outline"
                    className="bg-transparent"
                    onClick={() => setIsOpen(true)}
                >
                    Bonus qo'shish
                </Button>
            </DrawerTrigger>
            <DrawerContent>
                <div className="mx-auto w-full max-w-sm">
                    <DrawerHeader>
                        <DrawerTitle>Bonus</DrawerTitle>
                        <DrawerDescription>
                            Soat qoshing yoki ayiring
                        </DrawerDescription>
                    </DrawerHeader>
                    <div className="p-4 pb-0">
                        <div className="flex items-center justify-center space-x-2">
                            <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8 shrink-0 rounded-full"
                                onClick={() => setBonus((prev) => prev - 1)}
                            >
                                <Minus />
                                <span className="sr-only">Decrease</span>
                            </Button>
                            <div className="flex-1 text-center">
                                <div className="px-6 pb-2">
                                    <input
                                        className="rounded-md border border-input px-2 ring-offset-background file:border-0 file:bg-transparent 
                                                                        file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground 
                                                                        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 
                                                                        disabled:cursor-not-allowed w-full text-7xl font-bold tracking-tighter text-center bg-transparent"
                                        value={bonus}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="text-[0.70rem] uppercase text-muted-foreground">
                                    Bonus / Soat
                                </div>
                            </div>
                            <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8 shrink-0 rounded-full"
                                onClick={() => setBonus((prev) => prev + 1)}
                            >
                                <Plus />
                                <span className="sr-only">Increase</span>
                            </Button>
                        </div>
                    </div>
                    <DrawerFooter>
                        <Button
                            onClick={() =>
                                mutate(
                                    {
                                        sessionId,
                                        data: { adjustedHours: bonus },
                                    },
                                    {
                                        onSuccess: () => {
                                            setIsOpen(false);
                                        },
                                    }
                                )
                            }
                        >
                            Saqlash
                        </Button>
                        <DrawerClose asChild>
                            <Button variant="outline">Bekor qilish</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </div>
            </DrawerContent>
        </Drawer>
    );
}
