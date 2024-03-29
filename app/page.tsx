import JobFilterSidebar from "@/components/JobFilterSidebar"
import JobListItem from "@/components/JobListItem"
import { db } from "@/lib/db"

const Homepage = async () => {

  const jobs = await db.job.findMany({
    where: {
      approved: true,
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  return (
    <main className="max-w-5xl mx-auto px-3 my-10 space-y-10">
      <section className="space-y-5 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          Developer jobs
        </h1>
        <p className="text-muted-foreground">
          Find your dream job.
        </p>
      </section>

      <section className="flex flex-col md:flex-row gap-4">
        <JobFilterSidebar />

        <div className="space-y-4 grow">
          {jobs.map(job => (
            <JobListItem job={job} key={job.id} />
          ))}
        </div>
      </section>
    </main>
  )
}

export default Homepage