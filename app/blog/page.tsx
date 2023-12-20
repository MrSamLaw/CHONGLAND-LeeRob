import Link from "next/link";
import { Suspense } from "react";
import { getBlogPosts } from "../lib/blog";


export const metadata = {
    title: 'Blog',
};

export default function BlogPage() {
    let allBlogs = getBlogPosts();

    return (
        <section>
            {allBlogs
                .sort((a,b) => {
                    if (
                        new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)
                    ) {
                        return -1;
                    }
                    return 1;
                })
                .map((post) => (
                    <Link
                        key={post.slug}
                        className="flex flex-col space-y-1 mb-4"
                        href={`/blog/${post.slug}`}
                    >
                        <div className="w-full flex flex-col">
                            <p className="text-neutral-900 dark:text-neutral-100 tracking-tight">
                                {post.metadata.title}
                            </p>
                            <Suspense fallback={<p className="h-6" />}>
                            
                            </Suspense>
                        </div>
                    </Link>
                ))}
        </section>
    );
}