
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Select } from "./ui/select"
import { db } from "@/lib/db"
import { jobTypes } from "@/lib/jobTypes"
import { Button } from "./ui/button"
import { jobFilterSchema } from "@/lib/validations"
import { redirect } from "next/navigation"


const filterJobs = async (formData: FormData) => {
    'use server'

    // Apply zod
    const values = Object.fromEntries(formData.entries()); // Turn into js

    const { location, query, remote, type } = jobFilterSchema.parse(values);

    const searchParams = new URLSearchParams({
        ...(query && { query: query.trim() }),
        ...(type && { type }),
        ...(location && { location }),
        ...(remote && { remote: 'true' }),
    })

    redirect(`/?${searchParams.toString()}`);
}

const JobFilterSidebar = async () => {

    const distinctLocations = await db.job.findMany({
        where: {
            approved: true,
        },
        select: {
            location: true
        },
        distinct: ['location']
    }).then(locations =>
        locations.map(({ location }) => location).filter(Boolean) // .filter(Boolean) in order to remove null value if false
    ) as string[]

    return (
        <div className='md:w-[260px] sticky top-0 h-fit bg-background border rounded-lg p-4'>
            <form action={filterJobs}>
                <div className="space-y-4">
                    {/* Search Job Title, Company Name */}
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="search">
                            Search
                        </Label>
                        <Input
                            id="search"
                            name="query"
                            placeholder="Title, company, etc"
                        />
                    </div>

                    {/* Job types */}
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="type">
                            Type
                        </Label>
                        <Select id="type" name="type" defaultValue=''>
                            <option>
                                All types
                            </option>
                            {jobTypes.map(jobType => (
                                <option key={jobType} value={jobType}>
                                    {jobType}
                                </option>
                            ))}
                        </Select>
                    </div>

                    {/* Location */}
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="location">
                            Location
                        </Label>
                        <Select id="location" name="location" defaultValue=''>
                            <option value=''>
                                All locations
                            </option>
                            {distinctLocations.map(location => (
                                <option key={location} value={location}>
                                    {location}
                                </option>
                            ))}
                        </Select>
                    </div>

                    <div className="flex items-center gap-2">
                        <Input 
                            id="remote"
                            name="remote"
                            type="checkbox"
                            className="w-4 h-4"
                        />
                        <Label htmlFor="remote">
                            Remote Jobs
                        </Label>
                    </div>

                    <Button type="submit" className="w-full">
                        Filter jobs
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default JobFilterSidebar