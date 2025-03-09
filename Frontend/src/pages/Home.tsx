import Filters from "../components/Filters"
import HeadingFilters from "../components/Shop/HeadingFilters"
import Shop from "./Shop"

function Home() {
  return (
    <section className="bg-gray-50 min-h-screen py-8 antialiased dark:bg-gray-900 md:py-9 grid grid-flow-col">
      <Filters/>
      <div className="max-w-screen 2xl:px-0 mx-5 lg:ml-72">
        {/* <!-- Heading & Filters --> */}
        <HeadingFilters />

        <Shop />
      </div>
    </section>
  )
}

export default Home