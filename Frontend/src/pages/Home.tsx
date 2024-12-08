import HeadingFilters from "../components/Shop/HeadingFilters"
import Shop from "./Shop"

function Home() {
  return (
    <section className="bg-gray-50 min-h-screen py-8 antialiased dark:bg-gray-900 md:py-12">
      <div className="mx-auto max-w-screen-xl px-4 pt-5 2xl:px-0">
        {/* <!-- Heading & Filters --> */}
        <HeadingFilters />

        <Shop />
      </div>
    </section>
  )
}

export default Home