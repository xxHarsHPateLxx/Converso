import { getAllCompanions } from "@/lib/actions/companion.action";
import CompanionCard from "@/components/CompanionCard";
import { getSubjectColor } from "@/lib/utils";
import SearchInput from "@/components/SearchInput";
import SubjectFilter from "@/components/SubjectFilter";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const CompanionsLibrary = async ({ searchParams }: SearchParams) => {
  const { userId } = await auth();
  if (!userId) redirect('/sign-in')
  const filters = await searchParams;
  const subject = filters.subject ? filters.subject : '';
  const topic = filters.topic ? filters.topic : '';

  const companions = await getAllCompanions({ subject, topic });


  return (
    <main>
      <section className="flex justify-between gap-4 max-sm:flex-col">
        <h1>Companions Library</h1>
        <div className="flex gap-4">
          <SearchInput />
          <SubjectFilter />
        </div>
      </section>

      <section className="companions-grid">
        {companions.map((companion) => (
          <CompanionCard
            key={companion.id}
            id={companion.id}
            name={companion.name}
            topic={companion.topic}
            subject={companion.subject}
            duration={companion.duration}
            color={getSubjectColor(companion.subject)}
            bookmarked={companion.bookmarked}
          />
        ))}
      </section>
    </main>
  )
}

export default CompanionsLibrary
