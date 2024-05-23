import { createRootRoute, Outlet, Link } from '@tanstack/react-router'
// import { TanStackRouterDevtools } from '@tanstack/router-devtools'

export const Route = createRootRoute({
  component: () => (
    <>
    <header>
    <nav className="max-w-7xl mx-auto py-4 px-4">
    <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
            <Link to="/" className="flex items-center">
                <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">IceGirls.AI</span>
            </Link>
            <div className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1" id="mobile-menu-2">
                <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                    <li>
                        <Link to="/checkpoints" className="block py-2 pr-4 pl-3" aria-current="page">Checkpoints</Link>
                    </li>
                    <li>
                        <Link to="/actions" className="block py-2 pr-4 pl-3" aria-current="page">Actions</Link>
                    </li>
                    <li>
                        <Link to="/characters" className="block py-2 pr-4 pl-3" aria-current="page">Characters</Link>
                    </li>
                    <li>
                        <Link to="/users" className="block py-2 pr-4 pl-3" aria-current="page">Users</Link>
                    </li>
                    <li>
                        <Link to="/images" className="block py-2 pr-4 pl-3" aria-current="page">Images</Link>
                    </li>
                </ul>
            </div>
      </div>
      </nav>
      </header>
      <Outlet />
      {/* <TanStackRouterDevtools /> */}
    </>
  ),
})