export interface HeaderLinkProps {
    href: string;
    label: string;
}
export interface HeaderLinkList {
    headerLinks: HeaderLinkProps[];
};



export const headerData: HeaderLinkList = {
    headerLinks: [
        {
            href: "#about",
            label: "about"
        },
        {
            href: "#projects",
            label: "projects"
        },
        {
            href: "#techStack",
            label: "techStack"
        },
        {
            href: "#contact",
            label: "contact"
        },
        {
            href: "/resume",
            label: "resume"
        }
    ]
}