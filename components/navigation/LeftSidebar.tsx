import React from "react";
import NavLinks from "./navbar/NavLinks";
import Link from "next/link";
import ROUTES from "@/constants/routes";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { auth, signOut } from "@/auth";

const LeftSidebar = async () => {
  const session = await auth();
  const userId = session?.user?.id;
  return (
    <aside className="custom-scrollbar background-light900_dark200 light-border sticky left-0 top-0 flex h-screen w-fit flex-col justify-between overflow-y-auto border-r p-6 pt-36 shadow-light-300 dark:shadow-none max-sm:hidden lg:w-[266px]">
      <nav className="flex flex-col flex-1 gap-6">
        <NavLinks userId={userId} />
      </nav>
      {userId ? (
        <form
          action={async () => {
            "use server";
            await signOut();
          }}
        >
          <button
            type="submit"
            className="text-dark300_light900 flex-start gap-4 bg-transparent p-4 flex items-center"
          >
            <Image
              src={"/Icons/logout.svg"}
              alt="Logout Icon"
              width={20}
              height={20}
              className="dark:hidden"
            />
            <Image
              src={"/Icons/logout-dark.svg"}
              alt="Logout Icon Dark"
              width={20}
              height={20}
              className="hidden dark:inline"
            />
            <p className="base-medium hidden lg:inline">Logout</p>
          </button>
        </form>
      ) : (
        <div className="flex flex-col gap-3">
          <Link href={ROUTES.SIGN_IN}>
            <Button className="small-medium btn-secondary min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none">
              <span className="primary-text-gradient hidden lg:block">
                Login
              </span>
              <Image
                src={"/icons/account.svg"}
                alt="Account Icon"
                width={20}
                height={20}
                className="invert-colors lg:hidden"
              />
            </Button>
          </Link>
          <Link href={ROUTES.SIGN_UP}>
            <Button className="small-medium light-border-2 btn-tertiary text-dark400_light900 min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none">
              <span className="hidden lg:block">Sign Up</span>
              <Image
                src={"/icons/sign-up.svg"}
                alt="Sign Up Icon"
                width={20}
                height={20}
                className="invert-colors lg:hidden"
              />
            </Button>
          </Link>
        </div>
      )}
    </aside>
  );
};

export default LeftSidebar;
