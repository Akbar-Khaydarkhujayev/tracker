import { PageHeader, PageHeaderHeading } from "@/components/header/text";
import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { useGetUsers } from "./api/getAll";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { baseUrl } from "@/config/axios";
import { Switch } from "@/components/ui/switch";
import { useActivateUser } from "./api/activate";
import { useApproveUser } from "./api/approve";
import { AddAdminDialog } from "./components/add-admin-dialog";
import { useEffect, useState } from "react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format, subDays } from "date-fns";
import { cn } from "@/lib/utils";
import { DateRange } from "react-day-picker";
import usePagination from "@/hooks/use-pagination";
import { Badge } from "@/components/ui/badge";

const dateSelectOptions = [
    {
        label: "Бугун",
        value: "1",
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

export default function Users() {
    const [date, setDate] = useState<DateRange | undefined>({
        from: subDays(new Date(), 1),
        to: new Date(),
    });

    const { pagination, page, limit, setTotalPages } = usePagination();

    const { data: users } = useGetUsers({
        limit: limit,
        page,
        startDate: date?.from ? format(date.from, "yyyy-MM-dd") : undefined,
        endDate: date?.to ? format(date.to, "yyyy-MM-dd") : undefined,
    });

    useEffect(() => {
        if (users?.totalCount) {
            setTotalPages(users?.totalPage ?? 1);
        }
    }, [users, setTotalPages]);

    const { mutate: approve } = useApproveUser();
    const { mutate: activate } = useActivateUser();

    return (
        <>
            <PageHeader className="flex justify-between">
                <PageHeaderHeading>Фойдаланувчилар</PageHeaderHeading>
                <div className="flex gap-4">
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
                    <AddAdminDialog />
                </div>
            </PageHeader>
            <div className="flex flex-col flex-grow">
                <div className="container-wrapper flex flex-col flex-grow">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead></TableHead>
                                <TableHead>ФИО</TableHead>
                                <TableHead>Телефон рақами</TableHead>
                                <TableHead className="text-right">
                                    Тасдиқланган
                                </TableHead>
                                <TableHead className="text-right">
                                    Фаол
                                </TableHead>
                                <TableHead className="text-right">
                                    Ишлаш керак болган соат
                                </TableHead>
                                <TableHead className="text-right">
                                    Ишлаган соат
                                </TableHead>
                                <TableHead className="text-right">
                                    Етмаган/Ортиқча соат
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {users?.data?.map((user) => (
                                <TableRow key={user.user_id}>
                                    <TableCell className="p-2" width={1}>
                                        <Avatar className="rounded-lg">
                                            <AvatarImage
                                                src={`${baseUrl}/api/${user.photo}`}
                                                alt={user.first_name}
                                            />
                                            <AvatarFallback className="rounded-lg">
                                                {(
                                                    user.first_name.charAt(0) +
                                                    user.last_name.charAt(0)
                                                ).toUpperCase()}
                                            </AvatarFallback>
                                        </Avatar>
                                    </TableCell>
                                    <TableCell>
                                        {user.first_name} {user.last_name}
                                    </TableCell>
                                    <TableCell>{user.phone_number}</TableCell>
                                    <TableCell className="text-right">
                                        <Switch
                                            id="is_approved"
                                            checked={user.is_approved}
                                            onCheckedChange={(isApproved) =>
                                                approve({
                                                    userId: user.user_id,
                                                    isApproved,
                                                })
                                            }
                                        />
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Switch
                                            id="is_active"
                                            checked={user.is_active}
                                            onCheckedChange={(isActive) =>
                                                activate({
                                                    userId: user.user_id,
                                                    isActive,
                                                })
                                            }
                                        />
                                    </TableCell>
                                    <TableCell className="text-right">
                                        {user.expected_hours}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        {user.actual_hours}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Badge
                                            variant={
                                                user.work_status ===
                                                "underworked"
                                                    ? "destructive"
                                                    : "success"
                                            }
                                        >
                                            {user.missing_hours}
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <div className="flex flex-grow"></div>
                    <Table>
                        <TableFooter>{pagination}</TableFooter>
                    </Table>
                </div>
            </div>
        </>
    );
}
