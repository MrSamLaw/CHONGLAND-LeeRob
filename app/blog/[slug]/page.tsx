import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CustomMDX } from "@/components/mdx";
import { getBlogPosts } from "@/app/lib/blog";

export async function generateMetadata({
    params,
}) : Promise<Metadata | undefined> {
    let post = getBlogPosts().find((post) => post.slug === params.slug);
    if(!post) {
        return;
    }

    let {
        title, 
        publishedAt: publishedTime,
        summary: description,
        image,
    } = post.metadata;
    let ogImage = image
    ? `https://chongland.com${image}`
    : `https://chongland.com/or?title=${title}`;

    return {
        title,
        description, 
        openGraph: {
            title, 
            description,
            type: 'article',
            publishedTime,
            url: `https://chongland.com/blog/${post.slug}`,
            images: [
                {
                    url:ogImage,
                },
            ],
        },
    };
}

function formatDate(date: string) {
    let currentDate = new Date();
    if(!date.includes('T')) {
        date = `${date}T00:00:00`;
    }
    let targetDate = new Date(date);

    let yearsAgo = currentDate.getFullYear() - targetDate.getFullYear();
    let monthsAgo = currentDate.getMonth() - targetDate.getMonth();
    let daysAgo = currentDate.getDate() - targetDate.getDate();

    let formattedDate = '';

    if(yearsAgo > 0) {
        formattedDate = `${yearsAgo}y ago`;
    } else if (monthsAgo > 0) {
        formattedDate = `${monthsAgo}mo ago`;
    } else if (daysAgo>0) {
        formattedDate = `${daysAgo}d ago`;
    } else {
        formattedDate = 'Today';
    }

    let fullDate = targetDate.toLocaleString('en-au', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    });

    return `${fullDate} (${formattedDate})`;
    
}
export default function Blog({params}) {
    let post = getBlogPosts().find((post)=> post.slug === params.slug);

    if(!post) {
        notFound();
    }

    return(
        <section>
            <h1>
                Title <br />
                {post.metadata.title}
            </h1>
            <div>
                <p>
                    Date <br />
                    {formatDate(post.metadata.publishedAt)}
                </p>
            </div>
            <article>
                Content <br />
                <CustomMDX source={post.content} />
            </article>
        </section>
    );
}