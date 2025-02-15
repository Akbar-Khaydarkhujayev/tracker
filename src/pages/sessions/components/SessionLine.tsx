import { differenceInMinutes, format, setHours, startOfDay } from "date-fns";
import { IWorkSession } from "../api/getWorkSessions";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { useMemo } from "react";
import { cn } from "@/lib/utils";

interface IProps {
    sessions: IWorkSession[];
}

interface IProcessedSession {
    duration: number;
    end_time: Date;
    start_time: Date;
    type: "work" | "break";
}

export default function SessionLine({ sessions }: IProps) {
    const processedSessions = useMemo(() => {
        if (!sessions.length) return [];

        const dayStart = setHours(startOfDay(new Date()), 9);
        const dayEnd = setHours(startOfDay(new Date()), 18);
        const result: IProcessedSession[] = [];

        if (new Date(sessions[0].start_time) > dayStart) {
            result.push({
                duration: differenceInMinutes(
                    new Date(sessions[0].start_time),
                    dayStart
                ),
                start_time: dayStart,
                end_time: new Date(sessions[0].start_time),
                type: "break",
            });
        }

        sessions.forEach((session, i) => {
            const start = new Date(session.start_time);
            const end = new Date(session.end_time);

            result.push({
                duration: differenceInMinutes(end, start),
                start_time: start,
                end_time: end,
                type: "work",
            });

            const nextSession = sessions[i + 1];
            if (nextSession) {
                const nextStart = new Date(nextSession.start_time);
                if (end < nextStart) {
                    result.push({
                        duration: differenceInMinutes(nextStart, end),
                        start_time: end,
                        end_time: nextStart,
                        type: "break",
                    });
                }
            }
        });

        const lastSessionEnd = new Date(sessions[sessions.length - 1].end_time);
        if (lastSessionEnd < dayEnd) {
            result.push({
                duration: differenceInMinutes(dayEnd, lastSessionEnd),
                start_time: lastSessionEnd,
                end_time: dayEnd,
                type: "break",
            });
        }

        return result;
    }, [sessions]);

    console.log("/////////////////////////////////////////////");
    console.log(sessions);
    console.log(processedSessions);

    const totalDuration = processedSessions.length
        ? differenceInMinutes(
              processedSessions[processedSessions.length - 1].end_time,
              processedSessions[0].start_time
          )
        : 0;

    return (
        <div className="rounded-md h-10 overflow-hidden w-full flex bg-secondary">
            {processedSessions.map((session, i) => {
                const widthPercentage =
                    (session.duration / totalDuration) * 100;
                return (
                    <TooltipProvider key={i}>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <div
                                    className={cn(
                                        "cursor-pointer border-r font-bold flex justify-between h-full p-1",
                                        session.type === "work"
                                            ? "bg-green-700 hover:bg-green-700/80"
                                            : "bg-destructive  hover:bg-destructive/80"
                                    )}
                                    style={{ width: `${widthPercentage}%` }}
                                >
                                    <div className="text-lg">
                                        {widthPercentage > 10 &&
                                            format(session.start_time, "HH:mm")}
                                    </div>
                                    <div className="text-lg">
                                        {widthPercentage > 10 &&
                                            format(session.end_time, "HH:mm")}
                                    </div>
                                </div>
                            </TooltipTrigger>
                            <TooltipContent>
                                {format(session.start_time, "HH:mm")} -{" "}
                                {format(session.end_time, "HH:mm")}
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                );
            })}
        </div>
    );
}
