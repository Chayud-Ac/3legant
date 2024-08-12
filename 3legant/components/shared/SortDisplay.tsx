import Image from "next/image";

interface SortDisplayProps {
  setSort: (value: string) => void;
  sort: string;
}

interface Grid {
  iconUrl: string;
  gridType: string;
}

const gridsDesk: Grid[] = [
  {
    iconUrl: "/assets/icons/grids-3.svg",
    gridType: "grid-cols-3",
  },
  {
    iconUrl: "/assets/icons/grids-4.svg",
    gridType: "grid-cols-4",
  },
  {
    iconUrl: "/assets/icons/grids-2.svg",
    gridType: "grid-cols-2",
  },
  {
    iconUrl: "/assets/icons/grids-1.svg",
    gridType: "grid-cols-1",
  },
];

const gridsMobile: Grid[] = [
  {
    iconUrl: "/assets/icons/grids-2.svg",
    gridType: "grid-cols-2",
  },
  {
    iconUrl: "/assets/icons/grids-1.svg",
    gridType: "grid-cols-1",
  },
];

const SortDisplay = ({ sort, setSort }: SortDisplayProps) => {
  return (
    <div className="flex flex-col items-center justify-between sm:justify-end sm:items-end w-full max-sm:pt-5">
      <div className="flex flex-row items-center justify-between w-full   md:justify-end md:gap-5 md:max-w-[296px]">
        <p className="medium-sm text-dark-2">Sort by</p>
        <div className="flex flex-row">
          {gridsDesk.map((item) => {
            const isActive = item.gridType === sort;
            return (
              <div
                key={item.gridType}
                className="max-sm:hidden"
                onClick={() => setSort(item.gridType)}
              >
                <Image
                  src={item.iconUrl}
                  alt={item.gridType}
                  width={18}
                  height={18}
                  className={`w-auto h-auto p-2 border border-grey-4 inline-block hover:bg-grey-4 transition-colors duration-300 ${isActive && "bg-grey-4"}`}
                />
              </div>
            );
          })}

          {gridsMobile.map((item) => {
            const isActive = item.gridType === sort;
            return (
              <div
                key={item.gridType}
                className="sm:hidden"
                onClick={() => setSort(item.gridType)}
              >
                <Image
                  src={item.iconUrl}
                  alt={item.gridType}
                  width={18}
                  height={18}
                  className={`w-auto h-auto p-2 border border-grey-4 inline-block hover:bg-grey-4 transition-colors duration-300 ${isActive && "bg-grey-4"}`}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SortDisplay;
