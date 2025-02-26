import React from "react";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "../ui/sidebar";
import { BookIcon, Inbox, MessageSquareIcon } from "lucide-react";

const items = [
    {
        title: "Blogs",
        url: "/dashboard/blogs",
        icon: BookIcon,
    },
    {
        title: "Projects",
        url: "/dashboard/projects",
        icon: Inbox,
    },
    {
        title: "Messages",
        url: "/dashboard/messages",
        icon: MessageSquareIcon,
    },
];

const PPSidebar = () => {
    return (
        <Sidebar>
            <SidebarContent className="!bg-secondary !text-white">
                <SidebarGroup>
                    <SidebarGroupLabel className="!text-white">
                        Manage
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <a href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
};

export default PPSidebar;
