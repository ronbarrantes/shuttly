import { SignedIn, UserButton, SignedOut, SignInButton } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

interface MainNavigationProps {
  noMenu?: boolean;
  authNavigation?: React.ReactNode;
}

export const MainNavigation = ({
  noMenu,
  authNavigation,
}: MainNavigationProps) => {
  return (
    <nav>
      <ul className="flex gap-3">
        {!noMenu && (
          // TODO: make this better
          <>
            <li>
              <Link href={"/"}>Dashboard</Link>
            </li>
            <li>
              <Link href={"/settings"}>Settings</Link>
            </li>
          </>
        )}

        {authNavigation && <li>{authNavigation}</li>}
      </ul>
    </nav>
  );
};

export const SideNavigation = () => {
  const uri = "/settings";

  return (
    <nav>
      <ul className="flex flex-col gap-3">
        <li>
          <Link href={`${uri}/`}>Personal</Link>
        </li>
        <li>
          <Link href={`${uri}/`}>Company</Link>
        </li>
        <li>
          <Link href={`${uri}/`}>Drivers</Link>
        </li>
        <li>
          <Link href={`${uri}/`}>Drivers</Link>
        </li>
      </ul>
    </nav>
  );
};
