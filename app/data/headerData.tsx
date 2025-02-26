export interface HeaderLinkProps {
    href: string;
    content: string;
};
export interface HeaderLinkList {
    headerLinks: HeaderLinkProps[];
};



export const headerData: HeaderLinkList = {
    headerLinks: [
        {
            href: "#about",
            content: "About"
        },
        {
            href: "#projects",
            content: "Projects"
        },
        {
            href: "#techStack",
            content: "Tech Stack"
        },
        {
            href: "#contact",
            content: "Contact"
        }
    ]
}