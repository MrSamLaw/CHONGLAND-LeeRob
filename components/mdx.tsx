import Link from "next/link";
import Image from "next/image";
import {MDXRemote} from 'next-mdx-remote/rsc';
import {highlight} from 'sugar-high';
import React from "react";


function Table({data}) {
    let headers = data.headers.map((header, index) => (
        <th key={index}>{header}</th>
    ));
    let rows = data.rows.map((row, index) => (
        <tr key={index}>
            {row.map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
            ))}
        </tr>
    ));

    return (
        <table>
            <thead>
                <tr>{headers}</tr>
            </thead>
            <tbody>{rows}</tbody>
        </table>
    );
}

function CustomLink(props) {
    let href=props.href;

    if (href.startsWith('/')) {
        return (
            <Link href={href}{...props}>
                {props.children}
            </Link>
        );
    }

    if (href.startsWith('#')) {
        return <a {...props} />;
    }

    return <a target="_blank" rel="noopener noreferrer" {...props} />;
}

function RoundedImage(props) {
    return <Image alt={props.alt} className="rounded-lg" {...props} />;
}

function Callout(props) {
    return (
        <div className="px-4 py-3 border border-neutral-200 dark:border-neutral-700 dark:bg-neutral-800 rounded p-1 text-sm flex items-center text-neutral-900 dark:text-neutral-100 mb-8">
            <div className="flex items-center w-4 mr-4">{props.emoji}</div>
            <div className="w-full callout">{props.children}</div>
        </div>
    );
}

function ProsCard({title, pros}) {
    return (
        <div className="border border-emerald-200 dark:border-emerald-900 bg-neutral-50 dark:bg-neutral-900 rounded-xl p-6 my-4 w-full">
            <span>{`You might use ${title} if...`}</span>
            <div className="mt-4">
                {pros.map((pro) => (
                    <div key={pro} className="flex font-medium items-baseline mb-2">
                        <div className="h-4 w-4 mr-2">
                            
                        </div>
                        <span>{pro}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
function ConsCard({title, cons}) {
    return (
        <div className="border border-red-200 dark:border-red-900 bg-neutral-50 dark:bg-neutral-900 rounded-xl p-6 my-6 w-full">
            <span>{`You might not use ${title} if...`}</span>
            <div className="mt-4">
                {cons.map((con) => (
                    <div key={con} className="flex font-medium items-baseline mb-2">
                        <div className="h-4 w-4 mr-2">

                        </div>
                        <span>{con}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

function Code({children, ...props}) {
    let codeHTML = highlight(children);
    return <code dangerouslySetInnerHTML={{__html: codeHTML}}{...props} />;
}

function slugify(str) {
    return str
    .toString()
    .toLowerCase()
    .trim() // Remove whitespace from both ends of a string
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/&/g, '-and-') // Replace & with 'and'
    .replace(/[^\w\-]+/g, '') // Remove all non-word characters except for -
    .replace(/\-\-+/g, '-'); // Replace multiple - with single -
}

function createHeading(level) {
    return ({ children}) => {
        let slug=slugify(children);
        return React.createElement(
            `h${level}`,
            {id:slug},
            [React.createElement('a', {
                href: `#$slug}`,
                key: `link-${slug}`,
                className: 'anchor',
            }),
        ],
        children
        );
    };
}

let components = {
    h1: createHeading(1),
    h2: createHeading(2),
    h3: createHeading(3),
    h4: createHeading(4),
    h5: createHeading(5),
    h6: createHeading(6),
    Image: RoundedImage,
    a: CustomLink,
    Callout,
    ProsCard,
    ConsCard, 
    code: Code,
    Table,
};

export function CustomMDX(props) {
    return (
        <MDXRemote
        {...props}
        components={{ ...components, ...Callout(props.components || {}) }}
        />
    );
}