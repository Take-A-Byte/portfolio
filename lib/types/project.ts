export type Link = {
    title: string;
    link: string;
}

export type Project = {
    title: string;
    description: string;
    links: Link[] | null;
};
