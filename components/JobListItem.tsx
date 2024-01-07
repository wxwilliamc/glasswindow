import { Job } from "@prisma/client";
import Image from "next/image";
import { Banknote, Briefcase, Clock, Globe2, MapPin } from 'lucide-react'
import { formatPrice, relativeDate } from "@/lib/utils";
import Badge from "./Badge";

interface JobListItemProps {
  job: Job;
}

const JobListItem = ({ job }: JobListItemProps) => {
  return (
    <div className="flex gap-3 rounded-lg border p-5 hover:bg-muted/60">

      {/* Company Logo */}
      <Image 
        src={job.companyLogoUrl || 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWJ1aWxkaW5nLTIiPjxwYXRoIGQ9Ik02IDIyVjRhMiAyIDAgMCAxIDItMmg4YTIgMiAwIDAgMSAyIDJ2MThaIi8+PHBhdGggZD0iTTYgMTJINGEyIDIgMCAwIDAtMiAydjZhMiAyIDAgMCAwIDIgMmgyIi8+PHBhdGggZD0iTTE4IDloMmEyIDIgMCAwIDEgMiAydjlhMiAyIDAgMCAxLTIgMmgtMiIvPjxwYXRoIGQ9Ik0xMCA2aDQiLz48cGF0aCBkPSJNMTAgMTBoNCIvPjxwYXRoIGQ9Ik0xMCAxNGg0Ii8+PHBhdGggZD0iTTEwIDE4aDQiLz48L3N2Zz4='}
        alt={`${job.companyName} Company Logo`}
        width={100}
        height={100}
        className="rounded-lg self-center"
      />

      {/* Left Section */}
      <section className="flex-grow space-y-5">
        <div>
            <h2 className="text-xl font-medium">
                {job.title}
            </h2>
            <p className="text-muted-foreground">
                {job.companyName}
            </p>
        </div>
        
        <div className="text-muted-foreground">
            <p className="flex items-center gap-1.5 sm:hidden">
                <Briefcase size={16} className="shrink-0"/>
                {job.type}
            </p>
            <p className="flex items-center gap-1.5">
                <MapPin size={16} className="shrink-0"/>
                {job.locationType}
            </p>
            <p className="flex items-center gap-1.5">
                <Globe2 size={16} className="shrink-0"/>
                {job.location || 'Worldwide'}
            </p>
            <p className="flex items-center gap-1.5">
                <Banknote size={16} className="shrink-0"/>
                {formatPrice(job.salary)}
            </p>
            <p className="flex items-center gap-1.5 sm:hidden">
                <Clock size={16} className="shrink-0"/>
                {relativeDate(job.createdAt)}
            </p>
        </div>
      </section>

      {/* Right Section */}
      <section className="hidden sm:flex flex-col shrink-0 items-end justify-between">
            <Badge>
                {job.type}
            </Badge>
            <span className="flex items-center gap-1.5 text-muted-foreground">
                <Clock size={16}/>
                {relativeDate(job.createdAt)}
            </span>
      </section>
    </div>
  );
};

export default JobListItem;
