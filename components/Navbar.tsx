'use client';

import { motion, LayoutGroup } from "framer-motion";
import { usePathname } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";

const navItems = {
    '/': {
        name: 'home',
    },
    '/about': {
        name: 'about',
    },
};

export function Navbar() {
    return (
        <aside className="-ml-[8px] mb-16 tracking-tight">
            <div className="container px-4 mx-auto flex items-center justify-between lg:sticky lg:top-20">
                <LayoutGroup>
                    <div>
                        <Link href='/' className="text-[40px] text-yellow-400 font-bold">CHONGLAND</Link>
                    </div>
                    <nav
                        className="flex flex-row items-start relative px-0 pb-0 fade md:overflow-auto scroll-p-6 md:relative"
                        id="nav"
                    >
                        <Suspense fallback={null}>
                            {Object.entries(navItems).map(([path, {name}]) => {
                                return <NavItem key={path} path={path} name={name} />;
                            })}
                        </Suspense>
                    </nav>
                </LayoutGroup>
            </div>
        </aside>
    );
}

let cx=(...classes) => classes.filter(Boolean).join(' ');

function NavItem({ path, name}: {path: string; name: string}) {
    let pathname = usePathname() || '/';
    if (pathname.includes('/blog/')) {
        pathname = '/blog';
    }
    let isActive = path === pathname;

    return (
        <Link
            key={path}
            href={path}
            className={cx(
                'transition-all flex align-middle text-[15px] tracking-[2px] uppercase font-semibold pb-2', 
                {
                    'text-neutral-50': !isActive,
                }
            )}
        >
            <span className="relative py-1 px-2">
                {name}
                {path === pathname ? (
                    <motion.div
                        className="absolute h-[2px] top-7 mx-2 inset-0 bg-neutral-200 dark:bg-yellow-500 z-[-1]"
                        /*className="relative before:content-[''] before:absolute before:bottom-0 before:left-0 before:w-full before:h-[2px] before:bg-yellow-500 before:origin-[100%, 50%] before:transition-all before:duration-300 before:ease-in-out before:scale-x-0 before:scale-y-[1] before:scale-z-[1] before:will-change-transform hover:before:origin-[100&, 0%] hover:before:scale-x-[1] hover:before:scale-y-[1] hover:before:scale-z-[1] text-[12px] tracking-[2px] uppercase font-semibold pb-2"*/
                        layoutId = "sidebar"
                        transition={{
                            type: 'spring',
                            stiffness: 350,
                            damping: 30,
                        }}
                    />
                ) : null}
            </span>
        </Link>
    );
}