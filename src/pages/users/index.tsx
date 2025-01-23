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
import { useGetUsers } from "./api/getAll";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { baseUrl } from "@/config/axios";
import { Switch } from "@/components/ui/switch";
import { useActivateUser } from "./api/activate";
import { useApproveUser } from "./api/approve";
import { AddAdminDialog } from "./components/add-admin-dialog";

export default function Users() {
    const { data: users } = useGetUsers();
    const { mutate: approve } = useApproveUser();
    const { mutate: activate } = useActivateUser();

    return (
        <>
            <PageHeader className="flex justify-between">
                <PageHeaderHeading>Фойдаланувчилар</PageHeaderHeading>
                <AddAdminDialog />
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
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {users?.map((user) => (
                                <TableRow key={user.id}>
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
                                                    userId: user.id,
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
                                                    userId: user.id,
                                                    isActive,
                                                })
                                            }
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <div className="flex flex-grow"></div>
                    <Table>
                        <TableFooter>
                            <TableRow>
                                <TableCell colSpan={4}>Total</TableCell>
                                <TableCell className="text-right">
                                    $2,500.00
                                </TableCell>
                            </TableRow>
                        </TableFooter>
                    </Table>
                </div>
            </div>
        </>
    );
}
