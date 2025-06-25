"use client";

import { SheetClose } from "@/components/ui/sheet";
import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const NavLinks = ({
  isMobileNav = false,
  userId,
}: {
  isMobileNav?: boolean;
  userId?: string;
}) => {
  const pathName = usePathname();

  return (
    <>
      {sidebarLinks.map((link) => {
        let route = link.route;
        if (route === "/profile") {
          if (userId) route = `${route}/${userId}`;
          else return null;
        }

        const isActive =
          (pathName.includes(route) && route.length > 1) || pathName === route;

        const LinkComponent = (
          <Link
            href={route}
            key={link.label}
            className={cn(
              isActive
                ? "primary-gradient rounded-lg text-light-900"
                : "text-dark300_light900",
              "flex-start gap-4 bg-transparent p-4"
            )}
          >
            <Image
              src={link.imgURL}
              alt={link.label}
              width={20}
              height={20}
              className={cn({ "invert-colors": !isActive })}
            />
            <p
              className={cn(
                isActive ? "base-bold" : "base-medium",
                !isMobileNav && "max-lg:hidden"
              )}
            >
              {link.label}
            </p>
          </Link>
        );
        return isMobileNav ? (
          <SheetClose asChild key={link.route}>
            {LinkComponent}
          </SheetClose>
        ) : (
          <React.Fragment key={route}>{LinkComponent}</React.Fragment>
        );
      })}
    </>
  );
};

export default NavLinks;
