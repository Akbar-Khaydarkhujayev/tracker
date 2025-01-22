import { Avatar } from "@/components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { useNavigate } from "react-router-dom";

export default function AccountDeletionPage() {
    const navigate = useNavigate();

    return (
        <div className="flex min-h-svh flex-col items-center gap-6 p-6 md:p-10 relative">
            <div
                className="flex items-center gap-2 self-center font-medium cursor-pointer"
                onClick={() => navigate("/login")}
            >
                <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
                    <img src="/logo-dark.png" className="size-4" />
                </div>
                Tracker
            </div>
            <div className="flex w-full max-w-7xl flex-col gap-6 mt-12">
                <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
                    <div>
                        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                            Acccount Deletion
                        </h1>
                        <p className="mt-4 text-2xl text-muted-foreground">
                            Full Description for Profile Deletion Request
                        </p>
                        <p className="text-2xl text-muted-foreground">
                            Feature in the Tracking App Accessing the Profile
                        </p>
                        <ul className="leading-7 list-disc [&:not(:first-child)]:mt-6">
                            <li className="text-xl font-bold">
                                Deletion Option:
                            </li>
                            <p>
                                When the user clicks on the profile circle at
                                the top-left corner of the main screen, a
                                detailed profile screen will appear. This screen
                                displays the user's profile picture, full name,
                                and phone number.
                            </p>
                            <li className="text-xl font-bold mt-4">
                                Requesting Profile Deletion:
                            </li>
                            <p>
                                On the profile screen, there is a red button
                                labeled "Аккаунтни ўчириш" (Delete Account). By
                                clicking this button, the user initiates a
                                request to delete their profile.
                            </p>
                            <li className="text-xl font-bold mt-4">
                                Purpose of the Feature:
                            </li>
                            <p>
                                The "Delete Account" feature allows users to
                                request the removal of their account data from
                                the application securely and in compliance with
                                data protection regulations. This ensures users
                                have control over their data and can opt out of
                                the service at any time
                            </p>
                            <li className="text-xl font-bold mt-4">
                                Steps to Delete the Profile:
                            </li>
                            <p>
                                Open the app's main screen. Click on the profile
                                circle at the top-left corner. In the profile
                                details screen, click the "Аккаунтни ўчириш"
                                (Delete Account) button to send a profile
                                deletion request.
                            </p>
                        </ul>
                    </div>
                    <div className="flex flex-col items-center md:flex-row gap-[20px] justify-center">
                        <Avatar className="h-[700px] w-[315px] rounded-lg">
                            <AvatarImage src="/delete-account/first.png" />
                        </Avatar>
                        <Avatar className="h-[700px] w-[315px] rounded-lg">
                            <AvatarImage src="/delete-account/second.png" />
                        </Avatar>
                    </div>
                </div>
            </div>
        </div>
    );
}
