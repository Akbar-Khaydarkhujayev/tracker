import { differenceInMinutes, format } from "date-fns";
import { IWorkSession } from "../api/getWorkSessions";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

interface IProps {
    sessions: IWorkSession[];
}

export default function SessionLine({ sessions }: IProps) {
    if (sessions.length === 0) return null;

    // Найти минимальное и максимальное время среди сессий
    const minStartTime = new Date(
        Math.min(...sessions.map((s) => new Date(s.start_time).getTime()))
    );
    const maxEndTime = new Date(
        Math.max(...sessions.map((s) => new Date(s.end_time).getTime()))
    );

    // Определяем границы рабочего дня (9:00 - 18:00)
    const workHoursStart = new Date(minStartTime);
    workHoursStart.setHours(9, 0, 0, 0);
    const workHoursEnd = new Date(minStartTime);
    workHoursEnd.setHours(18, 0, 0, 0);

    // Если есть сессии раньше 9:00 или позже 18:00, корректируем границы
    const actualStartTime =
        minStartTime < workHoursStart ? minStartTime : workHoursStart;
    const actualEndTime = maxEndTime > workHoursEnd ? maxEndTime : workHoursEnd;

    const totalMinutes = differenceInMinutes(actualEndTime, actualStartTime);
    const sessionElements = [];
    let lastEndTime = actualStartTime;

    sessions.forEach((session, index) => {
        const sessionStartTime = new Date(session.start_time);
        const sessionEndTime = new Date(session.end_time);
        const sessionStartMinutes = differenceInMinutes(
            sessionStartTime,
            actualStartTime
        );

        if (
            sessionStartMinutes >
            differenceInMinutes(lastEndTime, actualStartTime)
        ) {
            const gapMinutes =
                sessionStartMinutes -
                differenceInMinutes(lastEndTime, actualStartTime);
            const gapWidthPercentage = (gapMinutes / totalMinutes) * 100;
            sessionElements.push(
                <div
                    key={`gap-${index}`}
                    className="bg-secondary"
                    style={{ width: `${gapWidthPercentage}%` }}
                />
            );
        }

        const sessionDuration = differenceInMinutes(
            sessionEndTime,
            sessionStartTime
        );
        const widthPercentage = (sessionDuration / totalMinutes) * 100;

        sessionElements.push(
            <TooltipProvider key={session.start_time}>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <div
                            className="bg-primary cursor-pointer border-r text-black font-bold flex flex-col justify-between h-full p-1"
                            style={{ width: `${widthPercentage}%` }}
                        >
                            <div className="text-xs">
                                {widthPercentage > 10 &&
                                    format(sessionStartTime, "HH:mm")}
                            </div>
                            <div className="text-xs">
                                {widthPercentage > 10 &&
                                    format(sessionEndTime, "HH:mm")}
                            </div>
                        </div>
                    </TooltipTrigger>
                    <TooltipContent>
                        {format(sessionStartTime, "HH:mm")} -{" "}
                        {format(sessionEndTime, "HH:mm")}
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        );

        lastEndTime = sessionEndTime;
    });

    if (differenceInMinutes(actualEndTime, lastEndTime) > 0) {
        const gapMinutes = differenceInMinutes(actualEndTime, lastEndTime);
        const gapWidthPercentage = (gapMinutes / totalMinutes) * 100;
        sessionElements.push(
            <div
                key={`gap-end`}
                className="bg-secondary"
                style={{ width: `${gapWidthPercentage}%` }}
            />
        );
    }

    return (
        <div className="rounded-md h-10 overflow-hidden w-full flex bg-secondary">
            {sessionElements}
        </div>
    );
}
