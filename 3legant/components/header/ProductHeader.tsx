import Image from "next/image";

const ProductHeader = () => {
  return (
    <div className="flex container-1 max-w-[1440px] relative">
      <Image
        src="/assets/images/product_header.svg"
        alt="product"
        width={1440}
        height={392}
        className="rounded-lg min-h-[380px] object-cover "
      />
      <div className="flex flex-col gap-3 absolute inset-0 justify-center items-center p-20 text-center">
        <h1 className="h4-medium text-dark-1">Our Product</h1>
        <p className="regular-base text-dark-1">
          Let's design the place you always imagined.
        </p>
      </div>
    </div>
  );
};

export default ProductHeader;
