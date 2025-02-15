import { PageHeader, PageHeaderHeading } from "@/components/header/text";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { baseUrl } from "@/config/axios";
import { useState } from "react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon, ChevronLeft } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format, subDays } from "date-fns";
import { cn } from "@/lib/utils";
import { DateRange } from "react-day-picker";
import { Badge } from "@/components/ui/badge";
import { useNavigate, useParams } from "react-router-dom";
import SessionLine from "./components/SessionLine";
import { useGetWorkSessions } from "./api/getWorkSessions";
import BonusDrawer from "./components/BonusDrawer";

const dateSelectOptions = [
    {
        label: "Бугун",
        value: "0",
    },
    {
        label: "Охирги ҳафта",
        value: "7",
    },
    {
        label: "Охирги ой",
        value: "31",
    },
];

const formatTotalHours = (totalHours: string) => {
    const [hours, minutes] = totalHours.split(":").map(Number);
    return `${hours} soat ${minutes} minut`;
};

export default function Sessions() {
    const navigate = useNavigate();
    const { userId } = useParams();

    const [date, setDate] = useState<DateRange | undefined>({
        from: new Date(),
        to: new Date(),
    });

    const { data } = useGetWorkSessions(
        {
            startDate: date?.from ? format(date.from, "yyyy-MM-dd") : undefined,
            endDate: date?.to ? format(date.to, "yyyy-MM-dd") : undefined,
        },
        userId
    );

    return (
        <>
            <PageHeader className="flex justify-between py-0">
                <PageHeaderHeading>
                    <Button variant="ghost" onClick={() => navigate("/")}>
                        <ChevronLeft />
                        <Avatar className="rounded-lg">
                            <AvatarImage
                                src={`${baseUrl}/api/profile_pictures/${data?.user_info.photo}`}
                                alt="Izzatullo Rasuljonov"
                            />
                            <AvatarFallback className="rounded-lg">
                                {(
                                    (data?.user_info.first_name?.charAt(0) ??
                                        "") +
                                    (data?.user_info.last_name?.charAt(0) ?? "")
                                ).toUpperCase()}
                            </AvatarFallback>
                        </Avatar>{" "}
                        <div className="text-lg">
                            {data?.user_info.first_name}{" "}
                            {data?.user_info.last_name}
                        </div>
                    </Button>
                </PageHeaderHeading>
                <div className="flex gap-4">
                    {!!data?.total_adjusted_hours && (
                        <Badge
                            variant={
                                data?.total_adjusted_hours < 0
                                    ? "destructive"
                                    : "success"
                            }
                            className="px-4 h-10 text-base"
                        >
                            {data?.total_adjusted_hours} soat
                        </Badge>
                    )}
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant={"outline"}
                                className={cn(
                                    "w-[280px] justify-start text-left font-normal",
                                    !date && "text-muted-foreground"
                                )}
                            >
                                <CalendarIcon />
                                {date && date.from && date.to ? (
                                    format(date.from, "dd.MM.yyyy") +
                                    " - " +
                                    format(date.to, "dd.MM.yyyy")
                                ) : (
                                    <span>Сана оралиғини танланг</span>
                                )}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="flex w-auto flex-col space-y-2 p-2">
                            <Select
                                onValueChange={(value) =>
                                    setDate({
                                        from: subDays(
                                            new Date(),
                                            parseInt(value)
                                        ),
                                        to: new Date(),
                                    })
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Сана оралиғини танланг" />
                                </SelectTrigger>
                                <SelectContent position="popper">
                                    {dateSelectOptions.map((option) => (
                                        <SelectItem
                                            key={option.value}
                                            value={option.value}
                                        >
                                            {option.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <div className="rounded-md border">
                                <Calendar
                                    mode="range"
                                    defaultMonth={date?.to}
                                    selected={date}
                                    onSelect={setDate}
                                    max={new Date().getTime()}
                                />
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>
            </PageHeader>
            <div className="flex flex-col flex-grow">
                <div className="container-wrapper flex flex-col flex-grow">
                    <div className="p-4 gap-4 flex flex-col">
                        {data?.days ? (
                            Object.entries(data.days).map(
                                ([date, sessions], index) => (
                                    <div
                                        key={`${date}-${index}`}
                                        className="flex gap-4 gap-y-4"
                                    >
                                        <div className="leading-10">
                                            {format(
                                                new Date(date),
                                                "dd.MM.yyyy"
                                            )}
                                        </div>

                                        <SessionLine sessions={sessions} />
                                    </div>
                                )
                            )
                        ) : (
                            <h1 className="text-center scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl my-10">
                                😔 Tanlangan kun oraligida ish sessiyalar
                                topilmadi 😔
                            </h1>
                        )}
                    </div>
                    <div className="flex flex-grow"></div>
                    <div className="w-full h-16 bg border-t bg-muted/50">
                        <div className="flex justify-between items-center h-full px-4">
                            <div className="flex flex-row gap-6">
                                <div>
                                    <h4 className="scroll-m-20 text-xl font-semibold tracking-tight leading-10">
                                        Umumiy:{" "}
                                        {data?.total_work_hours
                                            ? formatTotalHours(
                                                  data?.total_work_hours
                                              )
                                            : "0 soat"}
                                    </h4>
                                </div>
                                {!!data?.total_overtime_hours && (
                                    <Badge
                                        variant="success"
                                        className="px-4 h-10 text-base"
                                    >
                                        {formatTotalHours(
                                            data?.total_overtime_hours
                                        )}
                                    </Badge>
                                )}
                                {!!data?.missing_hours && (
                                    <Badge
                                        variant="destructive"
                                        className="px-4 h-10 text-base"
                                    >
                                        {formatTotalHours(data?.missing_hours)}
                                    </Badge>
                                )}
                            </div>

                            {data?.days?.[
                                Object.keys(data.days).pop() as string
                            ]?.[0]?.id && (
                                <BonusDrawer
                                    sessionId={
                                        data.days[
                                            Object.keys(
                                                data.days
                                            ).pop() as string
                                        ][0].id
                                    }
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
