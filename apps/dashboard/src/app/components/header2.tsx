import { MainNavigation } from "@/components/navigation";

export const Header = (
  props: React.PropsWithChildren & { noMenu?: boolean }
) => {
  return (
    <header className="flex justify-between">
      <div>Shuttly</div>
      <MainNavigation noMenu={props.noMenu} />
    </header>
  );
};
